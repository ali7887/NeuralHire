import "./forbidden.css";

export default function ForbiddenPage() {
  return (
    <div className="forbidden-container">
      <div className="forbidden-card">
        <h1 className="forbidden-code">403</h1>
        <h2 className="forbidden-title">Access Denied</h2>
        <p className="forbidden-description">
          You do not have permission to access this resource.
        </p>
        <a href="/" className="forbidden-link">
          Go back home
        </a>
      </div>
    </div>
  );
}
