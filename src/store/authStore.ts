import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import {create} from "zustand";
interface AuthState {
    user: FirebaseAuthTypes.User |null;
    loading: boolean;

    setUser: (user:FirebaseAuthTypes.User | null) => void;
    setLoading: (loading: boolean) => void;
};

export const useAuthstore = 
    create<AuthState>(set => ({
        user: null,
        loading: true,

        setUser: user => set({user}),
        setLoading: loading => set({loading}),
    }))