'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { Product } from '@/types';
import { getProducts, createProduct, updateProduct, deleteProduct, uploadImage } from '@/lib/productService';
import styles from './page.module.css';

interface ProductFormData {
  name: string;
  description: string;
  ingredients: string;
  price: number;
  category: string;
  isBestSeller: boolean;
  images: string[];
}

const initialFormData: ProductFormData = {
  name: '',
  description: '',
  ingredients: '',
  price: 0,
  category: '',
  isBestSeller: false,
  images: [],
};

export default function AdminPage() {
  const { isAdmin } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Redirect if not admin
    if (!isAdmin) {
      router.push('/login');
      return;
    }

    loadProducts();
  }, [isAdmin, router]);

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

  const handleAddNew = () => {
    setEditingProduct(null);
    setFormData(initialFormData);
    setShowModal(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      ingredients: product.ingredients,
      price: product.price,
      category: product.category,
      isBestSeller: product.isBestSeller || false,
      images: product.images,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);
    try {
      const uploadedUrls: string[] = [];
      for (const file of Array.from(files)) {
        const fileName = `${Date.now()}-${file.name}`;
        const url = await uploadImage(file, fileName);
        uploadedUrls.push(url);
      }
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls],
      }));
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      alert('Please fill in name and price');
      return;
    }

    setSaving(true);
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, formData);
        setProducts(products.map(p => 
          p.id === editingProduct.id ? { ...p, ...formData, updatedAt: new Date() } : p
        ));
      } else {
        const id = await createProduct(formData);
        const newProduct: Product = {
          id,
          ...formData,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        setProducts([newProduct, ...products]);
      }
      setShowModal(false);
      setFormData(initialFormData);
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Product Management</h1>
        <button className={styles.addBtn} onClick={handleAddNew}>
          + Add New Product
        </button>
      </div>

      {loading ? (
        <div className={styles.loading}>
          <div className={styles.spinner} />
          <p>Loading products...</p>
        </div>
      ) : products.length > 0 ? (
        <div className={styles.grid}>
          {products.map(product => (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.productImage}>
                {product.images[0] ? (
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <div className={styles.placeholder}>No Image</div>
                )}
                <div className={styles.productActions}>
                  <button
                    className={styles.editBtn}
                    onClick={() => handleEdit(product)}
                    aria-label="Edit"
                  >
                    ✏️
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => {
                      if (confirm(`Delete "${product.name}"?`)) {
                        handleDelete(product.id);
                      }
                    }}
                    aria-label="Delete"
                  >
                    🗑️
                  </button>
                </div>
                {product.isBestSeller && (
                  <span className={styles.badge}>Bestseller</span>
                )}
              </div>
              <div className={styles.productInfo}>
                <h3>{product.name}</h3>
                <p className={styles.category}>{product.category}</p>
                <p className={styles.price}>{formatPrice(product.price)}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <p>No products yet. Add your first product!</p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <>
          <div className={styles.overlay} onClick={() => setShowModal(false)} />
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <button
                className={styles.closeBtn}
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label>Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Product name"
                  required
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Price (VNĐ) *</label>
                  <input
                    type="number"
                    value={formData.price || ''}
                    onChange={e => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                    placeholder="10000"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="Sữa chua"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your product..."
                  rows={3}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Ingredients</label>
                <textarea
                  value={formData.ingredients}
                  onChange={e => setFormData(prev => ({ ...prev, ingredients: e.target.value }))}
                  placeholder="List ingredients..."
                  rows={2}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={formData.isBestSeller}
                    onChange={e => setFormData(prev => ({ ...prev, isBestSeller: e.target.checked }))}
                  />
                  Mark as Bestseller
                </label>
              </div>

              <div className={styles.formGroup}>
                <label>Images</label>
                <div className={styles.imageUpload}>
                  {formData.images.map((url, index) => (
                    <div key={index} className={styles.uploadedImage}>
                      <Image src={url} alt="" fill style={{ objectFit: 'cover' }} />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className={styles.removeImage}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <label className={styles.uploadBtn}>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      disabled={uploading}
                    />
                    {uploading ? 'Uploading...' : '+ Add Image'}
                  </label>
                </div>
              </div>

              <div className={styles.formActions}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={styles.saveBtn}
                  disabled={saving}
                >
                  {saving ? 'Saving...' : editingProduct ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
