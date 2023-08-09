import {initializeApp} from 'firebase/app'
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut, onAuthStateChanged
} from 'firebase/auth'

import {
    getDoc,
    setDoc,
    doc,
    getFirestore,
    collection,
    writeBatch,
    query,
    getDocs
} from 'firebase/firestore'

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

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
    prompt: 'select_account'
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();

export const addCollectionsAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach(object=>{
        const docRef = doc(collectionRef,object.title.toLowerCase());
        batch.set(docRef,object)
    })

    await batch.commit()
    console.log('done')
}

export const getCategoriesAndDocuments = async ()=>{
const collectionRef = collection(db,'categories');
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(it=>it.data())
}

export const createUserDocumentFromAuth = async (userAuth, additionalInfo) => {
    const userSchema = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userSchema)

    if (!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userSchema, {
                displayName,
                email,
                createdAt,
                ...additionalInfo
            })
        } catch (e) {
            console.log('error creating user', e.message)
        }
    }
    return userSchema;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password)
        return

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signAuthUserWithEmailAndPass = async (email, password) => {
    if (!email || !password)
        return

    return await signInWithEmailAndPassword(auth, email, password)
}
export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangeListener = (callback) => onAuthStateChanged(auth, callback)