'use client'
import { withAuth } from "@/lib/firebase/withAuth";
import Link from "next/link";
import { memo } from "react";



function Home() {
  return (
    <main className="container mx-auto px-6 py-8 bg-gray-100 dark:bg-gray-900 rounded-3xl min-h-screen transition-colors duration-300">
      {/* Головний банер */}
      <section className="mb-12 text-center">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-12 transition-all duration-300 hover:scale-[1.01] shadow-xl dark:shadow-none">
          <h1 className="text-4xl font-bold text-cyan-600 dark:text-cyan-400 mb-4">
            Ласкаво просимо до MyShop!
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
            Оберіть техніку майбутнього вже сьогодні
          </p>
          <Link href="/catalog">
            <button className="bg-cyan-600 dark:bg-cyan-500 text-white px-8 py-3 rounded-full 
                            hover:bg-cyan-700 dark:hover:bg-cyan-600 transition-colors shadow-md">
              Перейти до новинок
            </button>
          </Link>
        </div>
      </section>

      {/* Секція переваг */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl hover:-translate-y-1 transition-transform shadow-lg dark:shadow-none border border-gray-100 dark:border-gray-700">
          <div className="text-cyan-600 dark:text-cyan-400 text-3xl mb-4">🚚</div>
          <h3 className="text-xl text-gray-900 dark:text-white mb-2">Швидка доставка</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Доставляємо по всій Україні за 1-3 дні
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl hover:-translate-y-1 transition-transform shadow-lg dark:shadow-none border border-gray-100 dark:border-gray-700">
          <div className="text-cyan-600 dark:text-cyan-400 text-3xl mb-4">🔒</div>
          <h3 className="text-xl text-gray-900 dark:text-white mb-2">Гарантія якості</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Всі товари з офіційною гарантією виробника
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl hover:-translate-y-1 transition-transform shadow-lg dark:shadow-none border border-gray-100 dark:border-gray-700">
          <div className="text-cyan-600 dark:text-cyan-400 text-3xl mb-4">🎁</div>
          <h3 className="text-xl text-gray-900 dark:text-white mb-2">Бонусна система</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Збирайте бали та отримуйте знижки
          </p>
        </div>
      </section>

      {/* Акційні пропозиції */}
      <section className="bg-gradient-to-r from-cyan-500 to-cyan-600 dark:from-cyan-600 dark:to-cyan-800 rounded-xl p-8 animate-pulse">
        <div>
          <h2 className="text-3xl font-bold text-white mb-4">Спеціальна пропозиція!</h2>
          <p className="text-gray-100 dark:text-gray-200 text-lg mb-6">
            Перші 100 покупців отримають ексклюзивний набір аксесуарів
          </p>
          <div className="flex items-center gap-4">
            <div className="flex-1 text-right">
              <div className="text-4xl font-bold text-white">-30%</div>
              <span className="text-gray-200">на всі чохли</span>
            </div>
            <Link href="/catalog">
              <button className="bg-white text-cyan-600 px-6 py-2 rounded-full
                               hover:scale-105 transition-transform shadow-md">
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