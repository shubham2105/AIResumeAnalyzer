import auth from "@react-native-firebase/auth"
import { useAuthstore } from "../store/authStore"

export const initializeAuth = () => {
    return  auth().onAuthStateChanged(user => {
        useAuthstore
            .getState()
            .setUser(user)

        useAuthstore
            .getState()
            .setLoading(false);
})
}