import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { pick, types } from '@react-native-documents/picker';

import { uploadResume } from '../../services/resume.service';

type ResumeFile = {
  uri: string;
  name: string;
  size?: number | null;
  type?: string | null;
};

const UploadScreen = () => {
  const [file, setFile] = useState<ResumeFile | null>(null);
  const [uploading, setUploading] = useState(false);

  const handlePickResume = async () => {
    try {
      const [result] = await pick({
        mode: 'open',
        type: [
          types.pdf,
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ],
      });

      setFile({
        uri: result.uri,
        name: result.name ?? 'resume.pdf',
        size: result.size,
        type: result.type,
      });
    } catch (error) {
      console.log('PICK ERROR =>', error);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      Alert.alert('No File Selected', 'Please choose a resume first.');
      return;
    }

    try {
      setUploading(true);

      console.log('FILE =>', file);

      const result = await uploadResume(
        file.uri,
        file.name,
        file.size ?? undefined,
        file.type ?? undefined,
      );

      console.log('UPLOAD SUCCESS =>', result);

      setFile(null);

      Alert.alert('Success', 'Resume uploaded and processed successfully.');
    } catch (error) {
      console.log('UPLOAD ERROR =>', error);
      console.log('UPLOAD ERROR STRING =>', JSON.stringify(error, null, 2));

      Alert.alert(
        'Upload Failed',
        'Something went wrong while uploading the resume.',
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center px-6">
      <Text className="text-3xl font-bold mb-8">Upload Resume</Text>

      <TouchableOpacity
        className="bg-blue-500 p-4 rounded-xl"
        onPress={handlePickResume}
        disabled={uploading}
      >
        <Text className="text-white text-center font-semibold">
          Choose Resume
        </Text>
      </TouchableOpacity>

      {file && (
        <View className="border rounded-xl p-4 mt-4">
          <Text className="font-semibold">{file.name}</Text>

          {file.size && (
            <Text className="mt-1 text-gray-600">
              {(file.size / 1024).toFixed(2)} KB
            </Text>
          )}

          {file.type && <Text className="mt-1 text-gray-600">{file.type}</Text>}
        </View>
      )}

      <TouchableOpacity
        disabled={!file || uploading}
        className={`rounded-xl p-4 mt-4 ${
          !file || uploading ? 'bg-gray-400' : 'bg-green-600'
        }`}
        onPress={handleUpload}
      >
        {uploading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white text-center font-semibold">
            Upload Resume
          </Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default UploadScreen;
