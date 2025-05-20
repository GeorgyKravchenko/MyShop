'use client';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useActions } from '@/hooks/store/useAction';
import Link from 'next/link';

interface CartPageProps {
  handler: () => void;
}

const CartPage: React.FC<CartPageProps> = ({ handler }) => {
  const cart = useTypedSelector((state) => state.cart);
  const { removeProduct } = useActions();

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="fixed z-10 right-0 top-0 w-80 h-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-lg p-4 flex flex-col"
    >
      <h2 className="text-xl font-bold border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
        Shopping cart
      </h2>

      <div className="flex-1 overflow-y-auto space-y-4 no-scrollbar">
        <AnimatePresence>
          {cart.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-500 dark:text-gray-400"
            >
              The cart is empty
            </motion.p>
          ) : (
            cart.map((item) => (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.3 }}
                key={item.id}
                className="flex items-center space-x-4 border-b border-gray-200 dark:border-gray-700 pb-2"
              >
                <div className="relative w-16 h-16">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-fill rounded"
                    sizes="64px"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">${item.price}</p>
                </div>
                <button
                  onMouseUp={(e) => {
                    e.stopPropagation();
                    removeProduct({ id: item.id });
                  }}
                  className="text-red-500 hover:text-red-700 dark:hover:text-red-400 text-3xl transition-colors"
                >
                  ×
                </button>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {cart.length > 0 && (
        <div className="mt-auto border-t border-gray-200 dark:border-gray-700 pt-4">
          <p className="text-lg font-bold">
            Total: ${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
          </p>
          <Link
            onClick={handler}
            href="/order"
            className="block text-center w-full bg-cyan-500 hover:bg-cyan-600 text-white dark:text-gray-900 py-2 rounded-md mt-2 transition-colors"
          >
            Checkout
          </Link>
        </div>
      )}
    </motion.div>
  );
};

export default CartPage;
