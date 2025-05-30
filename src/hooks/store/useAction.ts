import { orderActions } from '@/lib/store/order.slice';
import { CartAction } from '@/lib/store/cart.slice';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { userActions } from '@/lib/store/user.slice';

const AllActions = {
  ...CartAction,
  ...orderActions,
  ...userActions,
};
/**
 * Hook to get all actions.
 *
 * @returns {Object} - An object with all actions.
 *
 * @example
 * import { useActions } from '@/hooks/useAction'
 *
 * const { addProduct, removeProduct } = useActions()
 *
 * // Add product to cart
 * addProduct(product)
 *
 * // Remove product from cart
 * removeProduct(product)
 */
export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(AllActions, dispatch);
};
