'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { getProduct } from '@/lib/productService';
import { useCart } from '@/context/CartContext';
import styles from './page.module.css';

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'description' | 'ingredients'>('description');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, setIsCartOpen } = useCart();

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await getProduct(id);
        setProduct(data);
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      loadProduct();
    }
  }, [id]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setIsCartOpen(true);
    }
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <p>Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h1>Product Not Found</h1>
        <p>The product you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/shop" className={styles.backLink}>
          ← Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Link href="/shop" className={styles.breadcrumb}>
        ← Back to Shop
      </Link>

      <div className={styles.content}>
        {/* Image Gallery */}
        <div className={styles.gallery}>
          <div className={styles.thumbnails}>
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`${styles.thumbnail} ${selectedImage === index ? styles.active : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={image}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </button>
            ))}
          </div>
          <div className={styles.mainImage}>
            {product.images[selectedImage] ? (
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                priority
                style={{ objectFit: 'cover' }}
              />
            ) : (
              <div className={styles.placeholder}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
              </div>
            )}
            {product.isBestSeller && (
              <span className={styles.badge}>Bestseller</span>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className={styles.info}>
          <h1 className={styles.name}>{product.name}</h1>
          <p className={styles.category}>{product.category}</p>

          {/* Tabs */}
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === 'description' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'ingredients' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('ingredients')}
            >
              Ingredients
            </button>
          </div>

          <div className={styles.tabContent}>
            {activeTab === 'description' ? (
              <p>{product.description || 'No description available.'}</p>
            ) : (
              <p>{product.ingredients || 'Ingredients information not available.'}</p>
            )}
          </div>

          {/* Price and Add to Cart */}
          <div className={styles.purchase}>
            <div className={styles.quantity}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <button className={styles.addToCart} onClick={handleAddToCart}>
              {formatPrice(product.price * quantity)} — Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
