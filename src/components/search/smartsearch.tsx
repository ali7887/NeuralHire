"use client";

import { useState, useEffect } from "react";

export function SmartSearch({ onResults }: { onResults: (results: any[]) => void }) {
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState(query);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(query), 400);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    if (!debounced.trim()) return;

    async function search() {
      setLoading(true);

      const res = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: debounced }),
      });

      if (!res.ok) {
        console.error("Search failed");
        return;
      }




      const data = await res.json();
      onResults(data.results);

      setLoading(false);
    }

    search();
  }, [debounced]);

  return (
    <div className="w-full">
      <input
        className="w-full border p-2 rounded bg-white text-black"
        placeholder="Search jobs by title, skills, AI understanding…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading && <p className="text-sm mt-1 text-gray-500">Searching…</p>}
    </div>
  );
}
