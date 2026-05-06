"use client";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    router.push("/login");
    router.refresh();
  };

  return (
    <button
      onClick={logout}
      className="px-3 py-1.5 rounded bg-red-500 text-white"
    >
      خروج
    </button>
  );
}
