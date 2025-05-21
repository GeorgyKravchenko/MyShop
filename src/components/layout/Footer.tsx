import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* About us */}
          <section className="space-y-3" aria-labelledby="about-us">
            <h3
              id="about-us"
              className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white"
            >
              Про нас
            </h3>
            <p className="text-sm sm:text-base leading-relaxed">
              Ми створюємо майбутнє технологій вже сьогодні, пропонуючи найкращі рішення
            </p>
          </section>

          {/* Contacts */}
          <address className="space-y-3 not-italic">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Контакти</h3>
            <div className="space-y-1 text-sm sm:text-base">
              <p>
                <a
                  href="mailto:info@myshop.com"
                  className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                >
                  ✉️ info@myshop.com
                </a>
              </p>
              <p>
                <a
                  href="tel:+380991234567"
                  className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                >
                  📞 +38 (099) 123-45-67
                </a>
              </p>
            </div>
          </address>

          {/* Links */}
          <section className="space-y-3" aria-labelledby="links">
            <h3 id="links" className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
              Навігація
            </h3>
            <nav className="space-y-2 text-sm sm:text-base">
              <a
                href="/privacy"
                className="block hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              >
                Політика конфіденційності
              </a>
              <a
                href="/terms"
                className="block hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              >
                Умови використання
              </a>
            </nav>
          </section>
        </div>

        {/* Social networks */}
        <nav className="pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-wrap justify-center gap-4 sm:gap-6">
          {[
            {
              name: 'Facebook',
              href: 'https://facebook.com',
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.04c-5.5 0-10 4.5-10 10.02 0 5.01 3.66 9.13 8.43 9.95v-7.07H8.08v-2.88h2.35v-2.15c0-2.32 1.41-3.59 3.46-3.59.99 0 1.84.07 2.09.1v2.43H14.7c-1.08 0-1.29.51-1.29 1.26v1.66h2.57l-.34 2.88h-2.23v7.08c4.77-.82 8.44-4.94 8.44-9.96 0-5.52-4.5-10.02-10-10.02z" />
                </svg>
              ),
            },
            {
              name: 'Twitter',
              href: 'https://twitter.com',
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.56c-.88.39-1.83.65-2.83.77a4.92 4.92 0 002.15-2.71 9.86 9.86 0 01-3.1 1.18 4.92 4.92 0 00-8.42 4.48 13.96 13.96 0 01-10.16-5.16 4.92 4.92 0 001.52 6.57 4.89 4.89 0 01-2.23-.61v.06a4.93 4.93 0 003.95 4.83 4.89 4.89 0 01-2.22.08 4.93 4.93 0 004.6 3.43 9.86 9.86 0 01-7.29 2.03 13.96 13.96 0 007.55 2.21c9.06 0 14.01-7.51 14.01-14.01 0-.21-.01-.42-.02-.63A9.98 9.98 0 0024 4.56z" />
                </svg>
              ),
            },
            {
              name: 'Instagram',
              href: 'https://instagram.com',
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.2c3.2 0 3.59 0 4.85.07 1.23.06 1.9.26 2.34.45.52.2.9.44 1.28.82.38.38.62.76.82 1.28.19.44.39 1.1.45 2.34.07 1.26.07 1.66.07 4.85s0 3.59-.07 4.85c-.06 1.23-.26 1.9-.45 2.34-.2.52-.44.9-.82 1.28-.38.38-.76.62-1.28.82-.44.19-1.1.39-2.34.45-1.26.07-1.66.07-4.85.07s-3.59 0-4.85-.07c-1.23-.06-1.9-.26-2.34-.45-.52-.2-.9-.44-1.28-.82-.38-.38-.62-.76-.82-1.28-.19-.44-.39-1.1-.45-2.34-.07-1.26-.07-1.66-.07-4.85s0-3.59.07-4.85c.06-1.23.26-1.9.45-2.34.2-.52.44-.9.82-1.28.38-.38.76-.62 1.28-.82.44-.19 1.1-.39 2.34-.45C8.41 2.2 8.8 2.2 12 2.2zm0 1.8c-3.17 0-3.55 0-4.79.06-1.09.06-1.57.24-1.94.4-.49.19-.83.42-1.2.8-.38.37-.61.71-.8 1.2-.17.37-.34.86-.4 1.94-.07 1.24-.07 1.62-.07 4.79s0 3.55.07 4.79c.06 1.09.24 1.57.4 1.94.19.49.42.83.8 1.2.37.38.71.61 1.2.8.37.17.86.34 1.94.4 1.24.07 1.62.07 4.79.07s3.55 0 4.79-.07c1.09-.06 1.57-.24 1.94-.4.49-.19.83-.42 1.2-.8.38-.37.61-.71.8-1.2.17-.37.34-.86.4-1.94.07-1.24.07-1.62.07-4.79s0-3.55-.07-4.79c-.06-1.09-.24-1.57-.4-1.94-.19-.49-.42-.83-.8-1.2-.37-.38-.71-.61-1.2-.8-.37-.17-.86-.34-1.94-.4-1.24-.07-1.62-.07-4.79-.07zM12 5.83A6.17 6.17 0 105.83 12 6.17 6.17 0 0012 5.83zm0 1.8a4.38 4.38 0 110 8.77 4.38 4.38 0 010-8.77zm6.57-1.8a1.44 1.44 0 11-1.44 1.44 1.44 1.44 0 011.44-1.44z" />
                </svg>
              ),
            },
          ].map((social) => (
            <a
              key={social.name}
              href={social.href}
              aria-label={social.name}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-cyan-100 dark:hover:bg-cyan-900/50 transition-colors"
            >
              {social.icon}
            </a>
          ))}
        </nav>

        {/* Copyright */}
        <div className="mt-6 text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} MyShop. Всі права захищені
        </div>
      </div>
    </footer>
  );
};

export default Footer;
