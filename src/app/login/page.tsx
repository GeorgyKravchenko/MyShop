'use client'
import { handleLogin } from '@/lib/firebase/login'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { memo, useState } from 'react'
import { useForm } from 'react-hook-form'

interface FormData{
  email:string,
  password:string
}
const LoginPage = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const onSubmit = handleSubmit(async (formData: FormData) => {
    const userCredential = await handleLogin(formData.email, formData.password);
    if (userCredential) {
      router.back(); 

     }
     else{
      setErrorMessage('Невірно введений пароль або email');

     }
  });
  return (
    <div className="max-w-md mx-auto p-4 bg-gray-800 text-gray-100 rounded-lg shadow-xl my-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-cyan-400">
        Вхід в акаунт
      </h1>

      <form className="space-y-6" onSubmit={onSubmit}>
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
          <input
            id="email"
            type="email"
            placeholder="example@mail.com"
            className="w-full bg-gray-700 p-3 rounded border border-cyan-500 focus:border-cyan-300 focus:outline-none placeholder:text-gray-400"
            {...register('email', { required: true })}
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium">Пароль</label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            className="w-full bg-gray-700 p-3 rounded border border-cyan-500 focus:border-cyan-300 focus:outline-none placeholder:text-gray-400"
            {...register('password', { required: true })}
          />
        </div>
        {/* {errors.email || errors.password ? <span className="text-red-500 text-sm">Email or password is invalid</span> : null} */}
        {errorMessage ? <span className="text-red-500 text-sm">{errorMessage}</span> : null}
        <button
          type="submit"
          className="w-full bg-sky-600 hover:bg-sky-700 text-white py-3 rounded transition-colors"
        >
          Увійти
        </button>
      </form>

      <div className="mt-6 text-center">
        <span className="text-gray-400">Ще не маєте акаунту? </span>
        <Link 
          href={`/signup?redirect=${encodeURIComponent(window.location.pathname)}`} 
          className="text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          Зареєструватись
        </Link>
      </div>
    </div>
  );
}

export default memo(LoginPage)