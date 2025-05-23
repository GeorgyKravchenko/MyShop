'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { auth } from '@/lib/firebase/firebase.config';
import { sendPasswordResetEmail } from 'firebase/auth';
import { memo, useState } from 'react';

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      await sendPasswordResetEmail(auth, data.email);
      setMessage('Лист для скидання пароля відправлено на вашу пошту!');
    } catch (err: unknown) {
      if (typeof err === 'object' && err !== null && 'code' in err) {
        const errorCode = (err as { code: string }).code;
        setError(
          errorCode === 'auth/user-not-found'
            ? 'Користувача з такою поштою не знайдено'
            : 'Помилка при відправці листа. Спробуйте ще раз.',
        );
      } else {
        setError('Помилка при відправці листа. Спробуйте ще раз.');
      }
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-800 text-gray-100 rounded-lg shadow-xl my-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-cyan-400">Скидання пароля</h1>

      {message && (
        <div className="mb-4 p-3 bg-green-900 text-green-100 rounded border border-green-700">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-900 text-red-100 rounded border border-red-700">
          {error}
        </div>
      )}

      <form className="space-y-6" onSubmit={onSubmit}>
        <div>
          <label className="block mb-2 text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="example@mail.com"
            className="w-full bg-gray-700 p-3 rounded border border-cyan-500 focus:border-cyan-300 focus:outline-none placeholder:text-gray-400"
            {...register('email', {
              required: "Email є обов'язковим",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Невірний формат email',
              },
            })}
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 rounded transition-colors ${
            isLoading ? 'bg-gray-600 cursor-not-allowed' : 'bg-sky-600 hover:bg-sky-700 text-white'
          }`}
        >
          {isLoading ? 'Відправка...' : 'Надіслати лист'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <span className="text-gray-400">Повернутись до </span>
        <Link href="/login" className="text-cyan-400 hover:text-cyan-300 transition-colors">
          сторінки входу
        </Link>
      </div>
    </div>
  );
};

export default memo(ForgotPasswordPage);
