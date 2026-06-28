import { NavigationContainer } from "@react-navigation/native";
import { AppStack } from "./AppStack";
import AuthStack from "./AuthStack";
import { useAuthStore } from "../store/authStore";

export function RootNavigator(){
    const user = useAuthStore(state=> state.user);
    
    return user ? <AppStack/> : <AuthStack/>
}