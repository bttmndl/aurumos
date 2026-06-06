import { Search, Bell, PanelLeftClose, PanelLeftOpen, Menu } from "lucide-react";

export default function Topbar({ collapsed, setCollapsed, setMobileOpen }) {
  const handleToggle = () => {
    if (window.innerWidth < 768) setMobileOpen((v) => !v);
    else setCollapsed((v) => !v);
  };

  return (
    <header
      className="flex items-center gap-3 px-4 md:px-6"
      style={{ height: 68, borderBottom: "1px solid var(--line)" }}
    >
      <button
        onClick={handleToggle}
        aria-label="Toggle menu"
        className="flex items-center justify-center rounded-lg"
        style={{
          width: 38,
          height: 38,
          background: "var(--panel)",
          border: "1px solid var(--line)",
          color: "var(--muted)",
          cursor: "pointer",
        }}
      >
        <span className="hidden md:inline-flex">
          {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </span>
        <span className="inline-flex md:hidden">
          <Menu size={18} />
        </span>
      </button>

      <div
        className="flex flex-1 items-center rounded-lg px-3"
        style={{
          maxWidth: 380,
          height: 38,
          background: "var(--panel)",
          border: "1px solid var(--line)",
          gap: 8,
        }}
      >
        <Search size={16} style={{ color: "var(--muted-2)" }} />
        <input
          placeholder="Search batches, employees, machines…"
          className="w-full bg-transparent outline-none"
          style={{ color: "var(--txt)", fontSize: 13 }}
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        <button
          aria-label="Notifications"
          className="relative flex items-center justify-center rounded-lg"
          style={{
            width: 38,
            height: 38,
            background: "var(--panel)",
            border: "1px solid var(--line)",
            color: "var(--muted)",
            cursor: "pointer",
          }}
        >
          <Bell size={17} />
          <span
            style={{
              position: "absolute",
              top: 9,
              right: 10,
              width: 7,
              height: 7,
              borderRadius: 99,
              background: "var(--gold)",
              animation: "glow 2s infinite",
            }}
          />
        </button>
      </div>
    </header>
  );
}
