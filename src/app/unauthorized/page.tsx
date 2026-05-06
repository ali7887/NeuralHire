export default function UnauthorizedPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "24px",
        textAlign: "center",
      }}
    >
      <div>
        <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "12px" }}>
          Unauthorized
        </h1>
        <p style={{ color: "#666", marginBottom: "20px" }}>
          You do not have permission to access this page.
        </p>
        <a
          href="/login"
          style={{
            display: "inline-block",
            padding: "10px 16px",
            borderRadius: "8px",
            background: "#111",
            color: "#fff",
            textDecoration: "none",
          }}
        >
          Go to Login
        </a>
      </div>
    </main>
  );
}
