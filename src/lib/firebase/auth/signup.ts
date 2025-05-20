import { auth } from "@/lib/firebase/firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";

 export const handleSignUp = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log('Користувач створений:', userCredential.user);
      return true
    } catch (error) {
      console.warn('Помилка реєстрації:', error);
      return false
    }
  };