"use client";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
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
<Button
  onClick={logout}
  variant="danger"
>
  Logout
</Button>

  );
}
