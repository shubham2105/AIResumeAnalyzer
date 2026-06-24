import { NavigationContainer } from "@react-navigation/native";
import { AppStack } from "./AppStack";
import AuthStack from "./AuthStack";

export function RootNavigator(){
    const isAuthenticated = true
    return(
        <NavigationContainer>
            {isAuthenticated ? <AppStack/> : <AuthStack/>}
        </NavigationContainer>
    )
}