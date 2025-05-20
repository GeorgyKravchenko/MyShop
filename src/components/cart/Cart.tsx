'use client';
import CartPage from '@/components/cart/CartPage';
import { useActions } from '@/hooks/store/useAction';
import { useSetData } from '@/hooks/store/useSetData';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const Cart = () => {
  const { setProducts } = useActions();
  useSetData(setProducts, 'carts');
  const cart = useTypedSelector((state) => state.cart);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
      setIsCartOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isCartOpen]);

  const cartCount = cart.length;

  return (
    <div className="flex items-center">
      <button
        onClick={() => setIsCartOpen((prev) => !prev)}
        className="relative hover:text-gray-300 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h11l1.5-6M7 13h10l-1.5 6H5.4m1.6-6L3 3m4 0h12v2H7m4 12a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        {cartCount !== 0 && (
          <span className="absolute -top-[5px] -right-[5px] bg-red-500 text-white rounded-full h-4 w-4 text-xs flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>
      <AnimatePresence>
        {isCartOpen && (
          <div ref={cartRef}>
            <CartPage handler={() => setIsCartOpen(false)} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default Cart;
