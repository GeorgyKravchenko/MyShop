import { getDataById } from "@/lib/firebase/getData";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase/firebase.config";
import { collectionType } from "@/types/collection";



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

export const useSetData = <T>(
  dataHandler: (data: Array<T>) => void,
  collectionType: collectionType,
) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [dataFetchStatus, setDataFetchStatus] = useState<'pending' | 'fulfilled' | 'error'>('pending');

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
        const userData = await getDataById(collectionType, userId);
        if (userData?.data) {
          dataHandler(Object.values(userData.data));
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

