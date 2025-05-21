import Link from 'next/link';
import React, { memo, Suspense } from 'react';
import { IOrder } from '@/types/order';
import IUser from '@/types/user';
import { SectionProfile } from '@/components/SectionProfile';
import dynamic from 'next/dynamic';
import SkeletonLoader from '@/components/ui/SkeletonLoader';

const OrderCard = dynamic(() => import('@/components/cart/OrderCard'), {
  loading: () => <SkeletonLoader />,
});

export const ProfileView = ({ orders, userdata }: { orders: IOrder[]; userdata: IUser }) => {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <SectionProfile userdata={{ ...userdata }} />

      <section className="mt-6 sm:mt-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
          <span className="text-lg sm:text-xl">📦</span>
          Історія замовлень
        </h2>

        <Suspense
          fallback={
            <div className="grid gap-4 sm:gap-6">
              {[...Array(2)].map((_, i) => (
                <SkeletonLoader key={i} />
              ))}
            </div>
          }
        >
          {orders.length === 0 ? (
            <div className="text-center py-8 sm:py-12 border-2 border-dashed border-cyan-500/30 rounded-xl bg-gray-100 dark:bg-gray-800">
              <p className="text-lg sm:text-xl mb-3 sm:mb-4 text-gray-700 dark:text-gray-300">
                У вас ще немає замовлень
              </p>
              <Link
                href="/catalog"
                className="inline-block bg-cyan-600 hover:bg-cyan-700 text-white px-4 sm:px-6 py-2 rounded-lg transition-all duration-300 text-sm sm:text-base"
              >
                До каталогу
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 sm:gap-6">
              {orders.map((order) => (
                <OrderCard order={order} key={order.id} />
              ))}
            </div>
          )}
        </Suspense>
      </section>
    </div>
  );
};

export default memo(ProfileView);
