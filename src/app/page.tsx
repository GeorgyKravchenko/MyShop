'use client';
import { withAuth } from '@/lib/firebase/withAuth';
import Link from 'next/link';
import { memo } from 'react';

function Home() {
  return (
    <main className="container mx-auto px-6 py-8 bg-gray-100 dark:bg-gray-900 rounded-3xl min-h-screen transition-colors duration-300">
      {/* Головний банер (оставляем без изменений) */}
      <section className="mb-12 text-center">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-12 transition-all duration-300 hover:scale-[1.01] shadow-xl dark:shadow-none">
          <h1 className="text-3xl md:text-4xl font-bold text-cyan-600 dark:text-cyan-400 mb-4">
            Ласкаво просимо до MyShop!
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg mb-6">
            Оберіть техніку майбутнього вже сьогодні
          </p>
          <Link href="/catalog">
            <button
              className="bg-cyan-600 dark:bg-cyan-500 text-white px-6 py-2 md:px-8 md:py-3 rounded-full 
                            hover:bg-cyan-700 dark:hover:bg-cyan-600 transition-colors shadow-md text-sm md:text-base"
            >
              Перейти до новинок
            </button>
          </Link>
        </div>
      </section>

      {/* Секція переваг (исправленная версия) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-12 md:mb-16">
        {[
          {
            icon: '🚚',
            title: 'Швидка доставка',
            text: 'Доставляємо по всій Україні за 1-3 дні',
          },
          {
            icon: '🔒',
            title: 'Гарантія якості',
            text: 'Всі товари з офіційною гарантією виробника',
          },
          {
            icon: '🎁',
            title: 'Бонусна система',
            text: 'Збирайте бали та отримуйте знижки',
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl hover:-translate-y-1 md:hover:-translate-y-2 transition-transform shadow-lg dark:shadow-none border border-gray-100 dark:border-gray-700"
          >
            <div className="text-cyan-600 dark:text-cyan-400 text-2xl md:text-3xl mb-2 md:mb-4">
              {item.icon}
            </div>
            <h3 className="text-base md:text-xl text-gray-900 dark:text-white mb-1 md:mb-2">
              {item.title}
            </h3>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">{item.text}</p>
          </div>
        ))}
      </section>

      {/* Акційні пропозиції (адаптированная версия) */}
      <section className="bg-gradient-to-r from-cyan-500 to-cyan-600 dark:from-cyan-600 dark:to-cyan-800 rounded-xl p-6 md:p-8 animate-pulse">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8">
          <div className="md:max-w-xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-4">
              Спеціальна пропозиція!
            </h2>
            <p className="text-gray-100 dark:text-gray-200 text-sm md:text-lg mb-4 md:mb-0">
              Перші 100 покупців отримають ексклюзивний набір аксесуарів
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="text-center md:text-right">
              <div className="text-3xl md:text-4xl font-bold text-white">-30%</div>
              <span className="text-gray-200 text-sm md:text-base">на всі чохли</span>
            </div>
            <Link href="/catalog" className="w-full md:w-auto">
              <button
                className="bg-white text-cyan-600 px-4 py-2 md:px-6 md:py-2 rounded-full
                               hover:scale-105 transition-transform shadow-md w-full text-sm md:text-base"
              >
                Детальніше
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default withAuth(memo(Home));
