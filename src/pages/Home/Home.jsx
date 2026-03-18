import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
// ─── Palette ──────────────────────────────────────────────────────────────────
//  Background  : #f8f7f4  (warm off-white, clean & fresh)
//  Surface     : #ffffff
//  Deep        : #0f1923  (rich near-black for text & header)
//  Gold        : #b8922e  (muted warm gold — accent)
//  Teal        : #2a9d8f  (calm professional teal)
//  Muted text  : #6b7280
//  Border      : #e8e4de
// ─────────────────────────────────────────────────────────────────────────────

// const NAV_LINKS = ["Mission", "Impact", "Stories", "Join Us", "Resources"];

const STATS = [
  { value: "2.7B", label: "Women face legal economic barriers (World Bank)" }, // World Bank (2023)
  { value: "130+", label: "Years – To close gender gap (WEF)" }, // WEF Global Gender Gap Report
  { value: "$12T", label: "GDP potential (McKinsey)" }, // McKinsey Global Institute
  { value: "1 in 3", label: "Women experience physical or sexual violence globally (UN)" }, // UN Women / WHO
];

const CURSOR_MESSAGES = [
  { emoji: "✊", text: "Equal Rights" },
  { emoji: "🌟", text: "Value Every Life" },
  { emoji: "⚡", text: "She Can Lead" },
  { emoji: "🌍", text: "Change the World" },
  { emoji: "👑", text: "Born Equal" },
];

// Fewer, subtler particles — just gentle drifting dots
const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1.5,
  speed: Math.random() * 0.18 + 0.06,
  opacity: Math.random() * 0.22 + 0.06,
  color: i % 3 === 0 ? "#b8922e" : i % 3 === 1 ? "#2a9d8f" : "#0f1923",
}));



export default function Home() {
  // ── Cursor refs — zero React re-renders for cursor movement ───────────────
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const glowRef = useRef(null);
  const rawMouse = useRef({ x: -300, y: -300 });
  const dotPos = useRef({ x: -300, y: -300 });
  const ringPos = useRef({ x: -300, y: -300 });
  const rafCursor = useRef(null);

  // ── React state ────────────────────────────────────────────────────────────
  const [scrollY, setScrollY] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [particles, setParticles] = useState(PARTICLES);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [ripples, setRipples] = useState([]);
  const [cursorMsg, setCursorMsg] = useState(null);

  const lastScrollY = useRef(0);
  const scrollTmr = useRef(null);
  const particleRaf = useRef(null);
  const msgTmr = useRef(null);
  const rippleId = useRef(0);

  // ── RAF lerp cursor loop — buttery smooth, no state ───────────────────────
  useEffect(() => {
    const lerp = (a, b, t) => a + (b - a) * t;
    const tick = () => {
      // Dot: fast follow
      dotPos.current.x = lerp(dotPos.current.x, rawMouse.current.x, 0.42);
      dotPos.current.y = lerp(dotPos.current.y, rawMouse.current.y, 0.42);
      // Ring: slow trailing
      ringPos.current.x = lerp(ringPos.current.x, rawMouse.current.x, 0.10);
      ringPos.current.y = lerp(ringPos.current.y, rawMouse.current.y, 0.10);

      if (dotRef.current)
        dotRef.current.style.transform = `translate(${dotPos.current.x - 5}px, ${dotPos.current.y - 5}px)`;
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`;
      // Subtle glow follows raw position instantly
      if (glowRef.current) {
        const px = (rawMouse.current.x / window.innerWidth) * 100;
        const py = (rawMouse.current.y / window.innerHeight) * 100;
        glowRef.current.style.background =
          `radial-gradient(ellipse 38% 32% at ${px}% ${py}%, rgba(184,146,46,0.07) 0%, transparent 70%)`;
      }
      rafCursor.current = requestAnimationFrame(tick);
    };
    const onMove = (e) => { rawMouse.current.x = e.clientX; rawMouse.current.y = e.clientY; };
    window.addEventListener("mousemove", onMove, { passive: true });
    rafCursor.current = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(rafCursor.current); };
  }, []);

  // ── Hero entrance ──────────────────────────────────────────────────────────
  useEffect(() => { setTimeout(() => setHeroLoaded(true), 200); }, []);

  // ── Header hide on scroll ──────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      const cur = window.scrollY;
      if (cur > lastScrollY.current + 8) setHeaderVisible(false);
      else if (cur < lastScrollY.current - 4) setHeaderVisible(true);
      lastScrollY.current = cur;
      setScrollY(cur);
      clearTimeout(scrollTmr.current);
      scrollTmr.current = setTimeout(() => setHeaderVisible(true), 700);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);



  const navigate = useNavigate();

  const [hover, setHover] = useState(false);   // ✅ ADD THIS

  // ── Floating cursor word on pause ─────────────────────────────────────────
  const handleMouseMove = useCallback((e) => {
    clearTimeout(msgTmr.current);
    msgTmr.current = setTimeout(() => {
      const m = CURSOR_MESSAGES[Math.floor(Math.random() * CURSOR_MESSAGES.length)];
      setCursorMsg({ ...m, x: e.clientX, y: e.clientY, id: Date.now() });
      setTimeout(() => setCursorMsg(null), 1200);
    }, 800);
  }, []);

  // ── Click ripple ───────────────────────────────────────────────────────────
  const handleClick = useCallback((e) => {
    const id = rippleId.current++;
    setRipples(r => [...r, { id, x: e.clientX, y: e.clientY }]);
    setTimeout(() => setRipples(r => r.filter(rp => rp.id !== id)), 800);
  }, []);

  // ── Gentle particle drift ─────────────────────────────────────────────────
  useEffect(() => {
    const run = () => {
      setParticles(prev => prev.map(p => ({
        ...p,
        y: p.y - p.speed * 0.035 < -2 ? 102 : p.y - p.speed * 0.035,
        x: p.x + Math.sin(Date.now() * 0.0005 + p.id) * 0.006,
      })));
      particleRaf.current = requestAnimationFrame(run);
    };
    particleRaf.current = requestAnimationFrame(run);
    return () => cancelAnimationFrame(particleRaf.current);
  }, []);

  const parallax = scrollY * 0.18;

  return (
    <div
      style={{ fontFamily: "system-ui, sans-serif", cursor: "none", background: "#f8f7f4", overflowX: "hidden" }}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { cursor: none !important; }

        /* Typography helpers */
        .serif  { font-family: 'DM Serif Display', Georgia, serif; }
        .sans   { font-family: 'Inter', system-ui, sans-serif; }

        /* Shimmer — gold only, very subtle */
        .shimmer {
          background: linear-gradient(90deg, #b8922e 0%, #d4a843 40%, #b8922e 80%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        @keyframes shimmer { to { background-position: 200% center; } }

        /* Cursor animations */
        @keyframes dot-glow {
          0%,100% { box-shadow: 0 0 0 0 rgba(184,146,46,0.4), 0 0 10px rgba(184,146,46,0.3); }
          50%      { box-shadow: 0 0 0 5px rgba(184,146,46,0), 0 0 20px rgba(42,157,143,0.4); }
        }
        @keyframes ring-dash { to { transform: rotate(360deg); } }
        @keyframes msg-float {
          0%   { opacity: 0; transform: translateX(-50%) translateY(4px); }
          20%  { opacity: 1; transform: translateX(-50%) translateY(0); }
          80%  { opacity: 1; }
          100% { opacity: 0; transform: translateX(-50%) translateY(-40px); }
        }
        @keyframes ripple-out {
          0%   { transform: translate(-50%,-50%) scale(0); opacity: 0.5; }
          100% { transform: translate(-50%,-50%) scale(7); opacity: 0; }
        }

        /* Page animations */
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes soft-bob {
          0%,100% { transform: translateY(0px); }
          50%     { transform: translateY(-10px); }
        }
        @keyframes orbit-a {
          from { transform: rotate(0deg)   translateX(118px) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(118px) rotate(-360deg); }
        }
        @keyframes orbit-b {
          from { transform: rotate(140deg)  translateX(158px) rotate(-140deg); }
          to   { transform: rotate(500deg)  translateX(158px) rotate(-500deg); }
        }
        @keyframes orbit-c {
          from { transform: rotate(260deg)  translateX(195px) rotate(-260deg); }
          to   { transform: rotate(620deg)  translateX(195px) rotate(-620deg); }
        }
        @keyframes spin-cw  { to { transform: rotate(360deg); } }
        @keyframes spin-ccw { to { transform: rotate(-360deg); } }
        @keyframes breathe  {
          0%,100% { opacity: 0.25; transform: scale(1); }
          50%     { opacity: 0.45; transform: scale(1.06); }
        }
        @keyframes quote-glow {
          0%,100% { text-shadow: none; }
          50%     { text-shadow: 0 0 40px rgba(184,146,46,0.15); }
        }
        @keyframes scroll-line {
          0%   { transform: scaleY(0); transform-origin: top; }
          50%  { transform: scaleY(1); transform-origin: top; }
          51%  { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }

        /* Navigation */
        .nav-item {
          font-family: 'Inter', sans-serif;
          font-size: 12px; font-weight: 400;
          letter-spacing: 0.5px;
          color: rgba(15,25,35,0.55);
          text-decoration: none;
          padding: 4px 0;
          position: relative;
          transition: color 0.25s;
        }
        .nav-item::after {
          content: '';
          position: absolute; bottom: -1px; left: 0;
          width: 0; height: 1px;
          background: #b8922e;
          transition: width 0.3s ease;
        }
        .nav-item:hover { color: #0f1923; }
        .nav-item:hover::after { width: 100%; }

        /* Buttons — clean, solid, no animation */
        .btn-solid {
          display: inline-block;
          padding: 13px 36px;
          background: #0f1923;
          color: #f8f7f4;
          font-family: 'Inter', sans-serif;
          font-size: 12px; font-weight: 400;
          letter-spacing: 1.5px; text-transform: uppercase;
          border: none; border-radius: 2px;
          cursor: none;
          transition: background 0.25s, transform 0.25s, box-shadow 0.25s;
        }
        .btn-solid:hover {
          background: #1e3040;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(15,25,35,0.2);
        }

        .btn-outline {
          display: inline-block;
          padding: 12px 34px;
          background: transparent;
          color: #0f1923;
          font-family: 'Inter', sans-serif;
          font-size: 12px; font-weight: 400;
          letter-spacing: 1.5px; text-transform: uppercase;
          border: 1.5px solid rgba(15,25,35,0.3);
          border-radius: 2px; cursor: none;
          transition: border-color 0.25s, color 0.25s, transform 0.25s;
        }
        .btn-outline:hover {
          border-color: #b8922e;
          color: #b8922e;
          transform: translateY(-2px);
        }

        /* Gold accent button variant for dark sections */
        .btn-gold {
          display: inline-block;
          padding: 13px 36px;
          background: #b8922e;
          color: #fff;
          font-family: 'Inter', sans-serif;
          font-size: 12px; font-weight: 400;
          letter-spacing: 1.5px; text-transform: uppercase;
          border: none; border-radius: 2px; cursor: none;
          transition: background 0.25s, transform 0.25s, box-shadow 0.25s;
        }
        .btn-gold:hover {
          background: #a07828;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(184,146,46,0.35);
        }

        .btn-ghost-light {
          display: inline-block;
          padding: 12px 34px;
          background: transparent;
          color: rgba(255,255,255,0.7);
          font-family: 'Inter', sans-serif;
          font-size: 12px; font-weight: 300;
          letter-spacing: 1.5px; text-transform: uppercase;
          border: 1px solid rgba(255,255,255,0.25);
          border-radius: 2px; cursor: none;
          transition: all 0.25s;
        }
        .btn-ghost-light:hover {
          color: #fff;
          border-color: rgba(255,255,255,0.6);
          transform: translateY(-2px);
        }

        /* Card hover */
        .pillar-card {
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s;
        }
        .pillar-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 50px rgba(15,25,35,0.09);
        }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #f8f7f4; }
        ::-webkit-scrollbar-thumb { background: #b8922e; border-radius: 2px; }
      `}</style>

      {/* ── Cursor dot ── */}
      <div ref={dotRef} style={{
        position: "fixed", top: 0, left: 0,
        width: 10, height: 10, borderRadius: "50%",
        background: "#b8922e",
        pointerEvents: "none", zIndex: 9999,
        willChange: "transform",
        animation: "dot-glow 2s ease-in-out infinite",
      }} />

      {/* ── Cursor ring ── */}
      <div ref={ringRef} style={{
        position: "fixed", top: 0, left: 0,
        width: 40, height: 40, borderRadius: "50%",
        border: "1px solid rgba(184,146,46,0.4)",
        pointerEvents: "none", zIndex: 9998,
        willChange: "transform",
      }}>
        <div style={{
          position: "absolute", inset: 6, borderRadius: "50%",
          border: "1px dashed rgba(42,157,143,0.3)",
          animation: "ring-dash 5s linear infinite",
        }} />
      </div>

      {/* ── Floating word bubble ── */}
      {cursorMsg && (
        <div key={cursorMsg.id} style={{
          position: "fixed",
          left: cursorMsg.x, top: cursorMsg.y - 16,
          transform: "translateX(-50%)",
          pointerEvents: "none", zIndex: 9997,
          animation: "msg-float 1.2s ease-out forwards",
          whiteSpace: "nowrap",
        }}>
          <div style={{
            background: "#0f1923",
            borderRadius: 20, padding: "5px 16px",
            display: "flex", alignItems: "center", gap: 8,
            boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
          }}>
            <span style={{ fontSize: 13 }}>{cursorMsg.emoji}</span>
            <span className="sans" style={{
              fontSize: 10, letterSpacing: 2,
              color: "#d4a843", fontWeight: 400,
            }}>{cursorMsg.text}</span>
          </div>
        </div>
      )}

      {/* ── Click ripples ── */}
      {ripples.map(r => (
        <div key={r.id} style={{
          position: "fixed", left: r.x, top: r.y,
          width: 50, height: 50, borderRadius: "50%",
          border: "1px solid rgba(184,146,46,0.45)",
          pointerEvents: "none", zIndex: 9996,
          animation: "ripple-out 0.8s ease-out forwards",
        }} />
      ))}

      {/* ════════════════════════════════════════
                      HEADER
      ════════════════════════════════════════ */}
      {/* <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        padding: "0 60px",
        height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrollY > 40
          ? "rgba(248,247,244,0.88)"
          : "transparent",
        backdropFilter: scrollY > 40 ? "blur(16px)" : "none",
        borderBottom: scrollY > 40 ? "1px solid rgba(15,25,35,0.07)" : "none",
        transform: headerVisible ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.45s cubic-bezier(0.16,1,0.3,1), background 0.4s, border-bottom 0.4s",
      }}>
        

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            background: "#0f1923",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, color: "#d4a843",
          }}>♀</div>
          <div>
            <div className="serif" style={{ fontSize: 17, color: "#0f1923", lineHeight: 1 }}>EqualRise</div>
            <div className="sans" style={{ fontSize: 8, letterSpacing: 3, color: "#b8922e", fontWeight: 300, textTransform: "uppercase" }}>Bridging The Gap</div>
          </div>
        </div>

        
        <nav style={{ display: "flex", gap: 36 }}>
          {NAV_LINKS.map(l => <a key={l} href="#" className="nav-item">{l}</a>)}
        </nav>

        
        <button className="btn-solid">Take Action</button>
      </header> */}

      {/* ════════════════════════════════════════
                      HERO
      ════════════════════════════════════════ */}
      <section style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex", alignItems: "center",
        overflow: "hidden",
        background: "#f8f7f4",
      }}>
        {/* ── Very subtle background texture ── */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          {/* Warm tinted half */}
          <div style={{
            position: "absolute", right: 0, top: 0, bottom: 0, width: "48%",
            background: "linear-gradient(135deg, #f3f0eb 0%, #ede8e0 100%)",
          }} />
          {/* Gentle grid — barely visible */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `
              linear-gradient(rgba(15,25,35,0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(15,25,35,0.025) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
            transform: `translateY(${parallax * 0.12}px)`,
          }} />
          {/* Live glow blob — subtle, follows mouse via ref */}
          <div ref={glowRef} style={{
            position: "absolute", inset: 0,
            transition: "background 0.25s ease-out",
            pointerEvents: "none",
          }} />
          {/* Sparse drifting particles */}
          {particles.map(p => (
            <div key={p.id} style={{
              position: "absolute",
              left: `${p.x}%`, top: `${p.y}%`,
              width: p.size, height: p.size,
              borderRadius: "50%",
              background: p.color,
              opacity: p.opacity,
              willChange: "transform",
            }} />
          ))}
          {/* Thin vertical accent line */}
          <div style={{
            position: "absolute", left: "50%", top: 0, bottom: 0,
            width: 1,
            background: "linear-gradient(to bottom, transparent, rgba(184,146,46,0.12) 30%, rgba(184,146,46,0.12) 70%, transparent)",
            transform: `translateY(${parallax * 0.08}px)`,
          }} />
        </div>

        {/* ── Left: Hero text ── */}
        <div style={{
          position: "relative", zIndex: 10,
          width: "50%", paddingLeft: "8%", paddingTop: 64,
          transform: `translateY(${-parallax * 0.08}px)`,
        }}>
          {/* Eyebrow tag */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            marginBottom: 32,
            opacity: heroLoaded ? 1 : 0,
            transition: "opacity 0.7s 0.1s",
          }}>
            <span style={{
              width: 28, height: 1,
              background: "#b8922e", display: "block",
            }} />
            <span className="sans" style={{
              fontSize: 10, letterSpacing: 4, fontWeight: 400,
              color: "#b8922e", textTransform: "uppercase",
            }}>Bridging The Gender Gap</span>
          </div>

          {/* Headline */}
          {[
            { text: "She Was", italic: false, muted: false, delay: "0.2s" },
            { text: "Born Equal.", italic: true, muted: false, delay: "0.35s", gold: true },
            { text: "Treated Less.", italic: false, muted: true, delay: "0.5s" },
          ].map((l, i) => (
            <div key={i} style={{ overflow: "hidden", lineHeight: 1 }}>
              <h1
                className={`serif ${l.gold ? "shimmer" : ""}`}
                style={{
                  fontSize: "clamp(44px, 6.5vw, 86px)",
                  fontWeight: 400,
                  fontStyle: l.italic ? "italic" : "normal",
                  lineHeight: 1.05,
                  letterSpacing: "-0.5px",
                  color: l.gold ? undefined : l.muted ? "rgba(15,25,35,0.28)" : "#0f1923",
                  marginBottom: 8,
                  opacity: heroLoaded ? 1 : 0,
                  transform: heroLoaded ? "translateY(0)" : "translateY(60px)",
                  transition: `opacity 0.9s ${l.delay}, transform 0.9s ${l.delay} cubic-bezier(0.16,1,0.3,1)`,
                }}
              >{l.text}</h1>
            </div>
          ))}

          <p className="sans" style={{
            fontSize: 14, fontWeight: 300,
            lineHeight: 1.85, letterSpacing: "0.1px",
            color: "rgba(15,25,35,0.52)",
            maxWidth: 420, marginTop: 28, marginBottom: 44,
            opacity: heroLoaded ? 1 : 0,
            transform: heroLoaded ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.9s 0.65s, transform 0.9s 0.65s cubic-bezier(0.16,1,0.3,1)",
          }}>
            We're rewriting the narrative — where every girl is celebrated at birth, every woman leads with full power, and equality isn't an aspiration but a lived reality.
          </p>


          <button className="btn-solid" 
            onClick={() => navigate("/NGO")}
            style={{
              display: "flex", gap: 16, alignItems: "center",
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.9s 0.8s, transform 0.9s 0.8s cubic-bezier(0.16,1,0.3,1)",
            }}>Begin The Change</button>


          {/* Scroll indicator */}
          <div style={{
            marginTop: 72, display: "flex", alignItems: "center", gap: 14,
            opacity: heroLoaded ? 0.45 : 0,
            transition: "opacity 0.9s 1.1s",
          }}>
            <div style={{
              width: 1, height: 42, position: "relative", overflow: "hidden",
              background: "rgba(15,25,35,0.1)",
            }}>
              <div style={{
                position: "absolute", inset: 0,
                background: "#b8922e",
                animation: "scroll-line 2s ease-in-out infinite",
              }} />
            </div>
            <span className="sans" style={{
              fontSize: 9, letterSpacing: 3.5,
              color: "rgba(15,25,35,0.35)",
              textTransform: "uppercase", fontWeight: 400,
            }}>Scroll</span>
          </div>
        </div>

        {/* ── Right: SVG illustration ── */}
        <div style={{
          position: "absolute", right: "4%", top: "50%",
          transform: `translateY(calc(-50% + ${-parallax * 0.08}px))`,
          width: 480, height: 480,
          animation: "soft-bob 7s ease-in-out infinite",
          opacity: heroLoaded ? 1 : 0,
          transition: "opacity 1.2s 0.4s",
        }}>
          {/* Outer ring */}
          <div style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            border: "1px solid rgba(184,146,46,0.15)",
            animation: "spin-cw 28s linear infinite",
          }} />
          {/* Inner dashed ring */}
          <div style={{
            position: "absolute", inset: 22, borderRadius: "50%",
            border: "1px dashed rgba(42,157,143,0.12)",
            animation: "spin-ccw 38s linear infinite",
          }} />
          {/* Ambient glow */}
          <div style={{
            position: "absolute", inset: -80, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(184,146,46,0.06) 0%, transparent 65%)",
            animation: "breathe 5s ease-in-out infinite",
          }} />

          <svg viewBox="0 0 480 480" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            <defs>
              <radialGradient id="figG" cx="50%" cy="36%" r="55%">
                <stop offset="0%" stopColor="#d4a843" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#b8922e" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#2a9d8f" stopOpacity="0.08" />
              </radialGradient>
              <linearGradient id="crownLG" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d4a843" />
                <stop offset="100%" stopColor="#2a9d8f" />
              </linearGradient>
              <radialGradient id="ambG2" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#b8922e" stopOpacity="0.07" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
              <filter id="figBlur">
                <feGaussianBlur stdDeviation="4" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* Background glow circle */}
            <circle cx="240" cy="240" r="215" fill="url(#ambG2)" />

            <g filter="url(#figBlur)">
              {/* Hair */}
              <path d="M178 142 Q162 104 190 82 Q216 62 240 84 Q264 62 290 82 Q318 104 302 142 Q296 90 240 84 Q184 90 178 142Z" fill="#0f1923" opacity="0.45" />
              <path d="M175 148 Q158 184 168 220 Q157 198 175 148Z" fill="#0f1923" opacity="0.3" />
              <path d="M305 148 Q322 184 312 220 Q323 198 305 148Z" fill="#0f1923" opacity="0.3" />
              {/* Head */}
              <ellipse cx="240" cy="155" rx="64" ry="70" fill="url(#figG)" />
              {/* Neck */}
              <rect x="226" y="218" width="28" height="24" rx="8" fill="url(#figG)" opacity="0.8" />
              {/* Body / shoulders */}
              <path d="M166 245 Q194 232 222 242 L226 246 L226 302 L254 302 L254 246 L258 242 Q286 232 314 245 Q340 266 332 320 L286 320 Q282 284 240 280 Q198 284 194 320 L148 320 Q140 266 166 245Z" fill="url(#figG)" opacity="0.78" />
              {/* Crown */}
              <path d="M206 94 L214 74 L228 88 L240 68 L252 88 L266 74 L274 94Z" fill="url(#crownLG)" opacity="0.7" />
              <circle cx="240" cy="68" r="5" fill="#d4a843" opacity="0.9" />
              <circle cx="214" cy="74" r="3.5" fill="#2a9d8f" opacity="0.8" />
              <circle cx="266" cy="74" r="3.5" fill="#2a9d8f" opacity="0.8" />
              {/* Subtle sparkles */}
              <text x="124" y="120" fill="#b8922e" fontSize="14" opacity="0.55">✦</text>
              <text x="336" y="136" fill="#2a9d8f" fontSize="11" opacity="0.5">✦</text>
              <text x="136" y="292" fill="#d4a843" fontSize="9" opacity="0.4">✦</text>
              <text x="334" y="276" fill="#b8922e" fontSize="13" opacity="0.5">✦</text>
              {/* Equal sign */}
              <rect x="214" y="408" width="52" height="5" rx="2.5" fill="url(#crownLG)" opacity="0.6" />
              <rect x="214" y="422" width="52" height="5" rx="2.5" fill="url(#crownLG)" opacity="0.6" />
            </g>

            {/* Orbiting dots */}
            <g style={{ transformOrigin: "240px 240px", animation: "orbit-a 10s linear infinite" }}>
              <circle cx="240" cy="118" r="5.5" fill="#b8922e" opacity="0.9" />
            </g>
            <g style={{ transformOrigin: "240px 240px", animation: "orbit-b 15s linear infinite" }}>
              <text x="234" y="86" fill="#2a9d8f" fontSize="13" opacity="0.65">♀</text>
            </g>
            <g style={{ transformOrigin: "240px 240px", animation: "orbit-c 20s linear infinite reverse" }}>
              <circle cx="240" cy="48" r="4" fill="#d4a843" opacity="0.65" />
            </g>
          </svg>
        </div>
      </section>

      {/* ════════════════════════════════════════
                      STATS
      ════════════════════════════════════════ */}
      <section style={{
        padding: "96px 8%",
        background: "#0f1923",
        position: "relative", overflow: "hidden",
      }}>
        {/* Subtle teal glow center */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(42,157,143,0.06) 0%, transparent 70%)",
        }} />

        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <div className="sans" style={{
            fontSize: 10, letterSpacing: 5, color: "#b8922e",
            fontWeight: 400, textTransform: "uppercase", marginBottom: 16,
          }}>The Reality We Must Change</div>
          <h2 className="serif" style={{ fontSize: "clamp(28px,3.5vw,48px)", color: "white", fontWeight: 400 }}>
            The Numbers <em className="shimmer" style={{ fontStyle: "italic" }}>Speak</em>
          </h2>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4,1fr)",
          maxWidth: 1040, margin: "0 auto",
        }}>
          {STATS.map((s, i) => (
            <div key={i} style={{
              padding: "48px 24px", textAlign: "center",
              borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
              position: "relative",
            }}>
              {/* Top accent dot */}
              <div style={{
                width: 4, height: 4, borderRadius: "50%",
                background: i % 2 === 0 ? "#b8922e" : "#2a9d8f",
                margin: "0 auto 24px",
              }} />
              <div className="serif shimmer" style={{
                fontSize: "clamp(32px,4vw,48px)", fontWeight: 400, lineHeight: 1, marginBottom: 12,
              }}>{s.value}</div>
              <div className="sans" style={{
                fontSize: 11, letterSpacing: 1,
                color: "rgba(255,255,255,0.38)", fontWeight: 300, lineHeight: 1.7,
              }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════
                    MANIFESTO
════════════════════════════════════════ */}
      <section style={{
        padding: "110px 8%",
        background: "#f8f7f4",
        display: "flex",
        alignItems: "center",
        gap: "10%",
        position: "relative",
      }}>

        {/* Left: illustration */}
        <div style={{ flex: 1, minHeight: 420, position: "relative" }}>


          {/* Future Planner Button */}
          <button
            onClick={() => navigate("/future-planner")}
            className="future-btn"
            style={{
              position: "absolute",
              top: "-10px",
              left: "0",
              zIndex: 2,

              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",

              background: "black",
              color: "white",
              bordercolor: "rgba(154,127,51,0.927)",
              boxshadow: "0 6px 20px rgba(184,146,46,0.2)",

              border: "1px solid #c4b5fd",

              width: "25vw",
              heigh: "6vw",
              padding: "12px 22px",
              borderRadius: "0px",
              cursor: "pointer",
              fontSize: "21px",
              fontWeight: 600,

              boxShadow: "0px 10px 14px #black",

              transition: "all 0.2s ease",
            }}
          >
            Future Planner
          </button>

          <svg viewBox="0 0 380 460" style={{
            width: "100%",
            maxWidth: 340,
            filter: "drop-shadow(0 8px 32px rgba(15,25,35,0.08))",
            marginTop: "50px"
          }}>
            <defs>
              <linearGradient id="scG" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#b8922e" />
                <stop offset="100%" stopColor="#2a9d8f" />
              </linearGradient>
            </defs>

            <circle cx="190" cy="230" r="175" fill="none" stroke="rgba(184,146,46,0.08)" strokeWidth="1" />
            <rect x="188" y="72" width="4" height="248" rx="2" fill="url(#scG)" opacity="0.55" />
            <rect x="72" y="128" width="236" height="3" rx="1.5" fill="url(#scG)" opacity="0.65" />

            <circle cx="110" cy="258" r="46" fill="none" stroke="url(#scG)" strokeWidth="1.5" opacity="0.65" />
            <text x="97" y="271" fill="url(#scG)" fontSize="32" fontFamily="Georgia" opacity="0.85">♀</text>
            <line x1="110" y1="131" x2="110" y2="212" stroke="url(#scG)" strokeWidth="1.2" opacity="0.55" />

            <circle cx="270" cy="258" r="46" fill="none" stroke="rgba(74,127,165,0.55)" strokeWidth="1.5" opacity="0.65" />
            <text x="257" y="271" fill="rgba(74,127,165,0.85)" fontSize="32" fontFamily="Georgia">♂</text>
            <line x1="270" y1="131" x2="270" y2="212" stroke="rgba(74,127,165,0.55)" strokeWidth="1.2" opacity="0.55" />

            <rect x="158" y="356" width="64" height="5" rx="2.5" fill="url(#scG)" opacity="0.7" />
            <rect x="158" y="370" width="64" height="5" rx="2.5" fill="url(#scG)" opacity="0.7" />

            <text x="42" y="90" fill="#b8922e" fontSize="14" opacity="0.45">✦</text>
            <text x="310" y="72" fill="#2a9d8f" fontSize="11" opacity="0.4">✦</text>
            <text x="22" y="330" fill="#d4a843" fontSize="9" opacity="0.35">✦</text>
            <text x="332" y="364" fill="#b8922e" fontSize="13" opacity="0.4">✦</text>
          </svg>
        </div>

        {/* Right: text (UNCHANGED) */}
        <div style={{ flex: 1.4 }}>
          <div className="sans" style={{
            fontSize: 10,
            letterSpacing: 5,
            color: "#b8922e",
            fontWeight: 400,
            textTransform: "uppercase",
            marginBottom: 24,
          }}>
            Our Manifesto
          </div>

          <h2 className="serif" style={{
            fontSize: "clamp(28px,3.8vw,52px)",
            fontWeight: 400,
            lineHeight: 1.15,
            color: "#0f1923",
            marginBottom: 24,
          }}>
            Every girl born today<br />
            <em className="shimmer" style={{ fontStyle: "italic" }}>
              deserves a celebration,
            </em><br />
            not a condemnation.
          </h2>

          <div style={{
            width: 48,
            height: 1,
            background: "#b8922e",
            marginBottom: 28,
            opacity: 0.6
          }} />

          {[
            "In a world where the gender of a child should never determine their worth, we fight to dismantle centuries of bias — in homes, in boardrooms, in laws, and in hearts.",
            "Equal opportunity isn't charity. It's the foundation of civilization's next great leap forward.",
          ].map((t, i) => (
            <p key={i} className="sans" style={{
              fontSize: 14,
              fontWeight: 300,
              lineHeight: 1.9,
              color: "rgba(15,25,35,0.55)",
              marginBottom: 18,
            }}>
              {t}
            </p>
          ))}

          <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              "Advocate for equal birth rights",
              "Empower women in leadership",
              "Change cultural narratives"
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  flexShrink: 0,
                  background: i === 1 ? "#2a9d8f" : "#b8922e",
                }} />
                <span className="sans" style={{
                  fontSize: 13,
                  color: "rgba(15,25,35,0.65)",
                  fontWeight: 300,
                  letterSpacing: "0.2px",
                }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
                      QUOTE BANNER
      ════════════════════════════════════════ */}
      <section style={{
        padding: "100px 8%",
        background: "#0f1923",
        textAlign: "center",
        position: "relative", overflow: "hidden",
      }}>
        {/* Very faint grid */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }} />
        {/* Side accent lines */}
        <div style={{ position: "absolute", left: "8%", top: "50%", transform: "translateY(-50%)", width: 2, height: 64, background: "linear-gradient(to bottom, transparent, #2a9d8f, transparent)" }} />
        <div style={{ position: "absolute", right: "8%", top: "50%", transform: "translateY(-50%)", width: 2, height: 64, background: "linear-gradient(to bottom, transparent, #b8922e, transparent)" }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="serif" style={{ fontSize: 52, color: "rgba(184,146,46,0.2)", lineHeight: 0.6, marginBottom: 20 }}>"</div>
          <blockquote className="serif" style={{
            fontSize: "clamp(20px,3vw,42px)", fontWeight: 400, fontStyle: "italic",
            color: "white", lineHeight: 1.4,
            maxWidth: 780, margin: "0 auto 24px",
            animation: "quote-glow 6s ease-in-out infinite",
          }}>
            There is no tool for development more effective than the empowerment of women.
          </blockquote>
          <div className="sans" style={{ fontSize: 11, letterSpacing: 3, color: "rgba(255,255,255,0.28)", fontWeight: 300 }}>
            — Kofi Annan, UN Secretary-General
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
                    THREE PILLARS
      ════════════════════════════════════════ */}
      <section style={{ padding: "96px 8%", background: "#f8f7f4" }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <div className="sans" style={{
            fontSize: 10, letterSpacing: 5, color: "#b8922e",
            fontWeight: 400, textTransform: "uppercase", marginBottom: 16,
          }}>What We Do</div>
          <h2 className="serif" style={{ fontSize: "clamp(28px,3.5vw,46px)", color: "#0f1923", fontWeight: 400 }}>
            Three Pillars of <em className="shimmer" style={{ fontStyle: "italic" }}>Change</em>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, maxWidth: 1100, margin: "0 auto" }}>
          {[
            {
              num: "01", title: "Girl Child Valuation", accent: "#b8922e",
              body: "Transforming cultural narratives around girl births through education, advocacy, and community programs that celebrate every new life equally."
            },
            {
              num: "02", title: "Equal Opportunity", accent: "#2a9d8f",
              body: "Breaking systemic barriers in education, employment, and leadership so women can access the same opportunities as their male counterparts."
            },
            {
              num: "03", title: "Women in Power", accent: "#4a7fa5",
              body: "Amplifying women's voices in decision-making at every level — from village councils to global boardrooms and political leadership."
            },
          ].map((p, i) => (
            <div key={i} className="pillar-card" style={{
              padding: "52px 36px",
              background: "#fff",
              border: "1px solid rgba(15,25,35,0.06)",
              borderRadius: 4, position: "relative",
            }}>
              {/* Top accent */}
              <div style={{
                position: "absolute", top: 0, left: 36, right: 36, height: 2,
                background: p.accent, borderRadius: "0 0 2px 2px", opacity: 0.7,
              }} />
              <div className="sans" style={{
                fontSize: 10, letterSpacing: 4, color: p.accent,
                fontWeight: 400, marginBottom: 24,
              }}>{p.num}</div>
              <h3 className="serif" style={{
                fontSize: 24, fontWeight: 400, color: "#0f1923",
                marginBottom: 16, lineHeight: 1.25,
              }}>{p.title}</h3>
              <p className="sans" style={{
                fontSize: 13, fontWeight: 300, lineHeight: 1.85,
                color: "rgba(15,25,35,0.52)",
              }}>{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════
                      FINAL CTA
      ════════════════════════════════════════ */}
      <section style={{
        padding: "120px 8%",
        background: "#0f1923",
        textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        {/* Rings */}
        {[520, 720].map((s, i) => (
          <div key={i} style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: s, height: s, borderRadius: "50%",
            border: `1px solid rgba(${i === 0 ? "184,146,46" : "42,157,143"}, ${i === 0 ? 0.08 : 0.05})`,
          }} />
        ))}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(184,146,46,0.05) 0%, transparent 70%)",
        }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="sans" style={{
            fontSize: 10, letterSpacing: 5, color: "#b8922e",
            fontWeight: 400, textTransform: "uppercase", marginBottom: 24,
          }}>Join The Movement</div>

          <h2 className="serif" style={{
            fontSize: "clamp(32px,5.5vw,68px)", fontWeight: 400,
            lineHeight: 1.1, color: "white", marginBottom: 20,
          }}>
            Be The Change<br />
            <em className="shimmer" style={{ fontStyle: "italic" }}>She Deserves.</em>
          </h2>

          <p className="sans" style={{
            fontSize: 14, fontWeight: 300, lineHeight: 1.9,
            color: "rgba(255,255,255,0.4)",
            maxWidth: 440, margin: "0 auto 48px",
          }}>
            Together, we can bridge every gap — in opportunity, in respect, and in the simple dignity of being born equal.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <button
              className="btn-gold"
              onClick={() => navigate("/helpbox")}
            >
              Request Help
            </button>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{
        padding: "32px 8%",
        borderTop: "1px solid rgba(15,25,35,0.07)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: "#f8f7f4", flexWrap: "wrap", gap: 16,
      }}>
        <div className="sans" style={{ fontSize: 11, color: "rgba(15,25,35,0.3)", fontWeight: 300 }}>
          © 2025 SHIELD. All rights reserved.
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {[0.3, 0.6, 0.9].map((o, i) => (
            <span key={i} style={{ color: `rgba(184,146,46,${o})`, fontSize: 13 }}>♀</span>
          ))}
          <span className="sans" style={{
            fontSize: 9, letterSpacing: 3,
            color: "rgba(184,146,46,0.5)", fontWeight: 300, marginLeft: 8,
          }}>For Every Girl Born Today</span>
        </div>
      </footer>
    </div>
  );
}
