import {initializeApp} from 'firebase/app'
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth'

import {getDoc, setDoc, doc, getFirestore} from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyD5y32qEDrBEHBAMZAxVYXwUNptiBBSijg",
    authDomain: "crown-clothing-5576b.firebaseapp.com",
    projectId: "crown-clothing-5576b",
    storageBucket: "crown-clothing-5576b.appspot.com",
    messagingSenderId: "52221894904",
    appId: "1:52221894904:web:0bdb747fe15124500adb0d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider =new GoogleAuthProvider()

provider.setCustomParameters({
    prompt: 'select_account'
})

export const auth = getAuth();
export const signInWithGooglePopup =()=>signInWithPopup(auth, provider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth)=>{
    const userSchema = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userSchema)

    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userSchema, {displayName, email, createdAt})
        } catch (e) {
            console.log('error creating user', e.message)
        }
    }
        return userSchema;
}