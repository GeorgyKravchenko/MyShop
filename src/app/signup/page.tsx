'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { handleSignUp } from '@/lib/firebase/signup'
import { useRouter } from 'next/navigation'
import { addData } from '@/lib/firebase/addData'
import IUser from '@/types/user'
import { memo } from 'react'
import { auth } from '@/lib/firebase/firebase.config'

interface FormData {
  name: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}
const SignupPage = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>();
  const router = useRouter();
  const onSubmit = handleSubmit(async (data: FormData) => {
    const userCredential = await handleSignUp(data.email, data.password);
     const id = auth.currentUser?.uid
     const user = {name: data.name, email: data.email, phone: data.phone,description: ''};
    await addData<Omit<IUser,'id'  | 'lastUpdatedAt'>>(user, 'users',id);
     if (userCredential) {
      router.back(); 
     }

    });

  const handlePasswordPower = (password: string) => {
    if (!password) return 0;
    const strength = (
      (password.length >= 8 ? 1 : 0) +
      (/[A-Z]/.test(password) ? 1 : 0) +
      (/\d/.test(password) ? 1 : 0) +
      (/[!@#$%^&*-+=]/.test(password) ? 1 : 0)
    );
    return strength;
  }
  

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-800 text-gray-100 rounded-lg shadow-xl my-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-cyan-400">
        Реєстрація
      </h1>

      <form className="space-y-6" onSubmit={onSubmit}>
        <div>
          <label className="block mb-2 text-sm font-medium">Імʼя</label>
          <input
            type="text"
            placeholder="Іван Іванов"
            className="w-full bg-gray-700 p-3 rounded border border-cyan-500 focus:border-cyan-300 focus:outline-none placeholder:text-gray-400"
            {...register('name', { required: "Ім'я є обов'язковим" })}
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="example@mail.com"
            className="w-full bg-gray-700 p-3 rounded border border-cyan-500 focus:border-cyan-300 focus:outline-none placeholder:text-gray-400"
            {...register('email', { required: "Email є обов'язковим" })}
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">Телефон</label>
          <input
            type="tel"
            placeholder="+380 00 000 00 00"
            className="w-full bg-gray-700 p-3 rounded border border-cyan-500 focus:border-cyan-300 focus:outline-none placeholder:text-gray-400"
            {...register('phone', { required: "Телефон є обов'язковим" ,
              pattern: {
              value: /^[\+]?3?[\s]?8?[\s]?\(?0\d{2}?\)?[\s]?\d{3}[\s|-]?\d{2}[\s|-]?\d{2}$/,
              message: "Невірний формат номера"
            }})}
          />
          {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
        </div>

        <div>
          <label aria-label='Password' className="block mb-2 text-sm font-medium">Пароль</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full bg-gray-700 p-3 rounded border border-cyan-500 focus:border-cyan-300 focus:outline-none placeholder:text-gray-400"
            {...register('password', { required: "Пароль є обов'язковим",minLength: 8 ,validate: {
              strength: value => {
                const strength = handlePasswordPower(value);
                return strength >= 3 || 'Пароль занадто слабкий';
              }}})}
          />
         
          <ul className="flex gap-1 mt-2">
            {handlePasswordPower(watch('password')) >= 1 ? <li className="h-1 w-full rounded-full bg-green-600"></li>: <li className="h-1 w-full rounded-full bg-gray-600"></li>}
            {handlePasswordPower(watch('password')) >= 2 ? <li className="h-1 w-full rounded-full bg-green-600"></li>: <li className="h-1 w-full rounded-full bg-gray-600"></li>}
            {handlePasswordPower(watch('password')) >= 3 ? <li className="h-1 w-full rounded-full bg-green-600"></li>: <li className="h-1 w-full rounded-full bg-gray-600"></li>}
            {handlePasswordPower(watch('password')) >= 4 ? <li className="h-1 w-full rounded-full bg-green-600"></li>: <li className="h-1 w-full rounded-full bg-gray-600"></li>}
          </ul>
          {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">Підтвердіть пароль</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full bg-gray-700 p-3 rounded border border-cyan-500 focus:border-cyan-300 focus:outline-none placeholder:text-gray-400"
            {...register('confirmPassword', { required: "Підтвердження паролю є обов'язковим",validate:(value)=>value === watch('password') || "The passwords do not match"})}
          />
          {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}
        </div>

        <button
          type="submit"
          className="w-full bg-sky-600 hover:bg-sky-700 text-white py-3 rounded transition-colors"
        >
          Зареєструватись
        </button>
      </form>

      <div className="mt-6 text-center">
        <span className="text-gray-400">Вже маєте акаунт? </span>
        <Link 
          href={`/login?redirect=${encodeURIComponent(window.location.pathname)}`}
          className="text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          Увійти
        </Link>
      </div>
    </div>
  );
}

export default memo(SignupPage)