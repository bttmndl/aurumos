import { useState } from "react";
import {
  Plus, X, ChevronDown, CheckCircle2, Circle,
  Beaker, Flame, Layers, Microscope, FlaskConical,
  Scale, Hash, Calendar, Printer, Pencil, Check,
} from "lucide-react";

// ── Stage definitions ──────────────────────────────────────────────────────
const STAGES = [
  { key: "initial",       label: "Initial Metal Weight",       icon: Scale       },
  { key: "sublots",       label: "Sub-lot Division",           icon: Layers      },
  { key: "afterMelt",     label: "After Melt",                 icon: Flame       },
  { key: "popcorn",       label: "After Melt Popcorn",         icon: Beaker      },
  { key: "powder",        label: "Powder Weight",              icon: FlaskConical},
  { key: "fine",          label: "Fine Analysis",              icon: Microscope  },
  { key: "fireAssay",     label: "Fine Gold Fire Assay Purity", icon: Beaker      },
  { key: "silverCalc",    label: "Silver Mix Weight Calculation", icon: FlaskConical},
  { key: "fineProduct",   label: "Fine Product Weight",        icon: Scale       },
  { key: "undissolved",   label: "Undissolved",                icon: Beaker      },
  { key: "goldInSilver",  label: "Gold in Silver",             icon: Scale       },
];

function emptyLot(id, lotNo) {
  return {
    id, lotNo, createdAt: new Date().toISOString().slice(0, 10), status: "In Progress",
    initial:    { weight: "", unit: "gm" },
    sublots:    [{ label: "A", weight: "" }],
    afterMelt:  [{ label: "A", weight: "", dipSample: "", fireAssayPurity: "" }],
    recoveryWeight: "",
    popcorn:    { weight: "" },
    powder:     { weight: "" },
    fine:       { fineWeight: "", fineSampleWeight: "" },
    fireAssay:  { purity: "" },
    silverCalc: { targetPurity: "" },
    fineProduct:{ weight: "" },
    undissolved:{ weight: "", xrfPurity: "" },
    goldInSilver:{ goldWeight: "", fineGold: "" },
  };
}

const SAMPLE_LOTS = [
  (() => {
    const l = emptyLot("LOT-001", "VAG-AU-LOT-01");
    l.createdAt = "2026-04-10";
    l.status = "Completed";
    l.initial    = { weight: "1155.520", unit: "gm" };
    l.sublots    = [{ label: "A", weight: "1155.520" }];
    l.afterMelt  = [{ label: "A", weight: "1155.520", dipSample: "9.169", fireAssayPurity: "93.146" }];
    l.popcorn    = { weight: "1155.520" };
    l.powder     = { weight: "1156.711" };
    l.fine       = { fineWeight: "1156.711", fineSampleWeight: "1.382" };
    l.fireAssay  = { purity: "99.929" };
    l.undissolved   = { weight: "2.445",  xrfPurity: "92.790" };
    l.goldInSilver  = { goldWeight: "12.880", fineGold: "3.030" };
    return l;
  })(),
  (() => {
    const l = emptyLot("LOT-002", "VAG-AU-LOT-02");
    l.createdAt = "2026-05-02";
    l.status = "Completed";
    l.initial    = { weight: "1494.610", unit: "gm" };
    l.sublots    = [{ label: "A", weight: "743.630" }, { label: "B", weight: "750.980" }];
    l.afterMelt  = [
      { label: "A", weight: "743.630", dipSample: "1.462", fireAssayPurity: "87.785" },
      { label: "B", weight: "750.980", dipSample: "1.861", fireAssayPurity: "85.172" },
    ];
    l.popcorn    = { weight: "1494.610" };
    l.powder     = { weight: "1250.424" };
    l.fine       = { fineWeight: "1250.424", fineSampleWeight: "3.062" };
    l.fireAssay  = { purity: "99.987" };
    l.undissolved   = { weight: "16.366", xrfPurity: "83.920" };
    l.goldInSilver  = { goldWeight: "37.420", fineGold: "2.116" };
    return l;
  })(),
  (() => {
    const l = emptyLot("LOT-003", "VAG-AU-LOT-03");
    l.createdAt = "2026-05-26";
    l.status = "Completed";
    l.initial    = { weight: "1540.952", unit: "gm" };
    l.sublots    = [{ label: "A", weight: "1005.590" }, { label: "B", weight: "535.362" }];
    l.afterMelt  = [
      { label: "A", weight: "1005.590", dipSample: "1.720", fireAssayPurity: "89.410" },
      { label: "B", weight: "535.362",  dipSample: "1.570", fireAssayPurity: "80.030" },
    ];
    l.popcorn    = { weight: "1540.670" };
    l.powder     = { weight: "1272.815" };
    l.fine       = { fineWeight: "1272.815", fineSampleWeight: "2.038" };
    l.fireAssay  = { purity: "99.99" };
    l.undissolved   = { weight: "46.997", xrfPurity: "88.910" };
    l.goldInSilver  = { goldWeight: "39.641", fineGold: "" };
    return l;
  })(),
  (() => {
    const l = emptyLot("LOT-004", "VAG-AU-LOT-04");
    l.createdAt = "2026-06-02";
    l.status = "Completed";
    l.initial    = { weight: "3497.997", unit: "gm" };
    l.sublots    = [{ label: "A", weight: "3497.997" }];
    l.afterMelt  = [{ label: "A", weight: "3497.997", dipSample: "4.760", fireAssayPurity: "83.96" }];
    l.popcorn    = { weight: "3497.997" };
    l.powder     = { weight: "2614.879" };
    l.fine       = { fineWeight: "2614.879", fineSampleWeight: "2.217" };
    l.fireAssay  = { purity: "99.99" };
    l.undissolved   = { weight: "315.910", xrfPurity: "81.260" };
    l.goldInSilver  = { goldWeight: "181.820", fineGold: "" };
    return l;
  })(),
  (() => {
    const l = emptyLot("LOT-005", "VAG-AU-LOT-05");
    l.createdAt = "2026-06-08";
    l.status = "Completed";
    l.initial    = { weight: "2879.710", unit: "gm" };
    l.sublots    = [{ label: "A", weight: "2879.710" }];
    l.afterMelt  = [{ label: "A", weight: "2879.710", dipSample: "2.122", fireAssayPurity: "85.470" }];
    l.popcorn    = { weight: "2879.710" };
    l.powder     = { weight: "2455.270" };
    l.fine       = { fineWeight: "2455.270", fineSampleWeight: "1.840" };
    l.fireAssay  = { purity: "99.97" };
    l.undissolved   = { weight: "2.159", xrfPurity: "81.1" };
    l.goldInSilver  = { goldWeight: "110.170", fineGold: "" };
    return l;
  })(),
];

// ── Helpers ────────────────────────────────────────────────────────────────
function fmtDate(iso) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function stagesDone(lot) {
  const checks = [
    lot.initial.weight,
    lot.sublots.some(s => s.weight),
    lot.afterMelt.some(s => s.weight),
    lot.afterMelt.some(s => s.fireAssayPurity),
    lot.recoveryWeight,
    lot.popcorn.weight,
    lot.powder.weight,
    lot.fine.fineWeight,
    lot.fireAssay.purity,
    lot.silverCalc.targetPurity,
    lot.fineProduct.weight,
    lot.undissolved.weight,
    lot.goldInSilver.goldWeight,
  ];
  return checks.filter(Boolean).length;
}

const inp = {
  background: "var(--bg)", border: "1px solid var(--line)", borderRadius: 8,
  padding: "8px 11px", color: "var(--txt)", fontSize: 13, outline: "none", width: "100%",
};

function Lbl({ children }) {
  return <label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.06em" }}>{children}</label>;
}
function FRow({ label, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <Lbl>{label}</Lbl>
      {children}
    </div>
  );
}
function Grid2({ children }) {
  return <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>{children}</div>;
}
function Grid3({ children }) {
  return <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>{children}</div>;
}

// ── Lot Card ───────────────────────────────────────────────────────────────
function LotCard({ lot, onClick }) {
  const done = stagesDone(lot);
  const total = STAGES.length;
  const pct = Math.round((done / total) * 100);

  return (
    <button onClick={onClick} style={{
      background: "var(--panel)", border: "1px solid var(--line)", borderRadius: 14,
      padding: 20, cursor: "pointer", textAlign: "left", width: "100%",
      display: "flex", flexDirection: "column", gap: 14,
      transition: "border-color 0.2s, box-shadow 0.2s, transform 0.18s",
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--gold-line)"; e.currentTarget.style.boxShadow = "0 0 24px var(--gold-dim)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--line)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      {/* Top row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: 18 }}>{lot.lotNo}</div>
          <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2, display: "flex", alignItems: "center", gap: 5 }}>
            <Calendar size={11} /> {fmtDate(lot.createdAt)}
          </div>
        </div>
        <span style={{
          fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 99,
          background: lot.status === "Completed" ? "rgba(52,211,153,0.1)" : "var(--gold-dim)",
          color: lot.status === "Completed" ? "#34d399" : "var(--gold-soft)",
          border: `1px solid ${lot.status === "Completed" ? "rgba(52,211,153,0.25)" : "var(--gold-line)"}`,
        }}>
          {lot.status}
        </span>
      </div>

      {/* Initial weight */}
      {lot.initial.weight && (
        <div style={{ background: "var(--bg)", borderRadius: 9, padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "var(--muted)" }}>Initial Weight</span>
          <span style={{ fontWeight: 800, fontSize: 16 }}>{lot.initial.weight} <span style={{ fontSize: 12, color: "var(--muted)" }}>{lot.initial.unit}</span></span>
        </div>
      )}

      {/* Progress bar */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 11, color: "var(--muted)" }}>{done} of {total} stages</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: "var(--gold-soft)" }}>{pct}%</span>
        </div>
        <div style={{ height: 5, background: "var(--line)", borderRadius: 99, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg, var(--gold) 0%, #e6c873 100%)", borderRadius: 99, transition: "width 0.4s ease" }} />
        </div>
      </div>
    </button>
  );
}

// ── Stage accordion section (must be outside ProcessDrawer to avoid remount on re-render) ──
function StageSection({ stageKey, openStage, onToggle, hasData, children }) {
  const stage = STAGES.find(s => s.key === stageKey);
  const Icon = stage.icon;
  const isOpen = openStage === stageKey;
  const filled = hasData[stageKey];
  return (
    <div style={{ border: `1px solid ${isOpen ? "var(--gold-line)" : "var(--line)"}`, borderRadius: 10, overflow: "hidden", transition: "border-color 0.2s" }}>
      <button onClick={() => onToggle(stageKey)} style={{
        width: "100%", padding: "12px 14px", background: isOpen ? "var(--gold-dim)" : "var(--panel-2)",
        border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, textAlign: "left",
      }}>
        <Icon size={15} style={{ color: isOpen ? "var(--gold)" : "var(--muted)", flexShrink: 0 }} />
        <span style={{ flex: 1, fontSize: 13, fontWeight: 700, color: isOpen ? "var(--gold-soft)" : "var(--txt)" }}>{stage.label}</span>
        {filled
          ? <CheckCircle2 size={16} style={{ color: "#34d399", flexShrink: 0 }} />
          : <Circle size={16} style={{ color: "var(--muted-2)", flexShrink: 0 }} />
        }
        <ChevronDown size={14} style={{ color: "var(--muted)", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s", flexShrink: 0 }} />
      </button>
      {isOpen && (
        <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 14, background: "var(--bg)", borderTop: "1px solid var(--line)" }}>
          {children}
        </div>
      )}
    </div>
  );
}

// ── Lot Report ─────────────────────────────────────────────────────────────
function LotReport({ lot, onClose }) {
  const initialWtGm = lot.initial.unit === "kg"
    ? (parseFloat(lot.initial.weight) || 0) * 1000
    : (parseFloat(lot.initial.weight) || 0);

  const sublotTotal      = lot.sublots.reduce((s, sl) => s + (parseFloat(sl.weight) || 0), 0);
  const afterMeltTotal   = lot.afterMelt.reduce((s, am) => s + (parseFloat(am.weight) || 0), 0);
  const dipSampleTotal   = lot.afterMelt.reduce((s, am) => s + (parseFloat(am.dipSample) || 0), 0);
  const recoveryWt       = parseFloat(lot.recoveryWeight) || 0;
  const popcornWt        = parseFloat(lot.popcorn.weight) || 0;
  const powderWt         = parseFloat(lot.powder.weight) || 0;
  const fineWt           = parseFloat(lot.fine.fineWeight) || 0;
  const fineSampleWt     = parseFloat(lot.fine.fineSampleWeight) || 0;
  const effectiveFineWt  = Math.max(fineWt - fineSampleWt, 0);
  const purity           = parseFloat(lot.fireAssay.purity) || 0;
  const targetPurity     = parseFloat(lot.silverCalc.targetPurity) || 0;
  const fineGoldCalc     = effectiveFineWt > 0 && purity > 0 ? effectiveFineWt * purity / 100 : 0;
  const silverMixWt      = effectiveFineWt > 0 && purity > 0 && targetPurity > 0
    ? effectiveFineWt * (purity - targetPurity) / 100 : 0;
  // Fine product = Σ(afterMelt weight × fireAssayPurity per sub-lot)
  const fineProductCalc  = lot.afterMelt.some(am => am.weight && am.fireAssayPurity)
    ? lot.afterMelt.reduce((s, am) => s + (parseFloat(am.weight) || 0) * (parseFloat(am.fireAssayPurity) || 0) / 100, 0)
    : null;
  // Use manually entered weight if present, else use calculated
  const fineProductWt    = parseFloat(lot.fineProduct.weight) || (fineProductCalc ?? 0);
  const undissolvedWt    = parseFloat(lot.undissolved.weight) || 0;
  const undissolvedPurity = parseFloat(lot.undissolved.xrfPurity) || 0;
  const goldInSilverWt   = parseFloat(lot.goldInSilver.goldWeight) || 0;
  const fineGoldInSilver = parseFloat(lot.goldInSilver.fineGold) || 0;

  const totalMeltLoss  = sublotTotal > 0 ? sublotTotal - afterMeltTotal - dipSampleTotal : 0;
  const recoveryLoss   = afterMeltTotal > 0 && recoveryWt > 0 ? afterMeltTotal - recoveryWt : 0;
  const recoveryPct    = initialWtGm > 0 && recoveryWt > 0 ? recoveryWt / initialWtGm * 100 : 0;
  // Fine gold in each output stream
  const fineGoldReceived     = fineGoldCalc;                                   // Fine Analysis × Fine Purity
  const fineGoldInUndissolved = undissolvedWt * undissolvedPurity / 100;       // Undissolved × XRF Purity
  // goldInSilver.fineGold is the pre-calculated fine gold in the silver / recovery
  const totalFineOut   = fineGoldReceived + fineGoldInSilver + fineGoldInUndissolved;
  // Loss = Fine Product (After Melt × Fire Assay Purity) − (Fine Received + Fine Gold in Silver + Fine Gold in Undissolved)
  const processingLoss = fineProductCalc !== null && totalFineOut > 0 ? fineProductCalc - totalFineOut : null;
  const totalMetalOut  = fineProductWt + undissolvedWt + goldInSilverWt;
  const overallLoss    = initialWtGm > 0 && totalMetalOut > 0 ? initialWtGm - totalMetalOut : null;
  const refiningEff    = fineGoldCalc > 0 && fineProductWt > 0 ? fineProductWt / fineGoldCalc * 100 : 0;

  const n  = (v, d = 3) => (v != null && !isNaN(v) && Math.abs(v) > 0.00001) ? Number(v).toFixed(d) : "—";
  const ls = v => {
    if (v == null || isNaN(v) || Math.abs(v) < 0.0005) return "—";
    return v > 0 ? `−${v.toFixed(3)}` : `+${Math.abs(v).toFixed(3)}`;
  };

  const TH = (extra = {}) => ({
    padding: "10px 11px", fontSize: 10.5, fontWeight: 700, letterSpacing: "0.07em",
    textAlign: "center", background: "#1a1407", color: "#e6c873",
    borderRight: "1px solid #2c1f06", whiteSpace: "nowrap", ...extra,
  });
  const TD = (extra = {}) => ({
    padding: "8px 10px", fontSize: 12, borderBottom: "1px solid #ededed",
    borderRight: "1px solid #ededed", textAlign: "center", color: "#1a1407",
    verticalAlign: "middle", ...extra,
  });

  const printReport = () => {
    const el = document.getElementById("lot-report-printable");
    if (!el) return;
    const win = window.open("", "_blank", "width=1200,height=900");
    if (!win) return;
    win.document.write(`<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>Refining Report – ${lot.lotNo}</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Arial,sans-serif;padding:24px 28px;background:#fff;color:#1a1407}
h1{text-align:center;font-size:20px;font-weight:900;letter-spacing:.04em}
.sub{text-align:center;font-size:11.5px;color:#888;margin:4px 0 20px}
.info{display:flex;flex-wrap:wrap;gap:24px;padding:12px 18px;background:#fdf8ee;border:1px solid #e6c873;border-radius:8px;margin-bottom:22px}
.il{font-size:9px;font-weight:700;color:#a67c1a;letter-spacing:.08em;margin-bottom:3px}
.iv{font-size:13px;font-weight:800}
.sec{font-size:11px;font-weight:800;letter-spacing:.1em;color:#1a1407;margin:0 0 8px 2px}
table{width:100%;border-collapse:collapse;font-size:11px;margin-bottom:22px}
th{background:#1a1407;color:#e6c873;padding:8px 10px;border:1px solid #2c1f06;font-size:10px;letter-spacing:.06em;white-space:nowrap;text-align:center}
td{padding:7px 9px;border:1px solid #e0e0e0;text-align:center;vertical-align:middle}
.sum{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:20px}
.sc{padding:11px 14px;border:1px solid #ddd;border-radius:6px;min-width:140px}
.sl{font-size:9px;font-weight:700;letter-spacing:.07em;color:#888;margin-bottom:4px}
.sv{font-size:16px;font-weight:900}
.foot{display:flex;justify-content:space-between;font-size:10px;color:#bbb;border-top:1px solid #e8e8e8;padding-top:12px;margin-top:8px}
@media print{body{padding:0 14px}}
</style></head>
<body>${el.innerHTML}
<script>setTimeout(()=>{window.print();},400)</script>
</body></html>`);
    win.document.close();
  };

  let sr = 0;

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.78)", backdropFilter: "blur(5px)" }} />
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 201, overflow: "auto", display: "flex", justifyContent: "center", padding: "20px 14px" }}>
        <div style={{ width: "min(1160px, 97vw)", background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 32px 100px rgba(0,0,0,0.55)", alignSelf: "flex-start" }}>

          {/* Top control bar */}
          <div style={{ background: "#1a1407", padding: "14px 22px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontWeight: 800, fontSize: 15, color: "#e6c873", letterSpacing: "0.02em" }}>
              Refining Report — {lot.lotNo}
            </span>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={printReport} style={{ height: 34, padding: "0 18px", borderRadius: 8, background: "linear-gradient(135deg,#d4a017,#a67c1a)", border: "none", color: "#1a1407", fontWeight: 700, fontSize: 12.5, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                <Printer size={13} /> Print / Export PDF
              </button>
              <button onClick={onClose} style={{ width: 34, height: 34, borderRadius: 8, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Printable content */}
          <div id="lot-report-printable" style={{ padding: "30px 34px", background: "#fff" }}>

            {/* Title */}
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontSize: 23, fontWeight: 900, letterSpacing: "0.04em", color: "#1a1407" }}>LOTWISE REFINING DATA</div>
              <div style={{ fontSize: 12, color: "#999", marginTop: 5 }}>Gold Refinery Management System</div>
            </div>

            {/* Info strip */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 28, padding: "13px 20px", background: "#fdf8ee", border: "1px solid #e6c873", borderRadius: 10, marginBottom: 26 }}>
              {[
                ["Lot Number",     lot.lotNo],
                ["Date",           fmtDate(lot.createdAt)],
                ["Initial Weight", `${initialWtGm.toFixed(3)} gm`],
                ["Status",         lot.status],
                ["Report Date",    fmtDate(new Date().toISOString().slice(0,10))],
              ].map(([label, val]) => (
                <div key={label}>
                  <div style={{ fontSize: 9, fontWeight: 700, color: "#a67c1a", letterSpacing: "0.09em", marginBottom: 4 }}>{label.toUpperCase()}</div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: "#1a1407" }}>{val}</div>
                </div>
              ))}
            </div>

            {/* ── Process Flow Table ── */}
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", color: "#1a1407", marginBottom: 10, paddingLeft: 2 }}>PROCESS FLOW</div>
            <div style={{ overflowX: "auto", marginBottom: 30 }}>
              <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #e0e0e0", fontSize: 12 }}>
                <thead>
                  <tr>
                    <th style={TH({ width: 38 })}>SR</th>
                    <th style={TH({ textAlign: "left", paddingLeft: 14, minWidth: 190 })}>STAGE</th>
                    <th style={TH({ width: 72 })}>SUB-LOT</th>
                    <th style={TH()}>RAW INPUT (gm)</th>
                    <th style={TH()}>SAMPLE / DIP (gm)</th>
                    <th style={TH()}>LOSS (gm)</th>
                    <th style={TH({ background: "#1c3a14", color: "#86efac", borderRight: "1px solid #2d5020" })}>OUTPUT (gm)</th>
                    <th style={TH()}>PURITY (%)</th>
                    <th style={TH()}>FINE GOLD (gm)</th>
                    <th style={TH({ borderRight: "none" })}>REMARKS</th>
                  </tr>
                </thead>
                <tbody>

                  {/* Initial */}
                  {initialWtGm > 0 && (() => { const r = ++sr; return (
                    <tr style={{ background: "#fdf8ee" }}>
                      <td style={TD()}>{r}</td>
                      <td style={TD({ textAlign: "left", paddingLeft: 14, fontWeight: 700 })}>Initial Metal Weight</td>
                      <td style={TD()}>—</td>
                      <td style={TD({ fontWeight: 700 })}>{n(initialWtGm)}</td>
                      <td style={TD()}>—</td>
                      <td style={TD()}>—</td>
                      <td style={TD({ fontWeight: 800, background: "#f0fdf4", color: "#15803d" })}>{n(initialWtGm)}</td>
                      <td style={TD()}>—</td>
                      <td style={TD()}>—</td>
                      <td style={TD({ borderRight: "none", fontSize: 11, color: "#888" })}>{lot.initial.unit.toUpperCase()}</td>
                    </tr>
                  ); })()}

                  {/* Sub-lots + After Melt (one row per sub-lot) */}
                  {lot.sublots.map((sl, i) => {
                    const isFirst = i === 0;
                    if (isFirst) sr++;
                    const r    = isFirst ? sr : "";
                    const aw   = parseFloat(lot.afterMelt[i]?.weight) || 0;
                    const ds   = parseFloat(lot.afterMelt[i]?.dipSample) || 0;
                    const fap  = parseFloat(lot.afterMelt[i]?.fireAssayPurity) || 0;
                    const sw   = parseFloat(sl.weight) || 0;
                    const lv   = sw > 0 && aw > 0 ? sw - aw - ds : null;
                    const subFineGold = aw > 0 && fap > 0 ? aw * fap / 100 : 0;
                    const subLabel = `${lot.lotNo.replace("LOT-","")}${sl.label}`;
                    return (
                      <tr key={sl.label} style={{ background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                        <td style={TD()}>{r}</td>
                        <td style={TD({ textAlign: "left", paddingLeft: isFirst ? 14 : 28, fontWeight: isFirst ? 700 : 400, color: isFirst ? "#1a1407" : "#666" })}>
                          {isFirst ? "Sub-lot / After Melt" : ""}
                        </td>
                        <td style={TD({ fontWeight: 700, color: "#a67c1a" })}>{subLabel}</td>
                        <td style={TD({ fontWeight: sw > 0 ? 700 : 400 })}>{sw > 0 ? n(sw) : "—"}</td>
                        <td style={TD({ color: "#b45309", fontWeight: ds > 0 ? 700 : 400 })}>{ds > 0 ? n(ds) : "—"}</td>
                        <td style={TD({ color: lv != null && lv > 0.0005 ? "#dc2626" : lv != null && lv < -0.0005 ? "#16a34a" : "#888", fontWeight: lv != null ? 700 : 400 })}>{ls(lv)}</td>
                        <td style={TD({ fontWeight: 800, background: aw > 0 ? "#f0fdf4" : "inherit", color: aw > 0 ? "#15803d" : "#888" })}>{aw > 0 ? n(aw) : "—"}</td>
                        <td style={TD({ fontWeight: fap > 0 ? 700 : 400, color: fap > 0 ? "#a67c1a" : "#888" })}>{fap > 0 ? `${fap.toFixed(3)}%` : "—"}</td>
                        <td style={TD({ fontWeight: subFineGold > 0 ? 700 : 400, color: subFineGold > 0 ? "#a67c1a" : "#888" })}>{subFineGold > 0 ? n(subFineGold) : "—"}</td>
                        <td style={TD({ borderRight: "none", fontSize: 11, color: "#888" })}>After Melt</td>
                      </tr>
                    );
                  })}

                  {/* After Melt totals row (only if multiple sub-lots) */}
                  {lot.sublots.length > 1 && sublotTotal > 0 && (
                    <tr style={{ background: "#fffbeb" }}>
                      <td style={TD({ borderTop: "2px solid #fde68a", borderBottom: "2px solid #fde68a" })}></td>
                      <td style={TD({ textAlign: "left", paddingLeft: 28, fontStyle: "italic", fontSize: 11, color: "#888", borderTop: "2px solid #fde68a", borderBottom: "2px solid #fde68a" })}>Total After Melt</td>
                      <td style={TD({ borderTop: "2px solid #fde68a", borderBottom: "2px solid #fde68a" })}>—</td>
                      <td style={TD({ fontWeight: 700, borderTop: "2px solid #fde68a", borderBottom: "2px solid #fde68a" })}>{n(sublotTotal)}</td>
                      <td style={TD({ color: "#b45309", fontWeight: 700, borderTop: "2px solid #fde68a", borderBottom: "2px solid #fde68a" })}>{dipSampleTotal > 0 ? n(dipSampleTotal) : "—"}</td>
                      <td style={TD({ color: totalMeltLoss > 0.001 ? "#dc2626" : "#16a34a", fontWeight: 700, borderTop: "2px solid #fde68a", borderBottom: "2px solid #fde68a" })}>{ls(totalMeltLoss)}</td>
                      <td style={TD({ fontWeight: 800, background: "#fef9c3", borderTop: "2px solid #fde68a", borderBottom: "2px solid #fde68a" })}>{n(afterMeltTotal)}</td>
                      <td style={TD({ borderTop: "2px solid #fde68a", borderBottom: "2px solid #fde68a" })}>—</td>
                      <td style={TD({ borderTop: "2px solid #fde68a", borderBottom: "2px solid #fde68a" })}>—</td>
                      <td style={TD({ borderRight: "none", borderTop: "2px solid #fde68a", borderBottom: "2px solid #fde68a" })}></td>
                    </tr>
                  )}

                  {/* Recovery */}
                  {recoveryWt > 0 && (() => { const r = ++sr; return (
                    <tr style={{ background: "#fdf8ee" }}>
                      <td style={TD()}>{r}</td>
                      <td style={TD({ textAlign: "left", paddingLeft: 14, fontWeight: 700 })}>Recovery Weight</td>
                      <td style={TD()}>—</td>
                      <td style={TD({ fontWeight: 700 })}>{afterMeltTotal > 0 ? n(afterMeltTotal) : "—"}</td>
                      <td style={TD()}>—</td>
                      <td style={TD({ color: recoveryLoss > 0.001 ? "#dc2626" : "#16a34a", fontWeight: 700 })}>{ls(recoveryLoss)}</td>
                      <td style={TD({ fontWeight: 800, background: "#f0fdf4", color: "#15803d" })}>{n(recoveryWt)}</td>
                      <td style={TD({ color: "#b45309", fontWeight: 700 })}>{recoveryPct > 0 ? `${recoveryPct.toFixed(2)}%` : "—"}</td>
                      <td style={TD()}>—</td>
                      <td style={TD({ borderRight: "none", fontSize: 11, color: "#888" })}>Recovery %</td>
                    </tr>
                  ); })()}

                  {/* Popcorn */}
                  {popcornWt > 0 && (() => { const r = ++sr; return (
                    <tr>
                      <td style={TD()}>{r}</td>
                      <td style={TD({ textAlign: "left", paddingLeft: 14, fontWeight: 700 })}>After Melt Popcorn</td>
                      <td style={TD()}>—</td>
                      <td style={TD()}>—</td>
                      <td style={TD()}>—</td>
                      <td style={TD()}>—</td>
                      <td style={TD({ fontWeight: 700, background: "#f0fdf4", color: "#15803d" })}>{n(popcornWt)}</td>
                      <td style={TD()}>—</td>
                      <td style={TD()}>—</td>
                      <td style={TD({ borderRight: "none" })}></td>
                    </tr>
                  ); })()}

                  {/* Powder */}
                  {powderWt > 0 && (() => { const r = ++sr; return (
                    <tr style={{ background: "#fafafa" }}>
                      <td style={TD()}>{r}</td>
                      <td style={TD({ textAlign: "left", paddingLeft: 14, fontWeight: 700 })}>Powder</td>
                      <td style={TD()}>—</td>
                      <td style={TD()}>—</td>
                      <td style={TD()}>—</td>
                      <td style={TD()}>—</td>
                      <td style={TD({ fontWeight: 700, background: "#f0fdf4", color: "#15803d" })}>{n(powderWt)}</td>
                      <td style={TD()}>—</td>
                      <td style={TD()}>—</td>
                      <td style={TD({ borderRight: "none" })}></td>
                    </tr>
                  ); })()}

                  {/* Fine Analysis */}
                  {fineWt > 0 && (() => { const r = ++sr; return (
                    <tr style={{ background: "#fffbeb" }}>
                      <td style={TD()}>{r}</td>
                      <td style={TD({ textAlign: "left", paddingLeft: 14, fontWeight: 700 })}>Fine Analysis</td>
                      <td style={TD()}>—</td>
                      <td style={TD({ fontWeight: 700 })}>{n(fineWt)}</td>
                      <td style={TD({ color: "#b45309", fontWeight: fineSampleWt > 0 ? 700 : 400 })}>{fineSampleWt > 0 ? n(fineSampleWt) : "—"}</td>
                      <td style={TD()}>—</td>
                      <td style={TD({ fontWeight: 800, background: "#fef9c3" })}>{n(effectiveFineWt)}</td>
                      <td style={TD()}>—</td>
                      <td style={TD()}>—</td>
                      <td style={TD({ borderRight: "none", fontSize: 11, color: "#888" })}>Sample excluded</td>
                    </tr>
                  ); })()}

                  {/* Fire Assay */}
                  {purity > 0 && (() => { const r = ++sr; return (
                    <tr>
                      <td style={TD()}>{r}</td>
                      <td style={TD({ textAlign: "left", paddingLeft: 14, fontWeight: 700 })}>Fire Assay (Fine Gold)</td>
                      <td style={TD()}>—</td>
                      <td style={TD({ fontWeight: 700 })}>{effectiveFineWt > 0 ? n(effectiveFineWt) : "—"}</td>
                      <td style={TD()}>—</td>
                      <td style={TD()}>—</td>
                      <td style={TD({ fontWeight: 800, background: "#fdf8ee", color: "#a67c1a" })}>{fineGoldCalc > 0 ? n(fineGoldCalc) : "—"}</td>
                      <td style={TD({ fontWeight: 700, color: "#a67c1a" })}>{purity.toFixed(3)}%</td>
                      <td style={TD({ fontWeight: 700, color: "#a67c1a" })}>{fineGoldCalc > 0 ? n(fineGoldCalc) : "—"}</td>
                      <td style={TD({ borderRight: "none", fontSize: 11, color: "#888" })}>Calc. Fine Gold</td>
                    </tr>
                  ); })()}

                  {/* Silver Mix */}
                  {silverMixWt > 0 && (() => { const r = ++sr; return (
                    <tr style={{ background: "#f0f9ff" }}>
                      <td style={TD()}>{r}</td>
                      <td style={TD({ textAlign: "left", paddingLeft: 14, fontWeight: 700 })}>Silver Mix Calculation</td>
                      <td style={TD()}>—</td>
                      <td style={TD({ fontWeight: 700 })}>{effectiveFineWt > 0 ? n(effectiveFineWt) : "—"}</td>
                      <td style={TD()}>—</td>
                      <td style={TD()}>—</td>
                      <td style={TD({ fontWeight: 800, background: "#eff6ff", color: "#1d4ed8" })}>{n(silverMixWt)}</td>
                      <td style={TD({ color: "#1d4ed8" })}>{targetPurity.toFixed(2)}%</td>
                      <td style={TD()}>—</td>
                      <td style={TD({ borderRight: "none", fontSize: 11, color: "#888" })}>Target purity</td>
                    </tr>
                  ); })()}

                  {/* Fine Product */}
                  {(fineProductCalc !== null || fineProductWt > 0) && (() => { const r = ++sr; return (
                    <>
                      <tr style={{ background: "#f0fdf4" }}>
                        <td style={TD()}>{r}</td>
                        <td style={TD({ textAlign: "left", paddingLeft: 14, fontWeight: 700 })}>Fine Product (Calculated)</td>
                        <td style={TD()}>—</td>
                        <td style={TD({ fontSize: 10, color: "#888" })}>Σ(After Melt × Purity)</td>
                        <td style={TD()}>—</td>
                        <td style={TD()}>—</td>
                        <td style={TD({ fontWeight: 800, background: "#dcfce7", color: "#15803d" })}>{fineProductCalc !== null ? n(fineProductCalc) : "—"}</td>
                        <td style={TD()}>—</td>
                        <td style={TD()}>—</td>
                        <td style={TD({ borderRight: "none", fontSize: 11, color: "#888" })}>Auto-calc</td>
                      </tr>
                      {processingLoss !== null && (
                        <tr style={{ background: processingLoss > 0 ? "#fef2f2" : "#f0fdf4" }}>
                          <td style={TD()}></td>
                          <td style={TD({ textAlign: "left", paddingLeft: 26, fontStyle: "italic", fontSize: 11, color: processingLoss > 0 ? "#dc2626" : "#15803d" })}>
                            Processing {processingLoss > 0 ? "Loss" : "Gain"}
                          </td>
                          <td style={TD()}>—</td>
                          <td style={TD({ fontSize: 10, color: "#888" })}>Fine Product − (Fine Received + Silver + Undissolved)</td>
                          <td style={TD()}>—</td>
                          <td style={TD({ fontWeight: 800, color: processingLoss > 0 ? "#dc2626" : "#15803d" })}>
                            {processingLoss > 0 ? `−${processingLoss.toFixed(3)}` : `+${Math.abs(processingLoss).toFixed(3)}`}
                          </td>
                          <td style={TD()}>—</td>
                          <td style={TD()}>—</td>
                          <td style={TD()}>—</td>
                          <td style={TD({ borderRight: "none" })}></td>
                        </tr>
                      )}
                    </>
                  ); })()}

                  {/* Undissolved */}
                  {undissolvedWt > 0 && (() => { const r = ++sr; return (
                    <tr>
                      <td style={TD()}>{r}</td>
                      <td style={TD({ textAlign: "left", paddingLeft: 14, fontWeight: 700 })}>Undissolved</td>
                      <td style={TD()}>—</td>
                      <td style={TD()}>—</td>
                      <td style={TD()}>—</td>
                      <td style={TD()}>—</td>
                      <td style={TD({ fontWeight: 700, background: "#f0fdf4", color: "#15803d" })}>{n(undissolvedWt)}</td>
                      <td style={TD({ color: "#888" })}>{undissolvedPurity > 0 ? `${undissolvedPurity.toFixed(2)}%` : "—"}</td>
                      <td style={TD()}>—</td>
                      <td style={TD({ borderRight: "none", fontSize: 11, color: "#888" })}>XRF Purity</td>
                    </tr>
                  ); })()}

                  {/* Gold in Silver */}
                  {goldInSilverWt > 0 && (() => { const r = ++sr; return (
                    <tr style={{ background: "#fafafa" }}>
                      <td style={TD()}>{r}</td>
                      <td style={TD({ textAlign: "left", paddingLeft: 14, fontWeight: 700 })}>Gold in Silver</td>
                      <td style={TD()}>—</td>
                      <td style={TD({ fontWeight: 700 })}>{n(goldInSilverWt)}</td>
                      <td style={TD()}>—</td>
                      <td style={TD()}>—</td>
                      <td style={TD({ fontWeight: 700, background: "#f0fdf4", color: "#15803d" })}>{fineGoldInSilver > 0 ? n(fineGoldInSilver) : "—"}</td>
                      <td style={TD()}>—</td>
                      <td style={TD({ fontWeight: 700, color: "#a67c1a" })}>{fineGoldInSilver > 0 ? n(fineGoldInSilver) : "—"}</td>
                      <td style={TD({ borderRight: "none", fontSize: 11, color: "#888" })}>Fine Gold in Silver</td>
                    </tr>
                  ); })()}

                </tbody>
              </table>
            </div>

            {/* ── Summary Cards ── */}
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", color: "#1a1407", marginBottom: 12, paddingLeft: 2 }}>SUMMARY</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(158px,1fr))", gap: 12, marginBottom: 28 }}>
              {[
                { label: "Total Input",         value: initialWtGm > 0   ? `${n(initialWtGm)} gm`       : "—", bg: "#fdf8ee", bd: "#e6c873",  cl: "#1a1407"  },
                { label: "Recovery Weight",      value: recoveryWt > 0    ? `${n(recoveryWt)} gm`        : "—", bg: "#f0fdf4", bd: "#86efac",  cl: "#15803d"  },
                { label: "Recovery %",           value: recoveryPct > 0   ? `${recoveryPct.toFixed(2)}%` : "—", bg: "#fffbeb", bd: "#fde68a",  cl: "#b45309"  },
                { label: "Calc. Fine Gold",      value: fineGoldCalc > 0  ? `${n(fineGoldCalc)} gm`      : "—", bg: "#fdf8ee", bd: "#e6c873",  cl: "#a67c1a"  },
                { label: "Fine Product",         value: fineProductCalc !== null ? `${n(fineProductCalc)} gm` : fineProductWt > 0 ? `${n(fineProductWt)} gm` : "—", bg: "#f0fdf4", bd: "#86efac", cl: "#15803d" },
                {
                  label: "Processing Loss / Gain",
                  value: processingLoss !== null
                    ? `${processingLoss > 0 ? "−" : "+"}${Math.abs(processingLoss).toFixed(3)} gm`
                    : "—",
                  bg: processingLoss !== null && processingLoss > 0 ? "#fef2f2" : "#f0fdf4",
                  bd: processingLoss !== null && processingLoss > 0 ? "#fecaca" : "#86efac",
                  cl: processingLoss !== null && processingLoss > 0 ? "#dc2626" : "#15803d",
                },
                { label: "Refining Efficiency",  value: refiningEff > 0   ? `${refiningEff.toFixed(2)}%` : "—", bg: "#eff6ff", bd: "#bfdbfe",  cl: "#1d4ed8"  },
                {
                  label: "Total Loss / Gain",
                  value: overallLoss !== null
                    ? `${overallLoss > 0 ? "−" : "+"}${Math.abs(overallLoss).toFixed(3)} gm`
                    : "—",
                  bg: overallLoss !== null && overallLoss > 0 ? "#fef2f2" : "#f0fdf4",
                  bd: overallLoss !== null && overallLoss > 0 ? "#fecaca" : "#86efac",
                  cl: overallLoss !== null && overallLoss > 0 ? "#dc2626" : "#15803d",
                },
              ].map(({ label, value, bg, bd, cl }) => (
                <div key={label} style={{ padding: "12px 15px", background: bg, border: `1px solid ${bd}`, borderRadius: 10 }}>
                  <div style={{ fontSize: 9.5, fontWeight: 700, color: "#999", letterSpacing: "0.07em", marginBottom: 6 }}>{label.toUpperCase()}</div>
                  <div style={{ fontSize: 18, fontWeight: 900, color: cl }}>{value}</div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div style={{ borderTop: "1px solid #ececec", paddingTop: 12, display: "flex", justifyContent: "space-between", fontSize: 10, color: "#c0c0c0" }}>
              <span>Generated: {fmtDate(new Date().toISOString().slice(0,10))}</span>
              <span>Gold Refinery Management System</span>
            </div>

          </div>{/* /printable */}
        </div>
      </div>
    </>
  );
}

// ── Processing Drawer ──────────────────────────────────────────────────────
function ProcessDrawer({ lot, onClose, onUpdate }) {
  const [openStage, setOpenStage] = useState(null);
  const [data, setData] = useState(structuredClone(lot));
  const [showReport, setShowReport] = useState(false);
  const [subLotDrafts, setSubLotDrafts] = useState(() => lot.sublots.map(sl => sl.weight || ""));
  const [editingSubLots, setEditingSubLots] = useState(() => lot.sublots.map(sl => !sl.weight));

  const toggle = key => setOpenStage(k => k === key ? null : key);

  const setField = (path, val) => {
    setData(prev => {
      const next = structuredClone(prev);
      const keys = path.split(".");
      let obj = next;
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
      obj[keys[keys.length - 1]] = val;
      return next;
    });
  };

  const setSubLot = (arr, idx, field, val) => {
    setData(prev => {
      const next = structuredClone(prev);
      next[arr][idx][field] = val;
      return next;
    });
  };

  const setSubLotDraft = (idx, val) => {
    setSubLotDrafts(prev => {
      const next = [...prev];
      next[idx] = val;
      return next;
    });
  };

  const subLotDraftTotal = idx => data.sublots.reduce((sum, sl, i) => {
    const weight = i === idx ? subLotDrafts[i] : sl.weight;
    return sum + (parseFloat(weight) || 0);
  }, 0);

  const updateSubLotWeight = idx => {
    const initialWeight = parseFloat(data.initial.weight) || 0;
    const initialWeightGm = data.initial.unit === "kg" ? initialWeight * 1000 : initialWeight;
    if (initialWeightGm > 0 && subLotDraftTotal(idx) > initialWeightGm + 0.001) return;

    setSubLot("sublots", idx, "weight", subLotDrafts[idx] ?? "");
    setEditingSubLots(prev => {
      const next = [...prev];
      next[idx] = false;
      return next;
    });
  };

  const editSubLotWeight = idx => {
    setSubLotDrafts(prev => {
      const next = [...prev];
      next[idx] = data.sublots[idx]?.weight || "";
      return next;
    });
    setEditingSubLots(prev => {
      const next = [...prev];
      next[idx] = true;
      return next;
    });
  };

  const addSubLot = () => {
    setData(prev => {
      const next = structuredClone(prev);
      const label = String.fromCharCode(65 + next.sublots.length); // A=65
      next.sublots.push({ label, weight: "" });
      next.afterMelt.push({ label, weight: "", dipSample: "", fireAssayPurity: "" });
      return next;
    });
    setSubLotDrafts(prev => [...prev, ""]);
    setEditingSubLots(prev => [...prev, true]);
  };

  const removeSubLot = () => {
    if (data.sublots.length <= 1) return;
    setData(prev => {
      const next = structuredClone(prev);
      next.sublots.pop();
      next.afterMelt.pop();
      return next;
    });
    setSubLotDrafts(prev => prev.slice(0, -1));
    setEditingSubLots(prev => prev.slice(0, -1));
  };

  const save = () => {
    const initialWeight = parseFloat(data.initial.weight) || 0;
    const initialWeightGm = data.initial.unit === "kg" ? initialWeight * 1000 : initialWeight;
    if (initialWeightGm > 0 && editingSubLots.some((isEditing, idx) => isEditing && subLotDraftTotal(idx) > initialWeightGm + 0.001)) return;

    const next = structuredClone(data);
    editingSubLots.forEach((isEditing, idx) => {
      if (isEditing && next.sublots[idx]) next.sublots[idx].weight = subLotDrafts[idx] ?? "";
    });
    onUpdate(next);
    onClose();
  };

  const done = stagesDone(data);
  const pct = Math.round((done / STAGES.length) * 100);

  // determine if a stage has data
  const hasData = {
    initial:     !!data.initial.weight,
    sublots:     data.sublots.some(s => s.weight),
    afterMelt:   data.afterMelt.some(s => s.weight) || !!data.recoveryWeight,
    popcorn:     !!data.popcorn.weight,
    powder:      !!data.powder.weight,
    fine:        !!(data.fine.fineWeight || data.fine.fineSampleWeight),
    fireAssay:   !!data.fireAssay.purity,
    silverCalc:  !!data.silverCalc.targetPurity,
    fineProduct: !!(data.fineProduct.weight || fineProductCalc),
    undissolved: !!(data.undissolved.weight || data.undissolved.xrfPurity),
    goldInSilver:!!(data.goldInSilver.goldWeight || data.goldInSilver.fineGold),
  };

  // auto-calculations
  const subTotal = data.sublots.reduce((s, l) => s + (parseFloat(l.weight) || 0), 0);
  const initialWt = parseFloat(data.initial.weight) || 0;
  const initialWtGm = data.initial.unit === "kg" ? initialWt * 1000 : initialWt;
  const subTotalExceeds = initialWt > 0 && subTotal > initialWt + 0.001;
  const afterMeltTotal = data.afterMelt.reduce((s, l) => s + (parseFloat(l.weight) || 0), 0);
  const recovery = data.initial.weight && afterMeltTotal
    ? ((afterMeltTotal / parseFloat(data.initial.weight)) * 100).toFixed(2)
    : null;
  const fineGoldCalc = data.fine.fineWeight && data.fireAssay.purity
    ? ((parseFloat(data.fine.fineWeight) * parseFloat(data.fireAssay.purity)) / 100).toFixed(3)
    : null;

  const effectiveFineWeight = (() => {
    const fw = parseFloat(data.fine.fineWeight) || 0;
    const sw = parseFloat(data.fine.fineSampleWeight) || 0;
    return fw > 0 ? fw - sw : 0;
  })();

  const silverMixCalc = (() => {
    const fw = effectiveFineWeight;
    const fa = parseFloat(data.fireAssay.purity);
    const tp = parseFloat(data.silverCalc.targetPurity);
    if (!fw || !fa || !tp) return null;
    return ((fw * (fa / 100)) - (fw * (tp / 100))).toFixed(3);
  })();

  // Fine product = sum(afterMelt weight × fire assay purity) per sub-lot
  const fineProductCalc = (() => {
    const hasData = data.afterMelt.some(am => am.weight && am.fireAssayPurity);
    if (!hasData) return null;
    return data.afterMelt.reduce((s, am) => {
      const w = parseFloat(am.weight) || 0;
      const p = parseFloat(am.fireAssayPurity) || 0;
      return s + w * p / 100;
    }, 0);
  })();

  // Fine gold in each output stream
  const fineGoldActual        = effectiveFineWeight > 0 && parseFloat(data.fireAssay.purity) > 0
    ? effectiveFineWeight * parseFloat(data.fireAssay.purity) / 100 : 0;
  const fineGoldSilver        = parseFloat(data.goldInSilver.fineGold) || 0;
  const fineGoldUndissolved   = (parseFloat(data.undissolved.weight) || 0) * (parseFloat(data.undissolved.xrfPurity) || 0) / 100;
  const totalFineOut          = fineGoldActual + fineGoldSilver + fineGoldUndissolved;
  // Loss = Fine Product − (Fine Received + Fine Gold in Silver + Fine Gold in Undissolved)
  const processingLoss = fineProductCalc !== null && totalFineOut > 0
    ? fineProductCalc - totalFineOut
    : null;

  return (
    <>
      {showReport && <LotReport lot={data} onClose={() => setShowReport(false)} />}
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(3px)" }} />
      <div className="grms-scroll" style={{ position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 51, width: 480, background: "var(--panel)", borderLeft: "1px solid var(--line)", display: "flex", flexDirection: "column", overflowY: "auto" }}>

        {/* Header */}
        <div style={{ padding: "18px 20px", borderBottom: "1px solid var(--line)", flexShrink: 0, position: "sticky", top: 0, background: "var(--panel)", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: 18 }}>{data.lotNo}</div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>Created {fmtDate(data.createdAt)}</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setShowReport(true)} style={{ height: 34, padding: "0 12px", borderRadius: 8, background: "var(--panel-2)", border: "1px solid var(--gold-line)", color: "var(--gold-soft)", fontWeight: 700, fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
                <Printer size={13} /> Report
              </button>
              <button onClick={save} style={{ height: 34, padding: "0 14px", borderRadius: 8, background: "linear-gradient(135deg, var(--gold) 0%, #a67c1a 100%)", border: "none", color: "#1a1407", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
                Save
              </button>
              <button onClick={onClose} style={{ width: 34, height: 34, borderRadius: 8, background: "var(--panel-2)", border: "1px solid var(--line)", color: "var(--muted)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <X size={15} />
              </button>
            </div>
          </div>
          {/* Progress */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
            <span style={{ fontSize: 11, color: "var(--muted)" }}>{done} / {STAGES.length} stages</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: "var(--gold-soft)" }}>{pct}%</span>
          </div>
          <div style={{ height: 4, background: "var(--line)", borderRadius: 99 }}>
            <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg, var(--gold) 0%, #e6c873 100%)", borderRadius: 99 }} />
          </div>
        </div>

        {/* Accordion stages */}
        <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>

          {/* 1 — Initial */}
          <StageSection openStage={openStage} onToggle={toggle} hasData={hasData} stageKey="initial">
            <Grid2>
              <FRow label="LOT NO.">
                <input value={data.lotNo} onChange={e => setField("lotNo", e.target.value)} style={inp} />
              </FRow>
              <FRow label="UNIT">
                <select value={data.initial.unit} onChange={e => setField("initial.unit", e.target.value)} style={inp}>
                  <option>gm</option><option>kg</option>
                </select>
              </FRow>
            </Grid2>
            <FRow label={`INITIAL METAL WEIGHT (${data.initial.unit})`}>
              <input type="number" step="0.001" value={data.initial.weight} onChange={e => setField("initial.weight", e.target.value)} style={inp} placeholder="0.000" />
            </FRow>
          </StageSection>

          {/* 2 — Sub-lots */}
          <StageSection openStage={openStage} onToggle={toggle} hasData={hasData} stageKey="sublots">
            {/* Inputs */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {data.sublots.map((sl, i) => {
                const lotLabel = `LOT ${data.lotNo.replace("LOT-", "")}${sl.label}`;
                const isEditing = editingSubLots[i] ?? !sl.weight;
                const draftTotal = subLotDraftTotal(i);
                const draftExceeds = isEditing && initialWtGm > 0 && draftTotal > initialWtGm + 0.001;

                return (
                  <div key={sl.label} style={{ background: "var(--panel)", border: "1px solid var(--line)", borderRadius: 8, padding: 10, display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                      <Lbl>{lotLabel} - WEIGHT (gm)</Lbl>
                      {!isEditing && (
                        <button
                          onClick={() => editSubLotWeight(i)}
                          title={`Edit ${lotLabel} weight`}
                          style={{ width: 30, height: 30, borderRadius: 8, background: "var(--panel-2)", border: "1px solid var(--line)", color: "var(--muted)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                        >
                          <Pencil size={13} />
                        </button>
                      )}
                    </div>

                    {isEditing ? (
                      <>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 8, alignItems: "center" }}>
                          <input
                            type="number"
                            step="0.001"
                            value={subLotDrafts[i] ?? ""}
                            onChange={e => setSubLotDraft(i, e.target.value)}
                            onKeyDown={e => e.key === "Enter" && !draftExceeds && updateSubLotWeight(i)}
                            style={{ ...inp, border: draftExceeds ? "1px solid rgba(248,113,113,0.65)" : inp.border }}
                            placeholder="0.000"
                          />
                          <button
                            disabled={draftExceeds}
                            onClick={() => updateSubLotWeight(i)}
                            style={{ height: 36, padding: "0 12px", borderRadius: 8, background: draftExceeds ? "rgba(148,163,184,0.08)" : "var(--gold-dim)", border: draftExceeds ? "1px solid var(--line)" : "1px solid var(--gold-line)", color: draftExceeds ? "var(--muted)" : "var(--gold-soft)", fontWeight: 700, fontSize: 13, cursor: draftExceeds ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, whiteSpace: "nowrap", opacity: draftExceeds ? 0.7 : 1 }}
                          >
                            <Check size={13} /> Update
                          </button>
                        </div>
                        {draftExceeds && (
                          <div style={{ padding: "7px 10px", borderRadius: 8, background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.3)", color: "#f87171", fontSize: 12, lineHeight: 1.4 }}>
                            Exceeds initial weight. Total would be {draftTotal.toFixed(3)} gm / {initialWtGm.toFixed(3)} gm.
                          </div>
                        )}
                      </>
                    ) : (
                      <div style={{ minHeight: 36, padding: "8px 11px", borderRadius: 8, background: "var(--bg)", border: "1px solid transparent", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: sl.weight ? "var(--txt)" : "var(--muted)" }}>
                          {sl.weight || "Not set"}
                        </span>
                        <span style={{ fontSize: 12, color: "var(--muted)", flexShrink: 0 }}>gm</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Add / Remove controls */}
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 4 }}>
              <button
                onClick={addSubLot}
                style={{ display: "flex", alignItems: "center", gap: 6, height: 34, padding: "0 14px", borderRadius: 8, background: "var(--gold-dim)", border: "1px solid var(--gold-line)", color: "var(--gold-soft)", fontWeight: 700, fontSize: 13, cursor: "pointer" }}
              >
                <Plus size={13} /> Add Sub-lot {String.fromCharCode(65 + data.sublots.length)}
              </button>
              {data.sublots.length > 1 && (
                <button
                  onClick={removeSubLot}
                  style={{ display: "flex", alignItems: "center", gap: 6, height: 34, padding: "0 12px", borderRadius: 8, background: "transparent", border: "1px solid rgba(248,113,113,0.3)", color: "#f87171", fontWeight: 600, fontSize: 13, cursor: "pointer" }}
                >
                  − Remove Last
                </button>
              )}
              <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--muted)" }}>
                {data.sublots.length} sub-lot{data.sublots.length !== 1 ? "s" : ""}
              </span>
            </div>

            {subTotal > 0 && (
              <div style={{
                padding: "8px 12px", borderRadius: 8, fontSize: 12,
                display: "flex", justifyContent: "space-between", alignItems: "center",
                background: subTotalExceeds ? "rgba(248,113,113,0.1)" : "var(--panel)",
                border: subTotalExceeds ? "1px solid rgba(248,113,113,0.3)" : "1px solid transparent",
              }}>
                <span style={{ color: subTotalExceeds ? "#f87171" : "var(--muted)" }}>
                  {subTotalExceeds ? "⚠ Exceeds initial weight!" : "Total Sub-lot Weight"}
                </span>
                <span style={{ fontWeight: 700, color: subTotalExceeds ? "#f87171" : "var(--txt)" }}>
                  {subTotal.toFixed(3)} gm
                  {initialWt > 0 && <span style={{ fontWeight: 400, color: "var(--muted)", marginLeft: 6 }}>/ {initialWt.toFixed(3)} gm</span>}
                </span>
              </div>
            )}
          </StageSection>

          {/* 3 — After Melt */}
          <StageSection openStage={openStage} onToggle={toggle} hasData={hasData} stageKey="afterMelt">
            {data.afterMelt.map((sl, i) => (
              <div key={sl.label}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "var(--gold-soft)", marginBottom: 8, letterSpacing: "0.06em" }}>
                  LOT {data.lotNo.replace("LOT-", "")}{sl.label}
                </div>
                <Grid3>
                  <FRow label="WEIGHT AFTER MELT (gm)">
                    <input type="number" step="0.001" value={sl.weight} onChange={e => setSubLot("afterMelt", i, "weight", e.target.value)} style={inp} placeholder="0.000" />
                  </FRow>
                  <FRow label="DIP SAMPLE WEIGHT (gm)">
                    <input type="number" step="0.001" value={sl.dipSample} onChange={e => setSubLot("afterMelt", i, "dipSample", e.target.value)} style={inp} placeholder="0.000" />
                  </FRow>
                  <FRow label="FIRE ASSAY PURITY (%)">
                    <input type="number" step="0.001" max="100" value={sl.fireAssayPurity} onChange={e => setSubLot("afterMelt", i, "fireAssayPurity", e.target.value)} style={inp} placeholder="0.000" />
                  </FRow>
                </Grid3>
                {sl.weight && sl.fireAssayPurity && (
                  <div style={{ padding: "7px 11px", background: "var(--panel)", borderRadius: 7, fontSize: 12, display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--muted)" }}>Fine Gold in sub-lot</span>
                    <span style={{ fontWeight: 700, color: "var(--gold-soft)" }}>
                      {(parseFloat(sl.weight) * parseFloat(sl.fireAssayPurity) / 100).toFixed(3)} gm
                    </span>
                  </div>
                )}
              </div>
            ))}
            <FRow label="RECOVERY WEIGHT (gm)">
              <input type="number" step="0.001" value={data.recoveryWeight} onChange={e => setField("recoveryWeight", e.target.value)} style={inp} placeholder="0.000" />
            </FRow>
            {recovery && (
              <div style={{ padding: "8px 12px", background: "var(--panel)", borderRadius: 8, fontSize: 12, color: "var(--muted)", display: "flex", justifyContent: "space-between" }}>
                <span>Recovery %</span>
                <span style={{ fontWeight: 700, color: "#34d399" }}>{recovery}%</span>
              </div>
            )}
          </StageSection>

          {/* 4 — Popcorn */}
          <StageSection openStage={openStage} onToggle={toggle} hasData={hasData} stageKey="popcorn">
            <FRow label="AFTER MELT POPCORN WEIGHT (gm)">
              <input type="number" step="0.001" value={data.popcorn.weight} onChange={e => setField("popcorn.weight", e.target.value)} style={inp} placeholder="0.000" />
            </FRow>
          </StageSection>

          {/* 5 — Powder */}
          <StageSection openStage={openStage} onToggle={toggle} hasData={hasData} stageKey="powder">
            <FRow label="POWDER WEIGHT (gm)">
              <input type="number" step="0.001" value={data.powder.weight} onChange={e => setField("powder.weight", e.target.value)} style={inp} placeholder="0.000" />
            </FRow>
          </StageSection>

          {/* 6 — Fine */}
          <StageSection openStage={openStage} onToggle={toggle} hasData={hasData} stageKey="fine">
            <Grid2>
              <FRow label="FINE WEIGHT (gm)">
                <input type="number" step="0.001" value={data.fine.fineWeight} onChange={e => setField("fine.fineWeight", e.target.value)} style={inp} placeholder="0.000" />
              </FRow>
              <FRow label="FINE SAMPLE WEIGHT (gm)">
                <input type="number" step="0.001" value={data.fine.fineSampleWeight} onChange={e => setField("fine.fineSampleWeight", e.target.value)} style={inp} placeholder="0.000" />
              </FRow>
            </Grid2>
          </StageSection>

          {/* 7 — Fine Gold Fire Assay */}
          <StageSection openStage={openStage} onToggle={toggle} hasData={hasData} stageKey="fireAssay">
            <FRow label="FINE GOLD FIRE ASSAY PURITY (%)">
              <input type="number" step="0.01" max="100" value={data.fireAssay.purity} onChange={e => setField("fireAssay.purity", e.target.value)} style={inp} placeholder="e.g. 99.9" />
            </FRow>
            {fineGoldCalc && (
              <div style={{ padding: "8px 12px", background: "var(--panel)", borderRadius: 8, fontSize: 12, color: "var(--muted)", display: "flex", justifyContent: "space-between" }}>
                <span>Calculated Fine Gold</span>
                <span style={{ fontWeight: 700, color: "var(--gold-soft)" }}>{fineGoldCalc} gm</span>
              </div>
            )}
          </StageSection>

          {/* 8 — Silver Mix Weight Calculation */}
          <StageSection openStage={openStage} onToggle={toggle} hasData={hasData} stageKey="silverCalc">
            {/* Read-only reference rows */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ padding: "10px 12px", background: "var(--panel)", borderRadius: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <span style={{ fontSize: 12, color: "var(--muted)" }}>Fine Weight (excl. sample)</span>
                  {data.fine.fineSampleWeight && (
                    <div style={{ fontSize: 10, color: "var(--muted-2)", marginTop: 2 }}>Sample excluded</div>
                  )}
                </div>
                <span style={{ fontWeight: 700, fontSize: 13, color: effectiveFineWeight > 0 ? "var(--txt)" : "var(--muted-2)" }}>
                  {effectiveFineWeight > 0 ? `${effectiveFineWeight.toFixed(3)} gm` : "—"}
                </span>
              </div>
              <div style={{ padding: "10px 12px", background: "var(--panel)", borderRadius: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, color: "var(--muted)" }}>Fire Assay Purity</span>
                <span style={{ fontWeight: 700, fontSize: 13, color: data.fireAssay.purity ? "var(--gold-soft)" : "var(--muted-2)" }}>
                  {data.fireAssay.purity ? `${data.fireAssay.purity}%` : "—"}
                </span>
              </div>
            </div>

            {/* Single user input */}
            <FRow label="TARGET PURITY (%)">
              <input
                type="number" step="0.01" max="100"
                value={data.silverCalc.targetPurity}
                onChange={e => setField("silverCalc.targetPurity", e.target.value)}
                style={inp}
                placeholder="0.00"
              />
            </FRow>

            {/* Calculated result */}
            {silverMixCalc !== null ? (
              <div style={{ padding: "12px 14px", background: "var(--gold-dim)", border: "1px solid var(--gold-line)", borderRadius: 9, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "var(--gold-soft)", letterSpacing: "0.06em", marginBottom: 2 }}>SILVER MIX WEIGHT</div>
                  <div style={{ fontSize: 10, color: "var(--muted)" }}>
                    ({effectiveFineWeight.toFixed(3)} × {data.fireAssay.purity}/100) − ({effectiveFineWeight.toFixed(3)} × {data.silverCalc.targetPurity}/100)
                  </div>
                </div>
                <span style={{ fontWeight: 800, fontSize: 20, color: "var(--gold)" }}>{silverMixCalc} <span style={{ fontSize: 13, fontWeight: 600 }}>gm</span></span>
              </div>
            ) : (data.silverCalc.targetPurity && (!data.fine.fineWeight || !data.fireAssay.purity)) ? (
              <div style={{ padding: "9px 12px", borderRadius: 8, background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.25)", fontSize: 12, color: "#f87171" }}>
                {!data.fine.fineWeight ? "Enter Fine Weight in Fine Analysis stage first." : "Enter Fire Assay Purity in stage 7 first."}
              </div>
            ) : null}
          </StageSection>

          {/* 9 — Fine Product */}
          <StageSection openStage={openStage} onToggle={toggle} hasData={hasData} stageKey="fineProduct">
            {/* Auto-calculated fine product */}
            {fineProductCalc !== null && (
              <div style={{ padding: "12px 14px", background: "var(--gold-dim)", border: "1px solid var(--gold-line)", borderRadius: 9, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "var(--gold-soft)", letterSpacing: "0.06em", marginBottom: 2 }}>FINE PRODUCT (CALCULATED)</div>
                  <div style={{ fontSize: 10, color: "var(--muted)" }}>Σ (After Melt Weight × Fire Assay Purity / 100)</div>
                </div>
                <span style={{ fontWeight: 800, fontSize: 20, color: "var(--gold)" }}>{fineProductCalc.toFixed(3)} <span style={{ fontSize: 13, fontWeight: 600 }}>gm</span></span>
              </div>
            )}
            {/* Actual measured weight (optional override) */}
            <FRow label="ACTUAL FINE PRODUCT WEIGHT (gm)">
              <input type="number" step="0.001" value={data.fineProduct.weight} onChange={e => setField("fineProduct.weight", e.target.value)} style={inp} placeholder="Leave blank to use calculated" />
            </FRow>
            {/* Loss display */}
            {processingLoss !== null && (
              <div style={{ padding: "10px 13px", borderRadius: 8, display: "flex", justifyContent: "space-between", alignItems: "center",
                background: processingLoss > 0 ? "rgba(248,113,113,0.08)" : "rgba(52,211,153,0.08)",
                border: `1px solid ${processingLoss > 0 ? "rgba(248,113,113,0.3)" : "rgba(52,211,153,0.25)"}`,
              }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: processingLoss > 0 ? "#f87171" : "#34d399" }}>
                    PROCESSING {processingLoss > 0 ? "LOSS" : "GAIN"}
                  </div>
                  <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 2 }}>Fine Product − (Fine Received + Fine Gold in Silver + Fine Gold in Undissolved)</div>
                </div>
                <span style={{ fontWeight: 800, fontSize: 18, color: processingLoss > 0 ? "#f87171" : "#34d399" }}>
                  {processingLoss > 0 ? "−" : "+"}{Math.abs(processingLoss).toFixed(3)} <span style={{ fontSize: 12, fontWeight: 600 }}>gm</span>
                </span>
              </div>
            )}
          </StageSection>

          {/* 10 — Undissolved */}
          <StageSection openStage={openStage} onToggle={toggle} hasData={hasData} stageKey="undissolved">
            <Grid2>
              <FRow label="UNDISSOLVED WEIGHT (gm)">
                <input type="number" step="0.001" value={data.undissolved.weight} onChange={e => setField("undissolved.weight", e.target.value)} style={inp} placeholder="0.000" />
              </FRow>
              <FRow label="UNDISSOLVED XRF PURITY (%)">
                <input type="number" step="0.01" max="100" value={data.undissolved.xrfPurity} onChange={e => setField("undissolved.xrfPurity", e.target.value)} style={inp} placeholder="0.00" />
              </FRow>
            </Grid2>
          </StageSection>

          {/* 11 — Gold in Silver */}
          <StageSection openStage={openStage} onToggle={toggle} hasData={hasData} stageKey="goldInSilver">
            <Grid2>
              <FRow label="GOLD IN SILVER WEIGHT (gm)">
                <input type="number" step="0.001" value={data.goldInSilver.goldWeight} onChange={e => setField("goldInSilver.goldWeight", e.target.value)} style={inp} placeholder="0.000" />
              </FRow>
              <FRow label="FINE GOLD IN SILVER (gm)">
                <input type="number" step="0.001" value={data.goldInSilver.fineGold} onChange={e => setField("goldInSilver.fineGold", e.target.value)} style={inp} placeholder="0.000" />
              </FRow>
            </Grid2>
          </StageSection>

          {/* Mark complete */}
          <button
            onClick={() => {
              const next = data.status === "Completed" ? "In Progress" : "Completed";
              setData(p => ({ ...p, status: next }));
              if (next === "Completed") setShowReport(true);
            }}
            style={{
              marginTop: 8, height: 40, borderRadius: 9,
              background: data.status === "Completed" ? "rgba(52,211,153,0.1)" : "var(--panel-2)",
              border: `1px solid ${data.status === "Completed" ? "rgba(52,211,153,0.3)" : "var(--line)"}`,
              color: data.status === "Completed" ? "#34d399" : "var(--muted)",
              fontWeight: 700, fontSize: 13, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
            }}
          >
            <CheckCircle2 size={15} />
            {data.status === "Completed" ? "Marked as Completed" : "Mark as Completed"}
          </button>
        </div>
      </div>
    </>
  );
}

// ── New Lot Modal ──────────────────────────────────────────────────────────
function NewLotModal({ onClose, onAdd, nextId }) {
  const [lotNo, setLotNo] = useState("");
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("gm");

  const submit = () => {
    if (!lotNo.trim()) return;
    const l = emptyLot(nextId, lotNo.trim().toUpperCase());
    l.initial.weight = weight;
    l.initial.unit = unit;
    onAdd(l);
    onClose();
  };

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 60, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(3px)" }} />
      <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 61, width: 440, background: "var(--panel)", border: "1px solid var(--line)", borderRadius: 16, overflow: "hidden" }}>
        <div style={{ padding: "18px 20px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: "var(--gold-dim)", border: "1px solid var(--gold-line)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Hash size={15} style={{ color: "var(--gold)" }} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 15 }}>New Processing Lot</div>
              <div style={{ fontSize: 11.5, color: "var(--muted)" }}>ID: {nextId}</div>
            </div>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, background: "var(--panel-2)", border: "1px solid var(--line)", color: "var(--muted)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <X size={15} />
          </button>
        </div>
        <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
          <FRow label="LOT NUMBER *">
            <input placeholder="e.g. LOT-6" value={lotNo} onChange={e => setLotNo(e.target.value)} style={inp} onKeyDown={e => e.key === "Enter" && submit()} />
          </FRow>
          <Grid2>
            <FRow label="INITIAL METAL WEIGHT">
              <input type="number" step="0.001" placeholder="0.000" value={weight} onChange={e => setWeight(e.target.value)} style={inp} />
            </FRow>
            <FRow label="UNIT">
              <select value={unit} onChange={e => setUnit(e.target.value)} style={inp}>
                <option>gm</option><option>kg</option>
              </select>
            </FRow>
          </Grid2>
          <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
            <button onClick={onClose} style={{ flex: 1, height: 42, borderRadius: 9, background: "var(--panel-2)", border: "1px solid var(--line)", color: "var(--muted)", fontWeight: 600, fontSize: 13.5, cursor: "pointer" }}>Cancel</button>
            <button onClick={submit} style={{ flex: 2, height: 42, borderRadius: 9, background: "linear-gradient(135deg, var(--gold) 0%, #a67c1a 100%)", border: "none", color: "#1a1407", fontWeight: 700, fontSize: 13.5, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
              <Plus size={15} /> Create Lot
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────
export default function MetalProcessing() {
  const [lots, setLots] = useState(SAMPLE_LOTS);
  const [selectedId, setSelectedId] = useState(null);
  const [showNew, setShowNew] = useState(false);

  const selected = lots.find(l => l.id === selectedId);
  const nextId = `LOT-${String(lots.length + 1).padStart(3, "0")}`;

  const addLot = lot => setLots(prev => [lot, ...prev]);
  const updateLot = updated => setLots(prev => prev.map(l => l.id === updated.id ? updated : l));

  const inProgress = lots.filter(l => l.status === "In Progress").length;
  const completed  = lots.filter(l => l.status === "Completed").length;

  return (
    <div className="p-6 md:p-10">
      {/* Header */}
      <div style={{ marginBottom: 28, display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <div className="font-display" style={{ fontSize: 13, letterSpacing: "0.14em", color: "var(--gold)" }}>OPERATIONS</div>
          <h1 className="font-display" style={{ fontWeight: 700, fontSize: 28, marginTop: 4 }}>Metal Processing</h1>
          <p style={{ color: "var(--muted)", marginTop: 6, fontSize: 13.5 }}>
            Track each lot through the full refinery process.
          </p>
        </div>
        <button onClick={() => setShowNew(true)} style={{ display: "flex", alignItems: "center", gap: 7, padding: "10px 18px", height: 42, borderRadius: 10, background: "linear-gradient(135deg, var(--gold) 0%, #a67c1a 100%)", border: "none", color: "#1a1407", fontWeight: 700, fontSize: 13.5, cursor: "pointer", alignSelf: "center" }}>
          <Plus size={15} /> New Lot
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 16, marginBottom: 28, flexWrap: "wrap" }}>
        {[
          { label: "Total Lots", value: lots.length, color: "var(--txt)" },
          { label: "In Progress", value: inProgress, color: "var(--gold-soft)" },
          { label: "Completed",   value: completed,  color: "#34d399" },
        ].map(s => (
          <div key={s.label} style={{ background: "var(--panel)", border: "1px solid var(--line)", borderRadius: 10, padding: "12px 20px", display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ fontSize: 26, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 13, color: "var(--muted)" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Lot grid */}
      {lots.length === 0 ? (
        <div style={{ textAlign: "center", color: "var(--muted)", padding: "80px 0", fontSize: 14 }}>
          No lots yet. Click <strong>New Lot</strong> to start.
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
          {lots.map(lot => (
            <LotCard key={lot.id} lot={lot} onClick={() => setSelectedId(lot.id)} />
          ))}
        </div>
      )}

      {selected && (
        <ProcessDrawer
          lot={selected}
          onClose={() => setSelectedId(null)}
          onUpdate={updateLot}
        />
      )}

      {showNew && (
        <NewLotModal
          onClose={() => setShowNew(false)}
          onAdd={addLot}
          nextId={nextId}
        />
      )}
    </div>
  );
}
