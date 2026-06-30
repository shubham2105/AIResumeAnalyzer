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

  console.log('Backend response:', JSON.stringify(response.data, null, 2));
  const analysis = response.data.analysis;
  Object.entries({
  userId: user.uid,
  fileName,
  fileSize,
  mimeType,
  extractedText: response.data.text,
  characters: response.data.characters,
  overallScore: analysis.overall_score,
  summary: analysis.summary,
  skills: analysis.skills,
  strengths: analysis.strengths,
  weaknesses: analysis.weaknesses,
  recommendations: analysis.recommendations,
  jobRoles: analysis.job_roles,
}).forEach(([key, value]) => {
  if (value === undefined) {
    console.log('UNDEFINED FIELD =>', key);
  }
});


  const resumeDoc = await firestore()
    .collection('resumes')
    .add({
      userId: user.uid,
      fileName,
      fileSize,
      mimeType,
      extractedText: response.data.text,
      characters: response.data.characters,
      overallScore: analysis.overall_score,
      summary: analysis.summary,
      skills: analysis.skills,
      strengths: analysis.strengths,
      weaknesses: analysis.weaknesses,
      recommendations: analysis.recommendations,
      jobRoles: analysis.job_roles,
      uploadedAt: firestore.FieldValue.serverTimestamp(),
      status: 'uploaded',
    });

    console.log('fileSize =>', fileSize);
console.log('mimeType =>', mimeType);

  return {
    resumeId: resumeDoc.id,
    analysis,
  };
};