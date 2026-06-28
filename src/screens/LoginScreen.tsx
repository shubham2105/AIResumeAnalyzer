import auth from '@react-native-firebase/auth';
import { Button, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {

const test = async () => {
  try {
    const user = await auth().createUserWithEmailAndPassword(
      'test123@example.com',
      'Password123!'
    );

    console.log('SUCCESS', user.user.uid);
  } catch (e) {
    console.log(e);
  }
};



  const testAnonymous = async () => {
  try {
    const result = await auth().signInAnonymously();

    console.log('UID:', result.user.uid);
    console.log('Anonymous Auth Works ✅');
  } catch (e) {
    console.log(e);
  }
};


  const testAuth = async () => {
    try {
      const methods = await auth().fetchSignInMethodsForEmail(
        'test@example.com',
      );

      console.log('Firebase Auth Works ✅');
      console.log('Auth Module:', auth());
      console.log(methods);
    } catch (error) {
      console.log('Firebase Auth Error ❌');
      console.log(error);
    }
  };

  return (
    <SafeAreaView>
      <Button title="Test Firebase Auth" onPress={test} />
    </SafeAreaView>
  );
}