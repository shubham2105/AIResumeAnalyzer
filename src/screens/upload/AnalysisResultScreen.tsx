import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { RouteProp, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AnalysisResultScreen = () => {
  const route = useRoute<any>();

  const { resumeId } = route.params;

  const [loading, setLoading] = useState(true);
  const [resume, setResume] = useState<any>(null);

  useEffect(() => {
    loadResume();
  }, []);

  const loadResume = async () => {
    try {
      const doc = await firestore().collection('resumes').doc(resumeId).get();

      setResume(doc.data());
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-white">
      <ScrollView
        className="p-4"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        <Text className="text-3xl font-bold">ATS Score</Text>

        <Text className="text-5xl font-bold text-green-600 my-4">
          {resume?.overallScore}
        </Text>

        <Text className="text-xl font-semibold mt-4">Summary</Text>

        <Text>{resume?.summary}</Text>

        <Text className="text-xl font-semibold mt-6">Skills</Text>

        {resume?.skills?.map((skill: any, index: number) => (
          <Text key={index}>
            • {typeof skill === 'string' ? skill : skill.name}
          </Text>
        ))}

        <Text className="text-xl font-semibold mt-6">Strengths</Text>

        {resume?.strengths?.map((item: string, index: number) => (
          <Text key={index}>• {item}</Text>
        ))}

        <Text className="text-xl font-semibold mt-6">Weaknesses</Text>

        {resume?.weaknesses?.map((item: string, index: number) => (
          <Text key={index}>• {item}</Text>
        ))}

        <Text className="text-xl font-semibold mt-6">Recommendations</Text>

        {resume?.recommendations?.map((item: string, index: number) => (
          <Text key={index}>• {item}</Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AnalysisResultScreen;
