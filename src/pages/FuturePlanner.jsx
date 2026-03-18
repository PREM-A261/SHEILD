
import { useState } from "react";

// ── DATA ──────────────────────────────────────────────────────────────────────
const STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa",
  "Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala",
  "Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland",
  "Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura",
  "Uttar Pradesh","Uttarakhand","West Bengal","Delhi","Jammu & Kashmir",
];

const PLAN_TYPES = [
  { id: "birth_to_marriage", label: "Birth → Marriage", icon: "🌸", range: "Age 0–25" },
  { id: "basic_education",   label: "Basic Education",  icon: "📚", range: "Age 5–14" },
  { id: "higher_education",  label: "Higher Education", icon: "🎓", range: "Age 14–25" },
  { id: "career_growth",     label: "Career & Growth",  icon: "💼", range: "Age 18–40" },
  { id: "lifetime",          label: "Lifetime Plan",    icon: "✨", range: "Age 0–60+" },
];

const SCHEMES = {
  female: {
    birth_to_marriage: [
      { name: "Beti Bachao Beti Padhao", type: "Central", desc: "Welfare of the girl child — survival, protection, and education.", link: "https://wcd.nic.in/bbbp-schemes" },
      { name: "Sukanya Samriddhi Yojana", type: "Central", desc: "High-interest savings scheme for girl child (age 0–10).", link: "https://www.india.gov.in/sukanya-samriddhi-account" },
      { name: "Balika Samridhi Yojana", type: "Central", desc: "Cash incentive for BPL girls at birth and on completing each level of education." },
      { name: "Kishori Shakti Yojana", type: "Central", desc: "Empowers adolescent girls (11–18 yrs) in nutrition, health, and life skills." },
      { name: "Rajshri Yojana (Rajasthan)", type: "State", desc: "₹50,000 in stages for Rajasthan girls from birth to Class 12." },
    ],
    basic_education: [
      { name: "Samagra Shiksha Abhiyan", type: "Central", desc: "Free & compulsory elementary education for all children 6–14.", link: "https://samagra.education.gov.in" },
      { name: "Kasturba Gandhi Balika Vidyalaya", type: "Central", desc: "Residential schools for girls in educationally backward blocks." },
      { name: "Mid-Day Meal Scheme", type: "Central", desc: "Free nutritious meals to encourage school enrolment and attendance." },
      { name: "National Scholarship Portal", type: "Central", desc: "Multiple scholarships for SC/ST/OBC/minority girl students.", link: "https://scholarships.gov.in" },
    ],
    higher_education: [
      { name: "Pragati Scholarship (AICTE)", type: "Central", desc: "₹50,000/yr for girl students pursuing technical education." },
      { name: "PM Vidya Lakshmi Scheme", type: "Central", desc: "Education loans at subsidised interest rates.", link: "https://www.vidyalakshmi.co.in" },
      { name: "Post-Matric Scholarship", type: "Central", desc: "For SC/ST girls pursuing post-matric education." },
    ],
    career_growth: [
      { name: "Skill India Mission", type: "Central", desc: "Free vocational training across 40+ sectors.", link: "https://www.skillindia.gov.in" },
      { name: "Stand Up India", type: "Central", desc: "Bank loans ₹10L–₹1Cr for women entrepreneurs." },
      { name: "PM Mudra Yojana", type: "Central", desc: "Microfinance up to ₹10L for women-led micro-enterprises.", link: "https://www.mudra.org.in" },
      { name: "Mahila E-Haat", type: "Central", desc: "Online marketing platform exclusively for women entrepreneurs." },
    ],
    lifetime: [
      { name: "PM Matru Vandana Yojana", type: "Central", desc: "₹5,000 maternity benefit for the first live birth." },
      { name: "Janani Suraksha Yojana", type: "Central", desc: "Cash incentive for institutional delivery under safe motherhood." },
      { name: "PM Jan Dhan Yojana", type: "Central", desc: "Financial inclusion — bank account + RuPay card + accident insurance." },
      { name: "Widow / Destitute Pension (NSAP)", type: "Central", desc: "Monthly pension for widows in BPL category under national social assistance." },
    ],
  },
  male: {
    birth_to_marriage: [
      { name: "Bal Shakti Puraskar", type: "Central", desc: "National recognition for exceptional children aged 5–15." },
      { name: "Rashtriya Bal Swasthya Karyakram", type: "Central", desc: "Child health screening and early intervention services (0–18 yrs)." },
      { name: "PM Poshan Shakti Nirman", type: "Central", desc: "Nutrition support and supplementary feeding for children 6 months–6 years." },
    ],
    basic_education: [
      { name: "Samagra Shiksha Abhiyan", type: "Central", desc: "Free & compulsory elementary education for all children 6–14.", link: "https://samagra.education.gov.in" },
      { name: "National Means-cum-Merit Scholarship", type: "Central", desc: "₹12,000/yr for meritorious economically weaker section students from Class 9." },
      { name: "Mid-Day Meal Scheme", type: "Central", desc: "Free nutritious meals to improve enrolment and reduce dropout rates." },
    ],
    higher_education: [
      { name: "PM Vidya Lakshmi Scheme", type: "Central", desc: "Education loans at subsidised interest rates.", link: "https://www.vidyalakshmi.co.in" },
      { name: "Post-Matric Scholarship SC/ST", type: "Central", desc: "Financial support for SC/ST boys in post-matric education." },
      { name: "Central Sector Scholarship", type: "Central", desc: "Merit-based scholarships for students in top 20th percentile." },
    ],
    career_growth: [
      { name: "Skill India Mission", type: "Central", desc: "Free vocational training across 40+ sectors.", link: "https://www.skillindia.gov.in" },
      { name: "PM Mudra Yojana", type: "Central", desc: "Microfinance loans for micro-entrepreneurs.", link: "https://www.mudra.org.in" },
      { name: "Startup India", type: "Central", desc: "Recognition, tax benefits, and funding support for startups.", link: "https://www.startupindia.gov.in" },
      { name: "PM SVANidhi", type: "Central", desc: "Micro-credit for street vendors to formalise livelihoods." },
    ],
    lifetime: [
      { name: "PM Jan Dhan Yojana", type: "Central", desc: "Financial inclusion — zero-balance account + insurance + credit access." },
      { name: "Atal Pension Yojana", type: "Central", desc: "Guaranteed pension ₹1,000–₹5,000/month after age 60." },
      { name: "Ayushman Bharat PM-JAY", type: "Central", desc: "Health insurance cover of ₹5L per family per year.", link: "https://pmjay.gov.in" },
    ],
  },
};

const NGOS = [
  { name: "CRY – Child Rights and You", focus: "Child rights, education & protection", website: "https://www.cry.org", phone: "1800-103-1979" },
  { name: "Pratham", focus: "Quality education for underprivileged children", website: "https://www.pratham.org" },
  { name: "Nanhi Kali", focus: "Education support for underprivileged girls", website: "https://www.nanhikali.org" },
  { name: "Smile Foundation", focus: "Education, health & women empowerment", website: "https://www.smilefoundationindia.org" },
  { name: "SEWA – Self-Employed Women's Association", focus: "Women's labour rights & self-employment", website: "https://www.sewa.org" },
  { name: "Educate Girls", focus: "Girls' enrolment & retention in schools", website: "https://www.educategirls.ngo" },
  { name: "Magic Bus", focus: "Youth empowerment & sustainable livelihoods", website: "https://www.magicbus.org" },
  { name: "Ibtada", focus: "Women's rights & education in rural Rajasthan", website: "https://www.ibtada.org" },
];

const OPPORTUNITIES = {
  female: [
    "🏫 Apply to Navodaya / Sainik schools — fully funded residential education",
    "💻 Free coding programs: GirlScript, Women Who Code India, Google Women Techmakers",
    "🏆 CBSE & State Board Merit Scholarships for academic excellence",
    "🌐 UN Women India — internships & fellowship programs",
    "🏥 NHM ANM / Staff Nurse training — govt-sponsored healthcare careers",
    "🎨 NIFT / NID design admissions with reserved women's quota",
    "🌾 Agriculture Technology Mission — women farmer training & subsidies",
    "⚖️ Free Legal Aid for women — District Legal Services Authority (DLSA)",
  ],
  male: [
    "🏫 Navodaya / Sainik schools — fully funded residential education",
    "💻 PM eVidya — free online courses & digital skilling",
    "🏋️ Sports Authority of India (SAI) — national sports training centres",
    "🚜 Agriculture subsidies & Kisan Credit Card for farm families",
    "🛡️ NCC / NSS — leadership training & priority in defence recruitment",
    "🔧 ITI & Polytechnic — government-funded technical trade courses",
    "🌐 Digital India Internship Scheme — tech exposure for youth",
    "⚖️ Free Legal Aid — District Legal Services Authority (DLSA)",
  ],
};

export default function GenderGapPlanner() {
  const [step, setStep]     = useState(1);
  const [form, setForm]     = useState({ gender:"", age:"", state:"", district:"", education:"", financialCondition:"", planType:"" });
  const [result, setResult] = useState(null);

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const generate = () => {
    const schemes = SCHEMES[form.gender]?.[form.planType] ?? [];
    const opps    = OPPORTUNITIES[form.gender] ?? [];
    setResult({ schemes, opps });
    setStep(4);
  };

  const reset = () => {
    setStep(1);
    setForm({ gender:"", age:"", state:"", district:"", education:"", financialCondition:"", planType:"" });
    setResult(null);
  };

  const canNext1 = form.gender && form.age && form.state;
  const canNext2 = form.education && form.financialCondition;
  const canNext3 = form.planType;

return (
  <div style={S.fullPageWrapper}>
    <div style={S.fullPageContainer}>

      {/* Header */}
      <div style={S.header}>
        <div>
          <div style={S.headerBadge}>🌏 INDIA · GENDER GAP INITIATIVE</div>
          <h1 style={S.headerTitle}>Future Planner</h1>
          <p style={S.headerSub}>
            Personalised schemes, NGOs & opportunities — tailored just for you.
          </p>
        </div>
      </div>

      {/* Progress */}
      {step < 4 && (
        <div style={S.progressWrap}>
          {["Profile", "Background", "Goal", "Results"].map((label, i) => (
            <div key={label} style={S.progressItem}>
              <div
                style={{
                  ...S.progressDot,
                  background:
                    step > i
                      ? "#7c3aed"
                      : step === i + 1
                      ? "#a78bfa"
                      : "#e5e7eb",
                  color: step >= i + 1 ? "#ffffff" : "#374151",
                }}
              >
                {step > i ? "✓" : i + 1}
              </div>
              <span
                style={{
                  ...S.progressLabel,
                  color: step >= i + 1 ? "#111827" : "#9ca3af",
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Body */}
      <div style={S.body}>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <h2 style={S.stepTitle}>👤 Tell us about yourself</h2>

            <Label>Gender</Label>
            <div style={{ display: "flex", gap: 14 }}>
              {[{ v: "female", icon: "♀", l: "Female / Girl" }, { v: "male", icon: "♂", l: "Male / Boy" }].map(g => (
                <button
                  key={g.v}
                  style={{
                    ...S.genderCard,
                    border: form.gender === g.v ? "2px solid #7c3aed" : "2px solid #e5e7eb",
                    background: form.gender === g.v ? "#ede9fe" : "#ffffff",
                  }}
                  onClick={() => update("gender", g.v)}
                >
                  <span style={{ fontSize: 34 }}>{g.icon}</span>
                  <span style={{ color: "#111827", fontWeight: 700 }}>{g.l}</span>
                </button>
              ))}
            </div>

            <Label>Age</Label>
            <input
              style={S.input}
              type="number"
              value={form.age}
              onChange={e => update("age", e.target.value)}
            />

            <Label>State</Label>
            <select
              style={S.input}
              value={form.state}
              onChange={e => update("state", e.target.value)}
            >
              <option value="">Select state</option>
              {STATES.map(s => <option key={s}>{s}</option>)}
            </select>

            <button
              style={{ ...S.primaryBtn, opacity: canNext1 ? 1 : 0.4, marginTop: 30 }}
              disabled={!canNext1}
              onClick={() => setStep(2)}
            >
              Continue →
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div style={S.body}>
            <h2 style={S.stepTitle}>🎓 Background & Situation</h2>

            <Label>Current Education Status</Label>
            <div style={S.chipRow}>
              {["Not in school", "Primary (1–5)", "Middle (6–8)", "Secondary (9–10)", "Senior Secondary (11–12)", "Graduate", "Post-Graduate", "Completed / Working"].map(e => (
                <Chip key={e} active={form.education === e} color="purple" onClick={() => update("education", e)}>
                  {e}
                </Chip>
              ))}
            </div>

            <Label>Financial Condition</Label>
            <div style={S.chipRow}>
              {[
                { v: "BPL", l: "BPL (Below Poverty Line)" },
                { v: "lower_middle", l: "Lower Middle Class" },
                { v: "middle", l: "Middle Class" },
                { v: "upper", l: "Upper / Well-off" },
              ].map(f => (
                <Chip key={f.v} active={form.financialCondition === f.v} color="blue" onClick={() => update("financialCondition", f.v)}>
                  {f.l}
                </Chip>
              ))}
            </div>

            <div style={S.navRow}>
              <button style={S.ghostBtn} onClick={() => setStep(1)}>← Back</button>
              <button
                style={{ ...S.primaryBtn, opacity: canNext2 ? 1 : 0.38 }}
                disabled={!canNext2}
                onClick={() => setStep(3)}
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div style={S.body}>
            <h2 style={S.stepTitle}>🗺️ Choose Your Plan</h2>
            <p style={{ color: "#6b7280", fontSize: 13, marginTop: -14, marginBottom: 20 }}>
              Select the life stage you want a personalised roadmap for
            </p>

            <div style={S.planGrid}>
              {PLAN_TYPES.map(p => (
                <button
                  key={p.id}
                  style={{
                    ...S.planCard,
                    border: form.planType === p.id ? "2px solid #7c3aed" : "2px solid #e5e7eb",
                    background: form.planType === p.id ? "#ede9fe" : "#ffffff",
                  }}
                  onClick={() => update("planType", p.id)}
                >
                  <span style={{ fontSize: 32 }}>{p.icon}</span>
                  <span style={{ color: "#111827", fontWeight: 700, fontSize: 13 }}>{p.label}</span>
                  <span style={{ color: "#6b7280", fontSize: 11 }}>{p.range}</span>
                </button>
              ))}
            </div>

            <div style={S.navRow}>
              <button style={S.ghostBtn} onClick={() => setStep(2)}>← Back</button>
              <button
                style={{ ...S.primaryBtn, opacity: canNext3 ? 1 : 0.38 }}
                disabled={!canNext3}
                onClick={generate}
              >
                Generate My Plan ✨
              </button>
            </div>
          </div>
        )}

        {/* STEP 4 */}
        {step === 4 && result && (
          <div style={S.body}>

            <div style={S.summaryStrip}>
              {[
                form.gender === "female" ? "♀ Female" : "♂ Male",
                `Age ${form.age}`,
                `📍 ${form.state}${form.district ? `, ${form.district}` : ""}`,
                form.education,
                form.financialCondition?.replace("_", " "),
                `🗺️ ${PLAN_TYPES.find(p => p.id === form.planType)?.label}`,
              ].map((t, i) => (
                <span key={i} style={S.summaryChip}>{t}</span>
              ))}
            </div>

            <SectionTitle>🏛️ Government Schemes For You</SectionTitle>

            {result.schemes.length > 0 ? (
              result.schemes.map((s, i) => (
                <div key={i} style={S.card}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginBottom: 6 }}>
                    <span style={{ color: "#111827", fontWeight: 700, fontSize: 14 }}>{s.name}</span>
                    <span
                      style={{
                        ...S.typeBadge,
                        background: s.type === "Central" ? "#ede9fe" : "#e0f2fe",
                        color: s.type === "Central" ? "#5b21b6" : "#075985",
                      }}
                    >
                      {s.type}
                    </span>
                  </div>
                  <p style={{ color: "#4b5563", fontSize: 13, margin: 0, lineHeight: 1.65 }}>
                    {s.desc}
                  </p>
                  {s.link && (
                    <a href={s.link} target="_blank" rel="noopener noreferrer" style={S.link}>
                      Apply / Learn More →
                    </a>
                  )}
                </div>
              ))
            ) : (
              <p style={{ color: "#6b7280", fontSize: 13 }}>
                No specific schemes listed for this combination.
              </p>
            )}

            <SectionTitle>🚀 Opportunities Available</SectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 28 }}>
              {result.opps.map((o, i) => (
                <div key={i} style={S.oppRow}>{o}</div>
              ))}
            </div>

            <SectionTitle>🤝 NGOs That Can Help</SectionTitle>
            <div style={S.ngoGrid}>
              {NGOS.map((n, i) => (
                <div key={i} style={S.ngoCard}>
                  <div style={{ color: "#111827", fontWeight: 700, fontSize: 13, marginBottom: 3 }}>{n.name}</div>
                  <div style={{ color: "#6b7280", fontSize: 12, marginBottom: 6 }}>{n.focus}</div>
                  {n.website && (
                    <a href={n.website} target="_blank" rel="noopener noreferrer" style={S.link}>
                      {n.website.replace("https://", "")}
                    </a>
                  )}
                  {n.phone && (
                    <div style={{ color: "#059669", fontSize: 11, marginTop: 4 }}>
                      📞 {n.phone}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div style={S.valueBox}>
              <h3 style={{ color: "#b45309", margin: "0 0 8px", fontSize: 15 }}>
                💛 Every Child Has Equal Value
              </h3>
              <p style={{ color: "#374151", fontSize: 13, lineHeight: 1.75, margin: 0 }}>
                Whether a <strong style={{ color: "#be185d" }}>girl child</strong> or a{" "}
                <strong style={{ color: "#1d4ed8" }}>boy child</strong> — every life deserves equal opportunity.
                Together, we bridge the gap. 🌏
              </p>
            </div>

            <button style={{ ...S.primaryBtn, marginTop: 24 }} onClick={reset}>
              ← Start a New Plan
            </button>

          </div>
        )}

      </div>
    </div>
  </div>
);
}

// ── SMALL SUB-COMPONENTS ──────────────────────────────────────────────────────

function Label({ children }) {
  return (
    <label
      style={{
        display: "block",
        color: "#374151",              // dark gray instead of white
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 1.2,
        textTransform: "uppercase",
        margin: "20px 0 8px",
      }}
    >
      {children}
    </label>
  );
}

function SectionTitle({ children }) {
  return (
    <h3
      style={{
        color: "#7c3aed",              // purple but visible on white
        fontSize: 16,
        fontWeight: 700,
        letterSpacing: 0.4,
        margin: "0 0 14px",
        fontFamily: "'Outfit',sans-serif",
      }}
    >
      {children}
    </h3>
  );
}

function Chip({ active, color, onClick, children }) {

  const activeBg =
    color === "purple" ? "#ede9fe" : "#e0f2fe";

  const activeBorder =
    color === "purple" ? "1.5px solid #7c3aed" : "1.5px solid #0284c7";

  const activeText =
    color === "purple" ? "#5b21b6" : "#075985";

  return (
    <button
      onClick={onClick}
      style={{
        background: active ? activeBg : "#f3f4f6",
        border: active ? activeBorder : "1.5px solid #d1d5db",
        borderRadius: 99,
        color: active ? activeText : "#374151",
        fontSize: 13,
        fontWeight: 600,
        padding: "8px 16px",
        cursor: "pointer",
        transition: "all 0.18s ease",
        fontFamily: "'Outfit',sans-serif",
      }}
    >
      {children}
    </button>
  );
}

// ── STYLES ────────────────────────────────────────────────────────────────────
const FONT = "'Outfit','Segoe UI',sans-serif";

const S = {
  /* Container */
  fullPageWrapper: {
  marginTop: "45px",   // ✅ camelCase
  minHeight: "100vh",
  background: "#f9fafb",
  padding: "60px 20px",
  display: "flex",
  justifyContent: "center",
},

  fullPageContainer: {
    width: "100%",
    maxWidth: 900,
    borderRadius: 20,
    background: "#ffffff",
    boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
    overflow: "hidden",
    fontFamily: FONT,
  },

  /* Header */
  header: {
    background: "linear-gradient(135deg,#ede9fe,#fce7f3)",
    borderBottom: "1px solid #e5e7eb",
    padding: "30px 34px",
  },

  headerBadge: {
    color: "#7c3aed",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 2,
    marginBottom: 7,
  },

  headerTitle: {
    margin: "0 0 4px",
    fontSize: 28,
    fontWeight: 900,
    color: "#111827",
  },

  headerSub: {
    color: "#6b7280",
    fontSize: 14,
    margin: 0,
  },

  /* Progress */
  progressWrap: {
    display: "flex",
    justifyContent: "space-evenly",
    padding: "22px 34px",
    borderBottom: "1px solid #e5e7eb",
  },

  progressItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
    flex: 1,
  },

  progressDot: {
    width: 34,
    height: 34,
    borderRadius: 99,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: 13,
    background: "#e5e7eb",
    color: "#111827",
  },

  progressLabel: {
    fontSize: 11,
    fontWeight: 600,
    color: "#374151",
  },

  /* Body */
  body: {
    padding: "30px 34px",
  },

  stepTitle: {
    color: "#111827",
    fontSize: 20,
    fontWeight: 800,
    marginBottom: 20,
  },

  /* Inputs */
  input: {
    width: "100%",
    boxSizing: "border-box",
    background: "#ffffff",
    border: "1.5px solid #d1d5db",
    borderRadius: 10,
    padding: "13px 16px",
    color: "#111827",
    fontSize: 15,
    outline: "none",
    marginBottom: 12,
  },

  /* Gender Cards */
  genderCard: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "22px 12px",
    borderRadius: 14,
    cursor: "pointer",
    transition: "all 0.2s",
    border: "1.5px solid #e5e7eb",
    background: "#ffffff",
  },

  chipRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },

  /* Plan Grid */
  planGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(138px,1fr))",
    gap: 12,
    marginBottom: 12,
  },

  planCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 7,
    padding: "20px 10px",
    borderRadius: 14,
    cursor: "pointer",
    border: "1.5px solid #e5e7eb",
    background: "#ffffff",
  },

  /* Buttons */
  primaryBtn: {
    background: "linear-gradient(135deg,#7c3aed,#a855f7)",
    color: "#ffffff",
    border: "none",
    borderRadius: 10,
    padding: "14px 32px",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.2s",
  },

  ghostBtn: {
    background: "#f3f4f6",
    color: "#111827",
    border: "1px solid #d1d5db",
    borderRadius: 10,
    padding: "14px 24px",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
  },

  navRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 28,
  },

  /* Result Cards */
  summaryStrip: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 26,
    padding: 16,
    background: "#f3f4f6",
    borderRadius: 10,
  },

  summaryChip: {
    background: "#ede9fe",
    color: "#6d28d9",
    borderRadius: 99,
    padding: "5px 14px",
    fontSize: 12,
    fontWeight: 600,
  },

  card: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: "16px 18px",
    marginBottom: 12,
  },

  typeBadge: {
    borderRadius: 99,
    padding: "3px 10px",
    fontSize: 11,
    fontWeight: 700,
    background: "#e0e7ff",
    color: "#3730a3",
  },

  link: {
    display: "inline-block",
    color: "#7c3aed",
    fontSize: 13,
    marginTop: 7,
    textDecoration: "none",
    fontWeight: 600,
  },

  oppRow: {
    background: "#eff6ff",
    border: "1px solid #bfdbfe",
    borderRadius: 10,
    padding: "10px 14px",
    color: "#1e3a8a",
    fontSize: 13,
  },

  ngoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
    gap: 12,
    marginBottom: 28,
  },

  ngoCard: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: "15px 17px",
  },

  valueBox: {
    background: "#fffbeb",
    border: "1px solid #fde68a",
    borderRadius: 14,
    padding: "20px 22px",
  },
};