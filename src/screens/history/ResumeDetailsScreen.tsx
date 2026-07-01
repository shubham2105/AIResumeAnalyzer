import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';

import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native';

import { Resume } from '../../types/resume';
import { SafeAreaView } from 'react-native-safe-area-context';

const ResumeDetailScreen = () => {
  const route = useRoute<any>();

  const { resumeId } = route.params;

  const [loading, setLoading] = useState(true);
  const [resume, setResume] = useState<Resume | null>(null);

  useEffect(() => {
    loadResume();
  }, []);

  const loadResume = async () => {
    try {
      const doc = await firestore().collection('resumes').doc(resumeId).get();

      if (!doc.exists()) {
        return;
      }

      setResume({
        id: doc.id,
        ...(doc.data() as Omit<Resume, 'id'>),
      });
    } catch (error) {
      console.log('LOAD RESUME ERROR =>', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!resume) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Resume not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView edges={['top']} className="flex-1 px-4 bg-white">
      <ScrollView
        className="px-4 pt-6"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Text className="text-2xl font-bold">{resume.fileName}</Text>

        <Text className="text-5xl font-bold text-green-600 mt-6">
          {resume.overallScore}
        </Text>

        <Text className="text-gray-500 mt-2">ATS Score</Text>

        <Text className="text-xl font-semibold mt-8">Summary</Text>

        <Text className="mt-2 text-gray-700">{resume.summary}</Text>

        <Text className="text-xl font-semibold mt-8">Skills</Text>

        {resume.skills?.map((skill: any, index: number) => (
          <Text key={index} className="mt-1">
            • {typeof skill === 'string' ? skill : skill.name}
          </Text>
        ))}

        <Text className="text-xl font-semibold mt-8">Strengths</Text>

        {resume.strengths?.map((item: string, index: number) => (
          <Text key={index} className="mt-1">
            • {item}
          </Text>
        ))}

        <Text className="text-xl font-semibold mt-8">Weaknesses</Text>

        {resume.weaknesses?.map((item: string, index: number) => (
          <Text key={index} className="mt-1">
            • {item}
          </Text>
        ))}

        <Text className="text-xl font-semibold mt-8">Recommendations</Text>

        {resume.recommendations?.map((item: string, index: number) => (
          <Text key={index} className="mt-1">
            • {item}
          </Text>
        ))}

        <Text className="text-xl font-semibold mt-8">Suggested Roles</Text>

        {resume.jobRoles?.map((role: any, index: number) => (
          <Text key={index} className="mt-1">
            • {typeof role === 'string' ? role : role.role}
          </Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResumeDetailScreen;
