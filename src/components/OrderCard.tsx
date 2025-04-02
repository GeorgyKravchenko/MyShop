import { StatusBadge } from '@/app/profile/StatusBadge'
import { IOrder } from '@/types/order'
import Link from 'next/link'
import React, { memo } from 'react'

const OrderCard = ({ order }: { order: IOrder }) => {
  const total = order.products.reduce((sum, product) => sum + product.price, 0);

  return (
    <div
      className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
        <div className="mb-4 md:mb-0">
          <p className="text-lg font-semibold text-cyan-600 dark:text-cyan-400">
            Order #{order.id.slice(0, 8)}
          </p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Products */}
        <div>
          <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Products:</h3>
          <ul className="space-y-2">
            {order.products.map((product) => (
              <li
                key={product.id}
                className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700"
              >
                <span className="text-gray-600 dark:text-gray-400">{product.title}</span>
                <span className="text-cyan-600 dark:text-cyan-400">{product.price.toFixed(2)}$</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Order Details */}
        <div>
          <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Details:</h3>
          <div className="space-y-2">
            <div className="flex justify-between py-2">
              <span className="text-gray-600 dark:text-gray-400">Delivery status:</span>
              <span className="text-emerald-600 dark:text-emerald-400">{order.status}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
              <span className="font-bold text-gray-700 dark:text-gray-300">Total:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{total.toFixed(2)}$</span>
            </div>
          </div>
        </div>
      </div>

      <Link
        href={`/order/${order.id}`}
        className="mt-4 inline-block text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 text-sm transition-colors"
      >
        View order details →
      </Link>
    </div>
  );
};
export default memo(OrderCard)
