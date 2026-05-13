"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function JobSearchBar() {

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialSearch = searchParams.get("search") || "";

  const [value, setValue] = useState(initialSearch);
  const [debounced, setDebounced] = useState(initialSearch);

  // ✅ debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(value);
    }, 400);

    return () => clearTimeout(timer);
  }, [value]);

  // ✅ update URL safely
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debounced.trim()) {
      params.set("search", debounced.trim());
    } else {
      params.delete("search");
    }

    params.delete("page");

    router.replace(`${pathname}?${params.toString()}`);
  }, [debounced, pathname, router, searchParams]);

  return (
    <input
      type="text"
      placeholder="Search jobs..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="job-search-input"
    />
  );
}
