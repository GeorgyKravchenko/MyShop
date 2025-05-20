import { IProduct } from '@/types/product';
import Image from 'next/image';
import React from 'react';
import ButtonAddToCart from '../ui/ButtonAddToCart';
import { motion } from 'framer-motion';

const ProductCard: React.FC<IProduct> = ({
  id,
  title,
  price,
  category,
  description,
  image,
  rating,
}) => {
  return (
    <motion.article
      className="bg-white dark:bg-gray-800 rounded-xl p-4 h-full flex flex-col 
                shadow-lg hover:shadow-xl dark:shadow-gray-900/30 transition-shadow
                border border-gray-100 dark:border-gray-700"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      <div className="rounded-lg overflow-hidden mb-4">
        <Image
          src={image}
          alt={title}
          width={200}
          height={200}
          className="object-fill w-full h-48"
        />
      </div>
      <div className="flex flex-col flex-grow">
        <h2 className="text-lg font-semibold mb-2 line-clamp-2 text-gray-900 dark:text-white">
          {title}
        </h2>

        <div className="flex-grow"></div>

        <div className="mb-4 space-y-3">
          <div className="flex justify-between items-center">
            <p className="text-xl font-bold text-cyan-600 dark:text-cyan-400">
              {price.toFixed(2)}$
            </p>
            <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
              <span className="text-yellow-500">★</span>
              <span className="text-gray-700 dark:text-gray-300">{rating.rate}</span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">({rating.count})</span>
            </div>
          </div>

          <span
            className="inline-block text-sm px-3 py-1 rounded-full 
                         bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300"
          >
            {category}
          </span>
        </div>

        <ButtonAddToCart product={{ id, title, price, category, description, image, rating }} />
      </div>
    </motion.article>
  );
};

export default ProductCard;
