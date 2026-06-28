import "./global.css"
import {  Text, View } from 'react-native';
import { RootNavigator } from "./src/navigation/RootNavigator";
import { useAuthStore } from "./src/store/authStore";
import { useEffect } from "react";
import auth from"@react-native-firebase/auth"
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  const setUser = useAuthStore(state=> state.setUser);

  useEffect(()=>{
    const unsubscribe = 
      auth().onAuthStateChanged(user =>{setUser(user)});
      return unsubscribe;
  }, [])
  return (
    <NavigationContainer>
      <RootNavigator/>
    </NavigationContainer>
  )
}