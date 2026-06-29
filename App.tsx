import "./global.css"
import {  Text, View } from 'react-native';
import { RootNavigator } from "./src/navigation/RootNavigator";
import { useAuthstore } from "./src/store/authStore";
import { useEffect } from "react";
import auth from"@react-native-firebase/auth"
import { NavigationContainer } from "@react-navigation/native";
import { initializeAuth } from "./src/services/authListener";

export default function App() {
  const setUser = useAuthstore(state=> state.setUser);

  useEffect(()=>{
      const unsubscribe = initializeAuth() 
      return unsubscribe;
  }, [])
  return (
    <NavigationContainer>
      <RootNavigator/>
    </NavigationContainer>
  )
}