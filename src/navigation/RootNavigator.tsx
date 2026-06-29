import { NavigationContainer } from "@react-navigation/native";
import { AppStack } from "./AppStack";
import AuthStack from "./AuthStack";
import { useAuthstore } from "../store/authStore";

export function RootNavigator(){
    const user = useAuthstore(state => state.user);
    const loading =useAuthstore(state => state.loading);

    if(loading){
        return null;
    }
    
    return user ? <AppStack/> : <AuthStack/>
}