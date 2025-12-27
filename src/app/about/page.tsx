import Image from 'next/image';
import styles from './page.module.css';

export default function AboutPage() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroImage}>
          <Image
            src="/images/about-hero.jpg"
            alt="About Gừng's Corner"
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={styles.heroContent}>
          <h1>Our Story</h1>
          <p>Handmade with love, served with care</p>
        </div>
      </section>

      {/* Story */}
      <section className={styles.story}>
        <div className={styles.storyContent}>
          <h2>About Gừng&apos;s Corner</h2>
          <p>
            <strong>Gừng&apos;s Corner</strong> started from a simple love for traditional Vietnamese desserts. 
            What began in a small home kitchen has grown into a beloved local destination for 
            those seeking authentic, handmade treats.
          </p>
          <p>
            Every product we make is crafted with the freshest ingredients, traditional recipes 
            passed down through generations, and a commitment to quality that sets us apart.
          </p>
        </div>
        <div className={styles.storyImage}>
          <Image
            src="/images/about-story.jpg"
            alt="Our kitchen"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      </section>

      {/* How We Make */}
      <section className={styles.process}>
        <h2>How We Make Our Food</h2>
        <div className={styles.processGrid}>
          <div className={styles.processCard}>
            <div className={styles.processIcon}>🥛</div>
            <h3>Fresh Ingredients</h3>
            <p>We source only the finest, freshest ingredients from local suppliers.</p>
          </div>
          <div className={styles.processCard}>
            <div className={styles.processIcon}>👩‍🍳</div>
            <h3>Handmade Daily</h3>
            <p>Every batch is made fresh daily with love and attention to detail.</p>
          </div>
          <div className={styles.processCard}>
            <div className={styles.processIcon}>📜</div>
            <h3>Traditional Recipes</h3>
            <p>Our recipes are passed down through generations of Vietnamese cooking.</p>
          </div>
          <div className={styles.processCard}>
            <div className={styles.processIcon}>❤️</div>
            <h3>Made with Love</h3>
            <p>Every product is made with care, just like we would for our own family.</p>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className={styles.products}>
        <h2>Our Specialties</h2>
        <div className={styles.productsList}>
          <div className={styles.productItem}>
            <h3>Sữa Chua Handmade</h3>
            <p>
              Our signature yogurt comes in various flavors: Traditional, Sugar-free, 
              Cheese, Matcha Cheese, Oolong with fresh cream, and Nha đam. 
              Perfect for any time of day!
            </p>
          </div>
          <div className={styles.productItem}>
            <h3>Trái Cây Mix Sữa Chua</h3>
            <p>
              Fresh seasonal fruits combined with our creamy yogurt. Available in 
              convenient 750ml and 1000ml boxes for sharing with family and friends.
            </p>
          </div>
          <div className={styles.productItem}>
            <h3>Tàu Hũ Singapore</h3>
            <p>
              Silky smooth tofu pudding with a delicate sweetness. Choose from 
              original or pandan flavor. Available as combo for gatherings!
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <h2>Ready to taste the difference?</h2>
        <p>Order now and enjoy free delivery within 3km!</p>
        <a href="/shop" className={styles.ctaBtn}>Shop Now</a>
      </section>
    </div>
  );
}
