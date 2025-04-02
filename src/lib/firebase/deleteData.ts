import { db } from "@/lib/firebase/firebase.config";
import { collectionType } from "@/types/collection";
import { collection, deleteDoc, getDocs, query, where } from "firebase/firestore";

export const deleteData= async(collectionName:collectionType,id:string) => {
    try {
        const docRef = collection(db, collectionName);
        const q = query(docRef,where('id',"==",id))
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => doc.data());
        data.map(async(doc) => await deleteDoc(doc.ref));
    } catch (error) {
        console.log("Failed to delete data",error)
    }
}
