import { IOrder } from '@/types/order'
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function OrderPageView({ data }: { data: IOrder }) {
  if (!data) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, transition: { duration: 0.4 } }}
          className="text-center p-8 max-w-xl"
        >
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 0.3, delay: 0.3 } }}
            className="text-4xl font-bold text-red-600 dark:text-red-400 mb-2"
          >
            Замовлення не знайдено
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 0.3, delay: 0.4 } }}
            className="text-gray-600 dark:text-gray-400"
          >
            Перевірте правильність ID замовлення
          </motion.p>
          <Link
            href="/profile"
            className="mt-6 inline-block bg-sky-600 dark:bg-cyan-600 hover:bg-sky-700 dark:hover:bg-cyan-700 text-white px-6 py-2 rounded transition-colors"
          >
            До каталогу
          </Link>
        </motion.div>
      </motion.div>
    )
  }

  const totalAmount = data.products.reduce((sum, product) => sum + product.price, 0)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto rounded-3xl p-6 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300"
    >
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
        className="mb-8 border-b border-sky-500 dark:border-cyan-500 pb-6"
      >
        <h1 className="text-3xl font-bold text-sky-600 dark:text-cyan-400">
          Замовлення <span className="font-mono">#{data.id.slice(0, 8)}</span>
        </h1>
      </motion.header>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
        className="mb-8 p-6 bg-white dark:bg-gray-700 rounded-lg transition-colors duration-300"
      >
        {/* <h2 className="text-2xl font-bold mb-6 text-sky-600 dark:text-cyan-300">Статус замовлення</h2> */}
        <div className="flex justify-between items-center border border-sky-500 dark:border-cyan-500 p-4 rounded-lg">
          <span className="text-gray-600 dark:text-gray-400">Статус:</span>
          <span
            className={`inline-flex items-center gap-2 px-4 py-1 rounded-full text-sm font-medium transition-transform duration-300 hover:scale-105 ${
              data.status === 'completed'
                ? 'bg-green-500/20 text-green-600 dark:text-green-400 border border-green-500/30'
                : data.status === 'pending'
                ? 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border border-yellow-500/30'
                : 'bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30'
            }`}
          >
            {data.status === 'completed' ? '✅' : data.status === 'pending' ? '⏳' : '❌'}
            {data.status}
          </span>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold mb-6 text-sky-600 dark:text-cyan-300">Товари у замовленні</h2>

        <div className="space-y-4">
          {data.products.map((product) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.1 } }}
              whileHover={{ 
                boxShadow: '0 4px 8px rgba(14, 165, 233, 0.2)', 
                y: -2, 
                transition: { duration: 0.3 } 
              }}
              key={product.id}
              className="border border-sky-500 dark:border-cyan-500 rounded-lg p-6 bg-white dark:bg-gray-700 transition-colors duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform hover:scale-110 duration-300"
                    sizes="(max-width: 768px) 100px, 150px"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="font-medium text-sky-600 dark:text-cyan-400 hover:text-sky-700 dark:hover:text-cyan-300 transition-colors duration-300">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 leading-relaxed">
                    {product.description}
                  </p>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="font-bold text-sky-600 dark:text-cyan-400">{product.price.toFixed(2)} ₴</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        whileHover={{ 
          boxShadow: '0 4px 8px rgba(14, 165, 233, 0.2)', 
          y: -2, 
          transition: { duration: 0.3 } 
        }}
        className="bg-white dark:bg-gray-700 rounded-lg p-6 transition-colors duration-300"
      >
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-400">Сума замовлення:</span>
          <span className="text-2xl font-bold text-sky-600 dark:text-cyan-400">{totalAmount.toFixed(2)} ₴</span>
        </div>
      </motion.section>

      <motion.div
        whileHover={{ scale: 1.05 }}
        className="mt-6 text-center"
      >
        <Link
          href="/profile"
          className="inline-block bg-sky-600 dark:bg-cyan-600 hover:bg-sky-700 dark:hover:bg-cyan-700 text-white px-6 py-2 rounded transition-colors"
        >
          Назад до профілю
        </Link>
      </motion.div>
    </motion.div>
  )
}