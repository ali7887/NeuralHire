'use client';

import { useState, useEffect, useCallback, FormEvent } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import styles from './SearchBar.module.css';

interface SearchParams {
  keyword: string;
  location: string;
  category: string;
}

interface SearchBarProps {
  onSearch?: (params: SearchParams) => void;
}

const JOB_CATEGORIES = [
  { value: '', label: 'All Categories' },
  { value: 'frontend', label: 'Frontend Development' },
  { value: 'backend', label: 'Backend Development' },
  { value: 'fullstack', label: 'Full Stack Development' },
  { value: 'mobile', label: 'Mobile Development' },
  { value: 'devops', label: 'DevOps & Infrastructure' },
  { value: 'design', label: 'UI/UX Design' },
  { value: 'data', label: 'Data Science & Analytics' },
  { value: 'product', label: 'Product Management' },
  { value: 'marketing', label: 'Marketing & Growth' },
];

export default function SearchBar({ onSearch }: SearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    setKeyword(searchParams.get('keyword') || '');
    setLocation(searchParams.get('location') || '');
    setCategory(searchParams.get('category') || '');
  }, [searchParams]);

  const updateURL = useCallback(
    (params: SearchParams) => {
      const urlParams = new URLSearchParams();

      if (params.keyword) urlParams.set('keyword', params.keyword);
      if (params.location) urlParams.set('location', params.location);
      if (params.category) urlParams.set('category', params.category);

      const query = urlParams.toString();
      router.push(query ? `${pathname}?${query}` : pathname);
    },
    [pathname, router]
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = { keyword, location, category };
    updateURL(params);
    onSearch?.(params);
  };

  return (
    <form autoComplete="off" className={styles.searchBar} onSubmit={handleSubmit}>
      <div className={styles.searchBar__container}>

        <div className={styles.searchBar__field}>
          <label htmlFor="keyword" className={styles.searchBar__label}>Job Title or Keyword</label>
          <input
            id="keyword"
            placeholder="e.g. Frontend Developer"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className={styles.searchBar__input}
          />
        </div>

        <div className={styles.searchBar__separator} />

        <div className={styles.searchBar__field}>
          <label htmlFor="location" className={styles.searchBar__label}>Location</label>
          <input
            id="location"
            placeholder="e.g. Berlin, Remote"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={styles.searchBar__input}
          />
        </div>

        <div className={styles.searchBar__separator} />

        <div className={styles.searchBar__field}>
          <label htmlFor="category" className={styles.searchBar__label}>Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={styles.searchBar__select}
          >
            {JOB_CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>

        <button className={styles.searchBar__button} type="submit">
          <span className={styles.searchBar__buttonText}>Search Jobs</span>
          <svg className={styles.searchBar__buttonIcon} width="20" height="20" viewBox="0 0 20 20">
            <path
              d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

      </div>
    </form>
  );
}
