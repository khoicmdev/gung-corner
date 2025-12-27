import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Brand */}
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            <div className={styles.logoIcon}>
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" fill="#697630" />
                <path
                  d="M20 8C20 8 25 12 25 18C25 24 20 28 20 28C20 28 15 24 15 18C15 12 20 8 20 8Z"
                  fill="#FDF9EE"
                />
              </svg>
            </div>
            <span className={styles.logoText}>Gừng&apos;s Corner</span>
          </Link>
          <p className={styles.tagline}>Dessert, Gift and More</p>
        </div>

        {/* Quick Links */}
        <div className={styles.links}>
          <h4>Quick Links</h4>
          <Link href="/shop">Shop</Link>
          <Link href="/about">About Us</Link>
        </div>

        {/* Contact */}
        <div className={styles.contact}>
          <h4>Contact Us</h4>
          <a href="tel:0904617462" className={styles.contactItem}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
            0904.617.462
          </a>
        </div>

        {/* Social Media */}
        <div className={styles.social}>
          <h4>Follow Us</h4>
          <div className={styles.socialIcons}>
            <a
              href="https://facebook.com/gungscorner"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className={styles.socialIcon}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
            <a
              href="https://instagram.com/gungscorner"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={styles.socialIcon}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a
              href="https://zalo.me/0904617462"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Zalo"
              className={styles.socialIcon}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className={styles.copyright}>
        <p>© {currentYear} Gừng&apos;s Corner. All rights reserved.</p>
        <p className={styles.freeShip}>Free shipping within 3km radius 🛵</p>
      </div>
    </footer>
  );
}
