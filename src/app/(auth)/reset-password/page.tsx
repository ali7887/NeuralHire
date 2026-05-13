import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

type SearchParams = {
  token?: string;
};

type Props = {
  searchParams: Promise<SearchParams>;
};

export default async function ResetPasswordPage({ searchParams }: Props) {
  const resolved = await searchParams;
  const token = resolved?.token;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f8fafc",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#ffffff",
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
          padding: "32px",
          boxShadow:
            "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
        }}
      >
        {!token && (
          <p
            style={{
              color: "#ef4444",
              textAlign: "center",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            Reset token is missing or invalid.
          </p>
        )}

        {token && <ResetPasswordForm token={token} />}
      </div>
    </div>
  );
}
