'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

type MeResponse = {
  id: string
  email: string
  role: "user" | "admin"
}

export function Header() {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<MeResponse | null>(null);

  const progressRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (progressRef.current) {
        const total =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight;

        const percent = (window.scrollY / total) * 100;

        progressRef.current.style.width = `${percent}%`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);

  }, []);


  // گرفتن اطلاعات کاربر
  useEffect(() => {

    async function fetchUser() {
      try {

        const res = await fetch("/api/auth/me");

        if (!res.ok) return;

        const data = await res.json();

        if (data?.data) {
          setUser(data.data);
        }

      } catch {
        // ignore
      }
    }

    fetchUser();

  }, []);


  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>

        {/* LOGO */}
        <Link href="/" className={styles.logo}>
          <div className={styles.logoMark}>E</div>
          <span>
            Euro<strong>Jobs</strong>
          </span>
        </Link>


        {/* NAV */}
        <nav className={styles.nav}>

          <Link href="/jobs" className={pathname === '/jobs' ? styles.activeLink : ''}>
            Find Jobs
          </Link>

          <Link href="/companies" className={pathname === '/companies' ? styles.activeLink : ''}>
            Companies
          </Link>

          <Link href="/about" className={pathname === '/about' ? styles.activeLink : ''}>
            About
          </Link>

          <Link href="/contact" className={pathname === '/contact' ? styles.activeLink : ''}>
            Contact
          </Link>

          {/* فقط برای ادمین */}
          {user?.role === "admin" && (
            <Link href="/admin/dashboard">
              Admin
            </Link>
          )}

        </nav>


        {/* ACTIONS */}
        <div className={styles.actions}>

          {!user && (
            <Link href="/login" className={styles.signIn}>

              Sign In
            </Link>
          )}

          <Link href="/post-job" className={styles.postJob}>
            Post a Job
          </Link>

        </div>


        {/* MOBILE BUTTON */}
        <button
          className={styles.mobileToggle}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>


      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>

          <Link href="/jobs">Find Jobs</Link>
          <Link href="/companies">Companies</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>

          {user?.role === "admin" && (
            <Link href="/admin/dashboard">
              Admin
            </Link>
          )}

          {!user && (
            <Link href="/login">Sign In</Link>
          )}


          <Link href="/post-job" className={styles.mobilePostJob}>
            Post a Job
          </Link>

        </div>
      )}

      <div ref={progressRef} className={styles.progressBar} />

    </header>
  );
}
