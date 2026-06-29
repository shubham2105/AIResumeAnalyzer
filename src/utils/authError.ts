export const getAuthErrorMessage = (code: string) => {
  switch (code) {
    case 'auth/invalid-credential':
      return 'Incorrect email or password';

    case 'auth/invalid-email':
      return 'Please enter a valid email address';

    case 'auth/email-already-in-use':
      return 'An account with this email already exists';

    case 'auth/weak-password':
      return 'Password must be at least 6 characters';

    case 'auth/network-request-failed':
      return 'Please check your internet connection';
    
     case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later.';

    default:
      return 'Something went wrong. Please try again.';
  }
};