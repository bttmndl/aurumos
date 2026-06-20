import { useState } from "react";
import { Printer, Plus } from "lucide-react";

// ── Style tokens ──────────────────────────────────────────────────────────────
const BD      = "1px solid #4b5563";
const HDR_BG  = "#1e3a8a";
const BLUE_BG = "#1d4ed8";
const PEACH   = "#fde8c8";
const LT_PCH  = "#fef3e8";
const LBL_BG  = "#f1f5f9";

const base = { border: BD, padding: "3px 5px", fontSize: 11, verticalAlign: "middle", color: "#1e293b" };
const lbl  = { ...base, background: LBL_BG, fontWeight: 700, textAlign: "left", whiteSpace: "nowrap" };
const val  = { ...base, background: "#fff", textAlign: "center" };

// ── Micro components ──────────────────────────────────────────────────────────
function TH({ children, colSpan, rowSpan, style = {} }) {
  return (
    <th colSpan={colSpan} rowSpan={rowSpan}
      style={{ ...base, fontWeight: 700, textAlign: "center", background: HDR_BG, color: "#fff", ...style }}>
      {children}
    </th>
  );
}
function TD({ children, colSpan, rowSpan, style = {} }) {
  return (
    <td colSpan={colSpan} rowSpan={rowSpan}
      style={{ ...base, textAlign: "center", background: "#fff", ...style }}>
      {children}
    </td>
  );
}
// defaultValue (uncontrolled) — lets the browser own the value so typing always works.
// onChange still fires to keep parent state in sync.
function Inp({ value, onChange, style = {} }) {
  return (
    <input
      defaultValue={value}
      onChange={e => onChange(e.target.value)}
      style={{
        background: "transparent", border: "none", outline: "none",
        width: "100%", textAlign: "center", fontSize: 11,
        color: "#1e293b", fontFamily: "inherit", padding: "1px 2px",
        cursor: "text",
        ...style,
      }}
    />
  );
}

// ── Initial data ──────────────────────────────────────────────────────────────
const INIT_HDR = {
  date: "18.06.2026",
  cupellationTemp: "1100", cupellationTime: "20", thicknessStrip: "0.14",
  parting1Time: "15",      parting2Time: "15",    deltaValue: "-0.117",
  cupellationDoneBy: "Bittu", partingDoneBy: "Bittu",
  weighningDoneBy: "Bittu",   xrfBy: "Bittu",
  testedBy: "Bittu",          approvedBy: "Bittu",
};

const newSample = (id) => ({
  id, sampleId: "", xrfGold: "", xrfSilver: "", xrfCopper: "", xrfPGM: "",
  approxWt: "", agAdded: "", leadTaken: "", copperAdded: "",
  replicates: [{ no: 1, m1: "", m2: "", fineness: "" }, { no: 2, m1: "", m2: "", fineness: "" }],
  avgFineness: "", replicateDiff: "", acceptanceCriteria: "", testResult: "",
});

const INIT_SAMPLES = [
  {
    id: 1, sampleId: "Elixir ILC",
    xrfGold: "99.95", xrfSilver: "0.05", xrfCopper: "Nill", xrfPGM: "Nill",
    approxWt: "250", agAdded: "625", leadTaken: "8", copperAdded: "20",
    replicates: [
      { no: 1, m1: "250.408", m2: "249.400", fineness: "995.507" },
      { no: 2, m1: "250.402", m2: "249.403", fineness: "995.543" },
    ],
    avgFineness: "995.53", replicateDiff: "0.00", acceptanceCriteria: "0.20", testResult: "OK",
  },
  newSample(2),
];

const INIT_PC = [
  { pc: "PC-1", m1: "250.631", addedAg: "626.578", m2: "250.716", delta: "-0.110" },
  { pc: "PC-2", m1: "250.616", addedAg: "626.54",  m2: "250.715", delta: "-0.124" },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function TechnicalDataSheet({ onBack }) {
  const [hdr, setHdr]         = useState(INIT_HDR);
  const [samples, setSamples] = useState(INIT_SAMPLES);
  const [pc, setPc]           = useState(INIT_PC);
  const [avgDelta, setAvgDelta]   = useState("-0.117");
  const [deltaDiff, setDeltaDiff] = useState("0.014");

  const setH   = (k, v) => setHdr(h => ({ ...h, [k]: v }));
  const setSpl = (si, k, v) => setSamples(p => { const n=[...p]; n[si]={...n[si],[k]:v}; return n; });
  const setRep = (si, ri, k, v) => setSamples(p => {
    const n=[...p], r=[...n[si].replicates];
    r[ri]={...r[ri],[k]:v}; n[si]={...n[si],replicates:r}; return n;
  });
  const setPcF = (i, k, v) => setPc(p => { const n=[...p]; n[i]={...n[i],[k]:v}; return n; });

  const addSample = () => setSamples(p => [...p, newSample(p.length + 1)]);
  const addPcRow  = () => setPc(p => [...p, { pc: `PC-${p.length+1}`, m1:"", addedAg:"", m2:"", delta:"" }]);

  const print = () => {
    const el = document.getElementById("fa-report-printable");
    if (!el) return;
    const w = window.open("", "_blank", "width=1400,height=900");
    if (!w) return;
    w.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8">
<title>Fire Assay Technical Report</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Arial,sans-serif;font-size:11px;padding:10px}
table{border-collapse:collapse;width:100%;table-layout:fixed}
th,td{border:1px solid #4b5563;padding:3px 5px;font-size:11px;vertical-align:middle}
input{border:none;outline:none;width:100%;text-align:center;font-size:11px;
      background:transparent;font-family:Arial,sans-serif;color:inherit}
@media print{body{padding:0}}
</style></head><body>${el.innerHTML}
<script>setTimeout(()=>{window.print();},400)<\/script>
</body></html>`);
    w.document.close();
  };

  // 18 columns; widths in px
  const COL_W = [44,74,66,74,44,38,54,52,44,48,40,66,66,62,58,52,66,58];

  const T = { borderCollapse:"collapse", width:"100%", tableLayout:"fixed" };

  return (
    <div className="p-6 md:p-10">
      {/* Toolbar */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
        <button onClick={onBack}
          style={{ fontSize:13, color:"var(--muted)", background:"none", border:"none", cursor:"pointer" }}>
          ← Back to Lab
        </button>
        <button onClick={print}
          style={{ display:"flex", alignItems:"center", gap:6, height:36, padding:"0 16px",
            borderRadius:8, background:"linear-gradient(135deg,var(--gold) 0%,#a67c1a 100%)",
            border:"none", color:"#1a1407", fontWeight:700, fontSize:13, cursor:"pointer" }}>
          <Printer size={14}/> Print / Export PDF
        </button>
      </div>

      {/* Printable area */}
      <div id="fa-report-printable"
        style={{ background:"#fff", padding:10, borderRadius:10, border:"1px solid #e2e8f0", overflowX:"auto", color:"#1e293b" }}>
        <table style={T}>
          <colgroup>
            {COL_W.map((w,i) => <col key={i} style={{ width:`${w}px` }}/>)}
          </colgroup>
          <tbody>

            {/* ── Row 1: Lab name title ──────────────────────────────── */}
            <tr style={{ height: 20 }}>
              <td colSpan={18} style={{ ...base, background:"#d4a017", color:"#1a1407",
                textAlign:"center", fontWeight:900, fontSize:15, letterSpacing:"0.08em", padding:"2px 10px" }}>
                ASSAY LABORATORY - VIJAY ANAND GOLD LLP
              </td>
            </tr>

            {/* ── Row 2: Date + Report subtitle ─────────────────────── */}
            <tr>
              <td style={{ ...lbl }}>Date :-</td>
              <td style={{ ...val }}><Inp value={hdr.date} onChange={v=>setH("date",v)}/></td>
              <td colSpan={14} style={{ ...base, background:BLUE_BG, color:"#fff",
                textAlign:"center", fontWeight:900, fontSize:14, letterSpacing:"0.05em" }}>
                FIRE ASSAY TECHNICAL REPORT
              </td>
              <td colSpan={2} style={{ ...base, background:HDR_BG, color:"#fff",
                textAlign:"center", fontWeight:700 }}>
                Foramat - F-34
              </td>
            </tr>

            {/* ── Row 3: Cupellation Temp / Time / Thickness ────────── */}
            <tr>
              <td colSpan={2} style={{ ...lbl, whiteSpace:"normal" }}>Cupellation Temp :-</td>
              <td colSpan={2} style={{ ...val }}><Inp value={hdr.cupellationTemp} onChange={v=>setH("cupellationTemp",v)}/></td>
              <td colSpan={4} style={{ ...lbl, textAlign:"center" }}>Cupellation Time (Min):-</td>
              <td colSpan={3} style={{ ...val }}><Inp value={hdr.cupellationTime} onChange={v=>setH("cupellationTime",v)}/></td>
              <td colSpan={3} style={{ ...lbl, textAlign:"center" }}>Thickness Strip(mm):-</td>
              <td colSpan={4} style={{ ...val }}><Inp value={hdr.thicknessStrip} onChange={v=>setH("thicknessStrip",v)}/></td>
            </tr>

            {/* ── Row 4: Parting Times / Delta Value ────────────────── */}
            <tr>
              <td colSpan={2} style={{ ...lbl }}>Parting 1 Time (Min.):-</td>
              <td colSpan={2} style={{ ...val }}><Inp value={hdr.parting1Time} onChange={v=>setH("parting1Time",v)}/></td>
              <td colSpan={4} style={{ ...lbl, textAlign:"center" }}>Parting 2 Time (Min.):-</td>
              <td colSpan={3} style={{ ...val }}><Inp value={hdr.parting2Time} onChange={v=>setH("parting2Time",v)}/></td>
              <td colSpan={3} style={{ ...lbl, textAlign:"center" }}>Delta Value  mg Δ :-</td>
              <td colSpan={4} style={{ ...base, background:PEACH, textAlign:"center", fontWeight:700 }}>
                <Inp value={hdr.deltaValue} onChange={v=>setH("deltaValue",v)}
                  style={{ fontWeight:700, color:"#b91c1c" }}/>
              </td>
            </tr>

            {/* ── Row 5: Operator fields ─────────────────────────────── */}
            <tr>
              <td colSpan={2} style={{ ...lbl }}>Cupellation Done By:-</td>
              <td colSpan={2} style={{ ...val }}><Inp value={hdr.cupellationDoneBy} onChange={v=>setH("cupellationDoneBy",v)}/></td>
              <td colSpan={2} style={{ ...lbl }}>Parting Done By:-</td>
              <td colSpan={4} style={{ ...val }}><Inp value={hdr.partingDoneBy} onChange={v=>setH("partingDoneBy",v)}/></td>
              <td colSpan={3} style={{ ...lbl, textAlign:"center" }}>Weighning Done By:-</td>
              <td colSpan={2} style={{ ...val }}><Inp value={hdr.weighningDoneBy} onChange={v=>setH("weighningDoneBy",v)}/></td>
              <td style={{ ...lbl, textAlign:"center" }}>XRF By:-</td>
              <td colSpan={2} style={{ ...val }}><Inp value={hdr.xrfBy} onChange={v=>setH("xrfBy",v)}/></td>
            </tr>

            {/* ── Column header row 1 ────────────────────────────────── */}
            <tr>
              <TH rowSpan={2}>Sample No.</TH>
              <TH rowSpan={2}>Sample ID/NO</TH>
              <TH colSpan={4} style={{ background:PEACH, color:"#92400e" }}>XRF Result (%)</TH>
              <TH rowSpan={2} style={{ background:LT_PCH, color:"#92400e" }}>Approx Sample Wt. to be taken (mg)</TH>
              <TH rowSpan={2}>Ag Added (mg.)</TH>
              <TH rowSpan={2}>Lead Taken (g.)</TH>
              <TH rowSpan={2}>Copper added (mg.)</TH>
              <TH rowSpan={2}>Replicate No.</TH>
              <TH rowSpan={2}>Sample Weight M1(mg)</TH>
              <TH rowSpan={2}>Weight of Cornet M2-(mg)</TH>
              <TH rowSpan={2}>Fineness Report in PPT ‰</TH>
              <TH rowSpan={2}>Avg. Fineness PPT ‰</TH>
              <TH rowSpan={2} style={{ background:PEACH, color:"#92400e" }}>Replicate Diff. (PPT)</TH>
              <TH rowSpan={2} style={{ background:PEACH, color:"#92400e" }}>Test Result Acceptance Criteria as per IS 1418</TH>
              <TH rowSpan={2} style={{ background:PEACH, color:"#92400e" }}>Test results (OK/Repeat)</TH>
            </tr>
            {/* ── Column header row 2 (XRF sub-cols) ───────────────── */}
            <tr>
              <TH style={{ background:PEACH, color:"#92400e" }}>% Gold</TH>
              <TH style={{ background:PEACH, color:"#92400e" }}>% Silver</TH>
              <TH style={{ background:PEACH, color:"#92400e" }}>% Copper</TH>
              <TH style={{ background:PEACH, color:"#92400e" }}>PGM</TH>
            </tr>

            {/* ── Sample data rows ───────────────────────────────────── */}
            {samples.map((s, si) =>
              s.replicates.map((rep, ri) => (
                <tr key={`${si}-${ri}`}>
                  {/* Cells that span all replicates — rendered only on first replicate row */}
                  {ri === 0 && <>
                    <TD rowSpan={s.replicates.length} style={{ fontWeight:700 }}>{s.id}</TD>
                    <TD rowSpan={s.replicates.length}>
                      <Inp value={s.sampleId} onChange={v=>setSpl(si,"sampleId",v)}/>
                    </TD>
                    <TD rowSpan={s.replicates.length} style={{ background:PEACH }}>
                      <Inp value={s.xrfGold} onChange={v=>setSpl(si,"xrfGold",v)}/>
                    </TD>
                    <TD rowSpan={s.replicates.length} style={{ background:PEACH }}>
                      <Inp value={s.xrfSilver} onChange={v=>setSpl(si,"xrfSilver",v)}/>
                    </TD>
                    <TD rowSpan={s.replicates.length} style={{ background:PEACH }}>
                      <Inp value={s.xrfCopper} onChange={v=>setSpl(si,"xrfCopper",v)}/>
                    </TD>
                    <TD rowSpan={s.replicates.length} style={{ background:PEACH }}>
                      <Inp value={s.xrfPGM} onChange={v=>setSpl(si,"xrfPGM",v)}/>
                    </TD>
                    <TD rowSpan={s.replicates.length} style={{ background:LT_PCH }}>
                      <Inp value={s.approxWt} onChange={v=>setSpl(si,"approxWt",v)}/>
                    </TD>
                    <TD rowSpan={s.replicates.length}>
                      <Inp value={s.agAdded} onChange={v=>setSpl(si,"agAdded",v)}/>
                    </TD>
                    <TD rowSpan={s.replicates.length}>
                      <Inp value={s.leadTaken} onChange={v=>setSpl(si,"leadTaken",v)}/>
                    </TD>
                    <TD rowSpan={s.replicates.length}>
                      <Inp value={s.copperAdded} onChange={v=>setSpl(si,"copperAdded",v)}/>
                    </TD>
                  </>}

                  {/* Per-replicate cells */}
                  <TD>{rep.no}</TD>
                  <TD><Inp value={rep.m1} onChange={v=>setRep(si,ri,"m1",v)}/></TD>
                  <TD><Inp value={rep.m2} onChange={v=>setRep(si,ri,"m2",v)}/></TD>
                  <TD><Inp value={rep.fineness} onChange={v=>setRep(si,ri,"fineness",v)}/></TD>

                  {/* Span-all result cells — first replicate row only */}
                  {ri === 0 && <>
                    <TD rowSpan={s.replicates.length} style={{ fontWeight:700 }}>
                      <Inp value={s.avgFineness} onChange={v=>setSpl(si,"avgFineness",v)}
                        style={{ fontWeight:700 }}/>
                    </TD>
                    <TD rowSpan={s.replicates.length} style={{ background:PEACH }}>
                      <Inp value={s.replicateDiff} onChange={v=>setSpl(si,"replicateDiff",v)}/>
                    </TD>
                    <TD rowSpan={s.replicates.length} style={{ background:PEACH }}>
                      <Inp value={s.acceptanceCriteria} onChange={v=>setSpl(si,"acceptanceCriteria",v)}/>
                    </TD>
                    <TD rowSpan={s.replicates.length}
                      style={{
                        background: s.testResult==="OK" ? "#16a34a" : s.testResult==="Repeat" ? "#dc2626" : PEACH,
                        color: (s.testResult==="OK"||s.testResult==="Repeat") ? "#fff" : "#1a1407",
                        fontWeight:700,
                      }}>
                      <Inp value={s.testResult} onChange={v=>setSpl(si,"testResult",v)}
                        style={{ fontWeight:700,
                          color:(s.testResult==="OK"||s.testResult==="Repeat") ? "#fff" : "#1a1407" }}/>
                    </TD>
                  </>}
                </tr>
              ))
            )}


            {/* ── Proof Check Gold header ────────────────────────────── */}
            <tr>
              <td colSpan={7} style={{ ...base, background:BLUE_BG, color:"#fff",
                fontWeight:800, fontSize:12, textAlign:"center", padding:"6px 10px" }}>
                Proof Check Gold ( Purity - 99.99 % Au)
              </td>
              <td colSpan={11} style={{ ...base, background:"#fff", fontWeight:800,
                fontSize:12, textAlign:"center", textDecoration:"underline", color:"#1e293b" }}>
                Acceptance Criteria:-
              </td>
            </tr>

            {/* ── PC column headers + acceptance criteria (spans down) ── */}
            <tr>
              {["PC No.","Weight M1 (mg)","Added Ag","Weight M2 (mg)","Delta","Avg. Delta","Delta Diff."]
                .map(h => (
                  <th key={h} style={{ ...base, background:HDR_BG, color:"#fff",
                    fontWeight:700, fontSize:10.5, textAlign:"center" }}>{h}</th>
                ))}
              <td colSpan={11} rowSpan={pc.length + 1}
                style={{ ...base, background:"#fff", fontSize:10.5,
                  padding:"5px 10px", verticalAlign:"top", lineHeight:1.5,
                  color:"#1e293b", textAlign:"left" }}>
                <strong>1)</strong> Delta difference should not be more than 0.04 mg in case of fine gold
                ( &gt;990 PPT) testing<br />
                <strong>2)</strong> Duplicate results should be in range of ± 0.2PPT for Fine gold
                (&gt;990 PPT) And ± 0.5PPT For Raw Gold ( 585 - 990 PPT)<br />
                <strong>3)</strong> If repeatability criteria does not meet as per IS 1418:2009 ,
                Assay to be repeat.
              </td>
            </tr>

            {/* ── PC data rows ───────────────────────────────────────── */}
            {pc.map((row, i) => (
              <tr key={i} style={{ height: 28 }}>
                <TD style={{ fontWeight:700 }}>{row.pc}</TD>
                <TD><Inp value={row.m1}      onChange={v=>setPcF(i,"m1",v)}/></TD>
                <TD><Inp value={row.addedAg} onChange={v=>setPcF(i,"addedAg",v)}/></TD>
                <TD><Inp value={row.m2}      onChange={v=>setPcF(i,"m2",v)}/></TD>
                <TD><Inp value={row.delta}   onChange={v=>setPcF(i,"delta",v)}/></TD>
                {i === 0 && <>
                  <TD rowSpan={pc.length} style={{ fontWeight:700 }}>
                    <Inp value={avgDelta} onChange={setAvgDelta} style={{ fontWeight:700 }}/>
                  </TD>
                  <TD rowSpan={pc.length}>
                    <Inp value={deltaDiff} onChange={setDeltaDiff}/>
                  </TD>
                </>}
              </tr>
            ))}

            {/* ── Footer ────────────────────────────────────────────── */}
            <tr>
              <td colSpan={4} style={{ ...lbl, textAlign:"center" }}>Tested By:-</td>
              <td colSpan={5} style={{ ...val, fontWeight:700 }}>
                <Inp value={hdr.testedBy} onChange={v=>setH("testedBy",v)} style={{ fontWeight:700 }}/>
              </td>
              <td colSpan={4} style={{ ...lbl, textAlign:"center" }}>Approved By:-</td>
              <td colSpan={5} style={{ ...val, fontWeight:700 }}>
                <Inp value={hdr.approvedBy} onChange={v=>setH("approvedBy",v)} style={{ fontWeight:700 }}/>
              </td>
            </tr>

          </tbody>
        </table>
      </div>

      {/* Action buttons */}
      <div style={{ marginTop:14, display:"flex", gap:10 }}>
        <button onClick={addSample}
          style={{ display:"flex", alignItems:"center", gap:6, height:34, padding:"0 14px",
            borderRadius:8, background:"var(--gold-dim)", border:"1px solid var(--gold-line)",
            color:"var(--gold-soft)", fontWeight:700, fontSize:12.5, cursor:"pointer" }}>
          <Plus size={13}/> Add Sample Row
        </button>
        <button onClick={addPcRow}
          style={{ display:"flex", alignItems:"center", gap:6, height:34, padding:"0 14px",
            borderRadius:8, background:"var(--panel-2)", border:"1px solid var(--line)",
            color:"var(--muted)", fontWeight:700, fontSize:12.5, cursor:"pointer" }}>
          <Plus size={13}/> Add PC Row
        </button>
      </div>
    </div>
  );
}
