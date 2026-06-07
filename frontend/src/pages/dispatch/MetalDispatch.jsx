import { useState } from "react";
import {
  SendHorizonal, PackageCheck, Truck, FlaskConical,
  Scale, Calendar, Hash, FileText, ArrowLeft, User, Layers, MapPin, Printer, X,
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

/* ── Dispatch Summary Modal ── */
function DispatchSummaryModal({ data, onClose }) {
  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
  const dateStr = data.date
    ? new Date(data.date).toLocaleDateString("en-IN", { day: "2-digit", month: "2-digit", year: "numeric" })
    : now.toLocaleDateString("en-IN", { day: "2-digit", month: "2-digit", year: "numeric" });

  // Convert weight to grams
  const weightNum = parseFloat(data.weight) || 0;
  const weightGm = data.unit === "kg" ? weightNum * 1000 : weightNum;
  const purityNum = parseFloat(data.purity) || 0;
  const fineGold = purityNum > 0 ? ((weightGm * purityNum) / 100).toFixed(2) : "—";
  const grossWeightDisplay = weightGm.toFixed(2);

  const handlePrint = () => window.print();

  return (
    <>
      {/* Backdrop */}
      <div style={{ position: "fixed", inset: 0, zIndex: 60, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }} />

      {/* Modal wrapper */}
      <div style={{ position: "fixed", inset: 0, zIndex: 61, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
        <div style={{ width: "100%", maxWidth: 640, display: "flex", flexDirection: "column", gap: 12 }}>

          {/* Action bar (hidden on print) */}
          <div className="no-print" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>Dispatch Summary generated</span>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={handlePrint} style={{ display: "flex", alignItems: "center", gap: 7, height: 38, padding: "0 18px", borderRadius: 9, background: "linear-gradient(135deg, var(--gold) 0%, #a67c1a 100%)", border: "none", color: "#1a1407", fontWeight: 700, fontSize: 13.5, cursor: "pointer" }}>
                <Printer size={15} /> Print
              </button>
              <button onClick={onClose} style={{ display: "flex", alignItems: "center", gap: 6, height: 38, padding: "0 16px", borderRadius: 9, background: "var(--panel)", border: "1px solid var(--line)", color: "var(--muted)", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
                <X size={14} /> Close
              </button>
            </div>
          </div>

          {/* Printable document */}
          <div id="dispatch-print-area" style={{ background: "#fff", color: "#000", borderRadius: 10, padding: "40px 48px", fontFamily: "Arial, sans-serif", fontSize: 13, lineHeight: 1.6 }}>
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{ fontWeight: 800, fontSize: 20, letterSpacing: "0.03em" }}>VIJAY ANAND GOLD LLP</div>
              <div style={{ fontWeight: 700, fontSize: 16, marginTop: 4 }}>
                Metal Dispatch to {data.destination || "—"}
              </div>
            </div>

            {/* Date / Time */}
            <div style={{ marginBottom: 20, fontSize: 13 }}>
              <strong>Dispatch Date:</strong> {dateStr}&nbsp;&nbsp;&nbsp;&nbsp;
              <strong>Time:</strong> {timeStr}
            </div>

            {/* Table */}
            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 32, fontSize: 13 }}>
              <thead>
                <tr>
                  {["S. No.", "Gross Weight (gm)", "No. of Bars", "Purity (%)", "Fine Gold (gm)"].map(h => (
                    <th key={h} style={{ border: "1px solid #000", padding: "7px 12px", textAlign: "center", fontWeight: 700, background: "#f9f9f9" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ border: "1px solid #000", padding: "7px 12px", textAlign: "center" }}>1</td>
                  <td style={{ border: "1px solid #000", padding: "7px 12px", textAlign: "center" }}>{grossWeightDisplay}</td>
                  <td style={{ border: "1px solid #000", padding: "7px 12px", textAlign: "center" }}>{data.noOfBars || "—"}</td>
                  <td style={{ border: "1px solid #000", padding: "7px 12px", textAlign: "center" }}>{data.purity || "—"}</td>
                  <td style={{ border: "1px solid #000", padding: "7px 12px", textAlign: "center" }}>{fineGold}</td>
                </tr>
              </tbody>
            </table>

            {/* Signature fields */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 32 }}>
              <div><strong>Prepared By:</strong> {data.receivedBy || "—"}</div>
              <div><strong>Checked By:</strong> {data.receivedBy || "—"}</div>
              <div><strong>Authorized Signatory:</strong> __________________________</div>
            </div>
          </div>
        </div>
      </div>

      {/* Print-only CSS */}
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #dispatch-print-area, #dispatch-print-area * { visibility: visible !important; }
          #dispatch-print-area { position: fixed !important; inset: 0 !important; border-radius: 0 !important; padding: 40px 48px !important; }
          .no-print { display: none !important; }
        }
      `}</style>
    </>
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
  const [summaryData, setSummaryData] = useState(null);
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
    setSummaryData({ ...form });
    setForm(EMPTY_FORM);
  };

  return (
    <>
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

        <Field label="Dispatch ID" icon={Hash}>
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
          <SendHorizonal size={15} /> Record Dispatch
        </button>
      </div>
    </div>

    {summaryData && (
      <DispatchSummaryModal
        data={summaryData}
        onClose={() => setSummaryData(null)}
      />
    )}
    </>
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
                {["Dispatch ID", "Date", "Metal", "Weight", "Purity", "Destination", "Status"].map((h) => (
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
                  <td style={{ padding: "13px 16px", fontWeight: 700, color: "var(--gold-soft)", whiteSpace: "nowrap" }}>{d.batch}</td>
                  <td style={{ padding: "13px 16px", color: "var(--muted)", whiteSpace: "nowrap" }}>{d.date}</td>
                  <td style={{ padding: "13px 16px", fontWeight: 600, color: d.metal === "Gold" ? "var(--gold-soft)" : "#c0c0c0", whiteSpace: "nowrap" }}>{d.metal}</td>
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
    setDispatches((prev) => [{ id: entry.batch || String(Date.now()), ...entry }, ...prev]);
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
