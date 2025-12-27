'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();
  const { getItemCount, setIsCartOpen } = useCart();
  const { isAdmin, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const itemCount = getItemCount();

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        {/* Left: Navigation */}
        <nav className={styles.nav}>
          <Link
            href="/shop"
            className={`${styles.navLink} ${pathname === '/shop' ? styles.active : ''}`}
          >
            Shop
          </Link>
          <Link
            href="/about"
            className={`${styles.navLink} ${pathname === '/about' ? styles.active : ''}`}
          >
            About
          </Link>
        </nav>

        {/* Center: Logo and Title */}
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" fill="#697630" />
              <path
                d="M20 8C20 8 25 12 25 18C25 24 20 28 20 28C20 28 15 24 15 18C15 12 20 8 20 8Z"
                fill="#FDF9EE"
              />
              <path
                d="M12 15C12 15 16 17 18 22C20 27 18 32 18 32"
                stroke="#FDF9EE"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M28 15C28 15 24 17 22 22C20 27 22 32 22 32"
                stroke="#FDF9EE"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className={styles.logoText}>Gừng&apos;s Corner</span>
        </Link>

        {/* Right: Login and Cart */}
        <div className={styles.actions}>
          {isAdmin ? (
            <>
              <Link href="/admin" className={styles.adminLink}>
                Admin
              </Link>
              <button onClick={logout} className={styles.loginBtn}>
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className={styles.loginBtn}>
              Log in
            </Link>
          )}
          <button
            className={styles.cartBtn}
            onClick={() => setIsCartOpen(true)}
            aria-label="Open cart"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 6H4.5C3.67 6 3 6.67 3 7.5V8.5C3 9.33 3.67 10 4.5 10H5L6 19C6 19.55 6.45 20 7 20H17C17.55 20 18 19.55 18 19L19 10H19.5C20.33 10 21 9.33 21 8.5V7.5C21 6.67 20.33 6 19.5 6H18M6 6V5C6 3.34 7.34 2 9 2H15C16.66 2 18 3.34 18 5V6M6 6H18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="9" cy="16" r="1" fill="currentColor" />
              <circle cx="15" cy="16" r="1" fill="currentColor" />
            </svg>
            {itemCount > 0 && <span className={styles.cartBadge}>{itemCount}</span>}
          </button>

          {/* Mobile menu toggle */}
          <button
            className={styles.mobileMenuBtn}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={styles.hamburger}></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className={`${styles.mobileNav} ${isMobileMenuOpen ? styles.open : ''}`}>
          <Link
            href="/shop"
            className={styles.mobileNavLink}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Shop
          </Link>
          <Link
            href="/about"
            className={styles.mobileNavLink}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>
          {isAdmin ? (
            <>
              <Link
                href="/admin"
                className={styles.mobileNavLink}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Admin
              </Link>
              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className={styles.mobileNavLink}
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className={styles.mobileNavLink}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Log in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
