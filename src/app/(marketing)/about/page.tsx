export default function AboutPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "white",
        padding: "90px 0 70px", // فاصله 50-60px از هدر
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      {/* HERO */}
      <section
        style={{
          textAlign: "center",
          maxWidth: 780,
          margin: "0 auto 60px",
          paddingTop: 10,
        }}
      >
        <h1
          style={{
            fontSize: 50,
            fontWeight: 700,
            marginBottom: 18,
            letterSpacing: "-0.03em",
          }}
        >
          Redefining Tech Hiring in Europe
        </h1>

        <p
          style={{
            color: "#94a3b8",
            fontSize: 18,
            lineHeight: 1.65,
            margin: "0 auto",
            maxWidth: 650,
          }}
        >
          EuroJobs empowers talent and organizations with AI-driven intelligence, 
          real-time insights, and a modern hiring experience built for Europe’s 
          most innovative tech hubs.
        </p>
      </section>

      {/* VALUE GRID */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 28,
          maxWidth: 960,
          margin: "0 auto",
        }}
      >
        {[
          {
            title: "AI-Driven Insights",
            desc: "Smart job matching powered by modern language models and deep candidate analysis.",
          },
          {
            title: "Hiring Intelligence",
            desc: "Employers get actionable analytics across job performance, sourcing, and applicant quality.",
          },
          {
            title: "Secure & Modern Stack",
            desc: "Next.js 15, Edge APIs, Drizzle ORM, and JWT security — built for scale.",
          },
        ].map((item) => (
          <div
            key={item.title}
            style={{
              padding: "28px 30px",
              background:
                "radial-gradient(circle at top left, rgba(148,163,184,0.14), transparent 55%), rgba(15,23,42,0.95)",
              borderRadius: 16,
              border: "1px solid rgba(148,163,184,0.25)",
              boxShadow: "0 16px 45px rgba(0,0,0,0.35)",
              backdropFilter: "blur(3px)",
            }}
          >
            <h3
              style={{
                fontSize: 22,
                fontWeight: 600,
                marginBottom: 12,
              }}
            >
              {item.title}
            </h3>

            <p
              style={{
                color: "#94a3b8",
                lineHeight: 1.55,
              }}
            >
              {item.desc}
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}
