import auth from '@react-native-firebase/auth';
export const signup = (
    emai: string,
    password: string,
) => {
    return auth().createUserWithEmailAndPassword(emai, password)
};

export const login = (email: string, password: string) =>{
    return auth().signInWithEmailAndPassword(email, password)
};

export const logout = ()=>{
    return auth().signOut();
};

export const forgotPassword = (email: string) =>{
    return auth().sendPasswordResetEmail(email)
}