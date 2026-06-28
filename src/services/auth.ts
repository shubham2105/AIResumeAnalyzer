import auth from "@react-native-firebase/auth";

export const signUp = async (email: string, password: string)=>{
    const credential = await auth().createUserWithEmailAndPassword(email, password);
    return credential.user;
};

export const signIn = async (email: string, password: string)=>{
    const credential = await auth().signInWithEmailAndPassword(email, password);
    return credential.user;
};

export const  signOut = async () =>{
    await auth().signOut();
}