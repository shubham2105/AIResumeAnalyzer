import { createNativeStackNavigator} from "@react-navigation/native-stack";
import { AppStackParamList } from "./types";
import ProcessingScreen from "../screens/upload/ProcessingScreen";
import AnalysisResultScreen from "../screens/upload/AnalysisResultScreen";
import ResumeDetailsScreen from "../screens/history/ResumeDetailsScreen";
import { DrawerNavigator } from "./DrawerNavigator";

const Stack = createNativeStackNavigator<AppStackParamList>();

export function AppStack(){
    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="Main" component={DrawerNavigator}/>
            <Stack.Screen name="Processing" component={ProcessingScreen}/>
            <Stack.Screen name="AnalysisResult" component={AnalysisResultScreen}/>
            <Stack.Screen name="ResumeDetail" component={ResumeDetailsScreen}/>
        </Stack.Navigator>
    )
    
}