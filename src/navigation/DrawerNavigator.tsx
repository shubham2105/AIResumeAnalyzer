import {createDrawerNavigator} from "@react-navigation/drawer";
import { DrawerParamList } from "./types";
import { AppTabs } from "./AppTabs";
import SettingsScreen from "../screens/settings/SettingsScreen";

const Drawer = createDrawerNavigator<DrawerParamList>();

export function DrawerNavigator(){
    return(
        <Drawer.Navigator screenOptions={{headerShown:false}}>
            <Drawer.Screen name="Tabs" component={AppTabs} options={{title:"Main App"}}/>
            <Drawer.Screen name="Settings" component={SettingsScreen}/>
        </Drawer.Navigator>
    )
}