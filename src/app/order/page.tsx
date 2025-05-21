import { memo } from 'react';
import OrderForm from './orderForm';

const OrderPage = () => {
  return (
    <div className="px-4 sm:px-6 py-6">
      <section
        className="max-w-4xl mx-auto shadow-lg rounded-lg p-4 sm:p-6
                        bg-white dark:bg-gray-800 
                        text-gray-900 dark:text-gray-100
                        transition-colors duration-300"
      >
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold">Order confirmation</h1>
        </div>
        <OrderForm />
      </section>
    </div>
  );
};

export default memo(OrderPage);
