import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppTabsParamList } from './types';
import HomeScreen from '../screens/home/HomeScreen';
import UploadScreen from '../screens/upload/UploadScreen';
import HistoryScreen from '../screens/history/HistoryScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import { History, Home, Upload, User } from 'lucide-react-native';

const Tab = createBottomTabNavigator<AppTabsParamList>();

export function AppTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Home color={'black'} size={20} />,
        }}
      />
      <Tab.Screen
        name="Upload"
        component={UploadScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Upload color={'black'} size={20} />,
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <History color={'black'} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <User color={'black'} size={20} />,
        }}
      />
    </Tab.Navigator>
  );
}
