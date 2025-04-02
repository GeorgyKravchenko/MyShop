import { db } from "@/lib/firebase/firebase.config";
import { collectionType } from "@/types/collection";
import { collection, doc, getDoc, getDocs, query, where} from "firebase/firestore";

export const getData = async(collectionName:collectionType) => {
    try {
        const collectionRef = collection(db, collectionName);
        const querySnapshot = await getDocs(collectionRef);
        const data = querySnapshot.docs.map((doc) => doc.data());
        return data;
    } catch (error) {
        console.log("Failed to get data",error)
    }
}
export const getDataById = async (collectionName:collectionType,id:string) => {
    console.log(id)
    try {
        // const collectionRef = collection(db,collectionName)
        const docRef = doc(db, collectionName, id); // Використовуємо doc()
        const docSnapshot = await getDoc(docRef);
        const data = docSnapshot.data()
        return data;
    } catch (error) {
        console.log("Failed to get data",error)
    }
}
export const getUser= async (id:string) =>{
    try {
        const collectionRef = collection(db,"users");
        const q = query(collectionRef,where('id',"==",id));

        const docSnapshot = await getDocs(q);
        const data = docSnapshot.docs[0].data()
        return data;
    } catch (error) {
        console.log("Failed to get data",error)
    }
}