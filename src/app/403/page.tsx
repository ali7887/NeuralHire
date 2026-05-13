import "./forbidden.css";

export default function UnauthorizedPage() {
  return (
    <main className="forbidden-container">
      <div className="forbidden-card">
        <h1 className="forbidden-code">
          403
        </h1>

        <h2 className="forbidden-title">
          Unauthorized Access
        </h2>

        <p className="forbidden-description">
          You do not have permission to access
          this page.
        </p>

        <a
          href="/login"
          className="forbidden-link"
        >
          Go to Login
        </a>
      </div>
    </main>
  );
}
