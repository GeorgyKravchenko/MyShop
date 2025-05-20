'use client'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import React from 'react'

const Sidebar = () => {
    const router = useRouter()
    const categories = ['all', 'electronics', 'jewelery', "men's clothing", "women's clothing"]
    
    return (
        <aside className='w-64 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700'>
            <h2 className='text-lg font-semibold mb-4 text-cyan-600 dark:text-cyan-400'>Категорії</h2>
            <ul className='flex flex-col space-y-2'>
                {categories.map((category, i) => (
                    <motion.li 
                        key={i} 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.1 }}
                        className='py-2 px-4 rounded-lg cursor-pointer 
                                  bg-gray-100 dark:bg-gray-700 hover:bg-cyan-100 dark:hover:bg-cyan-900/50 
                                  text-gray-800 dark:text-gray-200 border border-transparent
                                  hover:border-cyan-300 dark:hover:border-cyan-500 
                                  transition-all duration-300 text-center'
                                  onClick={() => category === 'all' ? router.push('?categories=') : router.push(`?categories=${category}`)}>
                        {category[0].toUpperCase() + category.slice(1)}
                    </motion.li>
                ))}
            </ul>
        </aside>
    )
}

export default Sidebar