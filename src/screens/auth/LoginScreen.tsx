import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { loginSchema } from '../../scehmas/auth.schema';
import { z } from 'zod';
import {
  Alert,
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import { useNavigation } from '@react-navigation/native';
import { getAuthErrorMessage } from '../../utils/authError';
import { Eye, EyeOff } from 'lucide-react-native';

type AuthNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

type LoginForm = z.infer<typeof loginSchema>;

export default function LoignScreen() {
  const navigation = useNavigation<AuthNavigationProp>();
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginForm) => {
    setAuthError('');
    try {
      setLoading(true);
      await auth().signInWithEmailAndPassword(data.email, data.password);
    } catch (error) {
      const authError = error as FirebaseAuthTypes.NativeFirebaseAuthError;
      setAuthError(getAuthErrorMessage(authError.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center px-6">
      <Text className="text-3xl font-bold mb-6">Login</Text>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Email"
            autoCapitalize="none"
            value={value}
            onChangeText={text => {
              setAuthError('');
              onChange(text);
            }}
            className="border rounded-lg p-4 mb-2"
          />
        )}
      />
      {errors.email && (
        <Text className="text-red-500">{errors.email.message}</Text>
      )}
      {/* <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={value}
            onChangeText={text => {
              setAuthError('');
              onChange(text);
            }}
            autoCapitalize="none"
            className="border rounded-lg p-4 mb-2"
          />
        )}
      /> */}
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <View className="flex-row items-center border rounded-lg mb-2">
            <TextInput
              placeholder="Password"
              secureTextEntry={!showPassword}
              value={value}
              onChangeText={text => {
                setAuthError('');
                onChange(text);
              }}
              className="flex-1 p-4"
            />
            <TouchableOpacity
              className="px-4"
              onPress={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
            </TouchableOpacity>
          </View>
        )}
      />
      {errors.password && (
        <Text className="text-red-500">{errors.password.message}</Text>
      )}
      {authError ? (
        <Text className="bg-red-100 text-red-600 p-3 rounded-lg mb-3 text-center">
          {authError}
        </Text>
      ) : null}

      <TouchableOpacity
        className="bg-blue-600 py-4 rounded-xl items-center my-4"
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      >
        <Text className="text-white font-semibold">
          {loading ? 'Logging in' : 'Login'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text className="text-center">Create a account? Signup</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
