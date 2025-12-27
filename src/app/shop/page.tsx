'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';
import { getProducts } from '@/lib/productService';
import styles from './page.module.css';

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Shop All Products</h1>
        <p>Your feel-good treats start here.</p>
      </div>

      {loading ? (
        <div className={styles.loading}>
          <div className={styles.spinner} />
          <p>Loading products...</p>
        </div>
      ) : products.length > 0 ? (
        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
          <h2>No products yet</h2>
          <p>Check back soon for our delicious treats!</p>
        </div>
      )}
    </div>
  );
}
