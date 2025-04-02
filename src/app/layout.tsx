
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { memo } from "react";
// import { wrapper } from "@/lib/store";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  
  title: "MyShop — Інтернет магазин",
  description: "Купуйте техніку майбутнього з гарантією. Доставка по всій Україні!",
  keywords: ["техніка", "магазин", "гаджети"],
 
};

 function RootLayout({ children }: { children: React.ReactNode }) {
  // const {loadCart} = useActions()

  // loadCart()
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased `}>
       <StoreProvider>
          <div className="flex flex-col gap-10">
            <Header />
            <div className="container mx-auto">
            {children}
              </div>
            <Footer />
          </div>
         </StoreProvider>
      </body>
    </html>
  );
}
export default memo(RootLayout)
// export default wrapper.withRedux(RootLayout);