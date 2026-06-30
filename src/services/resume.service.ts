import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import axios from 'axios';

export const uploadResume = async (
  fileUri: string,
  fileName: string,
  fileSize?: number,
  mimeType?: string,
) => {
  const user = auth().currentUser;

  if (!user) {
    throw new Error('User not authenticated');
  }

  const formData = new FormData();

  formData.append('file', {
    uri: fileUri,
    name: fileName,
    type: mimeType || 'application/pdf',
  } as any);

  console.log('Uploading file:', fileUri);

  const response = await axios.post(
    'http://127.0.0.1:8000/upload-resume',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  console.log('Backend response:', response.data);

  const resumeDoc = await firestore()
    .collection('resumes')
    .add({
      userId: user.uid,
      fileName,
      fileSize,
      mimeType,
      extractedText: response.data.text,
      characters: response.data.characters,
      uploadedAt: firestore.FieldValue.serverTimestamp(),
      status: 'uploaded',
    });

  return {
    resumeId: resumeDoc.id,
    text: response.data.text,
    characters: response.data.characters,
  };
};