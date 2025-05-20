import { getUser } from '@/lib/firebase/db/getData';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase/firebase.config';
import { useActions } from './useAction';

/**
 * A custom hook to fetch and handle user-specific data from a specified collection.
 *
 * This hook listens for changes to the authentication state and fetches data
 * from the given collection for the authenticated user. The fetched data is
 * then processed using the provided handler function.
 *
 * If the user is not authenticated, the hook returns a 'pending' status. If
 * the user is authenticated, the hook fetches the user's data and returns a
 * 'fulfilled' status if the data is successfully fetched, or an 'error' status
 * if the fetch fails.
 *
 * @template T The type of the elements in the data array.
 * @param {function} handler A function that processes the fetched data array.
 * @param {collectionType} collection The collection from which to fetch the data.
 *
 * @returns {boolean} The status of the data fetch operation.
 */

export const useSetUser = () => {
  const { setUser } = useActions();
  const [userId, setUserId] = useState<string | null>(null);
  const [dataFetchStatus, setDataFetchStatus] = useState<'pending' | 'fulfilled' | 'error'>(
    'pending',
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserId(user?.uid ?? null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;

      try {
        const userData = await getUser(userId);
        if (userData) {
          setUser({
            id: userData.id,
            name: userData?.data.name || userData.name,
            email: userData?.data.email || userData.email,
            phone: userData?.data.phone || userData.phone,
            description: userData?.data.description || userData.description,
            createdAt: userData.createdAt?.toDate().toISOString(),
            updatedAt: userData.updatedAt?.toDate().toISOString(),
          });
          setDataFetchStatus('fulfilled');
        }
      } catch (error) {
        console.error('Failed to fetch user orders:', error);
        setDataFetchStatus('error');
      }
    };

    fetchData();
  }, [userId]);

  return dataFetchStatus;
};
