'use client'
import { useSearchProduct } from "@/hooks/useSearchProduct";
import { IProduct } from "@/types/product";
import { useEffect, useRef, useState } from "react";
import {useForm } from "react-hook-form";
import Image from "next/image";
import ButtonAddToCart from "./ButtonAddToCart";

export const SearchInput = () => {
  const [onFocus, setOnFocus] = useState(false);
  const { register, watch } = useForm();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const ref=useRef<HTMLDivElement>(null)
  const searchTerm = watch("search", "");
  const { filteredData, isLoading, isSuccess } = useSearchProduct(debouncedSearchTerm);
  useEffect(() => {
    setProducts([]);
    const timeoutId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  useEffect(() => {
    if (filteredData && Array.isArray(filteredData)) {
      setProducts(filteredData);
    }
  }, [filteredData]);

  useEffect(() => {
    const handlerOutMouseClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOnFocus(false);
      }
    };
    document.addEventListener('click', handlerOutMouseClick);
    return () => document.removeEventListener('click', handlerOutMouseClick);
  }, []);

  return (
    <div ref={ref} className="relative w-full flex justify-center" >
      <form
        className="hidden flex-1 max-w-xl mx-4 lg:block"
        role="search"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex gap-2">
          <input
          onFocus={() => setOnFocus(true)}
            {...register("search")}
            type="text"
            placeholder="Пошук товарів..."
            className="w-full px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 
                       text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400
                       focus:outline-none focus:ring-2 focus:ring-sky-500 border border-transparent
                       focus:border-sky-500 transition-all"
            aria-label="Пошук товарів"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 
                       text-white focus:outline-none focus:ring-2 focus:ring-sky-500 
                       focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition-colors"
          >
            Знайти
          </button>
        </div>
      </form>
      {/* {isLoading && <div className="text-center mt-4">Завантаження...</div>} */}

      {searchTerm !== "" && !isLoading && isSuccess && onFocus && products.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-slate-800 shadow-lg rounded-lg mt-2 z-50 max-h-60 overflow-y-auto no-scrollbar">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-1 gap-5 justify-between items-center p-3 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <div className="flex grow-0  items-center gap-3">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={48}
                  height={48}
                  className="w-12 h-12 object-fill rounded-lg"
                />
                <div className="shrink-1">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    {product.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {product.price} $
                  </p>
                </div>
              </div>
              <div className="grow-0">
                <ButtonAddToCart product={product} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};