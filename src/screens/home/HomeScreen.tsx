import { View, Text, Button } from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const HomeScreen = () => {
  console.log('Firestore app:', firestore().app.name);
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="font-semibold">HomeScreen</Text>
      <Button title="Logout" onPress={() => auth().signOut()} />
    </View>
  );
};

export default HomeScreen;
