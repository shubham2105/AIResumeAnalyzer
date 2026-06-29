import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { AuthStackParamList } from './types'
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import ForgotPassword from '../screens/auth/ForgotPassword';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack(){
    return(
    <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Signup" component={SignupScreen} options={{headerShown:false}}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown:false}}/>
    </Stack.Navigator>
    )
    
}
