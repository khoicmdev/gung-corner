'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { Product, Testimonial } from '@/types';
import { getProducts, getBestSellers } from '@/lib/productService';
import styles from './page.module.css';

// Sample testimonials (could be moved to Firebase later)
const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Aley C.',
    content: '"Somehow always makes me feel like I can take on the day... It\'s literally love in a cup!"',
    rating: 5,
  },
  {
    id: '2',
    name: 'Minh T.',
    content: '"Sữa chua handmade ngon nhất mình từng ăn! Vị truyền thống nhưng rất đặc biệt."',
    rating: 5,
  },
  {
    id: '3',
    name: 'Linh N.',
    content: '"Tàu hũ Singapore mềm mịn, đủ ngọt vừa phải. Nhất định sẽ order lại!"',
    rating: 5,
  },
];

export default function HomePage() {
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        let products = await getBestSellers();
        // If no best sellers, get all products and take first 3
        if (products.length === 0) {
          const allProducts = await getProducts();
          products = allProducts.slice(0, 3);
        }
        setBestSellers(products.slice(0, 3));
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroImage}>
          <Image
            src="/images/hero-bg.jpg"
            alt="Delicious handmade desserts"
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={styles.heroContent}>
          <p className={styles.heroSubtitle}>New! Handmade with ❤️</p>
          <h1 className={styles.heroTitle}>Your Sweet Moment Starts Here</h1>
          <Link href="/shop" className={styles.heroBtn}>
            Shop Now
          </Link>
        </div>
      </section>

      {/* Happy Customers Section */}
      <section className={styles.happyCustomers}>
        <h2 className={styles.sectionTitle}>Over 1,000 happy customers</h2>
        <p className={styles.sectionSubtitle}>
          Since our start, we&apos;ve been delighted in making feel-good treats for your daily ritual.
          <br />
          <span className={styles.founders}>— Gừng&apos;s Corner Team</span>
        </p>
        <Link href="/about" className={styles.discoverLink}>
          Discover Our Story
        </Link>
      </section>

      {/* Best Sellers Section */}
      <section className={styles.bestSellers}>
        <h2 className={styles.sectionHeading}>Bestselling Treats:</h2>
        {loading ? (
          <div className={styles.loading}>
            <div className={styles.spinner} />
            <p>Loading products...</p>
          </div>
        ) : bestSellers.length > 0 ? (
          <div className={styles.productsGrid}>
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className={styles.noProducts}>
            <p>No products available yet.</p>
            <Link href="/admin" className={styles.addProductLink}>
              Add your first product →
            </Link>
          </div>
        )}
      </section>

      {/* Featured Section */}
      <section className={styles.featured}>
        <div className={styles.featuredContent}>
          <h2>&ldquo;Best Dessert Ever.&rdquo;</h2>
          <p>
            Meet the crowd-favorite handmade treats for your sweet cravings.
            Our superfood formula for natural deliciousness.
          </p>
          <Link href="/shop" className={styles.featuredBtn}>
            Explore All Products
          </Link>
        </div>
        <div className={styles.featuredImage}>
          <Image
            src="/images/featured.jpg"
            alt="Featured dessert"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonials}>
        <div className={styles.testimonialCard}>
          <div className={styles.testimonialImage}>
            <div className={styles.testimonialPlaceholder}>
              <span>{testimonials[currentTestimonial].name[0]}</span>
            </div>
          </div>
          <div className={styles.testimonialContent}>
            <p className={styles.testimonialText}>
              {testimonials[currentTestimonial].content}
            </p>
            <div className={styles.testimonialAuthor}>
              — {testimonials[currentTestimonial].name}
              <span className={styles.stars}>
                {'★'.repeat(testimonials[currentTestimonial].rating)}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.testimonialNav}>
          <button onClick={prevTestimonial} aria-label="Previous testimonial">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15,18 9,12 15,6" />
            </svg>
          </button>
          <button onClick={nextTestimonial} aria-label="Next testimonial">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9,18 15,12 9,6" />
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
}
