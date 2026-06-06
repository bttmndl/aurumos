export default function Placeholder({ eyebrow, title, description }) {
  return (
    <div className="p-6 md:p-10">
      {eyebrow && (
        <div
          className="font-display"
          style={{ fontSize: 13, letterSpacing: "0.14em", color: "var(--gold)" }}
        >
          {eyebrow.toUpperCase()}
        </div>
      )}
      <h1 className="font-display" style={{ fontWeight: 700, fontSize: 30, marginTop: 6 }}>
        {title}
      </h1>
      <p style={{ color: "var(--muted)", marginTop: 10, maxWidth: 560, fontSize: 14, lineHeight: 1.6 }}>
        {description ||
          "This screen is scaffolded and ready. We'll build the real functionality here next."}
      </p>

      <div
        className="mt-8 rounded-xl"
        style={{
          background: "var(--panel)",
          border: "1px dashed var(--line)",
          padding: 40,
          textAlign: "center",
          color: "var(--muted-2)",
          fontSize: 13,
        }}
      >
        Content area for “{title}”
      </div>
    </div>
  );
}
