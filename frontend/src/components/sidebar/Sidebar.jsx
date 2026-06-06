import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronRight, LogOut } from "lucide-react";
import { NAV } from "./navConfig";
import Ingot from "./Ingot";

export default function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [openMenus, setOpenMenus] = useState({});
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Auto-open the parent menu that contains the active route.
  useEffect(() => {
    const next = {};
    NAV.forEach((item) => {
      if (item.children && item.children.some((c) => c.path === pathname)) {
        next[item.id] = true;
      }
    });
    setOpenMenus((prev) => ({ ...prev, ...next }));
  }, [pathname]);

  const toggleMenu = (id) => {
    if (collapsed) {
      setCollapsed(false);
      setOpenMenus({ [id]: true });
      return;
    }
    setOpenMenus((m) => ({ [id]: !m[id] }));
  };

  const go = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const W = collapsed ? 78 : 268;

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-30 md:hidden"
          style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(2px)" }}
        />
      )}

      <aside
        className="sidebar-shell fixed z-40 flex h-full flex-col md:static md:translate-x-0"
        style={{
          width: W,
          height: "100vh",
          background: "linear-gradient(180deg, var(--panel) 0%, #121319 100%)",
          borderRight: "1px solid var(--line)",
          transform: isMobile ? (mobileOpen ? "translateX(0)" : "translateX(-110%)") : undefined,
        }}
        data-mobile-open={mobileOpen}
      >
        {/* Brand */}
        <button
          onClick={() => go("/")}
          className="flex items-center gap-3 px-4 w-full"
          style={{
            height: 68, borderBottom: "1px solid var(--line)",
            background: "none", border: "none", borderBottom: "1px solid var(--line)",
            cursor: "pointer", textAlign: "left",
          }}
        >
          <div
            className="flex shrink-0 items-center justify-center rounded-xl"
            style={{
              width: 40, height: 40,
              background: "var(--panel-2)",
              border: "1px solid var(--gold-line)",
              boxShadow: "0 0 18px var(--gold-dim)",
            }}
          >
            <Ingot />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <div
                className="font-display"
                style={{ fontWeight: 700, letterSpacing: "0.04em", fontSize: 17, lineHeight: 1.1, color: "var(--txt)" }}
              >
                AURUM<span style={{ color: "var(--gold)" }}>OS</span>
              </div>
              <div style={{ fontSize: 10.5, color: "var(--muted)", letterSpacing: "0.14em" }}>
                METAL REFINERY CONTROL
              </div>
            </div>
          )}
        </button>

        {/* Nav */}
        <nav
          className="grms-scroll flex-1 overflow-y-auto px-3 py-4"
          style={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          {NAV.map((item) => {
            const Icon = item.icon;
            const hasChildren = !!item.children;
            const isOpen = openMenus[item.id];
            const selfActive = item.path && item.path === pathname;
            const parentActive =
              hasChildren && item.children.some((c) => c.path === pathname);
            const highlight = selfActive || parentActive;

            return (
              <div key={item.id}>
                <button
                  onClick={() => (hasChildren ? toggleMenu(item.id) : go(item.path))}
                  title={collapsed ? item.label : undefined}
                  className="nav-item flex w-full items-center rounded-lg"
                  style={{
                    gap: 12,
                    padding: collapsed ? "11px 0" : "11px 12px",
                    justifyContent: collapsed ? "center" : "flex-start",
                    background: highlight ? "var(--gold-dim)" : "transparent",
                    color: highlight ? "var(--gold-soft)" : "var(--txt)",
                    boxShadow: highlight ? "inset 0 0 0 1px var(--gold-line)" : "none",
                    cursor: "pointer",
                    border: "none",
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) => {
                    if (!highlight) e.currentTarget.style.background = "var(--panel-2)";
                  }}
                  onMouseLeave={(e) => {
                    if (!highlight) e.currentTarget.style.background = "transparent";
                  }}
                >
                  <Icon size={19} strokeWidth={1.9} className="shrink-0" />
                  {!collapsed && (
                    <>
                      <span style={{ fontSize: 13.5, fontWeight: 600, flex: 1, whiteSpace: "nowrap" }}>
                        {item.label}
                      </span>
                      {hasChildren && (
                        <ChevronRight
                          size={15}
                          className="chev"
                          style={{
                            transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                            color: "var(--muted)",
                          }}
                        />
                      )}
                    </>
                  )}
                </button>

                {hasChildren && !collapsed && (
                  <div
                    className="sub-wrap"
                    style={{ maxHeight: isOpen ? item.children.length * 40 + 8 : 0 }}
                  >
                    <div
                      style={{
                        marginLeft: 22,
                        paddingLeft: 14,
                        borderLeft: "1px solid var(--line)",
                        marginTop: 2,
                      }}
                    >
                      {item.children.map((c) => {
                        const on = c.path === pathname;
                        return (
                          <button
                            key={c.id}
                            onClick={() => go(c.path)}
                            className="nav-item flex w-full items-center rounded-md"
                            style={{
                              gap: 10,
                              padding: "8px 10px",
                              background: on ? "var(--panel-2)" : "transparent",
                              color: on ? "var(--gold-soft)" : "var(--muted)",
                              cursor: "pointer",
                              border: "none",
                              textAlign: "left",
                            }}
                            onMouseEnter={(e) => {
                              if (!on) e.currentTarget.style.color = "var(--txt)";
                            }}
                            onMouseLeave={(e) => {
                              if (!on) e.currentTarget.style.color = "var(--muted)";
                            }}
                          >
                            <span
                              className="leaf-dot shrink-0"
                              style={{
                                width: 6,
                                height: 6,
                                borderRadius: 99,
                                background: on ? "var(--gold)" : "var(--muted-2)",
                                transform: on ? "scale(1.3)" : "scale(1)",
                                boxShadow: on ? "0 0 8px var(--gold)" : "none",
                              }}
                            />
                            <span style={{ fontSize: 12.8, fontWeight: 500 }}>{c.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer user card */}
        <div style={{ borderTop: "1px solid var(--line)", padding: 12 }}>
          <div
            className="flex items-center rounded-lg"
            style={{
              gap: 10,
              padding: collapsed ? 0 : "8px 10px",
              justifyContent: collapsed ? "center" : "flex-start",
              background: collapsed ? "transparent" : "var(--panel-2)",
            }}
          >
            <div
              className="flex shrink-0 items-center justify-center rounded-full"
              style={{
                width: 34,
                height: 34,
                background: "linear-gradient(135deg, var(--gold) 0%, #a67c1a 100%)",
                color: "#1a1407",
                fontWeight: 700,
                fontSize: 13,
              }}
            >
              BK
            </div>
            {!collapsed && (
              <div className="flex-1 overflow-hidden">
                <div style={{ fontSize: 13, fontWeight: 600 }}>Bittu K.</div>
                <div style={{ fontSize: 11, color: "var(--muted)" }}>Plant Administrator</div>
              </div>
            )}
            {!collapsed && (
              <LogOut size={16} style={{ color: "var(--muted)", cursor: "pointer" }} />
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
