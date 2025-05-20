'use client';
import { useActions } from '@/hooks/store/useAction';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { IProduct } from '@/types/product';
import React from 'react';

interface ButtonAddToCartProps {
  product: IProduct;
}

const ButtonAddToCart: React.FC<ButtonAddToCartProps> = ({ product }) => {
  const { addProduct, removeProduct } = useActions();
  const cart = useTypedSelector((state) => state.cart);
  const isInCart = cart.some((p) => p.id === product.id);
  return (
    <>
      {isInCart ? (
        <button
          className="bg-red-600 text-white p-2 rounded-xl duration-300 transition-all hover:shadow-lg hover:bg-red-500 active:translate-y-0.5 active:shadow-sm"
          onClick={() => removeProduct(product)}
        >
          Remove from cart
        </button>
      ) : (
        <button
          className="bg-green-600 text-white p-2 rounded-xl duration-300 transition-all hover:shadow-lg hover:bg-green-500 active:translate-y-0.5 active:shadow-sm"
          onClick={() => addProduct(product)}
        >
          Add to cart
        </button>
      )}
    </>
  );
};

export default ButtonAddToCart;
