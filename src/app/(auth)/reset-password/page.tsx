import React from "react";

// Type definition for searchParams
type SearchParams = {
  token?: string;
};

// Props for this page according to Next.js 15 standards
type Props = {
  searchParams: Promise<SearchParams>;
};

export default async function ResetPasswordPage({ searchParams }: Props) {
  // 🟢 Next.js 15 requires awaiting searchParams because it's a Promise
  const resolved = await searchParams;
  const token = resolved?.token;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg border p-6 shadow">
        <h1 className="text-xl font-semibold mb-4">Reset Password</h1>

        {/* 🟥 Token missing */}
        {!token && (
          <p className="text-red-500">
            Reset token is missing or invalid.
          </p>
        )}

        {/* 🟢 Token exists → show form */}
        {token && (
          <form autoComplete="off" className="space-y-4">
            <input
              type="password"
              name="password"
              placeholder="New password"
              className="w-full border rounded p-2"
              required
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              className="w-full border rounded p-2"
              required
            />

            <button
              type="submit"
              className="w-full bg-black text-white rounded p-2"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
