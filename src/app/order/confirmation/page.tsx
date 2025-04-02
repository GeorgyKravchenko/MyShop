'use client'
import { useTypedSelector } from "@/hooks/useTypedSelector";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { memo } from "react";

const OrderConfirmationPage = () => {
  const orders = useTypedSelector((state) => state.order);
  const searchParams = useSearchParams()
  const orderId = searchParams.get('id')
  const order = orders.find((order) => order.id === orderId);

  if (!order) return <p className="text-gray-900 dark:text-gray-100">Замовлення не знайдено</p>;

  const { products } = order;

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-xl transition-colors duration-300">
      {/* Заголовок */}
      <div className="text-center mb-8">
        <svg 
          className="w-16 h-16 text-emerald-500 dark:text-emerald-400 mx-auto mb-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <path 
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4"
          />
        </svg>
        <h1 className="text-3xl font-bold mb-2">Дякуємо за покупку!</h1>
        <p className="text-gray-600 dark:text-gray-400">Ваше замовлення успішно оформлено</p>
      </div>

      {/* Список товарів */}
      <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg mb-6 transition-colors duration-300">
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-500 pb-2">
          Деталі замовлення
        </h2>
        <div className="space-y-3">
          {products.map(product => (
            <div key={product.id} className="flex justify-between items-center">
              <span className="text-gray-800 dark:text-gray-200">{product.title}</span>
              <span className="font-mono text-cyan-600 dark:text-cyan-400">
                {product.price}$
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-cyan-500">
          <div className="flex justify-between font-bold">
            <span className="text-gray-800 dark:text-gray-200">Разом:</span>
            <span className="text-emerald-600 dark:text-emerald-400">
              {products.reduce((total, product) => total + product.price, 0).toFixed(2)}$
            </span>
          </div>
        </div>
      </div>

      {/* Статус замовлення */}
      <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg mb-6 transition-colors duration-300">
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-500 pb-2">
          Статус замовлення
        </h2>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-emerald-500 dark:bg-emerald-400 rounded-full animate-pulse"></div>
          <span className="text-emerald-600 dark:text-emerald-400">Обробляється</span>
        </div>
      </div>

      {/* Кнопка повернення */}
      <div className="text-center">
        <Link 
          href="/home" 
          className="inline-block bg-sky-600 dark:bg-cyan-600 hover:bg-sky-700 dark:hover:bg-cyan-700 text-white px-6 py-3 rounded-lg transition-colors duration-300"
        >
          На головну
        </Link>
      </div>
    </div>
  );
};
export default memo(OrderConfirmationPage);