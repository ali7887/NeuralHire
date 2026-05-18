import Link from "next/link";

export default function JobsPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "100px 0 60px",
        fontFamily: "Inter, sans-serif",
        
      }}
    >
      {/* HERO */}
      <section style={{ textAlign: "center", marginBottom: 50 }}>
        <h1 style={{ fontSize: 48, fontWeight: 700, marginBottom: 12 }}>
          Explore Tech Jobs Across Europe
        </h1>
        <p
          style={{
            color: "#94a3b8",
            fontSize: 18,
            maxWidth: 650,
            margin: "0 auto",
          }}
        >
          Browse remote, hybrid, and onsite opportunities tailored to your skills.
        </p>
      </section>

      {/* JOB LIST */}
      <section
        style={{
          maxWidth: 900,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              background: "rgba(255,255,255,0.05)",
              padding: 24,
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <h3 style={{ fontSize: 22, marginBottom: 6, fontWeight: 600 }}>
              Frontend Developer
            </h3>

            <p style={{ color: "#94a3b8", marginBottom: 16 }}>
              Remote — $6k–$9k/mo
            </p>

            <Link
              href={`/jobs/${i}`}
              style={{
                background: "#2563eb",
                padding: "10px 18px",
                borderRadius: 6,
                color: "white",
                textDecoration: "none",
                fontWeight: 500,
                display: "inline-block",
              }}
            >
              View Details →
            </Link>
          </div>
        ))}
      </section>
    </main>
  );
}
