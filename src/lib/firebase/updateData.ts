import { db } from "@/lib/firebase/firebase.config";
import { collection, doc, DocumentData,  getDoc,  getDocs,  PartialWithFieldValue, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { addData } from "./addData";
import { collectionType } from "@/types/collection";

export const updateData = async <T extends PartialWithFieldValue<DocumentData>>(
  data: T, 
  collectionName: collectionType,
  id: string,
  mergeFields:string[]=["data","updatedAt"]
): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
        addData(data,collectionName,id)
        return
    }
    await setDoc(docRef, { data:data,id,updatedAt: serverTimestamp(),}, { mergeFields });
  } catch (error) {
    console.warn("Failed to update document:", error);
    throw error;
  }
};
export const updateDataById = async <T extends PartialWithFieldValue<DocumentData>>(
  data: T, 
  collectionName: collectionType,
  id: string,
): Promise<void> => {
  try {
    const collectionRef  = collection(db, collectionName);
    const q = query(collectionRef,where('id',"==",id));
    const querySnapshot  = await getDocs(q);
    if (querySnapshot.empty) {
        console.log('dsa')
        addData(data,collectionName,id)
        return
    }
    const docRef = querySnapshot.docs[0].ref
    console.log(docRef)
    await updateDoc(docRef, { data,id,updatedAt: serverTimestamp(),});
  } catch (error) {
    console.warn("Failed to update document:", error);
    throw error;
  }
};
