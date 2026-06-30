import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UploadScreen from '../screens/upload/UploadScreen';
import AnalysisResultScreen from '../screens/upload/AnalysisResultScreen';

const Stack = createNativeStackNavigator();

export function UploadStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UploadScreen" component={UploadScreen} />
      <Stack.Screen name="AnalysisResult" component={AnalysisResultScreen} />
    </Stack.Navigator>
  );
}
