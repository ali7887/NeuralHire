 
"use client";

import { useState } from "react";
import { extractSkills } from "@/lib/nlp/extractSkills";

export default function ResumePage() {

  const [skills, setSkills] = useState<string[]>([]);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {

    const file = e.target.files?.[0];
    if (!file) return;

    const text = await file.text();

    const extracted = extractSkills(text);

    localStorage.setItem("userSkills", JSON.stringify(extracted));

    setSkills(extracted);
  };

  return (
    <div style={{ maxWidth: 600 }}>

      <h2>Upload Resume</h2>

      <input type="file" onChange={handleFile} />

      {skills.length > 0 && (
        <div style={{ marginTop: 20 }}>

          <h3>Extracted Skills</h3>

          <ul>
            {skills.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>

        </div>
      )}

    </div>
  );
}
