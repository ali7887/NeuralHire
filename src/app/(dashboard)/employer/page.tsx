export default function EmployerDashboardPage() {
  return (
    <div>
      <h2 style={{ fontSize: "20px", marginBottom: 24 }}>Overview</h2>

      <div style={{ display: "flex", gap: 20, marginBottom: 30 }}>
        <div style={card}>Active Jobs<br/><strong>4</strong></div>
        <div style={card}>Applications<br/><strong>12</strong></div>
        <div style={card}>Draft Jobs<br/><strong>1</strong></div>
      </div>

      <div>
        <h3 style={{ marginBottom: 12 }}>Quick Actions</h3>

        <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>

          <a
            href="/dashboard/employer/jobs/create"
            style={{
              padding: "10px 18px",
              background: "#2563eb",
              color: "white",
              textDecoration: "none",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: 500,
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              transition: "all .2s ease",
              display: "inline-block",
            }}
          >
            Create Job
          </a>

          <a
            href="/dashboard/employer/jobs"
            style={{
              padding: "10px 18px",
              background: "#ffffff",
              color: "#111827",
              border: "1px solid #e5e7eb",
              textDecoration: "none",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: 500,
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              display: "inline-block",
            }}
          >
            View Jobs
          </a>

        </div>
      </div>
    </div>
  );
}

const card = {
  background: "#fff",
  padding: "20px",
  borderRadius: "8px",
  border: "1px solid #eee",
  minWidth: "160px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
};
