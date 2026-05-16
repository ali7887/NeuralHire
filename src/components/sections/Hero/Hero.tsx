/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-undef */
"use client";

import React, { useRef, useEffect, useState } from "react";
import styles from "./Hero.module.css";
import { Search, ChevronDown } from "lucide-react";

/* ─────────────────────────────────────────
   helpers
───────────────────────────────────────── */
function formatNumber(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return n.toString();
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/* ─────────────────────────────────────────
   component
───────────────────────────────────────── */
export default function Hero() {
  const [titleValue, setTitleValue]       = useState("");
  const [locationValue, setLocationValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");

  const heroRef = useRef<HTMLDivElement>(null);

  /* ── Tag click ── */
  const handleTag = (tag: string) => {
    const locationTags = ["Berlin", "Remote"];
    const titleTags    = ["React", "Next.js"];

    if (locationTags.includes(tag))      setLocationValue(tag);
    else if (titleTags.includes(tag))    setTitleValue(tag);
    else                                 setCategoryValue(tag.toLowerCase());
  };

  /* ── Smooth scroll ── */
  const handleScroll = () => {
    const next =
      document.getElementById("features-section") ||
      heroRef.current?.nextElementSibling as HTMLElement | null;
    if (next) next.scrollIntoView({ behavior: "smooth" });
  };

  /* ── Stats counter ── */
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-counter]");
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el       = entry.target as HTMLElement;
          const target   = Number(el.dataset.target ?? 0);
          const duration = 1800;
          const start    = performance.now();

          const tick = (now: number) => {
            const elapsed  = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased    = easeOutCubic(progress);
            const current  = Math.floor(eased * target);

            el.textContent = formatNumber(current);
            if (progress < 1) requestAnimationFrame(tick);
            else el.textContent = formatNumber(target); // ensure exact final value
          };

          requestAnimationFrame(tick);
          observer.unobserve(el);
        });
      },
      { threshold: 0.35 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ─────────────────────────────────────
     render
  ───────────────────────────────────── */
  return (
    <section ref={heroRef} className={styles.hero}>

      {/* ══════════════════════════════════
          PRIMARY
      ══════════════════════════════════ */}
      <div className={styles.primary}>



        {/* Headline */}
        <h1 className={styles.headline}>
          Find Your Next{" "}
          <span className={styles.gradient}>Tech Job</span>{" "}
          in Europe
        </h1>



        {/* ── Search Bar ── */}
        <div className={styles.searchBar}>

          <div className={styles.field}>
            <label htmlFor="field-title">Job Title</label>
            <input
              id="field-title"
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
              placeholder="Frontend Developer, React…"
              aria-label="Search by job title"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="field-location">Location</label>
            <input
              id="field-location"
              value={locationValue}
              onChange={(e) => setLocationValue(e.target.value)}
              placeholder="Berlin, Remote…"
              aria-label="Search by location"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="field-category">Category</label>
            <div className={styles.selectWrapper}>
              <select
                id="field-category"
                value={categoryValue}
                onChange={(e) => setCategoryValue(e.target.value)}
                aria-label="Search by category"
              >
                <option value="">All Categories</option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="fullstack">Fullstack</option>
                <option value="mobile">Mobile</option>
                <option value="devops">DevOps</option>
                <option value="design">Design</option>
                <option value="data">Data / ML</option>
              </select>
            </div>
          </div>

          <button className={styles.searchButton} aria-label="Search jobs">
            <Search size={16} strokeWidth={2.5} />
            Search
          </button>

        </div>

        {/* ── Tags ── */}
        <div className={styles.tags}>
          <span className={styles.tagsLabel}>Trending:</span>
          {["React", "Next.js", "Remote", "Berlin", "Senior", "TypeScript"].map((tag) => (
            <button
              key={tag}
              onClick={() => handleTag(tag)}
              className={styles.tag}
              aria-label={`Search for ${tag}`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* ── CTAs ── */}
        <div className={styles.ctaGroup}>
          <button className={styles.primaryCTA}>
            Browse All Jobs →
          </button>
          <button className={styles.secondaryCTA}>
            Post a Job
          </button>
        </div>

        {/* ── Scroll hint ── */}
        <button
          className={styles.scrollHint}
          onClick={handleScroll}
          aria-label="Scroll to next section"
        >
          <ChevronDown size={20} />
          <span>Scroll</span>
        </button>

      </div>

      {/* ══════════════════════════════════
          SECONDARY
      ══════════════════════════════════ */}
      <div className={styles.secondary}>

        {/* ── Trust Label ── */}
        <p className={styles.trustLabel}>Trusted by teams at</p>

        {/* ── Logos ── */}
        <div className={styles.logos}>
          <img src="/logos/google.svg"         alt="Google" />
          <img src="/logos/microsoft.svg"      alt="Microsoft" />
          <img src="/logos/amazon.svg"         alt="Amazon" />
          <img src="/logos/bmw.svg"            alt="BMW" />
          <img src="/logos/benz.svg"           alt="Mercedes-Benz" />
          <img src="/logos/deutschebank.svg"   alt="Deutsche Bank" />
          <img src="/logos/allianz.svg"        alt="Allianz" />
          <img src="/logos/sap.svg"            alt="SAP" />
          <img src="/logos/siemens.svg"        alt="Siemens" />
          <img src="/logos/deutschtelekom.svg" alt="Deutsche Telekom" />
        </div>

        {/* ── Stats ── */}
        <div className={styles.stats}>

          <div className={styles.stat}>
            <span
              className={styles.statValue}
              data-counter
              data-target="12450"
              aria-label="12,450 verified tech jobs"
            >0</span>
            <p>Verified Tech Jobs</p>
          </div>

          <div className={styles.stat}>
            <span
              className={styles.statValue}
              data-counter
              data-target="850"
              aria-label="850 active companies"
            >0</span>
            <p>Active Companies</p>
          </div>

          <div className={styles.stat}>
            <span
              className={styles.statValue}
              data-counter
              data-target="98"
              aria-label="98% match accuracy"
            >0</span>
            <span className={styles.statSuffix}>%</span>
            <p>Match Accuracy</p>
          </div>

          <div className={styles.stat}>
            <span
              className={styles.statValue}
              data-counter
              data-target="24"
              aria-label="24 hours average approval time"
            >0</span>
            <span className={styles.statSuffix}>h</span>
            <p>Avg. Approval Time</p>
          </div>

        </div>

      </div>
    </section>
  );
}
