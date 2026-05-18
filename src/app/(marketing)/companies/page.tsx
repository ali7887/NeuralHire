export default function CompaniesPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#020617", // کمی تیره‌تر و شیک‌تر
        color: "white",
        padding: "80px 0 60px", // فاصله بیشتر از هدر
        fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* HERO / TITLE */}
      <section
        style={{
          textAlign: "center",
          marginBottom: 48,
          paddingTop: 16, // اضافه برای فاصله از هدر
        }}
      >
        <h1
          style={{
            fontSize: 46,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            marginBottom: 14,
          }}
        >
          Top European Tech Companies
        </h1>

        <p
          style={{
            color: "#94a3b8",
            maxWidth: 640,
            margin: "0 auto",
            fontSize: 18,
            lineHeight: 1.6,
          }}
        >
          Companies actively hiring across Europe’s leading innovation hubs — from Berlin
          and Amsterdam to Paris, London, and beyond.
        </p>
      </section>

      {/* COMPANIES GRID */}
      <section
        style={{
          maxWidth: 960,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: 24,
        }}
      >
        {["Google", "Microsoft", "Amazon", "SAP", "Siemens", "Allianz"].map((company) => (
          <article
            key={company}
            style={{
              padding: "26px 32px",
              background:
                "radial-gradient(circle at top left, rgba(148, 163, 184, 0.12), transparent 55%), rgba(15, 23, 42, 0.95)",
              borderRadius: 16,
              border: "1px solid rgba(148, 163, 184, 0.35)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              boxShadow: "0 18px 45px rgba(15, 23, 42, 0.75)",
            }}
          >
            <div
              style={{
                fontSize: 20,
                fontWeight: 600,
                marginBottom: 8,
              }}
            >
              {company}
            </div>

            <p
              style={{
                fontSize: 14,
                color: "#94a3b8",
                marginBottom: 10,
              }}
            >
              Hiring for engineering, product, and data roles across Europe.
            </p>

            <span
              style={{
                fontSize: 12,
                color: "#cbd5f5",
                background: "rgba(37, 99, 235, 0.16)",
                borderRadius: 999,
                padding: "4px 10px",
                border: "1px solid rgba(37, 99, 235, 0.5)",
              }}
            >
              Featured Employer
            </span>
          </article>
        ))}
      </section>
    </main>
  );
}
