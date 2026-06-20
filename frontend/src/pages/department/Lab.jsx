import { useState } from "react";
import {
  FileText, Flame, ShieldCheck, Gauge, Users, Wrench,
  ArrowRight,
} from "lucide-react";
import TechnicalDataSheet from "./lab/TechnicalDataSheet";

const LAB_SECTIONS = [
  {
    key: "tds",
    title: "Technical Data Sheet",
    description: "Material specifications, chemical properties and standard reference data for lab processes.",
    icon: FileText,
    color: "#d4a017",
    bg: "var(--gold-dim)",
    border: "var(--gold-line)",
  },
  {
    key: "fireAssay",
    title: "Fire Assay Report",
    description: "Gold and silver fire assay results, cupellation data and lot-wise purity records.",
    icon: Flame,
    color: "#f97316",
    bg: "rgba(249,115,22,0.08)",
    border: "rgba(249,115,22,0.25)",
  },
  {
    key: "qms",
    title: "Quality Management System",
    description: "QMS documentation, audit trails, non-conformance reports and standard operating procedures.",
    icon: ShieldCheck,
    color: "#34d399",
    bg: "rgba(52,211,153,0.08)",
    border: "rgba(52,211,153,0.25)",
  },
  {
    key: "calibration",
    title: "Equipment Calibration",
    description: "Calibration schedules, certificates and deviation logs for all lab instruments.",
    icon: Gauge,
    color: "#60a5fa",
    bg: "rgba(96,165,250,0.08)",
    border: "rgba(96,165,250,0.25)",
  },
  {
    key: "crm",
    title: "CRM",
    description: "Certified Reference Materials inventory, traceability records and usage history.",
    icon: Users,
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.08)",
    border: "rgba(167,139,250,0.25)",
  },
  {
    key: "equipment",
    title: "Equipments & Machinery",
    description: "Lab equipment register, maintenance records and service history for all instruments.",
    icon: Wrench,
    color: "#94a3b8",
    bg: "rgba(148,163,184,0.08)",
    border: "rgba(148,163,184,0.25)",
  },
];

export default function Lab() {
  const [active, setActive] = useState(null);

  if (active === "tds") {
    return <TechnicalDataSheet onBack={() => setActive(null)} />;
  }

  if (active) {
    const section = LAB_SECTIONS.find(s => s.key === active);
    const Icon = section.icon;
    return (
      <div className="p-6 md:p-10">
        <button
          onClick={() => setActive(null)}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            fontSize: 13, color: "var(--muted)", marginBottom: 24,
            background: "none", border: "none", cursor: "pointer", padding: 0,
          }}
        >
          ← Back to Lab
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: section.bg, border: `1px solid ${section.border}`,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <Icon size={20} style={{ color: section.color }} />
          </div>
          <div>
            <div className="font-display" style={{ fontSize: 13, letterSpacing: "0.14em", color: "var(--gold)" }}>LAB</div>
            <h1 className="font-display" style={{ fontWeight: 700, fontSize: 26, marginTop: 2 }}>{section.title}</h1>
          </div>
        </div>
        <p style={{ color: "var(--muted)", marginTop: 10, fontSize: 13.5, maxWidth: 560, lineHeight: 1.6 }}>
          {section.description}
        </p>
        <div
          className="mt-8 rounded-xl"
          style={{
            background: "var(--panel)", border: "1px dashed var(--line)",
            padding: 40, textAlign: "center", color: "var(--muted-2)", fontSize: 13,
          }}
        >
          Content area for "{section.title}" — functionality coming soon.
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10">
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div className="font-display" style={{ fontSize: 13, letterSpacing: "0.14em", color: "var(--gold)" }}>
          DEPARTMENT
        </div>
        <h1 className="font-display" style={{ fontWeight: 700, fontSize: 28, marginTop: 4 }}>Lab</h1>
        <p style={{ color: "var(--muted)", marginTop: 6, fontSize: 13.5 }}>
          Laboratory management — assay reports, quality systems, calibration and equipment records.
        </p>
      </div>

      {/* Cards grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 18 }}>
        {LAB_SECTIONS.map(section => {
          const Icon = section.icon;
          return (
            <button
              key={section.key}
              onClick={() => setActive(section.key)}
              style={{
                background: "var(--panel)", border: "1px solid var(--line)",
                borderRadius: 14, padding: 22, cursor: "pointer", textAlign: "left",
                display: "flex", flexDirection: "column", gap: 14,
                transition: "border-color 0.2s, box-shadow 0.2s, transform 0.18s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = section.border;
                e.currentTarget.style.boxShadow = `0 0 24px ${section.bg}`;
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "var(--line)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Icon + arrow */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: section.bg, border: `1px solid ${section.border}`,
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <Icon size={20} style={{ color: section.color }} />
                </div>
                <ArrowRight size={15} style={{ color: "var(--muted-2)", marginTop: 4, flexShrink: 0 }} />
              </div>

              {/* Title + description */}
              <div>
                <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 6 }}>{section.title}</div>
                <div style={{ fontSize: 12.5, color: "var(--muted)", lineHeight: 1.55 }}>
                  {section.description}
                </div>
              </div>

              {/* Bottom accent line */}
              <div style={{
                height: 3, borderRadius: 99, marginTop: 2,
                background: `linear-gradient(90deg, ${section.color}55 0%, transparent 100%)`,
              }} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
