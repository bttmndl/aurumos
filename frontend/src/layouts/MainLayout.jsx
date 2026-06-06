import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import Topbar from "../components/topbar/Topbar";

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div
      className="flex w-full"
      style={{
        height: "100vh",
        overflow: "hidden",
        background: "radial-gradient(1200px 600px at -10% -10%, #16171f 0%, var(--bg) 55%)",
      }}
    >
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <main className="flex min-w-0 flex-1 flex-col" style={{ height: "100vh", overflow: "hidden" }}>
        <Topbar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          setMobileOpen={setMobileOpen}
        />
        <section className="grms-scroll flex-1 overflow-y-auto">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
