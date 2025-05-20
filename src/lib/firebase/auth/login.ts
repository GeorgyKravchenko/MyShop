import { auth } from "@/lib/firebase/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";

export const handleLogin = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        console.log('Користувач авторизований:', userCredential.user);
        return true

    } catch (error) {
        console.warn('Помилка авторизації:', error);
        return false
    }
};