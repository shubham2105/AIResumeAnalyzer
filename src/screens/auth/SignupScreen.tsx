import { Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { signupSchema } from '../../scehmas/auth.schema';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-gesture-handler';
import { AuthStackParamList } from '../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { getAuthErrorMessage } from '../../utils/authError';
import { Eye, EyeOff } from 'lucide-react-native';

type AuthNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

type SignupForm = z.infer<typeof signupSchema>;

const SignupScreen = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const onSubmit = async (data: SignupForm) => {
    setAuthError('');
    try {
      setLoading(true);
      const credential = await auth().createUserWithEmailAndPassword(
        data.email,
        data.password,
      );
      await credential.user.updateProfile({
        displayName: `${data.firstName} ${data.lastName}`,
      });
    } catch (error) {
      const authError = error as FirebaseAuthTypes.NativeFirebaseAuthError;

      setAuthError(getAuthErrorMessage(authError.code));
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView className="flex-1 justify-center px-6">
      <Text className="text-3xl font-bold mb-6">Signup</Text>
      <Controller
        control={control}
        name="firstName"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="First Name"
            value={value}
            onChangeText={text => {
              setAuthError('');
              onChange(text);
            }}
            className="border rounded-lg p-4 mb-2"
          />
        )}
      />
      {errors.firstName && (
        <Text className="text-red-500">{errors.firstName.message}</Text>
      )}
      <Controller
        control={control}
        name="lastName"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Last Name"
            value={value}
            onChangeText={text => {
              setAuthError('');
              onChange(text);
            }}
            className="border rounded-lg p-4 mb-2"
          />
        )}
      />
      {errors.lastName && (
        <Text className="text-red-500">{errors.lastName.message}</Text>
      )}
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
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
      {/* <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            value={value}
            onChangeText={text => {
              setAuthError('');
              onChange(text);
            }}
            className="border rounded-lg p-4 mb-2"
          />
        )}
      /> */}
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, value } }) => (
          <View className="flex-row items-center border rounded-lg mb-2">
            <TextInput
              placeholder="Password"
              secureTextEntry={!showConfirmPassword}
              value={value}
              onChangeText={text => {
                setAuthError('');
                onChange(text);
              }}
              className="flex-1 p-4"
            />
            <TouchableOpacity
              className="px-4"
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={22} /> : <Eye size={22} />}
            </TouchableOpacity>
          </View>
        )}
      />

      {errors.confirmPassword && (
        <Text className="text-red-500">{errors.confirmPassword.message}</Text>
      )}
      {authError ? (
        <Text className="text-red-500 mb-2 text-center">{authError}</Text>
      ) : null}
      <TouchableOpacity
        className="bg-blue-600 py-4 rounded-xl items-center my-4"
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      >
        <Text className="text-white font-semibold">
          {loading ? 'Signing up...' : 'Signup'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="text-center"
        onPress={() => navigation.navigate('Login')}
      >
        <Text className="text-center">Already have an account? Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SignupScreen;
