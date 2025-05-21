'use client';
import { useActions } from '@/hooks/store/useAction';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { IOrder } from '@/types/order';
import { useRouter } from 'next/navigation';
import { memo } from 'react';
import { v1 } from 'uuid';
import { useForm } from 'react-hook-form';
import { withAuth } from '@/lib/firebase/withAuth';
import { useSetData } from '@/hooks/store/useSetData';
import SkeletonLoader from '@/components/ui/SkeletonLoader';

type FormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  paymentMethod: string;
};

const OrderForm = () => {
  const router = useRouter();
  const { addOrder, clearProducts, setOrders } = useActions();
  const cart = useTypedSelector((state) => state.cart);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const id = v1();
  const setDataFetchStatus = useSetData(setOrders, 'orders');

  if (setDataFetchStatus === 'pending') return <SkeletonLoader />;

  const OnSubmit = handleSubmit(() => {
    const order: IOrder = { id: id, products: cart, status: 'pending' };
    addOrder(order);
    clearProducts();
    router.push('/order/confirmation?id=' + id);
  });

  return (
    <form onSubmit={OnSubmit} className="text-gray-900 dark:text-gray-100">
      {/* Buyer Information */}
      <fieldset className="mb-6">
        <legend className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
          Buyer information
        </legend>

        <div className="space-y-4">
          {/* Name Input */}
          <label className="block">
            <input
              {...register('name', { required: true })}
              type="text"
              placeholder="Name and surname"
              className="w-full p-2 sm:p-3 border rounded transition-colors duration-200
                         bg-white dark:bg-gray-700
                         border-gray-300 dark:border-cyan-500
                         placeholder:text-gray-500 dark:placeholder:text-gray-400
                         focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500"
            />
            {errors.name && (
              <span className="text-red-600 dark:text-red-400 text-sm">Name is required</span>
            )}
          </label>

          {/* Email Input */}
          <label className="block">
            <input
              {...register('email', { required: true })}
              type="email"
              placeholder="Email"
              className="w-full p-2 sm:p-3 border rounded transition-colors duration-200
                         bg-white dark:bg-gray-700
                         border-gray-300 dark:border-cyan-500
                         placeholder:text-gray-500 dark:placeholder:text-gray-400
                         focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500"
            />
            {errors.email && (
              <span className="text-red-600 dark:text-red-400 text-sm">Email is required</span>
            )}
          </label>

          {/* Phone Input */}
          <label className="block">
            <input
              {...register('phone', {
                required: true,
                pattern: {
                  value: /^[\+]?3?[\s]?8?[\s]?\(?0\d{2}?\)?[\s]?\d{3}[\s|-]?\d{2}[\s|-]?\d{2}$/,
                  message: 'Невірний формат номера',
                },
              })}
              type="text"
              placeholder="+380 00 000 00 00"
              className="w-full p-2 sm:p-3 border rounded transition-colors duration-200
                         bg-white dark:bg-gray-700
                         border-gray-300 dark:border-cyan-500
                         placeholder:text-gray-500 dark:placeholder:text-gray-400
                         focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500"
            />
            {errors.phone && (
              <span className="text-red-600 dark:text-red-400 text-sm">{errors.phone.message}</span>
            )}
          </label>

          {/* Address Textarea */}
          <label className="block">
            <textarea
              {...register('address', { required: true })}
              placeholder="Delivery address"
              className="w-full p-2 sm:p-3 border rounded transition-colors duration-200
                         bg-white dark:bg-gray-700
                         border-gray-300 dark:border-cyan-500
                         placeholder:text-gray-500 dark:placeholder:text-gray-400
                         focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 
                         resize-none h-24"
            />
            {errors.address && (
              <span className="text-red-600 dark:text-red-400 text-sm">Address is required</span>
            )}
          </label>
        </div>
      </fieldset>

      {/* Payment Section */}
      <fieldset className="mb-6">
        <legend className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
          Payment
        </legend>
        <label className="block">
          <select
            {...register('paymentMethod', { required: true })}
            className="w-full p-2 sm:p-3 border rounded transition-colors duration-200
                       bg-white dark:bg-gray-700
                       border-gray-300 dark:border-cyan-500
                       focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500"
          >
            <option value="">Select payment method</option>
            <option value="card">Card payment</option>
            <option value="cash">Pay on delivery</option>
          </select>
          {errors.paymentMethod && (
            <span className="text-red-600 dark:text-red-400 text-sm">
              Payment method is required
            </span>
          )}
        </label>
      </fieldset>

      {/* Order Summary */}
      <fieldset className="mb-6">
        <legend className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
          Your order
        </legend>
        <div
          className="border rounded p-4 transition-colors duration-200
                    bg-gray-50 dark:bg-gray-700 
                    border-gray-300 dark:border-cyan-500"
        >
          {cart.map((product) => (
            <p key={product.id} className="text-gray-700 dark:text-gray-300 py-1">
              {product.title} {product.price}$
            </p>
          ))}
          <hr className="my-2 border-gray-200 dark:border-cyan-500" />
          <p className="font-bold text-gray-800 dark:text-gray-100">
            Total: {cart.reduce((sum, product) => sum + product.price, 0).toFixed(2)}$
          </p>
        </div>
      </fieldset>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-2 sm:py-3 rounded transition-colors duration-200
                   bg-sky-600 hover:bg-sky-700 dark:bg-cyan-600 dark:hover:bg-cyan-700 
                   text-white font-medium"
        disabled={cart.length === 0}
      >
        Confirm order
      </button>
    </form>
  );
};

export default withAuth(memo(OrderForm));
