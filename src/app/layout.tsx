import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cart from "@/components/Cart";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "Gừng's Corner - Dessert, Gift and More",
  description: "Handmade Vietnamese desserts and gifts. Sữa chua, Tàu hũ Singapore, và nhiều hơn nữa!",
  keywords: ["dessert", "Vietnamese", "sữa chua", "tàu hũ", "handmade", "gifts"],
  icons: {
    icon: '/images/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${inter.variable} ${playfair.variable} flex flex-col min-h-screen`}
        style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}
      >
        <AuthProvider>
          <CartProvider>
            <Header />
            <main style={{ paddingTop: '72px' }} className="flex-grow">
              {children}
            </main>
            <Footer />
            <Cart />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
