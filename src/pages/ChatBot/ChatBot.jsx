/**
 * SakhiAssistant.jsx
 * ─────────────────────────────────────────────────────────────
 * Drop-in React component — Gender Gap Bridging AI Assistant
 *
 * Powered by Google Gemini API via Node.js backend
 * + Web Speech API (free, browser-native) for voice I/O
 * ─────────────────────────────────────────────────────────────
 */

import { useState, useEffect, useRef, useCallback } from "react";
const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:3001";

/* ═══════════════════════════════════════════════════════════════
   GEMINI API CALL
═══════════════════════════════════════════════════════════════ */
async function callGemini(message, history) {
  const res = await fetch(`${API_BASE}/api/chat`, {
    method: "POST", 
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to get response");
  return data.reply;
}

/* ═══════════════════════════════════════════════════════════════
   SPEECH RECOGNITION HOOK
═══════════════════════════════════════════════════════════════ */
function useSpeechRecognition({ onResult, onInterim }) {
  const [listening, setListening] = useState(false);
  const [permState, setPermState] = useState("unknown");
  const recRef = useRef(null);
  const cbRef  = useRef({ onResult, onInterim });
  useEffect(() => { cbRef.current = { onResult, onInterim }; });

  const stop = useCallback(() => {
    if (recRef.current) { try { recRef.current.abort(); } catch (_) {} recRef.current = null; }
    setListening(false);
  }, []);

  const start = useCallback(async () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { alert("Voice input requires Chrome or Edge browser."); return; }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(t => t.stop());
      setPermState("granted");
    } catch (e) {
      setPermState("denied");
      alert("Microphone access denied. Please click the lock icon in your browser address bar, allow microphone, and try again.");
      return;
    }

    stop();
    const r = new SR();
    r.continuous     = false;
    r.interimResults = true;
    r.lang           = "hi-IN";

    r.onresult = (e) => {
      const txt = Array.from(e.results).map(x => x[0].transcript).join("");
      if (e.results[e.results.length - 1].isFinal) {
        cbRef.current.onResult(txt);
        setListening(false);
      } else {
        cbRef.current.onInterim && cbRef.current.onInterim(txt);
      }
    };
    r.onerror = (ev) => {
      if (ev.error === "not-allowed" || ev.error === "service-not-allowed") {
        setPermState("denied");
        alert("Microphone blocked. Allow mic in browser settings and refresh.");
      }
      setListening(false);
    };
    r.onend = () => setListening(false);

    recRef.current = r;
    try { r.start(); setListening(true); } catch (_) { setListening(false); }
  }, [stop]);

  return { listening, permState, start, stop };
}

/* ═══════════════════════════════════════════════════════════════
   TTS HOOK  — fixed for browser quirks:
   1. Voices load async in Chrome — wait for voiceschanged
   2. Chrome silently pauses long utterances — keep resume() alive
   3. Hold utterance in a ref to prevent garbage collection
═══════════════════════════════════════════════════════════════ */
function useTTS() {
  const [speaking, setSpeaking]   = useState(false);
  const queueRef    = useRef([]);   // array of sentence strings
  const utterRefs   = useRef([]);   // hold ALL utterance objects to prevent GC
  const cancelledRef = useRef(false);

  const getVoice = useCallback((lang) => {
    const voices = window.speechSynthesis.getVoices();

    // Female voice name keywords (covers Google, Microsoft, Apple, Android voices)
    const femaleKeywords = [
      "female", "woman", "girl",
      // Google TTS
      "google hindi female", "google uk english female", "google us english",
      // Apple
      "samantha", "victoria", "karen", "moira", "veena", "siri",
      // Microsoft / Edge
      "zira", "hazel", "susan", "aria", "jenny", "ana", "natasha", "libby", "sonia",
      // Indian female voices
      "aditi", "raveena", "lekha", "heera", "priya",
    ];

    const isFemale = (v) =>
      femaleKeywords.some(kw => v.name.toLowerCase().includes(kw));

    // 1. Female voice with exact lang match (e.g. "hi-IN")
    const exactFemale = voices.find(v => v.lang === lang && isFemale(v));
    if (exactFemale) return exactFemale;

    // 2. Female voice with lang prefix match (e.g. "hi")
    const prefixFemale = voices.find(
      v => v.lang.startsWith(lang.split("-")[0]) && isFemale(v)
    );
    if (prefixFemale) return prefixFemale;

    // 3. Any female voice (still better than wrong-gender)
    const anyFemale = voices.find(v => isFemale(v));
    if (anyFemale) return anyFemale;

    // 4. Fallback to best lang match, then first available
    return (
      voices.find(v => v.lang === lang) ||
      voices.find(v => v.lang.startsWith(lang.split("-")[0])) ||
      voices[0] ||
      null
    );
  }, []);

  const stopTTS = useCallback(() => {
    cancelledRef.current = true;
    try { window.speechSynthesis.cancel(); } catch (_) {}
    queueRef.current  = [];
    utterRefs.current = [];
    setSpeaking(false);
  }, []);

  // Split text into short sentences so Chrome never hits its ~15s cut-off
  const splitSentences = (text) =>
    text
      .replace(/[*_#`•]/g, " ")
      .replace(/-+/g, " ")
      .replace(/\n+/g, " ")
      .trim()
      // split on sentence-ending punctuation (keep delimiter attached)
      .split(/(?<=[.!?।])\s+/)
      .map(s => s.trim())
      .filter(Boolean);

  const speakQueue = useCallback((sentences, targetLang, voice) => {
    if (!sentences.length || cancelledRef.current) {
      setSpeaking(false);
      return;
    }

    const sentence = sentences[0];
    const rest     = sentences.slice(1);

    const u = new SpeechSynthesisUtterance(sentence);
    u.lang   = targetLang;
    u.rate   = 1.5;
    u.pitch  = 1.05;
    u.volume = 1;
    if (voice) u.voice = voice;

    u.onend = () => {
      utterRefs.current = utterRefs.current.filter(x => x !== u);
      if (cancelledRef.current) { setSpeaking(false); return; }
      if (rest.length === 0) { setSpeaking(false); return; }
      speakQueue(rest, targetLang, voice);
    };

    u.onerror = (e) => {
      if (e.error === "interrupted" || e.error === "canceled") return;
      utterRefs.current = utterRefs.current.filter(x => x !== u);
      if (cancelledRef.current) return;
      // Skip broken sentence and continue
      if (rest.length > 0) speakQueue(rest, targetLang, voice);
      else setSpeaking(false);
    };

    utterRefs.current.push(u);   // prevent GC
    window.speechSynthesis.speak(u);
  }, []);

  const speak = useCallback((text, lang = "en") => {
    if (!window.speechSynthesis) return;
    stopTTS();

    const sentences  = splitSentences(text);
    if (!sentences.length) return;

    const targetLang = lang === "hi" || lang === "hinglish" ? "hi-IN" : "en-IN";

    const doSpeak = () => {
      cancelledRef.current = false;
      const voice = getVoice(targetLang);
      setSpeaking(true);
      speakQueue(sentences, targetLang, voice);
    };

    // Chrome loads voices asynchronously on first call
    if (window.speechSynthesis.getVoices().length > 0) {
      doSpeak();
    } else {
      window.speechSynthesis.addEventListener("voiceschanged", doSpeak, { once: true });
    }
  }, [stopTTS, getVoice, speakQueue]);

  // Clean up on unmount
  useEffect(() => () => stopTTS(), [stopTTS]);

  return { speaking, speak, stopTTS };
}

/* ═══════════════════════════════════════════════════════════════
   STYLES  (injected once, scoped with .sakhi- prefix)
   All original Sakhi CSS preserved + bubble-btn added
═══════════════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;600;700;800&family=Noto+Sans+Devanagari:wght@400;500;600&display=swap');

.sakhi-root *, .sakhi-root *::before, .sakhi-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

.sakhi-fab {
  position: fixed; bottom: 28px; right: 28px; z-index: 9999;
  width: 64px; height: 64px; border-radius: 50%; border: none; cursor: pointer;
  background: linear-gradient(135deg, #f43f8e, #9c27b0);
  font-size: 28px; color: #fff;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 6px 28px rgba(244,63,142,0.55);
  animation: sakhiFabFloat 3.5s ease-in-out infinite;
  transition: transform .2s;
  font-family: 'Baloo 2', sans-serif;
}
.sakhi-fab:hover { transform: scale(1.1); }
.sakhi-fab-ring {
  position: absolute; inset: 0; border-radius: 50%;
  background: rgba(244,63,142,.4);
  animation: sakhiRipple 2.2s ease-out infinite;
  pointer-events: none;
}
.sakhi-fab-ring2 {
  position: absolute; inset: 50%; border-radius: 50%;
  background: rgba(156,39,176,.3);
  animation: sakhiRipple 2.2s ease-out infinite .7s;
  pointer-events: none;
}

/* ── ChatBot bubble button ── */
.sakhi-bubble-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: linear-gradient(135deg, #d4a843, #2a9d8f);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  cursor: pointer;
  box-shadow: 0 0 25px rgba(184,146,46,0.6);
  animation: sakhiBubbleFloat 4s ease-in-out infinite;
  z-index: 9999;
  transition: all 0.4s ease;
  border: none;
  font-family: 'Baloo 2', sans-serif;
}
.sakhi-bubble-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 0 40px rgba(42,157,143,0.8);
}
.sakhi-bubble-btn .sakhi-text {
  position: absolute;
  bottom: -22px;
  font-size: 12px;
  color: #b8922e;
  font-weight: bold;
  white-space: nowrap;
}
@keyframes sakhiBubbleFloat {
  0%   { transform: translateY(0px); }
  50%  { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

.sakhi-panel {
  position: fixed; bottom: 28px; right: 28px; z-index: 9999;
  width: min(420px, calc(100vw - 24px));
  height: min(640px, calc(100vh - 72px));
  border-radius: 24px;
  background: linear-gradient(160deg, #130026 0%, #1e0048 50%, #0d001e 100%);
  border: 1px solid rgba(244,63,142,.25);
  display: flex; flex-direction: column; overflow: hidden;
  box-shadow: 0 24px 72px rgba(0,0,0,.8), 0 0 48px rgba(244,63,142,.15);
  animation: sakhiPanelIn .4s cubic-bezier(.16,1,.3,1) forwards;
  font-family: 'Baloo 2','Noto Sans Devanagari',sans-serif;
}
.sakhi-panel.sakhi-inline {
  position: relative; bottom: auto; right: auto;
  width: 100%; height: 100%;
  border-radius: 20px;
  animation: none;
}
.sakhi-panel.sakhi-minimized { height: 72px; }

.sakhi-header {
  padding: 13px 16px; flex-shrink: 0;
  background: linear-gradient(135deg, rgba(244,63,142,.18), rgba(156,39,176,.14));
  border-bottom: 1px solid rgba(244,63,142,.16);
  display: flex; align-items: center; justify-content: space-between;
  backdrop-filter: blur(16px);
}
.sakhi-header.sakhi-minimized-hdr { border-bottom: none; }
.sakhi-avatar {
  width: 44px; height: 44px; border-radius: 50%;
  background: linear-gradient(135deg, #f43f8e, #9c27b0);
  display: flex; align-items: center; justify-content: center;
  font-size: 20px; flex-shrink: 0;
  box-shadow: 0 0 18px rgba(244,63,142,.5);
  position: relative;
}
.sakhi-dot {
  position: absolute; bottom: 2px; right: 2px;
  width: 11px; height: 11px; border-radius: 50%;
  background: #4caf50; border: 2px solid #130026;
}
.sakhi-dot.listening { background: #f43f8e; animation: sakhiPulse 1s ease-in-out infinite; }
.sakhi-dot.speaking  { background: #ff9800; animation: sakhiPulse 1s ease-in-out infinite; }
.sakhi-dot.loading   { background: #7b2ff7; animation: sakhiPulse .8s ease-in-out infinite; }
.sakhi-hinfo { margin-left: 10px; flex: 1; }
.sakhi-hname { font-weight: 800; font-size: 16px; color: #fff; letter-spacing: .3px; }
.sakhi-hstatus { font-size: 11px; color: rgba(244,63,142,.9); font-weight: 600; margin-top: 1px; }
.sakhi-hbtns { display: flex; gap: 5px; }
.sakhi-hbtn {
  width: 30px; height: 30px; border-radius: 8px; border: none; cursor: pointer;
  background: rgba(255,255,255,.07); color: rgba(255,255,255,.45);
  font-size: 14px; display: flex; align-items: center; justify-content: center;
  transition: all .2s; font-family: inherit;
}
.sakhi-hbtn:hover { background: rgba(244,63,142,.2); color: #fff; }

.sakhi-langstrip {
  padding: 6px 14px; flex-shrink: 0;
  background: rgba(0,0,0,.28);
  display: flex; gap: 5px; justify-content: center;
}
.sakhi-lchip {
  padding: 2px 10px; border-radius: 10px; font-size: 10.5px; font-weight: 600;
  background: rgba(244,63,142,.09); border: 1px solid rgba(244,63,142,.2);
  color: rgba(255,255,255,.5);
}

.sakhi-msgs {
  flex: 1; overflow-y: auto; padding: 14px 14px 6px;
  scroll-behavior: smooth;
}
.sakhi-msgs::-webkit-scrollbar { width: 3px; }
.sakhi-msgs::-webkit-scrollbar-thumb { background: rgba(244,63,142,.3); border-radius: 3px; }

.sakhi-row {
  display: flex; gap: 8px; align-items: flex-end;
  margin-bottom: 13px;
  animation: sakhiMsgIn .3s cubic-bezier(.16,1,.3,1) forwards;
  opacity: 0;
}
.sakhi-row.sakhi-user { flex-direction: row-reverse; }
.sakhi-mavatar {
  width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center; font-size: 14px;
}
.sakhi-mavatar.bot { background: linear-gradient(135deg,#f43f8e,#9c27b0); box-shadow: 0 0 10px rgba(244,63,142,.4); }
.sakhi-mavatar.user { background: linear-gradient(135deg,#7b2ff7,#f43f8e); }
.sakhi-mcontent { max-width: 78%; }
.sakhi-bubble {
  padding: 10px 14px; font-size: 13.5px; line-height: 1.65;
  word-break: break-word; white-space: pre-wrap;
}
.sakhi-bubble.bot {
  border-radius: 18px 18px 18px 4px;
  background: rgba(255,255,255,.055); border: 1px solid rgba(244,63,142,.18);
  color: #f0e6ff; backdrop-filter: blur(10px);
  box-shadow: 0 4px 14px rgba(0,0,0,.3);
}
.sakhi-bubble.user {
  border-radius: 18px 18px 4px 18px;
  background: linear-gradient(135deg,#f43f8e,#9c27b0);
  color: #fff; box-shadow: 0 4px 18px rgba(244,63,142,.35);
}
.sakhi-bubble.error {
  border-radius: 18px 18px 18px 4px;
  background: rgba(239,68,68,.1); border: 1px solid rgba(239,68,68,.25);
  color: #fca5a5;
}
.sakhi-mmeta {
  display: flex; align-items: center; gap: 5px;
  margin-top: 4px; padding-inline: 3px;
}
.sakhi-mtime { font-size: 10px; color: rgba(255,255,255,.25); }
.sakhi-speakbtn {
  background: none; border: none; cursor: pointer;
  font-size: 13px; color: rgba(255,255,255,.3);
  padding: 1px 3px; border-radius: 4px; transition: color .2s;
  font-family: inherit;
}
.sakhi-speakbtn:hover { color: #f43f8e; }
.sakhi-speakbtn.active { color: #f43f8e; animation: sakhiPulse 1s ease-in-out infinite; }

.sakhi-typing {
  display: flex; gap: 8px; align-items: flex-end; margin-bottom: 13px;
  animation: sakhiMsgIn .3s cubic-bezier(.16,1,.3,1) forwards; opacity: 0;
}
.sakhi-tbubble {
  padding: 11px 15px; border-radius: 18px 18px 18px 4px;
  background: rgba(255,255,255,.055); border: 1px solid rgba(244,63,142,.18);
  display: flex; gap: 5px; align-items: center; backdrop-filter: blur(10px);
}
.sakhi-tdot { width: 6px; height: 6px; border-radius: 50%; background: #f43f8e; }
.sakhi-tdot:nth-child(1) { animation: sakhiBounce 1.2s ease-in-out infinite 0s; }
.sakhi-tdot:nth-child(2) { animation: sakhiBounce 1.2s ease-in-out infinite .2s; }
.sakhi-tdot:nth-child(3) { animation: sakhiBounce 1.2s ease-in-out infinite .4s; }

.sakhi-chips { padding: 3px 14px 12px; flex-shrink: 0; }
.sakhi-chips-lbl { font-size: 10px; color: rgba(255,255,255,.3); text-align: center; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 8px; }
.sakhi-chips-row { display: flex; flex-wrap: wrap; gap: 6px; justify-content: center; }
.sakhi-chip {
  padding: 5px 11px; border-radius: 14px; font-size: 11.5px; font-weight: 500;
  background: rgba(244,63,142,.08); border: 1px solid rgba(244,63,142,.22);
  color: rgba(255,255,255,.62); cursor: pointer; transition: all .2s;
  font-family: 'Baloo 2','Noto Sans Devanagari',sans-serif;
}
.sakhi-chip:hover { background: rgba(244,63,142,.22); color: #fff; transform: translateY(-1px); }

.sakhi-live {
  margin: 0 14px 8px; padding: 7px 12px; border-radius: 10px; flex-shrink: 0;
  background: rgba(244,63,142,.09); border: 1px dashed rgba(244,63,142,.4);
  color: rgba(255,255,255,.6); font-size: 12.5px; font-style: italic;
  display: flex; align-items: center; gap: 8px;
}
.sakhi-wavebars { display: flex; gap: 2px; align-items: center; flex-shrink: 0; }
.sakhi-wb { width: 3px; border-radius: 2px; background: #f43f8e; }
.sakhi-wb:nth-child(1) { height: 7px;  animation: sakhiWave .8s ease-in-out infinite 0s; }
.sakhi-wb:nth-child(2) { height: 13px; animation: sakhiWave .8s ease-in-out infinite .15s; }
.sakhi-wb:nth-child(3) { height: 9px;  animation: sakhiWave .8s ease-in-out infinite .3s; }
.sakhi-wb:nth-child(4) { height: 15px; animation: sakhiWave .8s ease-in-out infinite .1s; }
.sakhi-wb:nth-child(5) { height: 7px;  animation: sakhiWave .8s ease-in-out infinite .25s; }

.sakhi-inputarea {
  padding: 10px 14px 14px; flex-shrink: 0;
  border-top: 1px solid rgba(244,63,142,.13);
  background: rgba(0,0,0,.4); backdrop-filter: blur(14px);
}
.sakhi-inputrow {
  display: flex; gap: 7px; align-items: flex-end;
  background: rgba(255,255,255,.05);
  border: 1.5px solid rgba(244,63,142,.28);
  border-radius: 16px; padding: 7px 9px;
  transition: border-color .25s, box-shadow .25s;
}
.sakhi-inputrow:focus-within {
  border-color: rgba(244,63,142,.6);
  box-shadow: 0 0 0 3px rgba(244,63,142,.1);
}
.sakhi-textarea {
  flex: 1; background: none; border: none; color: #fff;
  font-size: 13.5px; resize: none; line-height: 1.55;
  max-height: 76px; overflow-y: auto; padding: 2px 0; outline: none;
  font-family: 'Baloo 2','Noto Sans Devanagari',sans-serif;
}
.sakhi-textarea::placeholder { color: rgba(255,255,255,.28); }
.sakhi-abtn {
  width: 36px; height: 36px; border-radius: 50%; border: none; cursor: pointer;
  flex-shrink: 0; font-size: 15px;
  display: flex; align-items: center; justify-content: center;
  transition: all .2s; position: relative; font-family: inherit;
}
.sakhi-micbtn {
  background: rgba(244,63,142,.12); border: 1.5px solid rgba(244,63,142,.35);
}
.sakhi-micbtn.active {
  background: linear-gradient(135deg,#f43f8e,#9c27b0);
  border-color: transparent;
  box-shadow: 0 0 16px rgba(244,63,142,.6);
}
.sakhi-micring {
  position: absolute; inset: -2px; border-radius: 50%;
  background: rgba(244,63,142,.35);
  animation: sakhiRipple 1s ease-out infinite;
  display: none; pointer-events: none;
}
.sakhi-micbtn.active .sakhi-micring { display: block; }
.sakhi-sendbtn { background: rgba(255,255,255,.08); color: rgba(255,255,255,.35); }
.sakhi-sendbtn.ready {
  background: linear-gradient(135deg,#f43f8e,#9c27b0); color: #fff;
  box-shadow: 0 0 14px rgba(244,63,142,.45);
}
.sakhi-sendbtn:disabled { cursor: not-allowed; }
.sakhi-footer { text-align: center; font-size: 10px; color: rgba(255,255,255,.16); margin-top: 7px; letter-spacing: .3px; }

@keyframes sakhiFabFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
@keyframes sakhiRipple   { 0%{transform:scale(.85);opacity:.8} 100%{transform:scale(2.6);opacity:0} }
@keyframes sakhiPanelIn  { from{opacity:0;transform:scale(.88) translateY(18px)} to{opacity:1;transform:scale(1) translateY(0)} }
@keyframes sakhiMsgIn    { from{opacity:0;transform:translateY(9px)} to{opacity:1;transform:translateY(0)} }
@keyframes sakhiBounce   { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-7px)} }
@keyframes sakhiPulse    { 0%,100%{opacity:1} 50%{opacity:.4} }
@keyframes sakhiWave     { 0%,100%{transform:scaleY(1)} 50%{transform:scaleY(.3)} }
`;

/* ═══════════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════════ */
const fmtTime = (d) => d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
let _uid = 0;
const uid = () => `m${++_uid}_${Date.now()}`;

const SUGGESTIONS = [
  { text: "Beti Bachao Beti Padhao kya hai?",   flag: "IN" },
  { text: "How to improve sex ratio?",          flag: "EN" },
  { text: "Sukanya Samriddhi Yojana benefits",  flag: "EN" },
  { text: "Women employment rights India mein", flag: "HG" },
  { text: "Child marriage kaise roke?",         flag: "IN" },
  { text: "Women empowerment success stories",  flag: "EN" },
];

const WELCOME_TEXT =
  "Namaste! I am Sakhi AI 🌸, your gender equity companion powered by Gemini. Ask me about girl child education, women's health, safety, government schemes like Sukanya Samriddhi or Beti Bachao, or how to bridge the gender gap. You can type or use the mic to speak — English, Hindi, or Hinglish!";

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function SakhiAssistant({ inline = false }) {
  const [open,          setOpen]          = useState(false);
  const [minimized,     setMinimized]     = useState(false);
  const [messages,      setMessages]      = useState([
    { id: "w0", role: "bot", text: WELCOME_TEXT, lang: "en", time: fmtTime(new Date()) }
  ]);
  const historyRef = useRef([]);
  const [input,         setInput]         = useState("");
  const [loading,       setLoading]       = useState(false);
  const [liveText,      setLiveText]      = useState("");
  const [activeSpeakId, setActiveSpeakId] = useState(null);
  const endRef         = useRef(null);
  const inputRef       = useRef(null);
  const styleInjected  = useRef(false);

  useEffect(() => {
    if (styleInjected.current) return;
    styleInjected.current = true;
    const s = document.createElement("style");
    s.textContent = CSS;
    document.head.appendChild(s);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, liveText]);

  const { speaking, speak, stopTTS } = useTTS();

  const handleVoiceResult = useCallback((txt) => {
    setLiveText("");
    const trimmed = txt.trim();
    if (!trimmed) return;
    setInput("");
    processMessage(trimmed);
  }, []); // eslint-disable-line

  const { listening, start: startMic, stop: stopMic } = useSpeechRecognition({
    onResult:  handleVoiceResult,
    onInterim: (t) => setLiveText(t),
  });

  const processMessage = useCallback(async (text) => {
    if (!text.trim() || loading) return;

    const userMsg = { id: uid(), role: "user", text, lang: "en", time: fmtTime(new Date()) };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const currentHistory = [...historyRef.current];

    try {
      const reply = await callGemini(text, currentHistory);

      historyRef.current = [
        ...currentHistory,
        { role: "user",  text },
        { role: "model", text: reply },
      ];

      const botMsg = { id: uid(), role: "bot", text: reply, lang: "en", time: fmtTime(new Date()) };
      setMessages(prev => [...prev, botMsg]);
      setLoading(false);
      setActiveSpeakId(botMsg.id);
      speak(reply, "en");
    } catch (err) {
      const errMsg = {
        id: uid(), role: "bot",
        text: `⚠ ${err.message || "Something went wrong. Please try again."}`,
        lang: "en", time: fmtTime(new Date()), isError: true,
      };
      setMessages(prev => [...prev, errMsg]);
      setLoading(false);
    }
  }, [loading, speak]);

  const handleSend = () => { if (input.trim()) processMessage(input); };
  const handleKey  = (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } };
  const handleChip = (text) => processMessage(text);

  const toggleSpeak = (msg) => {
    if (speaking && activeSpeakId === msg.id) {
      stopTTS(); setActiveSpeakId(null);
    } else {
      setActiveSpeakId(msg.id);
      speak(msg.text, msg.lang);
    }
  };

  const clearChat = () => {
    historyRef.current = [];
    setMessages([{ id: "w0", role: "bot", text: WELCOME_TEXT, lang: "en", time: fmtTime(new Date()) }]);
    stopTTS(); setActiveSpeakId(null);
  };

  const dotClass   = loading ? "loading" : listening ? "listening" : speaking ? "speaking" : "";
  const statusText = loading ? "Thinking..." : listening ? "Listening..." : speaking ? "Speaking..." : "Gender Equity Assistant · Gemini";

  // ── Bubble button when closed ──
  if (!inline && !open) {
    return (
      <div className="sakhi-root">
        <button
          className="sakhi-bubble-btn"
          onClick={() => setOpen(true)}
          title="Open Sakhi AI"
        >
          💛
          <span className="sakhi-text">Sakhi AI</span>
        </button>
      </div>
    );
  }

  const panelClass = [
    "sakhi-panel",
    inline    ? "sakhi-inline"    : "",
    minimized ? "sakhi-minimized" : "",
  ].filter(Boolean).join(" ");

  return (
    <div className="sakhi-root">
      <div className={panelClass}>

        <div className={`sakhi-header ${minimized ? "sakhi-minimized-hdr" : ""}`}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="sakhi-avatar">
              <span role="img" aria-label="lotus">🌸</span>
              <span className={`sakhi-dot ${dotClass}`} />
            </div>
            <div className="sakhi-hinfo">
              <div className="sakhi-hname">Sakhi AI</div>
              <div className="sakhi-hstatus">{statusText}</div>
            </div>
          </div>
          <div className="sakhi-hbtns">
            <button className="sakhi-hbtn" onClick={clearChat} title="Clear chat">🗑</button>
            {!inline && (
              <button className="sakhi-hbtn" onClick={() => setMinimized(m => !m)} title={minimized ? "Expand" : "Minimize"}>
                {minimized ? "▲" : "▼"}
              </button>
            )}
            {!inline && (
              <button className="sakhi-hbtn" onClick={() => { setOpen(false); stopTTS(); }} title="Close">✕</button>
            )}
          </div>
        </div>

        {!minimized && (
          <>
            <div className="sakhi-langstrip">
              <span className="sakhi-lchip">English</span>
              <span className="sakhi-lchip">Hindi</span>
              <span className="sakhi-lchip">Hinglish</span>
            </div>

            <div className="sakhi-msgs">
              {messages.map(msg => (
                <div key={msg.id} className={`sakhi-row ${msg.role === "user" ? "sakhi-user" : ""}`}>
                  <div className={`sakhi-mavatar ${msg.role}`}>
                    {msg.role === "bot" ? "🌸" : "👤"}
                  </div>
                  <div className="sakhi-mcontent">
                    <div className={`sakhi-bubble ${msg.role} ${msg.isError ? "error" : ""}`}>
                      {msg.text}
                    </div>
                    <div className="sakhi-mmeta" style={{ justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                      <span className="sakhi-mtime">{msg.time}</span>
                      {msg.role === "bot" && !msg.isError && (
                        <button
                          className={`sakhi-speakbtn ${activeSpeakId === msg.id && speaking ? "active" : ""}`}
                          onClick={() => toggleSpeak(msg)}
                          title="Listen"
                        >
                          {activeSpeakId === msg.id && speaking ? "🔊" : "🔈"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="sakhi-typing">
                  <div className="sakhi-mavatar bot">🌸</div>
                  <div className="sakhi-tbubble">
                    <div className="sakhi-tdot" />
                    <div className="sakhi-tdot" />
                    <div className="sakhi-tdot" />
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {messages.length <= 1 && (
              <div className="sakhi-chips">
                <div className="sakhi-chips-lbl">Ask me about</div>
                <div className="sakhi-chips-row">
                  {SUGGESTIONS.map((s, i) => (
                    <button key={i} className="sakhi-chip" onClick={() => handleChip(s.text)}>
                      {s.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {listening && liveText && (
              <div className="sakhi-live">
                <div className="sakhi-wavebars">
                  <div className="sakhi-wb"/><div className="sakhi-wb"/>
                  <div className="sakhi-wb"/><div className="sakhi-wb"/>
                  <div className="sakhi-wb"/>
                </div>
                <span>{liveText}</span>
              </div>
            )}

            <div className="sakhi-inputarea">
              <div className="sakhi-inputrow">
                <textarea
                  ref={inputRef}
                  className="sakhi-textarea"
                  value={input}
                  rows={1}
                  placeholder="Type or tap mic to speak — Hindi, English, Hinglish"
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  disabled={loading}
                  onInput={e => {
                    e.target.style.height = "auto";
                    e.target.style.height = Math.min(e.target.scrollHeight, 76) + "px";
                  }}
                />
                <button
                  className={`sakhi-abtn sakhi-micbtn ${listening ? "active" : ""}`}
                  onClick={listening ? stopMic : startMic}
                  disabled={loading}
                  title={listening ? "Stop mic" : "Speak"}
                >
                  <span className="sakhi-micring" />
                  🎤
                </button>
                <button
                  className={`sakhi-abtn sakhi-sendbtn ${input.trim() && !loading ? "ready" : ""}`}
                  onClick={handleSend}
                  disabled={!input.trim() || loading}
                  title="Send"
                >
                  ➤
                </button>
              </div>
              <div className="sakhi-footer">Sakhi AI — Gender Gap Bridging Assistant · Powered by Google Gemini</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}