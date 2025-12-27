'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import styles from './Cart.module.css';

export default function Cart() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotal,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  const [showCheckout, setShowCheckout] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const isFormValid = customerName.trim() !== '' && phoneNumber.trim() !== '';

  const handleConfirmOrder = () => {
    if (isFormValid) {
      // In a real app, this would send the order to a backend
      console.log('Order confirmed:', {
        items,
        customerName,
        phoneNumber,
        total: getTotal(),
      });
      setOrderConfirmed(true);
      setTimeout(() => {
        clearCart();
        setIsCartOpen(false);
        setShowCheckout(false);
        setOrderConfirmed(false);
        setCustomerName('');
        setPhoneNumber('');
      }, 3000);
    }
  };

  const handleCancel = () => {
    setShowCheckout(false);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className={styles.overlay} onClick={() => setIsCartOpen(false)} />

      {/* Cart Drawer */}
      <div className={styles.drawer}>
        <div className={styles.header}>
          <h2>{showCheckout ? 'Checkout' : 'Your Cart'}</h2>
          <button
            className={styles.closeBtn}
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {orderConfirmed ? (
          <div className={styles.confirmed}>
            <div className={styles.checkmark}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#697630" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                <polyline points="22,4 12,14.01 9,11.01" />
              </svg>
            </div>
            <h3>Order Confirmed!</h3>
            <p>Thank you for your order. We will contact you shortly.</p>
          </div>
        ) : showCheckout ? (
          <div className={styles.checkoutForm}>
            <div className={styles.formGroup}>
              <label htmlFor="customerName">Your Name *</label>
              <input
                type="text"
                id="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="phoneNumber">Phone Number *</label>
              <input
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>

            <div className={styles.orderSummary}>
              <h4>Order Summary</h4>
              {items.map((item) => (
                <div key={item.product.id} className={styles.summaryItem}>
                  <span>{item.product.name} x{item.quantity}</span>
                  <span>{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}
              <div className={styles.summaryTotal}>
                <span>Total</span>
                <span>{formatPrice(getTotal())}</span>
              </div>
            </div>

            <div className={styles.checkoutActions}>
              <button
                className={styles.confirmBtn}
                onClick={handleConfirmOrder}
                disabled={!isFormValid}
              >
                Confirm Order
              </button>
              <button className={styles.cancelBtn} onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            {items.length === 0 ? (
              <div className={styles.empty}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5">
                  <path d="M6 6H4.5C3.67 6 3 6.67 3 7.5V8.5C3 9.33 3.67 10 4.5 10H5L6 19C6 19.55 6.45 20 7 20H17C17.55 20 18 19.55 18 19L19 10H19.5C20.33 10 21 9.33 21 8.5V7.5C21 6.67 20.33 6 19.5 6H18M6 6V5C6 3.34 7.34 2 9 2H15C16.66 2 18 3.34 18 5V6M6 6H18" />
                </svg>
                <p>Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className={styles.items}>
                  {items.map((item) => (
                    <div key={item.product.id} className={styles.item}>
                      <div className={styles.itemImage}>
                        {item.product.images[0] ? (
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            width={80}
                            height={80}
                            style={{ objectFit: 'cover' }}
                          />
                        ) : (
                          <div className={styles.placeholder} />
                        )}
                      </div>
                      <div className={styles.itemInfo}>
                        <h4>{item.product.name}</h4>
                        <p className={styles.itemPrice}>{formatPrice(item.product.price)}</p>
                        <div className={styles.quantity}>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        className={styles.removeBtn}
                        onClick={() => removeFromCart(item.product.id)}
                        aria-label="Remove item"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3,6 5,6 21,6" />
                          <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2v2" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>

                <div className={styles.footer}>
                  <div className={styles.total}>
                    <span>Total</span>
                    <span>{formatPrice(getTotal())}</span>
                  </div>
                  <button
                    className={styles.checkoutBtn}
                    onClick={() => setShowCheckout(true)}
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
