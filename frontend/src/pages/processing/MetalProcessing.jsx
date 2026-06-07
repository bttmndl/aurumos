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
    afterMelt:  [{ label: "A", weight: "", dipSample: "" }],
    recoveryWeight: "",
    popcorn:    { weight: "" },
    powder:     { weight: "" },
    fine:       { fineWeight: "", fineSampleWeight: "" },
    fireAssay:  { purity: "" },
    silverCalc: { value: "" },
    fineProduct:{ weight: "" },
    undissolved:{ weight: "", xrfPurity: "" },
    goldInSilver:{ goldWeight: "", fineGold: "" },
  };
}

const SAMPLE_LOTS = [
  (() => {
    const l = emptyLot("LOT-001", "LOT-4");
    l.initial = { weight: "500.00", unit: "gm" };
    l.sublots = [{ label: "A", weight: "168.00" }, { label: "B", weight: "166.00" }, { label: "C", weight: "166.00" }];
    l.afterMelt = [{ label: "A", weight: "162.50", dipSample: "1.20" }, { label: "B", weight: "160.80", dipSample: "1.15" }, { label: "C", weight: "161.00", dipSample: "1.10" }];
    // sample already has 3 sublots so this is fine
    l.recoveryWeight = "484.30";
    l.popcorn = { weight: "2.40" };
    l.powder = { weight: "1.80" };
    l.status = "In Progress";
    return l;
  })(),
  (() => {
    const l = emptyLot("LOT-002", "LOT-5");
    l.initial = { weight: "320.00", unit: "gm" };
    l.status = "In Progress";
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
    lot.recoveryWeight,
    lot.popcorn.weight,
    lot.powder.weight,
    lot.fine.fineWeight,
    lot.fireAssay.purity,
    lot.silverCalc.value,
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

// ── Processing Drawer ──────────────────────────────────────────────────────
function ProcessDrawer({ lot, onClose, onUpdate }) {
  const [openStage, setOpenStage] = useState(null);
  const [data, setData] = useState(structuredClone(lot));
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
      next.afterMelt.push({ label, weight: "", dipSample: "" });
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
    silverCalc:  !!data.silverCalc.value,
    fineProduct: !!data.fineProduct.weight,
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

  return (
    <>
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
                <Grid2>
                  <FRow label="WEIGHT AFTER MELT (gm)">
                    <input type="number" step="0.001" value={sl.weight} onChange={e => setSubLot("afterMelt", i, "weight", e.target.value)} style={inp} placeholder="0.000" />
                  </FRow>
                  <FRow label="DIP SAMPLE WEIGHT (gm)">
                    <input type="number" step="0.001" value={sl.dipSample} onChange={e => setSubLot("afterMelt", i, "dipSample", e.target.value)} style={inp} placeholder="0.000" />
                  </FRow>
                </Grid2>
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
            <FRow label="SILVER MIX WEIGHT CALCULATION (gm)">
              <input type="number" step="0.001" value={data.silverCalc.value} onChange={e => setField("silverCalc.value", e.target.value)} style={inp} placeholder="0.000" />
            </FRow>
          </StageSection>

          {/* 9 — Fine Product */}
          <StageSection openStage={openStage} onToggle={toggle} hasData={hasData} stageKey="fineProduct">
            <FRow label="FINE PRODUCT WEIGHT (gm)">
              <input type="number" step="0.001" value={data.fineProduct.weight} onChange={e => setField("fineProduct.weight", e.target.value)} style={inp} placeholder="0.000" />
            </FRow>
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
            onClick={() => { setData(p => ({ ...p, status: p.status === "Completed" ? "In Progress" : "Completed" })); }}
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
