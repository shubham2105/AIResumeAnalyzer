import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { AppTabsParamList } from "./types";
import HomeScreen from "../screens/home/HomeScreen";
import UploadScreen from "../screens/upload/UploadScreen";
import HistoryScreen from "../screens/history/HistoryScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";

const Tab = createBottomTabNavigator<AppTabsParamList>();

export function AppTabs(){
    return(
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
            <Tab.Screen name="Upload" component={UploadScreen} options={{headerShown:false}}/>
            <Tab.Screen name="History" component={HistoryScreen} options={{headerShown:false}}/>
            <Tab.Screen name="Profile" component={ProfileScreen} options={{headerShown:false}}/>
        </Tab.Navigator>
    )
}