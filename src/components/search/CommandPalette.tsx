/* eslint-disable react-hooks/set-state-in-effect */
 
'use client';

import { useState, useEffect } from 'react';
import { Search, Command, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import styles from './CommandPalette.module.css';

interface Job {
  id: string;
  title: string;
  company?: string;
  location?: string;
}

export default function CommandPalette({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {

  const router = useRouter();

  const [query, setQuery] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [results, setResults] = useState<Job[]>([]);

  /* Load jobs from localStorage */
  useEffect(() => {

    const stored = localStorage.getItem("jobs");

    if (stored) {
      const parsed = JSON.parse(stored);
      setJobs(parsed);
      setResults(parsed);
    }

  }, []);

  /* ESC close */
  useEffect(() => {

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleEsc);

    return () => window.removeEventListener('keydown', handleEsc);

  }, [onClose]);

  /* Filter jobs */
  useEffect(() => {

    if (!query) {
      setResults(jobs);
      return;
    }

    const q = query.toLowerCase();

    const filtered = jobs.filter((job) =>
      job.title.toLowerCase().includes(q) ||
      job.company?.toLowerCase().includes(q) ||
      job.location?.toLowerCase().includes(q)
    );

    setResults(filtered);

  }, [query, jobs]);

  const openJob = (id: string) => {

    onClose();

    router.push(`/jobs/${id}`);

  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>

        <div className={styles.searchWrapper}>
          <Search className={styles.searchIcon} size={20} />

          <input
            autoFocus
            placeholder="Search jobs, skills, or companies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.input}
          />

          <button onClick={onClose} className={styles.closeBtn}>
            <X size={18}/>
          </button>
        </div>

        <div className={styles.results}>

          {results.length === 0 && (
            <div className={styles.empty}>No results found</div>
          )}

          {results.slice(0, 8).map((job) => (
            <div
              key={job.id}
              className={styles.resultItem}
              onClick={() => openJob(job.id)}
            >
              <Command size={14}/>
              <span>{job.title}</span>
            </div>
          ))}

        </div>

        <div className={styles.footer}>
          <span><kbd>ESC</kbd> close</span>
          <span><kbd>↵</kbd> open</span>
        </div>

      </div>
    </div>
  );
}
