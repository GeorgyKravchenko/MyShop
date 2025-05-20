import { db } from "@/lib/firebase/firebase.config";
import { collectionType } from "@/types/collection";
import { addDoc, collection, doc, getDocs, limit, orderBy, query, serverTimestamp, setDoc } from "firebase/firestore";

export const addData = async <T>(data: T, collectionName: collectionType, id?: string): Promise<void> => {
  const collectionRef = collection(db, collectionName);
  try {
    const lastQuery = query(collectionRef, orderBy("id", "desc"), limit(1));
    const lastSnapshot = await getDocs(lastQuery);

    if (id) {
    const docRef = doc(db, collectionName, id);
      await setDoc(docRef, {
        data:{...data},
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return;
    }

    let nextId = 1;

    if (!lastSnapshot.empty) {
      const lastDoc = lastSnapshot.docs[0];
      nextId = (lastDoc.data().id as number) + 1;
    }

    await addDoc(collectionRef, {
      id: nextId,
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    throw new Error(`Failed to create document: ${error}`);
  }
};
