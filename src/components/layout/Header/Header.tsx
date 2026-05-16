/* eslint-disable no-undef */
'use client';

import Link from 'next/link';
import { Menu, X, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';
import CommandPalette from '@/components/search/CommandPalette';

export function Header() {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isCmdOpen, setIsCmdOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {

    let ticking = false;

    const handleScroll = () => {

      if (!ticking) {

        window.requestAnimationFrame(() => {

          setScrolled(window.scrollY > 40);

          ticking = false;
        });

        ticking = true;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {

      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {

        e.preventDefault();

        setIsCmdOpen(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {

      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };

  }, []);

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : styles.transparent}`}>

        <div className={styles.container}>

          <Link href="/" className={styles.logo}>
            <div className={styles.logoMark}>E</div>
            <span>Euro<strong>Jobs</strong></span>
          </Link>

          <div
            className={styles.stickySearch}
            onClick={() => setIsCmdOpen(true)}
          >
            <Search size={16} />
            <span>Search...</span>
            <kbd className={styles.kbd}>⌘K</kbd>
          </div>

          <nav className={styles.nav}>
            <Link href="/jobs" className={pathname === '/jobs' ? styles.activeLink : ''}>
              Find Jobs
            </Link>

            <Link href="/companies">
              Companies
            </Link>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          <div className={styles.actions}>
            <Link href="/login" className={styles.signIn}>Sign In</Link>
            <Link href="/post-job" className={styles.postJob}>Post a Job</Link>
          </div>

          <button
            className={styles.mobileToggle}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>

      </header>

      <CommandPalette isOpen={isCmdOpen} onClose={() => setIsCmdOpen(false)} />
    </>
  );
}
