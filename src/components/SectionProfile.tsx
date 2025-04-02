'use client'
import { useActions } from '@/hooks/useAction'
import IUser from '@/types/user'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

export const SectionProfile = ({userdata}:{userdata:IUser}) => {
    const {updateUser} = useActions()
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const {register, handleSubmit, reset, formState: {errors}} = useForm({defaultValues:userdata})
    
    const onSubmit = handleSubmit((data:IUser) => {
        updateUser(data)
        setIsEditing(false)
    })

    return (
        <section className="mb-12 border border-cyan-500/30 rounded-xl p-6 bg-gray-100 dark:bg-gray-800 transition-colors duration-300">
            <form onSubmit={onSubmit}>
                <div className="flex flex-col md:flex-row gap-6 md:items-start">
                    <div className="flex-1">
                        <div className="flex flex-grow justify-between items-start mb-4">
                            <h1 className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">Ваш профіль</h1>
                            <div className="flex gap-2">
                                {!isEditing ? (
                                    <button
                                        type='button'
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setIsEditing(true)
                                        }}
                                        className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg 
                                                   transition-all duration-200 active:scale-95 shadow-md"
                                    >
                                        Редагувати
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            type='submit'
                                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg 
                                                      transition-all duration-200 active:scale-95 shadow-md"
                                        >
                                            Зберегти
                                        </button>
                                        <button
                                            type='button'
                                            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg 
                                                      transition-all duration-200 active:scale-95 shadow-md"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                reset()
                                                setIsEditing(false)
                                            }}
                                        >
                                            Скасувати
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="flex flex-col gap-1">
                                <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                                    <label className="font-medium text-gray-700 dark:text-gray-300">{`Ім'я`}:</label>
                                    {isEditing ? (
                                        <div className="flex flex-col items-end w-full">
                                            <input 
                                                {...register('name', {required: "Це поле обов'язкове"})} 
                                                className="w-full px-3 py-1 text-right bg-transparent border-b-2
                                                          border-cyan-500/30 focus:border-cyan-500 outline-none
                                                          text-gray-900 dark:text-gray-200"
                                            />
                                            {errors.name && (
                                                <span className="text-red-600 dark:text-red-400 text-sm mt-1">
                                                    {errors.name.message}
                                                </span>
                                            )}
                                        </div>
                                    ) : (
                                        <span className="text-gray-900 dark:text-gray-200">
                                            {userdata.name || 'Не вказано'}
                                        </span>
                                    )}
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-1">
                                <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                                    <span className="font-medium text-gray-700 dark:text-gray-300">Опис:</span>
                                    {isEditing ? (
                                        <input 
                                            {...register('description')} 
                                            className="w-full px-3 py-1 text-right bg-transparent border-b-2
                                                      border-cyan-500/30 focus:border-cyan-500 outline-none
                                                      text-gray-900 dark:text-gray-200" 
                                        />
                                    ) : (
                                        <span className="text-gray-900 dark:text-gray-200">
                                            {userdata.description || 'Не вказано'}
                                        </span>
                                    )}
                                </div>
                            </div>
            
                            <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                                <label className="font-medium text-gray-700 dark:text-gray-300">Email:</label>
                                <span className="text-gray-900 dark:text-gray-200">{userdata.email}</span>
                            </div>
            
                            {userdata.phone && (
                                <div className="flex flex-col gap-1">
                                    <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                                        <span className="font-medium text-gray-700 dark:text-gray-300">Телефон:</span>
                                        {isEditing ? (
                                            <div className="flex flex-col items-end w-full">
                                                <input 
                                                    {...register('phone', {
                                                        required: "Телефон обов'язковий",
                                                        pattern: {
                                                            value: /^\+380\d{9}$/,
                                                            message: "Невірний формат (+380XXXXXXXXX)"
                                                        }
                                                    })} 
                                                    className="w-full px-3 py-1 text-right bg-transparent border-b-2
                                                              border-cyan-500/30 focus:border-cyan-500 outline-none
                                                              text-gray-900 dark:text-gray-200"
                                                />
                                                {errors.phone && (
                                                    <span className="text-red-600 dark:text-red-400 text-sm mt-1">
                                                        {errors.phone.message}
                                                    </span>
                                                )}
                                            </div>
                                        ) : (
                                            <span className="text-gray-900 dark:text-gray-200">{userdata.phone}</span>
                                        )}
                                    </div>
                                </div>
                            )}
            
                            <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Дата реєстрації:</span>
                                <span className="text-gray-900 dark:text-gray-200">
                                    {new Date(userdata.createdAt).toLocaleDateString('uk-UA')}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    )
}