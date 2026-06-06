export default function Dashboard() {
  const stats = [
    ["Active Batches", "14"],
    ["Today's Output", "—"],
    ["On Shift", "—"],
    ["Power (kWh)", "—"],
  ];

  return (
    <div className="p-6 md:p-10">
      <div
        className="font-display"
        style={{ fontSize: 13, letterSpacing: "0.14em", color: "var(--gold)" }}
      >
        DASHBOARD
      </div>
      <h1 className="font-display" style={{ fontWeight: 700, fontSize: 30, marginTop: 6 }}>
        Refinery Control Center
      </h1>
      <p style={{ color: "var(--muted)", marginTop: 10, maxWidth: 560, fontSize: 14, lineHeight: 1.6 }}>
        Welcome back. Navigation is fully wired — pick any section on the left to
        jump to its screen. Real widgets land here as we build each module.
      </p>

      <div
        className="mt-8 grid gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))" }}
      >
        {stats.map(([k, v]) => (
          <div
            key={k}
            className="rounded-xl p-5"
            style={{ background: "var(--panel)", border: "1px solid var(--line)" }}
          >
            <div style={{ fontSize: 12, color: "var(--muted)" }}>{k}</div>
            <div
              className="font-display"
              style={{ fontSize: 26, fontWeight: 700, marginTop: 6, color: "var(--gold-soft)" }}
            >
              {v}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
