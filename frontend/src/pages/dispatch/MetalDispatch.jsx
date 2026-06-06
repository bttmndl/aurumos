import { useState } from "react";
import {
  SendHorizonal, PackageCheck, Truck, FlaskConical,
  Scale, Calendar, Hash, FileText, ArrowLeft, User, Layers, MapPin,
} from "lucide-react";

const MOCK_DISPATCHES = [
  { id: "D-1041", date: "2026-06-03", metal: "Gold",   batch: "AU-2026-089", weight: "5.240 kg",  purity: "99.9%", destination: "RBI Vault, Mumbai",        status: "Delivered"  },
  { id: "D-1040", date: "2026-06-01", metal: "Silver", batch: "AG-2026-201", weight: "18.600 kg", purity: "99.5%", destination: "Client – Jaipur Jewellers", status: "Delivered"  },
  { id: "D-1039", date: "2026-05-29", metal: "Gold",   batch: "AU-2026-088", weight: "3.750 kg",  purity: "99.9%", destination: "RBI Vault, Mumbai",        status: "Delivered"  },
  { id: "D-1038", date: "2026-05-27", metal: "Gold",   batch: "AU-2026-087", weight: "2.100 kg",  purity: "99.5%", destination: "Client – Delhi Bullion",    status: "Delivered"  },
  { id: "D-1037", date: "2026-05-25", metal: "Silver", batch: "AG-2026-200", weight: "24.000 kg", purity: "99.5%", destination: "Export – Dubai",            status: "In Transit" },
];

const EMPTY_FORM = { date: "", metal: "Gold", batch: "", weight: "", unit: "kg", purity: "", destination: "", barType: "100gm", noOfBars: "", receivedBy: "", remarks: "" };

const inputStyle = {
  background: "var(--bg)",
  border: "1px solid var(--line)",
  borderRadius: 8,
  padding: "9px 12px",
  color: "var(--txt)",
  fontSize: 13.5,
  width: "100%",
  outline: "none",
};

function Field({ label, icon: Icon, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 11.5, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.07em", display: "flex", alignItems: "center", gap: 5 }}>
        {Icon && <Icon size={12} />}{label.toUpperCase()}
      </label>
      {children}
    </div>
  );
}

function StatusBadge({ status }) {
  const ok = status === "Delivered";
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: "3px 10px", borderRadius: 99, fontSize: 11.5, fontWeight: 600,
      background: ok ? "rgba(52,211,153,0.1)" : "rgba(212,175,55,0.12)",
      color: ok ? "#34d399" : "var(--gold-soft)",
      border: `1px solid ${ok ? "rgba(52,211,153,0.25)" : "var(--gold-line)"}`,
    }}>
      <span style={{ width: 5, height: 5, borderRadius: 99, background: "currentColor" }} />
      {status}
    </span>
  );
}

/* ── Landing: two big selector cards ── */
function LandingCards({ onSelect }) {
  const cards = [
    {
      key: "add",
      icon: Truck,
      label: "Add Dispatch",
      sub: "Record a new outgoing metal shipment",
      accent: "var(--gold)",
      accentDim: "var(--gold-dim)",
      accentLine: "var(--gold-line)",
      stat: null,
    },
    {
      key: "history",
      icon: PackageCheck,
      label: "Dispatch History",
      sub: "View all previous dispatched shipments",
      accent: "#818cf8",
      accentDim: "rgba(129,140,248,0.1)",
      accentLine: "rgba(129,140,248,0.28)",
      stat: `${MOCK_DISPATCHES.length} records`,
    },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <button
            key={c.key}
            onClick={() => onSelect(c.key)}
            style={{
              background: "var(--panel)",
              border: `1px solid var(--line)`,
              borderRadius: 18,
              padding: "48px 40px",
              cursor: "pointer",
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              gap: 20,
              transition: "border-color 0.2s, box-shadow 0.2s, transform 0.18s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = c.accentLine;
              e.currentTarget.style.boxShadow = `0 0 32px ${c.accentDim}`;
              e.currentTarget.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--line)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {/* Icon bubble */}
            <div style={{
              width: 64, height: 64, borderRadius: 16,
              background: c.accentDim, border: `1px solid ${c.accentLine}`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Icon size={28} style={{ color: c.accent }} />
            </div>

            {/* Text */}
            <div>
              <div style={{ fontWeight: 800, fontSize: 22, color: "var(--txt)", marginBottom: 8 }}>
                {c.label}
              </div>
              <div style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.5 }}>
                {c.sub}
              </div>
            </div>

            {/* Bottom row */}
            <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              {c.stat && (
                <span style={{
                  fontSize: 12, fontWeight: 700, color: c.accent,
                  background: c.accentDim, border: `1px solid ${c.accentLine}`,
                  borderRadius: 99, padding: "4px 12px",
                }}>
                  {c.stat}
                </span>
              )}
              <span style={{
                marginLeft: "auto", fontSize: 13, fontWeight: 600,
                color: c.accent, display: "flex", alignItems: "center", gap: 5,
              }}>
                Open →
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

/* ── Add Dispatch form view ── */
function AddDispatchView({ onBack, onAdd }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      date: form.date || new Date().toISOString().slice(0, 10),
      metal: form.metal,
      batch: form.batch,
      weight: `${form.weight} ${form.unit}`,
      purity: form.purity ? `${form.purity}%` : "—",
      destination: form.destination,
      status: "In Transit",
    });
    setForm(EMPTY_FORM);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div style={{ maxWidth: 600 }}>
      <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 7, background: "none", border: "none", color: "var(--muted)", cursor: "pointer", fontSize: 13, fontWeight: 600, marginBottom: 24, padding: 0 }}>
        <ArrowLeft size={15} /> Back
      </button>

      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
        <div style={{ width: 48, height: 48, borderRadius: 13, background: "var(--gold-dim)", border: "1px solid var(--gold-line)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Truck size={22} style={{ color: "var(--gold)" }} />
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 22 }}>Add Dispatch</div>
          <div style={{ fontSize: 13, color: "var(--muted)" }}>Record a new outgoing metal shipment</div>
        </div>
      </div>

      <div style={{ background: "var(--panel)", border: "1px solid var(--line)", borderRadius: 14, padding: 28, display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Field label="Dispatch Date" icon={Calendar}>
            <input type="date" value={form.date} onChange={set("date")} style={inputStyle} required />
          </Field>
          <Field label="Metal Type" icon={FlaskConical}>
            <select value={form.metal} onChange={set("metal")} style={inputStyle}>
              <option>Gold</option>
              <option>Silver</option>
            </select>
          </Field>
        </div>

        <Field label="Batch / Lot No." icon={Hash}>
          <input type="text" placeholder="e.g. AU-2026-090" value={form.batch} onChange={set("batch")} style={inputStyle} required />
        </Field>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 90px", gap: 12 }}>
          <Field label="Weight" icon={Scale}>
            <input type="number" step="0.001" min="0" placeholder="0.000" value={form.weight} onChange={set("weight")} style={inputStyle} required />
          </Field>
          <Field label="Unit">
            <select value={form.unit} onChange={set("unit")} style={inputStyle}>
              <option>kg</option>
              <option>g</option>
            </select>
          </Field>
        </div>

        <Field label="Purity (%)">
          <input type="number" step="0.01" min="0" max="100" placeholder="e.g. 99.9" value={form.purity} onChange={set("purity")} style={inputStyle} />
        </Field>

        <Field label="Destination" icon={MapPin}>
          <input type="text" placeholder="e.g. RBI Vault, Mumbai" value={form.destination} onChange={set("destination")} style={inputStyle} required />
        </Field>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Field label="Bar Type" icon={Layers}>
            <select value={form.barType} onChange={set("barType")} style={inputStyle}>
              <option value="100gm">100 gm</option>
              <option value="200gm">200 gm</option>
              <option value="250gm">250 gm</option>
              <option value="500gm">500 gm</option>
              <option value="1kg">1 kg</option>
            </select>
          </Field>
          <Field label="No. of Bars" icon={Hash}>
            <input type="number" min="1" step="1" placeholder="0" value={form.noOfBars} onChange={set("noOfBars")} style={inputStyle} required />
          </Field>
        </div>

        <Field label="Received By" icon={User}>
          <input type="text" placeholder="Full name of receiver" value={form.receivedBy} onChange={set("receivedBy")} style={inputStyle} required />
        </Field>

        <Field label="Remarks" icon={FileText}>
          <textarea rows={2} placeholder="Optional notes…" value={form.remarks} onChange={set("remarks")} style={{ ...inputStyle, resize: "vertical" }} />
        </Field>

        <button
          type="button"
          onClick={handleSubmit}
          style={{
            marginTop: 4, height: 44, borderRadius: 10,
            background: "linear-gradient(135deg, var(--gold) 0%, #a67c1a 100%)",
            color: "#1a1407", fontWeight: 700, fontSize: 14,
            border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}
        >
          <SendHorizonal size={15} />
          {submitted ? "Dispatch Recorded!" : "Record Dispatch"}
        </button>

        {submitted && (
          <div style={{ textAlign: "center", fontSize: 12.5, color: "#34d399" }}>
            Entry added to dispatch history.
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Dispatch History view ── */
function HistoryView({ dispatches, onBack }) {
  return (
    <div>
      <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 7, background: "none", border: "none", color: "var(--muted)", cursor: "pointer", fontSize: 13, fontWeight: 600, marginBottom: 24, padding: 0 }}>
        <ArrowLeft size={15} /> Back
      </button>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 48, height: 48, borderRadius: 13, background: "rgba(129,140,248,0.1)", border: "1px solid rgba(129,140,248,0.28)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <PackageCheck size={22} style={{ color: "#818cf8" }} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 22 }}>Dispatch History</div>
            <div style={{ fontSize: 13, color: "var(--muted)" }}>All previous shipments</div>
          </div>
        </div>
        <span style={{ fontSize: 12, fontWeight: 700, color: "#818cf8", background: "rgba(129,140,248,0.1)", border: "1px solid rgba(129,140,248,0.28)", borderRadius: 99, padding: "5px 14px" }}>
          {dispatches.length} records
        </span>
      </div>

      <div style={{ background: "var(--panel)", border: "1px solid var(--line)", borderRadius: 14, overflow: "hidden" }}>
        <div className="grms-scroll" style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "var(--panel-2)" }}>
                {["Dispatch ID", "Date", "Metal", "Batch", "Weight", "Purity", "Destination", "Status"].map((h) => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", color: "var(--muted)", whiteSpace: "nowrap", borderBottom: "1px solid var(--line)" }}>
                    {h.toUpperCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dispatches.map((d, i) => (
                <tr
                  key={d.id}
                  style={{ borderBottom: i < dispatches.length - 1 ? "1px solid var(--line)" : "none", transition: "background 0.15s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--panel-2)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <td style={{ padding: "13px 16px", fontWeight: 700, color: "var(--gold-soft)", whiteSpace: "nowrap" }}>{d.id}</td>
                  <td style={{ padding: "13px 16px", color: "var(--muted)", whiteSpace: "nowrap" }}>{d.date}</td>
                  <td style={{ padding: "13px 16px", fontWeight: 600, color: d.metal === "Gold" ? "var(--gold-soft)" : "#c0c0c0", whiteSpace: "nowrap" }}>{d.metal}</td>
                  <td style={{ padding: "13px 16px", fontFamily: "monospace", fontSize: 12, color: "var(--muted)", whiteSpace: "nowrap" }}>{d.batch}</td>
                  <td style={{ padding: "13px 16px", whiteSpace: "nowrap" }}>{d.weight}</td>
                  <td style={{ padding: "13px 16px", whiteSpace: "nowrap" }}>{d.purity}</td>
                  <td style={{ padding: "13px 16px", color: "var(--muted)", maxWidth: 180 }}>{d.destination || "—"}</td>
                  <td style={{ padding: "13px 16px", whiteSpace: "nowrap" }}><StatusBadge status={d.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ── Root ── */
export default function MetalDispatch() {
  const [view, setView] = useState(null); // null | "add" | "history"
  const [dispatches, setDispatches] = useState(MOCK_DISPATCHES);

  const addDispatch = (entry) => {
    setDispatches((prev) => [{ id: `D-${1041 + prev.length - MOCK_DISPATCHES.length + 1}`, ...entry }, ...prev]);
  };

  return (
    <div className="p-6 md:p-10">
      {/* Page header */}
      <div style={{ marginBottom: 32 }}>
        <div className="font-display" style={{ fontSize: 13, letterSpacing: "0.14em", color: "var(--gold)" }}>LOGISTICS</div>
        <h1 className="font-display" style={{ fontWeight: 700, fontSize: 28, marginTop: 4 }}>Metal Dispatch</h1>
        <p style={{ color: "var(--muted)", marginTop: 6, fontSize: 13.5 }}>
          Record outgoing shipments or review dispatch history.
        </p>
      </div>

      {view === null   && <LandingCards onSelect={setView} />}
      {view === "add"  && <AddDispatchView onBack={() => setView(null)} onAdd={addDispatch} />}
      {view === "history" && <HistoryView dispatches={dispatches} onBack={() => setView(null)} />}
    </div>
  );
}
