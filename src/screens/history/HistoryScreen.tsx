import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { Resume } from '../../types/user';

const HistoryScreen = () => {
  const navigation = useNavigation<any>();

  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadResumes();
  }, []);

  const loadResumes = async () => {
    try {
      const user = auth().currentUser;

      if (!user) {
        return;
      }

      const snapshot = await firestore()
        .collection('resumes')
        .where('userId', '==', user.uid)
        .get();

      const data: Resume[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Resume, 'id'>),
      }));

      console.log('RESUMES =>', data);

      setResumes(data);
    } catch (error) {
      console.log('LOAD RESUMES ERROR =>', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadResumes();
  };

  const renderItem = ({ item }: { item: Resume }) => (
    <TouchableOpacity
      className="bg-white p-4 rounded-xl mb-3 mx-4 shadow-sm"
      onPress={() =>
        navigation.navigate('ResumeDetail', {
          resumeId: item.id,
        })
      }
    >
      <Text className="font-bold text-lg">{item.fileName}</Text>

      <Text className="mt-2 text-green-600 font-semibold">
        ATS Score: {item.overallScore}
      </Text>

      <Text numberOfLines={2} className="mt-2 text-gray-600">
        {item.summary}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-gray-100">
      <Text className="text-3xl font-bold px-4 py-4">Resume History</Text>

      <FlatList
        data={resumes}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        contentContainerStyle={{
          paddingBottom: 20,
          flexGrow: resumes.length === 0 ? 1 : undefined,
        }}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center">
            <Text className="text-gray-500 text-lg">
              No resumes uploaded yet
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default HistoryScreen;
