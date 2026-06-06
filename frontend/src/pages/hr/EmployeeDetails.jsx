import { useState, useRef } from "react";
import {
  MapPin, Calendar, BadgeIndianRupee, Building2,
  Plus, X, User, Save, Pencil, Upload, FileText, Trash2, ImageIcon,
} from "lucide-react";

const DEPARTMENTS = ["Administration", "Minting", "Lab", "Refinery", "Melting"];

const EMPLOYEES_INIT = [
  { id: "EMP-001", name: "Rajesh Kumar",   designation: "Plant Manager",      department: "Administration", address: "12, MG Road, Mumbai, Maharashtra",      joined: "2018-04-01", salary: "₹85,000", photo: null, documents: [] },
  { id: "EMP-002", name: "Sunita Sharma",  designation: "HR Executive",        department: "Administration", address: "45, Sector 9, Noida, UP",               joined: "2019-07-15", salary: "₹42,000", photo: null, documents: [] },
  { id: "EMP-003", name: "Anil Verma",     designation: "Mint Operator",       department: "Minting",        address: "78, Gandhi Nagar, Jaipur, Rajasthan",   joined: "2020-02-10", salary: "₹38,000", photo: null, documents: [] },
  { id: "EMP-004", name: "Priya Nair",     designation: "Senior Analyst",      department: "Lab",            address: "5, Koramangala, Bengaluru, Karnataka",  joined: "2017-11-03", salary: "₹56,000", photo: null, documents: [] },
  { id: "EMP-005", name: "Mohammed Iqbal", designation: "Refinery Technician", department: "Refinery",       address: "22, Civil Lines, Hyderabad, Telangana", joined: "2021-06-20", salary: "₹47,000", photo: null, documents: [] },
  { id: "EMP-006", name: "Kavita Joshi",   designation: "Lab Chemist",         department: "Lab",            address: "33, Patel Nagar, Delhi",                joined: "2022-01-05", salary: "₹44,000", photo: null, documents: [] },
  { id: "EMP-007", name: "Deepak Singh",   designation: "Silver Refiner",      department: "Refinery",       address: "8, Lake Road, Kolkata, West Bengal",    joined: "2019-09-12", salary: "₹45,000", photo: null, documents: [] },
  { id: "EMP-008", name: "Anita Patel",    designation: "Accounts Officer",    department: "Administration", address: "90, Navrangpura, Ahmedabad, Gujarat",   joined: "2016-03-22", salary: "₹52,000", photo: null, documents: [] },
  { id: "EMP-009", name: "Ravi Tiwari",    designation: "Melting Supervisor",  department: "Melting",        address: "14, Saket, New Delhi",                  joined: "2018-08-14", salary: "₹49,000", photo: null, documents: [] },
  { id: "EMP-010", name: "Fatima Sheikh",  designation: "Quality Inspector",   department: "Minting",        address: "67, Bandra West, Mumbai, Maharashtra",  joined: "2023-03-01", salary: "₹40,000", photo: null, documents: [] },
  { id: "EMP-011", name: "Suresh Babu",    designation: "Gold Refiner",        department: "Refinery",       address: "29, T Nagar, Chennai, Tamil Nadu",      joined: "2015-12-01", salary: "₹58,000", photo: null, documents: [] },
  { id: "EMP-012", name: "Meena Rawat",    designation: "Melt Operator",       department: "Melting",        address: "11, Ramdaspeth, Nagpur, Maharashtra",   joined: "2020-10-07", salary: "₹36,000", photo: null, documents: [] },
];

const AVATAR_COLORS = [
  ["#d4af37", "#1a1407"], ["#818cf8", "#0f0f1a"], ["#34d399", "#021c14"],
  ["#fb923c", "#1c0a00"], ["#e879f9", "#1a0022"], ["#38bdf8", "#001c2e"],
];

const EMPTY_FORM = { name: "", designation: "", department: "Administration", address: "", joined: "", salary: "", photo: null, documents: [] };

function avatarColor(idx) { return AVATAR_COLORS[idx % AVATAR_COLORS.length]; }
function getInitials(name) {
  const p = name.trim().split(" ").filter(Boolean);
  if (!p.length) return "?";
  if (p.length === 1) return p[0][0].toUpperCase();
  return (p[0][0] + p[p.length - 1][0]).toUpperCase();
}
function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function readFile(file) {
  return new Promise(res => {
    const r = new FileReader();
    r.onload = e => res(e.target.result);
    r.readAsDataURL(file);
  });
}

/* ── Avatar bubble — shows photo if available, else initials ── */
function Avatar({ emp, idx, size = 56, fontSize = 18, border = "3px solid var(--panel)" }) {
  const [bg, fg] = avatarColor(idx);
  if (emp.photo) {
    return (
      <img src={emp.photo} alt={emp.name}
        style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover", border, boxShadow: `0 0 12px ${bg}55` }}
      />
    );
  }
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: `linear-gradient(135deg, ${bg} 0%, ${bg}bb 100%)`, color: fg, fontWeight: 800, fontSize, display: "flex", alignItems: "center", justifyContent: "center", border, boxShadow: `0 0 12px ${bg}55` }}>
      {getInitials(emp.name)}
    </div>
  );
}

/* ── Employee Card ── */
function EmployeeCard({ emp, idx, onClick }) {
  return (
    <button onClick={onClick}
      style={{ background: "var(--panel)", border: "1px solid var(--line)", borderRadius: 14, overflow: "hidden", display: "flex", flexDirection: "column", transition: "border-color 0.2s, box-shadow 0.2s, transform 0.18s", cursor: "pointer", textAlign: "left", padding: 0, width: "100%" }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--gold-line)"; e.currentTarget.style.boxShadow = "0 0 24px var(--gold-dim)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--line)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      <div style={{ position: "relative", height: 72, background: "var(--panel-2)", borderBottom: "1px solid var(--line)", width: "100%" }}>
        <div style={{ position: "absolute", bottom: -28, left: 20 }}>
          <Avatar emp={emp} idx={idx} />
        </div>
        <span style={{ position: "absolute", top: 12, right: 14, fontSize: 11, fontWeight: 700, color: "var(--muted)", background: "var(--bg)", border: "1px solid var(--line)", borderRadius: 99, padding: "2px 10px", letterSpacing: "0.06em" }}>
          {emp.id}
        </span>
      </div>
      <div style={{ padding: "36px 20px 20px", display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: 16 }}>{emp.name}</div>
          <div style={{ fontSize: 12.5, color: "var(--gold-soft)", fontWeight: 600, marginTop: 2 }}>{emp.designation}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          <InfoRow icon={Building2} label={emp.department} />
          <InfoRow icon={MapPin} label={emp.address} />
          <InfoRow icon={Calendar} label={`Joined ${formatDate(emp.joined)}`} />
          <InfoRow icon={BadgeIndianRupee} label={emp.salary + " / month"} />
        </div>
      </div>
    </button>
  );
}

function InfoRow({ icon: Icon, label }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
      <Icon size={13} style={{ color: "var(--muted)", marginTop: 2, flexShrink: 0 }} />
      <span style={{ fontSize: 12.5, color: "var(--muted)", lineHeight: 1.4 }}>{label}</span>
    </div>
  );
}

/* ── Employee Drawer ── */
function EmployeeDrawer({ emp, idx, onClose, onSave }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: emp.name, designation: emp.designation, department: emp.department, address: emp.address, joined: emp.joined, salary: emp.salary, photo: emp.photo || null });
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const photoRef = useRef();

  const fld = { background: "var(--bg)", border: "1px solid var(--line)", borderRadius: 8, padding: "8px 11px", color: "var(--txt)", fontSize: 13, outline: "none", width: "100%" };

  const handlePhotoChange = async e => {
    const file = e.target.files[0];
    if (!file) return;
    const url = await readFile(file);
    setForm(f => ({ ...f, photo: url }));
  };

  const handleSave = () => {
    onSave(emp.id, { ...form, name: form.name.trim() || emp.name, salary: form.salary.trim().startsWith("₹") ? form.salary.trim() : `₹${form.salary.trim()}` });
    setEditing(false);
  };

  const cancelEdit = () => {
    setForm({ name: emp.name, designation: emp.designation, department: emp.department, address: emp.address, joined: emp.joined, salary: emp.salary, photo: emp.photo || null });
    setEditing(false);
  };

  const details = [
    { label: "Employee ID",     value: emp.id },
    { label: "Designation",     value: emp.designation, Icon: User },
    { label: "Department",      value: emp.department, Icon: Building2 },
    { label: "Address",         value: emp.address, Icon: MapPin },
    { label: "Date of Joining", value: formatDate(emp.joined), Icon: Calendar },
    { label: "Monthly Salary",  value: emp.salary + " / month", Icon: BadgeIndianRupee },
  ];

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(3px)" }} />
      <div className="grms-scroll" style={{ position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 51, width: 420, background: "var(--panel)", borderLeft: "1px solid var(--line)", display: "flex", flexDirection: "column", overflowY: "auto" }}>

        {/* Header */}
        <div style={{ padding: "18px 20px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Avatar emp={emp} idx={idx} size={42} fontSize={15} border="2px solid var(--line)" />
            <div>
              <div style={{ fontWeight: 800, fontSize: 15 }}>{emp.name}</div>
              <div style={{ fontSize: 11.5, color: "var(--gold-soft)", fontWeight: 600 }}>{emp.designation} · {emp.id}</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => editing ? cancelEdit() : setEditing(true)} title={editing ? "Cancel" : "Edit Employee"}
              style={{ width: 32, height: 32, borderRadius: 8, border: editing ? "1px solid var(--gold-line)" : "1px solid var(--line)", background: editing ? "var(--gold-dim)" : "var(--panel-2)", color: editing ? "var(--gold-soft)" : "var(--muted)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Pencil size={14} />
            </button>
            <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid var(--line)", background: "var(--panel-2)", color: "var(--muted)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <X size={15} />
            </button>
          </div>
        </div>

        <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 18, flex: 1 }}>

          {/* Employee details / edit */}
          <div style={{ background: "var(--panel-2)", border: `1px solid ${editing ? "var(--gold-line)" : "var(--line)"}`, borderRadius: 12, overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--line)", fontSize: 11, fontWeight: 700, color: editing ? "var(--gold-soft)" : "var(--muted)", letterSpacing: "0.07em", display: "flex", alignItems: "center", gap: 6 }}>
              {editing ? <><Pencil size={11} /> EDITING DETAILS</> : "EMPLOYEE DETAILS"}
            </div>
            {editing ? (
              <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 13 }}>
                {/* Photo upload in edit */}
                <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "10px 0", borderBottom: "1px solid var(--line)" }}>
                  <div style={{ width: 60, height: 60, borderRadius: "50%", overflow: "hidden", border: "2px solid var(--line)", flexShrink: 0, background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {form.photo
                      ? <img src={form.photo} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      : <User size={24} style={{ color: "var(--muted-2)" }} />
                    }
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
                    <label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.06em" }}>PROFILE PHOTO</label>
                    <input ref={photoRef} type="file" accept="image/*" onChange={handlePhotoChange} style={{ display: "none" }} />
                    <div style={{ display: "flex", gap: 8 }}>
                      <button type="button" onClick={() => photoRef.current.click()} style={{ height: 32, padding: "0 12px", borderRadius: 7, background: "var(--bg)", border: "1px solid var(--line)", color: "var(--txt)", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
                        <Upload size={12} /> {form.photo ? "Change" : "Upload"}
                      </button>
                      {form.photo && (
                        <button type="button" onClick={() => setForm(f => ({ ...f, photo: null }))} style={{ height: 32, padding: "0 10px", borderRadius: 7, background: "transparent", border: "1px solid rgba(248,113,113,0.3)", color: "#f87171", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
                          <Trash2 size={12} /> Remove
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}><label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.06em" }}>FULL NAME</label><input value={form.name} onChange={set("name")} style={fld} /></div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}><label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.06em" }}>DESIGNATION</label><input value={form.designation} onChange={set("designation")} style={fld} /></div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}><label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.06em" }}>DEPARTMENT</label><select value={form.department} onChange={set("department")} style={fld}>{DEPARTMENTS.map(d => <option key={d}>{d}</option>)}</select></div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}><label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.06em" }}>DATE OF JOINING</label><input type="date" value={form.joined} onChange={set("joined")} style={fld} /></div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}><label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.06em" }}>ADDRESS</label><input value={form.address} onChange={set("address")} style={fld} /></div>
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}><label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.06em" }}>MONTHLY SALARY</label><input value={form.salary} onChange={set("salary")} style={fld} /></div>
                <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                  <button onClick={cancelEdit} style={{ flex: 1, height: 38, borderRadius: 8, background: "var(--bg)", border: "1px solid var(--line)", color: "var(--muted)", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Cancel</button>
                  <button onClick={handleSave} style={{ flex: 2, height: 38, borderRadius: 8, background: "linear-gradient(135deg, var(--gold) 0%, #a67c1a 100%)", border: "none", color: "#1a1407", fontWeight: 700, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}><Save size={14} /> Save Changes</button>
                </div>
              </div>
            ) : (
              details.map(({ label, value, Icon: RowIcon }) => (
                <div key={label} style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "11px 16px", borderBottom: "1px solid var(--line)", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7, color: "var(--muted)", fontSize: 13, flexShrink: 0 }}>{RowIcon && <RowIcon size={13} />}{label}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--txt)", textAlign: "right" }}>{value}</div>
                </div>
              ))
            )}
          </div>

          {/* Documents */}
          {emp.documents && emp.documents.length > 0 && (
            <div style={{ background: "var(--panel-2)", border: "1px solid var(--line)", borderRadius: 12, overflow: "hidden" }}>
              <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--line)", fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.07em", display: "flex", alignItems: "center", gap: 6 }}>
                <FileText size={12} /> DOCUMENTS ({emp.documents.length})
              </div>
              {emp.documents.map((doc, i) => (
                <a key={i} href={doc.url} download={doc.name} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", borderBottom: i < emp.documents.length - 1 ? "1px solid var(--line)" : "none", textDecoration: "none", color: "var(--txt)" }}
                  onMouseEnter={e => e.currentTarget.style.background = "var(--bg)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(129,140,248,0.1)", border: "1px solid rgba(129,140,248,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <FileText size={14} style={{ color: "#818cf8" }} />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 500, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{doc.name}</span>
                  <span style={{ fontSize: 11, color: "var(--muted)" }}>↓</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* ── Add Employee Modal ── */
function AddEmployeeModal({ onClose, onAdd, nextId }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const photoRef = useRef();
  const docsRef = useRef();

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const fld = { background: "var(--bg)", border: "1px solid var(--line)", borderRadius: 8, padding: "9px 12px", color: "var(--txt)", fontSize: 13.5, outline: "none", width: "100%" };

  const handlePhoto = async e => {
    const file = e.target.files[0];
    if (!file) return;
    const url = await readFile(file);
    setForm(f => ({ ...f, photo: url }));
  };

  const handleDocs = async e => {
    const files = [...e.target.files];
    const loaded = await Promise.all(files.map(async f => ({ name: f.name, url: await readFile(f) })));
    setForm(f => ({ ...f, documents: [...f.documents, ...loaded] }));
    e.target.value = "";
  };

  const removeDoc = i => setForm(f => ({ ...f, documents: f.documents.filter((_, j) => j !== i) }));

  const validate = () => {
    const e = {};
    if (!form.name.trim())        e.name = "Required";
    if (!form.designation.trim()) e.designation = "Required";
    if (!form.address.trim())     e.address = "Required";
    if (!form.joined)             e.joined = "Required";
    if (!form.salary.trim())      e.salary = "Required";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onAdd({ id: nextId, name: form.name.trim(), designation: form.designation.trim(), department: form.department, address: form.address.trim(), joined: form.joined, salary: form.salary.trim().startsWith("₹") ? form.salary.trim() : `₹${form.salary.trim()}`, photo: form.photo, documents: form.documents });
    onClose();
  };

  const Lbl = ({ text, err }) => (
    <label style={{ fontSize: 11, fontWeight: 700, color: err ? "#f87171" : "var(--muted)", letterSpacing: "0.07em" }}>
      {text}{err ? ` — ${err}` : ""}
    </label>
  );

  // temp employee object for Avatar preview
  const previewEmp = { name: form.name || "?", photo: form.photo };

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 52, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(3px)" }} />
      <div className="grms-scroll" style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 53, width: 560, maxHeight: "90vh", overflowY: "auto", background: "var(--panel)", border: "1px solid var(--line)", borderRadius: 16, overflow: "hidden" }}>

        {/* Header */}
        <div style={{ padding: "18px 20px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "var(--panel)", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: "var(--gold-dim)", border: "1px solid var(--gold-line)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <User size={17} style={{ color: "var(--gold)" }} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 15 }}>Add Employee</div>
              <div style={{ fontSize: 11.5, color: "var(--muted)" }}>New ID: {nextId}</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: "var(--panel-2)", border: "1px solid var(--line)", borderRadius: 8, width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)" }}>
            <X size={15} />
          </button>
        </div>

        <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 18 }}>

          {/* Photo upload */}
          <div style={{ background: "var(--panel-2)", border: "1px solid var(--line)", borderRadius: 12, overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--line)", fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.07em", display: "flex", alignItems: "center", gap: 6 }}>
              <ImageIcon size={12} /> PROFILE PHOTO
            </div>
            <div style={{ padding: 16, display: "flex", alignItems: "center", gap: 16 }}>
              {/* Preview */}
              <div style={{ width: 72, height: 72, borderRadius: "50%", overflow: "hidden", border: "2px solid var(--line)", flexShrink: 0, background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {form.photo
                  ? <img src={form.photo} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : <User size={28} style={{ color: "var(--muted-2)" }} />
                }
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
                <input ref={photoRef} type="file" accept="image/*" onChange={handlePhoto} style={{ display: "none" }} />
                <button onClick={() => photoRef.current.click()} style={{ height: 36, borderRadius: 8, background: "var(--bg)", border: "1px solid var(--line)", color: "var(--txt)", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  <Upload size={13} /> {form.photo ? "Change Photo" : "Upload Photo"}
                </button>
                {form.photo && (
                  <button onClick={() => setForm(f => ({ ...f, photo: null }))} style={{ height: 30, borderRadius: 8, background: "transparent", border: "1px solid rgba(248,113,113,0.3)", color: "#f87171", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                    <Trash2 size={12} /> Remove
                  </button>
                )}
                <div style={{ fontSize: 11.5, color: "var(--muted-2)" }}>JPG, PNG or WEBP · max 5MB</div>
              </div>
            </div>
          </div>

          {/* Basic info */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}><Lbl text="FULL NAME *" err={errors.name} /><input placeholder="e.g. Ramesh Gupta" value={form.name} onChange={set("name")} style={{ ...fld, borderColor: errors.name ? "#f87171" : "var(--line)" }} /></div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}><Lbl text="DESIGNATION *" err={errors.designation} /><input placeholder="e.g. Lab Technician" value={form.designation} onChange={set("designation")} style={{ ...fld, borderColor: errors.designation ? "#f87171" : "var(--line)" }} /></div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}><Lbl text="DEPARTMENT *" /><select value={form.department} onChange={set("department")} style={fld}>{DEPARTMENTS.map(d => <option key={d}>{d}</option>)}</select></div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}><Lbl text="DATE OF JOINING *" err={errors.joined} /><input type="date" value={form.joined} onChange={set("joined")} style={{ ...fld, borderColor: errors.joined ? "#f87171" : "var(--line)" }} /></div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}><Lbl text="ADDRESS *" err={errors.address} /><input placeholder="e.g. 45, MG Road, Pune, Maharashtra" value={form.address} onChange={set("address")} style={{ ...fld, borderColor: errors.address ? "#f87171" : "var(--line)" }} /></div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}><Lbl text="MONTHLY SALARY *" err={errors.salary} /><input placeholder="e.g. ₹45,000 or 45000" value={form.salary} onChange={set("salary")} style={{ ...fld, borderColor: errors.salary ? "#f87171" : "var(--line)" }} /></div>
          </div>

          {/* Documents upload */}
          <div style={{ background: "var(--panel-2)", border: "1px solid var(--line)", borderRadius: 12, overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--line)", fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.07em", display: "flex", alignItems: "center", gap: 6 }}>
              <FileText size={12} /> DOCUMENTS {form.documents.length > 0 && `(${form.documents.length})`}
            </div>
            <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
              <input ref={docsRef} type="file" multiple accept=".pdf,.doc,.docx,.jpg,.png,.jpeg" onChange={handleDocs} style={{ display: "none" }} />
              <button onClick={() => docsRef.current.click()} style={{ height: 40, borderRadius: 8, background: "var(--bg)", border: "1px dashed var(--line)", color: "var(--muted)", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7, transition: "border-color 0.18s, color 0.18s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--gold-line)"; e.currentTarget.style.color = "var(--gold-soft)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--line)"; e.currentTarget.style.color = "var(--muted)"; }}
              >
                <Upload size={14} /> Upload Documents
              </button>
              <div style={{ fontSize: 11.5, color: "var(--muted-2)" }}>PDF, DOC, DOCX, JPG, PNG · multiple files allowed</div>

              {form.documents.length > 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 4 }}>
                  {form.documents.map((doc, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", background: "var(--bg)", borderRadius: 8, border: "1px solid var(--line)" }}>
                      <FileText size={14} style={{ color: "#818cf8", flexShrink: 0 }} />
                      <span style={{ fontSize: 13, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{doc.name}</span>
                      <button onClick={() => removeDoc(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted)", display: "flex", alignItems: "center", padding: 2 }}>
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={onClose} style={{ flex: 1, height: 42, borderRadius: 9, background: "var(--panel-2)", border: "1px solid var(--line)", color: "var(--muted)", fontSize: 13.5, fontWeight: 600, cursor: "pointer" }}>Cancel</button>
            <button onClick={handleSubmit} style={{ flex: 2, height: 42, borderRadius: 9, background: "linear-gradient(135deg, var(--gold) 0%, #a67c1a 100%)", border: "none", color: "#1a1407", fontSize: 13.5, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
              <Save size={15} /> Add Employee
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Page ── */
export default function EmployeeDetails() {
  const [activeDept, setActiveDept] = useState("All");
  const [employees, setEmployees] = useState(EMPLOYEES_INIT);
  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filtered = activeDept === "All" ? employees : employees.filter(e => e.department === activeDept);
  const selected = employees.find(e => e.id === selectedId);
  const selectedIdx = selected ? employees.indexOf(selected) : 0;
  const nextId = `EMP-${String(employees.length + 1).padStart(3, "0")}`;

  const addEmployee = emp => setEmployees(prev => [...prev, emp]);
  const saveEmployee = (id, changes) => setEmployees(prev => prev.map(e => e.id !== id ? e : { ...e, ...changes }));

  return (
    <div className="p-6 md:p-10">
      <div style={{ marginBottom: 28, display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <div className="font-display" style={{ fontSize: 13, letterSpacing: "0.14em", color: "var(--gold)" }}>HUMAN RESOURCE</div>
          <h1 className="font-display" style={{ fontWeight: 700, fontSize: 28, marginTop: 4 }}>Employee Details</h1>
          <p style={{ color: "var(--muted)", marginTop: 6, fontSize: 13.5 }}>
            {filtered.length} employee{filtered.length !== 1 ? "s" : ""}
            {activeDept !== "All" ? ` in ${activeDept}` : " across all departments"}
          </p>
        </div>
        <button onClick={() => setShowModal(true)} style={{ display: "flex", alignItems: "center", gap: 7, padding: "10px 18px", height: 42, borderRadius: 10, background: "linear-gradient(135deg, var(--gold) 0%, #a67c1a 100%)", border: "none", color: "#1a1407", fontWeight: 700, fontSize: 13.5, cursor: "pointer", alignSelf: "center" }}>
          <Plus size={15} /> Add Employee
        </button>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
        {["All", ...DEPARTMENTS].map(dept => {
          const active = activeDept === dept;
          return (
            <button key={dept} onClick={() => setActiveDept(dept)}
              style={{ padding: "7px 16px", borderRadius: 99, fontSize: 13, fontWeight: 600, border: active ? "1px solid var(--gold-line)" : "1px solid var(--line)", background: active ? "var(--gold-dim)" : "var(--panel)", color: active ? "var(--gold-soft)" : "var(--muted)", cursor: "pointer", transition: "all 0.18s" }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.borderColor = "var(--gold-line)"; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.borderColor = "var(--line)"; }}
            >
              {dept}
              {dept !== "All" && <span style={{ marginLeft: 6, fontSize: 11, color: active ? "var(--gold)" : "var(--muted-2)" }}>{employees.filter(e => e.department === dept).length}</span>}
            </button>
          );
        })}
      </div>

      {filtered.length === 0
        ? <div style={{ textAlign: "center", color: "var(--muted)", padding: "60px 0", fontSize: 14 }}>No employees found.</div>
        : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
            {filtered.map(emp => (
              <EmployeeCard key={emp.id} emp={emp} idx={employees.indexOf(emp)} onClick={() => setSelectedId(emp.id)} />
            ))}
          </div>
        )
      }

      {selected && <EmployeeDrawer emp={selected} idx={selectedIdx} onClose={() => setSelectedId(null)} onSave={saveEmployee} />}
      {showModal && <AddEmployeeModal onClose={() => setShowModal(false)} onAdd={addEmployee} nextId={nextId} />}
    </div>
  );
}
