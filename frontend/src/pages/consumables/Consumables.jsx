import { useState } from "react";
import { useRef } from "react";
import {
  Package, AlertTriangle, CheckCircle, XCircle,
  Calendar, Plus, Minus, Store, IndianRupee, X, History, Pencil, Save, Search,
} from "lucide-react";

const DEPARTMENTS = ["Administration", "Minting", "Lab", "Refinery", "Melting"];

const ITEMS_INIT = [
  // Administration
  { id: "C-001", name: "A4 Paper Reams",        dept: "Administration", stock: 45,  unit: "Reams",     restocked: "2026-05-20", supplier: "Classmate Stationery",    price: 280    },
  { id: "C-002", name: "Printer Ink Cartridge", dept: "Administration", stock: 4,   unit: "Pcs",       restocked: "2026-05-10", supplier: "HP India Supplies",       price: 950    },
  { id: "C-003", name: "Sanitizer",             dept: "Administration", stock: 12,  unit: "Bottles",   restocked: "2026-06-01", supplier: "Dettol / Local",          price: 120    },

  // Minting
  { id: "C-004", name: "Blank Coin Planchets",  dept: "Minting",        stock: 2400, unit: "Pcs",      restocked: "2026-05-28", supplier: "Metal Works Pvt. Ltd.",   price: 15     },
  { id: "C-005", name: "Die Lubricant",         dept: "Minting",        stock: 2,   unit: "Liters",    restocked: "2026-05-05", supplier: "Castrol Industrial",      price: 850    },
  { id: "C-006", name: "Polishing Pads",        dept: "Minting",        stock: 0,   unit: "Pcs",       restocked: "2026-04-15", supplier: "3M India",                price: 220    },
  { id: "C-007", name: "Protective Gloves",     dept: "Minting",        stock: 30,  unit: "Pairs",     restocked: "2026-06-01", supplier: "Karam Safety",            price: 95     },

  // Lab
  { id: "C-008", name: "Nitric Acid",     dept: "Lab", stock: 18,  unit: "Liters", restocked: "2026-05-15", supplier: "Aditya Birla Chemicals", price: 180  },
  { id: "C-009", name: "DM Water CAN",   dept: "Lab", stock: 6,   unit: "Cans",   restocked: "2026-06-01", supplier: "Local Water Supplier",   price: 50   },
  { id: "C-010", name: "Cupels Box",     dept: "Lab", stock: 4,   unit: "Boxes",  restocked: "2026-05-28", supplier: "Assay Lab Supplies",     price: 450  },
  { id: "C-011", name: "Check Gold",     dept: "Lab", stock: 10,  unit: "Pcs",    restocked: "2026-06-03", supplier: "Standard Metals Pvt.",   price: 5500 },
  { id: "C-012", name: "Silver",         dept: "Lab", stock: 8,   unit: "Pcs",    restocked: "2026-06-03", supplier: "Standard Metals Pvt.",   price: 85   },
  { id: "C-013", name: "Lead",           dept: "Lab", stock: 0,   unit: "kg",     restocked: "2026-04-25", supplier: "Standard Metals Pvt.",   price: 180  },
  { id: "C-041", name: "Copper",         dept: "Lab", stock: 3,   unit: "kg",     restocked: "2026-05-20", supplier: "Standard Metals Pvt.",   price: 750  },
  { id: "C-042", name: "A4 Paper Ream",  dept: "Lab", stock: 5,   unit: "Reams",  restocked: "2026-05-15", supplier: "Classmate Stationery",   price: 280  },
  { id: "C-043", name: "Ink Cartridge",  dept: "Lab", stock: 2,   unit: "Pcs",    restocked: "2026-05-10", supplier: "HP India Supplies",      price: 950  },

  // Refinery
  { id: "C-014", name: "Nitric Acid",           dept: "Refinery",       stock: 20,  unit: "Liters",    restocked: "2026-06-01", supplier: "Aditya Birla Chemicals",  price: 180    },
  { id: "C-015", name: "HCL",                   dept: "Refinery",       stock: 3,   unit: "Liters",    restocked: "2026-05-10", supplier: "Aditya Birla Chemicals",  price: 90     },
  { id: "C-016", name: "Sodium Metabisulfite",  dept: "Refinery",       stock: 8,   unit: "kg",        restocked: "2026-05-22", supplier: "Fine Chemicals India",    price: 320    },
  { id: "C-017", name: "Hydrogen Hydrate (HH)", dept: "Refinery",       stock: 0,   unit: "Liters",    restocked: "2026-04-18", supplier: "Sigma Chemicals",         price: 540    },
  { id: "C-018", name: "Safety Goggles",        dept: "Refinery",       stock: 14,  unit: "Pcs",       restocked: "2026-05-25", supplier: "Karam Safety",            price: 180    },
  { id: "C-019", name: "Urea",                  dept: "Refinery",       stock: 5,   unit: "kg",        restocked: "2026-05-30", supplier: "Deepak Fertilisers",      price: 75     },
  { id: "C-020", name: "Hand Gloves",           dept: "Refinery",       stock: 2,   unit: "Pairs",     restocked: "2026-05-05", supplier: "Karam Safety",            price: 95     },
  { id: "C-021", name: "Mask",                  dept: "Refinery",       stock: 0,   unit: "Pcs",       restocked: "2026-04-25", supplier: "3M India",                price: 60     },
  { id: "C-022", name: "Water Gun",             dept: "Refinery",       stock: 4,   unit: "Pcs",       restocked: "2026-05-15", supplier: "Local Hardware",          price: 250    },
  { id: "C-023", name: "Activated Carbon",      dept: "Refinery",       stock: 1,   unit: "kg",        restocked: "2026-04-30", supplier: "Carbokarn India",         price: 480    },
  { id: "C-024", name: "Flux (Silica Sand)",    dept: "Refinery",       stock: 40,  unit: "kg",        restocked: "2026-05-28", supplier: "Minerals India",          price: 35     },
  { id: "C-044", name: "Zinc",                  dept: "Refinery",       stock: 6,   unit: "kg",        restocked: "2026-05-20", supplier: "Metal Works Pvt. Ltd.",   price: 420    },
  { id: "C-045", name: "Caustic",               dept: "Refinery",       stock: 4,   unit: "kg",        restocked: "2026-05-18", supplier: "Fine Chemicals India",    price: 95     },
  { id: "C-046", name: "Dextrose",              dept: "Refinery",       stock: 3,   unit: "kg",        restocked: "2026-05-22", supplier: "Sigma Chemicals",         price: 140    },
  { id: "C-047", name: "Filter Paper",          dept: "Refinery",       stock: 0,   unit: "Packs",     restocked: "2026-04-28", supplier: "Whatman / Local",         price: 350    },
  { id: "C-048", name: "Filter Pad",            dept: "Refinery",       stock: 8,   unit: "Pcs",       restocked: "2026-06-01", supplier: "Industrial Filters Co.",  price: 180    },
  { id: "C-049", name: "Filter Cloth",          dept: "Refinery",       stock: 2,   unit: "Meters",    restocked: "2026-05-10", supplier: "Industrial Filters Co.",  price: 260    },
  { id: "C-050", name: "PH Paper",              dept: "Refinery",       stock: 5,   unit: "Packs",     restocked: "2026-05-30", supplier: "Lab Essentials India",    price: 120    },

  // Melting
  { id: "C-025", name: "Casting Mould",         dept: "Melting",        stock: 18,  unit: "Pcs",       restocked: "2026-06-03", supplier: "Mould Tech India",        price: 1200   },
  { id: "C-026", name: "Mould Strip",           dept: "Melting",        stock: 5,   unit: "Pcs",       restocked: "2026-05-28", supplier: "Mould Tech India",        price: 450    },
  { id: "C-027", name: "Crucible",              dept: "Melting",        stock: 12,  unit: "Pcs",       restocked: "2026-06-01", supplier: "Graphite India",          price: 780    },
  { id: "C-028", name: "Graphite Rods",         dept: "Melting",        stock: 0,   unit: "Pcs",       restocked: "2026-04-20", supplier: "Graphite India",          price: 560    },
  { id: "C-029", name: "Pin Tube",              dept: "Melting",        stock: 30,  unit: "Pcs",       restocked: "2026-05-15", supplier: "Metal Works Pvt. Ltd.",   price: 80     },
  { id: "C-030", name: "Silicon Spray",         dept: "Melting",        stock: 3,   unit: "Cans",      restocked: "2026-05-10", supplier: "WD-40 India",             price: 320    },
  { id: "C-031", name: "Glass Wool",            dept: "Melting",        stock: 8,   unit: "kg",        restocked: "2026-05-22", supplier: "Insulation Mart",         price: 210    },
  { id: "C-032", name: "Tongs",                 dept: "Melting",        stock: 6,   unit: "Pcs",       restocked: "2026-05-05", supplier: "Industrial Tools Co.",    price: 380    },
  { id: "C-033", name: "Kothari",               dept: "Melting",        stock: 4,   unit: "Pcs",       restocked: "2026-05-18", supplier: "Local Supplier",          price: 620    },
  { id: "C-034", name: "LPG Cylinder",          dept: "Melting",        stock: 2,   unit: "Cylinders", restocked: "2026-05-20", supplier: "Indane Gas Agency",       price: 950    },
  { id: "C-035", name: "Oxygen Cylinder",       dept: "Melting",        stock: 0,   unit: "Cylinders", restocked: "2026-05-12", supplier: "Linde India",             price: 1400   },
  { id: "C-036", name: "Acytelin",              dept: "Melting",        stock: 1,   unit: "Cylinders", restocked: "2026-05-08", supplier: "Linde India",             price: 1200   },
  { id: "C-037", name: "Safety Helmet",         dept: "Melting",        stock: 10,  unit: "Pcs",       restocked: "2026-06-02", supplier: "Karam Safety",            price: 340    },
  { id: "C-038", name: "Safety Goggles",        dept: "Melting",        stock: 7,   unit: "Pcs",       restocked: "2026-05-25", supplier: "Karam Safety",            price: 180    },
  { id: "C-039", name: "Safety Shoes",          dept: "Melting",        stock: 0,   unit: "Pairs",     restocked: "2026-04-15", supplier: "Bata Industrial",         price: 1800   },
  { id: "C-040", name: "Hydraulic Oil",         dept: "Melting",        stock: 4,   unit: "Liters",    restocked: "2026-05-20", supplier: "Castrol Industrial",      price: 650    },
  { id: "C-051", name: "Potassium Nitrate",    dept: "Melting",        stock: 3,   unit: "kg",        restocked: "2026-05-15", supplier: "Fine Chemicals India",    price: 380    },
  { id: "C-052", name: "Borax",                dept: "Melting",        stock: 0,   unit: "kg",        restocked: "2026-04-22", supplier: "Sigma Chemicals",         price: 260    },
];

function deriveStatus(stock) {
  if (stock === 0) return "Critical";
  if (stock <= 5)  return "Low";
  return "In Stock";
}

const STATUS_CONFIG = {
  "In Stock": { color: "#34d399", bg: "rgba(52,211,153,0.1)",  border: "rgba(52,211,153,0.25)",  Icon: CheckCircle   },
  "Low":      { color: "var(--gold-soft)", bg: "var(--gold-dim)", border: "var(--gold-line)",    Icon: AlertTriangle },
  "Critical": { color: "#f87171", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.25)", Icon: XCircle       },
};

const DEPT_COLORS = {
  Administration: { accent: "#818cf8", dim: "rgba(129,140,248,0.1)", line: "rgba(129,140,248,0.28)" },
  Minting:        { accent: "var(--gold)",     dim: "var(--gold-dim)",           line: "var(--gold-line)"           },
  Lab:            { accent: "#34d399", dim: "rgba(52,211,153,0.1)",  line: "rgba(52,211,153,0.25)"  },
  Refinery:       { accent: "#fb923c", dim: "rgba(251,146,60,0.1)",  line: "rgba(251,146,60,0.25)"  },
  Melting:        { accent: "#f87171", dim: "rgba(248,113,113,0.1)", line: "rgba(248,113,113,0.25)" },
};

function fmtDate(iso) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status];
  const { Icon } = cfg;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: "3px 10px", borderRadius: 99, fontSize: 11.5, fontWeight: 700,
      background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`,
    }}>
      <Icon size={11} /> {status}
    </span>
  );
}

/* ── Individual card ── */
function ConsumableCard({ item, onClick }) {
  const dept = DEPT_COLORS[item.dept] || DEPT_COLORS.Administration;
  const status = deriveStatus(item.stock);
  return (
    <button
      onClick={onClick}
      style={{
        background: "var(--panel)", border: "1px solid var(--line)", borderRadius: 13,
        overflow: "hidden", display: "flex", flexDirection: "column",
        transition: "border-color 0.2s, box-shadow 0.2s, transform 0.18s",
        cursor: "pointer", textAlign: "left", padding: 0, width: "100%",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = dept.line;
        e.currentTarget.style.boxShadow = `0 0 20px ${dept.dim}`;
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--line)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div style={{ height: 3, background: dept.accent, opacity: 0.7, width: "100%" }} />
      <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 9, flexShrink: 0,
              background: dept.dim, border: `1px solid ${dept.line}`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Package size={16} style={{ color: dept.accent }} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13.5, lineHeight: 1.3 }}>{item.name}</div>
              <div style={{ fontSize: 11.5, color: dept.accent, fontWeight: 600, marginTop: 2 }}>{item.dept}</div>
            </div>
          </div>
          <span style={{ fontSize: 10.5, color: "var(--muted-2)", fontWeight: 700, letterSpacing: "0.05em", flexShrink: 0 }}>
            {item.id}
          </span>
        </div>

        <div style={{
          background: "var(--bg)", borderRadius: 8, padding: "10px 14px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ fontSize: 11, color: "var(--muted)", fontWeight: 600, letterSpacing: "0.06em" }}>CURRENT STOCK</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
            <span style={{ fontSize: 22, fontWeight: 800, color: item.stock === 0 ? "#f87171" : "var(--txt)" }}>
              {item.stock}
            </span>
            <span style={{ fontSize: 12, color: "var(--muted)", fontWeight: 600 }}>{item.unit}</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, color: "var(--muted)", fontSize: 12 }}>
            <Calendar size={12} />
            <span>Restocked {fmtDate(item.restocked)}</span>
          </div>
          <StatusBadge status={status} />
        </div>
      </div>
    </button>
  );
}

/* ── Detail Drawer ── */
function ItemDrawer({ item, history, onClose, onAddStock, onUseStock, onEdit }) {
  const [addQty, setAddQty] = useState("");
  const [useQty, setUseQty] = useState("");
  const [addedMsg, setAddedMsg] = useState(false);
  const [usedMsg, setUsedMsg] = useState(false);
  const [useErr, setUseErr] = useState("");
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: item.name, dept: item.dept, unit: item.unit,
    supplier: item.supplier, price: item.price,
  });

  const dept = DEPT_COLORS[editForm.dept] || DEPT_COLORS.Administration;
  const status = deriveStatus(item.stock);
  const setF = k => e => setEditForm(f => ({ ...f, [k]: e.target.value }));

  const handleSave = () => {
    onEdit(item.id, {
      name: editForm.name.trim() || item.name,
      dept: editForm.dept,
      unit: editForm.unit.trim() || item.unit,
      supplier: editForm.supplier.trim() || "—",
      price: parseFloat(editForm.price) || 0,
    });
    setEditing(false);
  };

  const handleAdd = () => {
    const n = parseFloat(addQty);
    if (!n || n <= 0) return;
    onAddStock(item.id, n);
    setAddQty("");
    setAddedMsg(true);
    setTimeout(() => setAddedMsg(false), 2500);
  };

  const handleUse = () => {
    const n = parseFloat(useQty);
    if (!n || n <= 0) return;
    if (n > item.stock) {
      setUseErr(`Cannot exceed current stock (${item.stock} ${item.unit}).`);
      setTimeout(() => setUseErr(""), 3000);
      return;
    }
    onUseStock(item.id, n);
    setUseQty("");
    setUsedMsg(true);
    setTimeout(() => setUsedMsg(false), 2500);
  };

  const fldStyle = {
    background: "var(--bg)", border: "1px solid var(--line)", borderRadius: 8,
    padding: "8px 11px", color: "var(--txt)", fontSize: 13, outline: "none", width: "100%",
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 50,
          background: "rgba(0,0,0,0.55)", backdropFilter: "blur(3px)",
        }}
      />

      {/* Drawer */}
      <div
        style={{
          position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 51,
          width: 420, background: "var(--panel)",
          borderLeft: "1px solid var(--line)",
          display: "flex", flexDirection: "column",
          overflowY: "auto",
        }}
        className="grms-scroll"
      >
        {/* Drawer header */}
        <div style={{
          padding: "18px 20px", borderBottom: "1px solid var(--line)",
          display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: dept.dim, border: `1px solid ${dept.line}`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Package size={17} style={{ color: dept.accent }} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 15 }}>{item.name}</div>
              <div style={{ fontSize: 11.5, color: dept.accent, fontWeight: 600 }}>{item.dept} · {item.id}</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => { setEditing(e => !e); }}
              title={editing ? "Cancel Edit" : "Edit Category"}
              style={{
                background: editing ? "var(--gold-dim)" : "var(--panel-2)",
                border: editing ? "1px solid var(--gold-line)" : "1px solid var(--line)",
                borderRadius: 8, width: 32, height: 32, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: editing ? "var(--gold-soft)" : "var(--muted)",
              }}>
              <Pencil size={14} />
            </button>
            <button onClick={onClose} style={{
              background: "var(--panel-2)", border: "1px solid var(--line)",
              borderRadius: 8, width: 32, height: 32, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)",
            }}>
              <X size={15} />
            </button>
          </div>
        </div>

        <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 20, flex: 1 }}>

          {/* Current stock hero */}
          <div style={{
            background: "var(--panel-2)", border: "1px solid var(--line)", borderRadius: 12, padding: "18px 20px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div>
              <div style={{ fontSize: 11, color: "var(--muted)", fontWeight: 700, letterSpacing: "0.07em" }}>CURRENT STOCK</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 4 }}>
                <span style={{ fontSize: 36, fontWeight: 800, color: item.stock === 0 ? "#f87171" : "var(--txt)" }}>
                  {item.stock}
                </span>
                <span style={{ fontSize: 14, color: "var(--muted)", fontWeight: 600 }}>{item.unit}</span>
              </div>
            </div>
            <StatusBadge status={status} />
          </div>

          {/* Product details / Edit form */}
          <div style={{ background: "var(--panel-2)", border: `1px solid ${editing ? "var(--gold-line)" : "var(--line)"}`, borderRadius: 12, overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--line)", fontSize: 11, fontWeight: 700, color: editing ? "var(--gold-soft)" : "var(--muted)", letterSpacing: "0.07em", display: "flex", alignItems: "center", gap: 6 }}>
              {editing ? <><Pencil size={11} /> EDITING DETAILS</> : "PRODUCT DETAILS"}
            </div>

            {editing ? (
              <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 13 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.06em" }}>ITEM NAME</label>
                  <input value={editForm.name} onChange={setF("name")} style={fldStyle} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    <label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.06em" }}>DEPARTMENT</label>
                    <select value={editForm.dept} onChange={setF("dept")} style={fldStyle}>
                      {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
                    </select>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    <label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.06em" }}>UNIT</label>
                    <input value={editForm.unit} onChange={setF("unit")} style={fldStyle} />
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.06em" }}>SUPPLIER NAME</label>
                  <input value={editForm.supplier} onChange={setF("supplier")} style={fldStyle} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.06em" }}>UNIT PRICE (₹)</label>
                  <input type="number" min="0" step="any" value={editForm.price} onChange={setF("price")} style={fldStyle} />
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                  <button onClick={() => setEditing(false)} style={{ flex: 1, height: 38, borderRadius: 8, background: "var(--bg)", border: "1px solid var(--line)", color: "var(--muted)", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
                    Cancel
                  </button>
                  <button onClick={handleSave} style={{ flex: 2, height: 38, borderRadius: 8, background: "linear-gradient(135deg, var(--gold) 0%, #a67c1a 100%)", border: "none", color: "#1a1407", fontWeight: 700, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                    <Save size={14} /> Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <>
                {[
                  { label: "Product Name", value: item.name },
                  { label: "Last Stocked",  value: fmtDate(item.restocked), Icon: Calendar },
                  { label: "Supplier Name", value: item.supplier, Icon: Store },
                  { label: "Unit Price",    value: `₹${item.price.toLocaleString("en-IN")} / ${item.unit}`, Icon: IndianRupee },
                ].map(({ label, value, Icon: RowIcon }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 16px", borderBottom: "1px solid var(--line)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7, color: "var(--muted)", fontSize: 13 }}>
                      {RowIcon && <RowIcon size={13} />}{label}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--txt)", textAlign: "right", maxWidth: 220 }}>{value}</div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Add Stock */}
          <div style={{ background: "var(--panel-2)", border: "1px solid var(--line)", borderRadius: 12, overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", gap: 7, fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.07em" }}>
              <Plus size={12} style={{ color: "#34d399" }} /> ADD STOCK
            </div>
            <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", gap: 10 }}>
                <input
                  type="number" min="0.001" step="any"
                  placeholder={`Quantity (${item.unit})`}
                  value={addQty}
                  onChange={e => setAddQty(e.target.value)}
                  style={{ flex: 1, background: "var(--bg)", border: "1px solid var(--line)", borderRadius: 8, padding: "9px 12px", color: "var(--txt)", fontSize: 13.5, outline: "none" }}
                  onKeyDown={e => e.key === "Enter" && handleAdd()}
                />
                <button onClick={handleAdd} style={{
                  height: 42, padding: "0 18px", borderRadius: 8, border: "none",
                  background: "linear-gradient(135deg, var(--gold) 0%, #a67c1a 100%)",
                  color: "#1a1407", fontWeight: 700, fontSize: 13.5, cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 6,
                }}>
                  <Plus size={15} /> Add
                </button>
              </div>
              {addedMsg && (
                <div style={{ fontSize: 12.5, color: "#34d399", display: "flex", alignItems: "center", gap: 5 }}>
                  <CheckCircle size={13} /> Stock added successfully.
                </div>
              )}
            </div>
          </div>

          {/* Used Today */}
          <div style={{ background: "var(--panel-2)", border: "1px solid rgba(248,113,113,0.25)", borderRadius: 12, overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(248,113,113,0.2)", display: "flex", alignItems: "center", gap: 7, fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.07em" }}>
              <Minus size={12} style={{ color: "#f87171" }} /> USED TODAY
            </div>
            <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", gap: 10 }}>
                <input
                  type="number" min="0.001" step="any"
                  placeholder={`Quantity used (${item.unit})`}
                  value={useQty}
                  onChange={e => setUseQty(e.target.value)}
                  style={{ flex: 1, background: "var(--bg)", border: "1px solid var(--line)", borderRadius: 8, padding: "9px 12px", color: "var(--txt)", fontSize: 13.5, outline: "none" }}
                  onKeyDown={e => e.key === "Enter" && handleUse()}
                />
                <button onClick={handleUse} style={{
                  height: 42, padding: "0 18px", borderRadius: 8,
                  border: "1px solid rgba(248,113,113,0.35)",
                  background: "rgba(248,113,113,0.12)",
                  color: "#f87171", fontWeight: 700, fontSize: 13.5, cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 6,
                }}>
                  <Minus size={15} /> Use
                </button>
              </div>
              {usedMsg && (
                <div style={{ fontSize: 12.5, color: "#f87171", display: "flex", alignItems: "center", gap: 5 }}>
                  <CheckCircle size={13} /> Usage recorded, stock reduced.
                </div>
              )}
              {useErr && (
                <div style={{ fontSize: 12.5, color: "#f87171", display: "flex", alignItems: "center", gap: 5 }}>
                  <XCircle size={13} /> {useErr}
                </div>
              )}
            </div>
          </div>

          {/* Stock history */}
          <div style={{ background: "var(--panel-2)", border: "1px solid var(--line)", borderRadius: 12, overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", gap: 7, fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.07em" }}>
              <History size={12} /> STOCK HISTORY
            </div>
            {history.length === 0 ? (
              <div style={{ padding: "20px 16px", fontSize: 13, color: "var(--muted-2)", textAlign: "center" }}>
                No activity recorded yet.
              </div>
            ) : (
              <div>
                {[...history].reverse().map((h, i) => {
                  const isAdd = h.type === "add";
                  return (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "10px 16px",
                      borderBottom: i < history.length - 1 ? "1px solid var(--line)" : "none",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{
                          width: 22, height: 22, borderRadius: 99, flexShrink: 0,
                          background: isAdd ? "rgba(52,211,153,0.12)" : "rgba(248,113,113,0.12)",
                          border: `1px solid ${isAdd ? "rgba(52,211,153,0.25)" : "rgba(248,113,113,0.25)"}`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                          {isAdd ? <Plus size={11} style={{ color: "#34d399" }} /> : <Minus size={11} style={{ color: "#f87171" }} />}
                        </span>
                        <div>
                          <div style={{ fontSize: 11.5, fontWeight: 600, color: isAdd ? "#34d399" : "#f87171" }}>
                            {isAdd ? "Stock Added" : "Used"}
                          </div>
                          <div style={{ fontSize: 11, color: "var(--muted-2)" }}>{h.date}</div>
                        </div>
                      </div>
                      <div style={{ fontSize: 13.5, fontWeight: 800, color: isAdd ? "#34d399" : "#f87171" }}>
                        {isAdd ? "+" : "−"}{h.qty} {item.unit}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Add Category Modal ── */
const EMPTY_CAT = { name: "", dept: "Administration", unit: "", stock: "", supplier: "", price: "" };

function AddCategoryModal({ onClose, onAdd }) {
  const [form, setForm] = useState(EMPTY_CAT);
  const [err, setErr] = useState("");
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const fldStyle = {
    background: "var(--bg)", border: "1px solid var(--line)", borderRadius: 8,
    padding: "9px 12px", color: "var(--txt)", fontSize: 13.5, outline: "none", width: "100%",
  };

  const handleSubmit = () => {
    if (!form.name.trim() || !form.unit.trim()) { setErr("Name and Unit are required."); return; }
    const stock = parseFloat(form.stock) || 0;
    const price = parseFloat(form.price) || 0;
    const id = "C-" + String(Date.now()).slice(-4);
    onAdd({ id, name: form.name.trim(), dept: form.dept, stock, unit: form.unit.trim(),
      restocked: new Date().toISOString().slice(0, 10),
      supplier: form.supplier.trim() || "—", price });
    onClose();
  };

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(3px)" }} />
      <div style={{
        position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        zIndex: 51, width: 480, background: "var(--panel)",
        border: "1px solid var(--line)", borderRadius: 16,
        display: "flex", flexDirection: "column", overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{ padding: "18px 20px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: "var(--gold-dim)", border: "1px solid var(--gold-line)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Plus size={16} style={{ color: "var(--gold)" }} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 15 }}>Add Stock Category</div>
              <div style={{ fontSize: 11.5, color: "var(--muted)" }}>Create a new inventory item</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: "var(--panel-2)", border: "1px solid var(--line)", borderRadius: 8, width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)" }}>
            <X size={15} />
          </button>
        </div>

        {/* Form */}
        <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.07em" }}>ITEM NAME *</label>
              <input placeholder="e.g. Nitric Acid" value={form.name} onChange={set("name")} style={fldStyle} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.07em" }}>DEPARTMENT *</label>
              <select value={form.dept} onChange={set("dept")} style={fldStyle}>
                {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.07em" }}>UNIT *</label>
              <input placeholder="e.g. Liters, Pcs, kg" value={form.unit} onChange={set("unit")} style={fldStyle} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.07em" }}>INITIAL STOCK</label>
              <input type="number" min="0" step="any" placeholder="0" value={form.stock} onChange={set("stock")} style={fldStyle} />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.07em" }}>SUPPLIER NAME</label>
            <input placeholder="e.g. Aditya Birla Chemicals" value={form.supplier} onChange={set("supplier")} style={fldStyle} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.07em" }}>UNIT PRICE (₹)</label>
            <input type="number" min="0" step="any" placeholder="0.00" value={form.price} onChange={set("price")} style={fldStyle} />
          </div>

          {err && <div style={{ fontSize: 12.5, color: "#f87171" }}>{err}</div>}

          <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
            <button onClick={onClose} style={{ flex: 1, height: 42, borderRadius: 9, background: "var(--panel-2)", border: "1px solid var(--line)", color: "var(--muted)", fontSize: 13.5, fontWeight: 600, cursor: "pointer" }}>
              Cancel
            </button>
            <button onClick={handleSubmit} style={{ flex: 2, height: 42, borderRadius: 9, background: "linear-gradient(135deg, var(--gold) 0%, #a67c1a 100%)", border: "none", color: "#1a1407", fontSize: 13.5, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
              <Plus size={15} /> Add Category
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function SummaryBar({ items }) {
  const inStock  = items.filter(i => deriveStatus(i.stock) === "In Stock").length;
  const low      = items.filter(i => deriveStatus(i.stock) === "Low").length;
  const critical = items.filter(i => deriveStatus(i.stock) === "Critical").length;
  const stat = (label, count, color) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ width: 8, height: 8, borderRadius: 99, background: color, flexShrink: 0 }} />
      <span style={{ fontSize: 13, color: "var(--muted)" }}>{label}</span>
      <span style={{ fontSize: 14, fontWeight: 800, color }}>{count}</span>
    </div>
  );
  return (
    <div style={{
      display: "flex", gap: 28, padding: "12px 20px",
      background: "var(--panel)", border: "1px solid var(--line)",
      borderRadius: 10, marginBottom: 28, flexWrap: "wrap",
    }}>
      {stat("In Stock", inStock, "#34d399")}
      <div style={{ width: 1, background: "var(--line)" }} />
      {stat("Low", low, "var(--gold)")}
      <div style={{ width: 1, background: "var(--line)" }} />
      {stat("Critical", critical, "#f87171")}
      <div style={{ marginLeft: "auto", fontSize: 13, color: "var(--muted)" }}>{items.length} items total</div>
    </div>
  );
}

export default function Consumables() {
  const [activeDept, setActiveDept] = useState("All");
  const [items, setItems] = useState(ITEMS_INIT);
  const [selectedId, setSelectedId] = useState(null);
  const [stockHistory, setStockHistory] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef(null);

  const deptFiltered = activeDept === "All" ? items : items.filter(i => i.dept === activeDept);
  const filtered = searchQuery.trim()
    ? deptFiltered.filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase().trim()))
    : deptFiltered;

  const openSearch = () => { setSearchOpen(true); setTimeout(() => searchRef.current?.focus(), 50); };
  const closeSearch = () => { setSearchOpen(false); setSearchQuery(""); };
  const selected = items.find(i => i.id === selectedId);

  const nowStr = () => new Date().toLocaleString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });

  const addStock = (id, qty) => {
    setItems(prev => prev.map(i =>
      i.id !== id ? i : { ...i, stock: i.stock + qty, restocked: new Date().toISOString().slice(0, 10) }
    ));
    setStockHistory(prev => ({
      ...prev,
      [id]: [...(prev[id] || []), { qty, date: nowStr(), type: "add" }],
    }));
  };

  const useStock = (id, qty) => {
    setItems(prev => prev.map(i =>
      i.id !== id ? i : { ...i, stock: Math.max(0, i.stock - qty) }
    ));
    setStockHistory(prev => ({
      ...prev,
      [id]: [...(prev[id] || []), { qty, date: nowStr(), type: "use" }],
    }));
  };

  const addCategory = (newItem) => {
    setItems(prev => [...prev, newItem]);
  };

  const editItem = (id, changes) => {
    setItems(prev => prev.map(i => i.id !== id ? i : { ...i, ...changes }));
  };

  return (
    <div className="p-6 md:p-10">
      <div style={{ marginBottom: 28, display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <div className="font-display" style={{ fontSize: 13, letterSpacing: "0.14em", color: "var(--gold)" }}>INVENTORY</div>
          <h1 className="font-display" style={{ fontWeight: 700, fontSize: 28, marginTop: 4 }}>Consumables</h1>
          <p style={{ color: "var(--muted)", marginTop: 6, fontSize: 13.5 }}>
            Click any card to view details or update stock.
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, alignSelf: "center" }}>
          {/* Expandable search */}
          <div style={{
            display: "flex", alignItems: "center",
            background: searchOpen ? "var(--panel)" : "transparent",
            border: searchOpen ? "1px solid var(--gold-line)" : "1px solid transparent",
            borderRadius: 10, overflow: "hidden",
            transition: "width 0.28s cubic-bezier(0.4,0,0.2,1), border-color 0.2s",
            width: searchOpen ? 220 : 38, height: 38,
          }}>
            <button
              onClick={searchOpen ? undefined : openSearch}
              style={{
                width: 38, height: 38, flexShrink: 0, border: "none", cursor: "pointer",
                background: searchOpen ? "transparent" : "var(--panel)",
                border: searchOpen ? "none" : "1px solid var(--line)",
                borderRadius: searchOpen ? 0 : 10,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: searchOpen ? "var(--gold-soft)" : "var(--muted)",
              }}
            >
              <Search size={15} />
            </button>
            {searchOpen && (
              <>
                <input
                  ref={searchRef}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onKeyDown={e => e.key === "Escape" && closeSearch()}
                  placeholder="Search items…"
                  style={{
                    flex: 1, background: "transparent", border: "none", outline: "none",
                    color: "var(--txt)", fontSize: 13, padding: "0 4px",
                  }}
                />
                <button onClick={closeSearch} style={{ width: 28, height: 38, flexShrink: 0, border: "none", background: "transparent", cursor: "pointer", color: "var(--muted)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <X size={13} />
                </button>
              </>
            )}
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            style={{
              display: "flex", alignItems: "center", gap: 7,
              padding: "10px 18px", height: 38, borderRadius: 10,
              background: "linear-gradient(135deg, var(--gold) 0%, #a67c1a 100%)",
              border: "none", color: "#1a1407", fontWeight: 700, fontSize: 13.5, cursor: "pointer",
            }}
          >
            <Plus size={15} /> Add Category
          </button>
        </div>
      </div>

      {/* Dept filter pills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
        {["All", ...DEPARTMENTS].map((dept) => {
          const active = activeDept === dept;
          const col = dept !== "All" ? DEPT_COLORS[dept] : null;
          const count = dept === "All" ? items.length : items.filter(i => i.dept === dept).length;
          return (
            <button key={dept} onClick={() => setActiveDept(dept)} style={{
              padding: "7px 16px", borderRadius: 99, fontSize: 13, fontWeight: 600,
              border: active ? `1px solid ${col?.line || "var(--gold-line)"}` : "1px solid var(--line)",
              background: active ? (col?.dim || "var(--gold-dim)") : "var(--panel)",
              color: active ? (col?.accent || "var(--gold-soft)") : "var(--muted)",
              cursor: "pointer", transition: "all 0.18s",
            }}>
              {dept} <span style={{ marginLeft: 6, fontSize: 11, opacity: 0.7 }}>{count}</span>
            </button>
          );
        })}
      </div>

      <SummaryBar items={filtered} />

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 0", color: "var(--muted)", fontSize: 14 }}>
          No items found{searchQuery ? ` for "${searchQuery}"` : ""}.
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 18 }}>
        {filtered.map(item => (
          <ConsumableCard key={item.id} item={item} onClick={() => setSelectedId(item.id)} />
        ))}
      </div>

      {selected && (
        <ItemDrawer
          item={selected}
          history={stockHistory[selected.id] || []}
          onClose={() => setSelectedId(null)}
          onAddStock={addStock}
          onUseStock={useStock}
          onEdit={editItem}
        />
      )}

      {showAddModal && (
        <AddCategoryModal
          onClose={() => setShowAddModal(false)}
          onAdd={addCategory}
        />
      )}
    </div>
  );
}
