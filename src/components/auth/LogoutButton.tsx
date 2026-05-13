"use client";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    // eslint-disable-next-line no-undef
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    router.push("/login");
    router.refresh();
  };

  return (
<Button
  onClick={logout}
  variant="danger"
>
  Logout
</Button>

  );
}
