'use client'
import Link from 'next/link'
import React from 'react'
import Cart from './Cart'
import { SearchInput } from './SearchInput'

const Header = () => {
  return (
    <header className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 
                      shadow-md dark:shadow-slate-900/40 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Лого та навігація */}
          <div className="flex items-center gap-8">
            <Link 
              href="/" 
              className="text-xl font-bold tracking-tight text-slate-900 dark:text-white
                         hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            >
              MyShop
            </Link>
            
            <nav className="hidden md:flex items-center gap-6" aria-label="Основна навігація">
              <Link 
                href="/" 
                className="text-slate-600 dark:text-slate-300 
                           hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Головна
              </Link>
              <Link 
                href="/catalog" 
                className="text-slate-600 dark:text-slate-300 
                           hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Каталог
              </Link>
            </nav>
          </div>

          {/* Пошук */}
          <SearchInput />

          {/* Іконки праворуч */}
          <div className="flex items-center gap-4">
            <Cart />
            
            <Link
              href="/profile"
              className="p-1 text-slate-600 dark:text-slate-200 
                         hover:text-slate-900 dark:hover:text-white transition-colors"
              aria-label="Профіль користувача"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                width="30" 
                height="30" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M12 14c-4 0-6 1.5-6 4v1h12v-1c0-2.5-2-4-6-4z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header