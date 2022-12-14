
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDoc, doc, deleteDoc, addDoc,setDoc, serverTimestamp} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { getAuth,sendEmailVerification, createUserWithEmailAndPassword, updateProfile, signOut, signInWithEmailAndPassword} from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyDFyeisOIm_dVfls81TWtHPSu9894aOfh0",
  authDomain: "blog-4bef9.firebaseapp.com",
  projectId: "blog-4bef9",
  storageBucket: "blog-4bef9.appspot.com",
  messagingSenderId: "934134163560",
  appId: "1:934134163560:web:342355f10becfc4cb773dd"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app)

export const postsCollection = collection(db,"posts");

export const getPost = async (id) => {
  const docRef = doc(db, "posts", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
}

export const deletePost = async (id) => {
  await deleteDoc(doc(db, "posts", id));
}

export const addPost = async (post) => {
  post.createdAt = serverTimestamp();
  await setDoc(doc(db,"posts","draft"), post);
}

export const uploadFile = async (file) => {
  const storageRef = ref(storage, 'files/' + file.name + v4());
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}

export const getDraft = async() => {
  const docRef = doc(db, "posts", "draft");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
}

export const publishDraft = async(post) => {
  await addDoc(postsCollection, {...post
    , createdAt: serverTimestamp()
    , author: auth.currentUser.uid});
}

export const editPost = async (id,post) => {
  const docRef = doc(db, "posts", id);
  const docSnap = await getDoc(docRef);
  await setDoc(docRef, {...post, createdAt: docSnap.data().createdAt, author: docSnap.data().author});
}

export const createUser = async(email, password) =>{
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  return userCredential.user
}

export const updateUser = async(e) => {
  await updateProfile(auth.currentUser, e)
}

export const getUser = () => {
  return auth.currentUser;
}

export const login = async (email, password) => {
  try{
    await signInWithEmailAndPassword(auth, email, password)
  }
  catch(err){
    throw err;
  }
}

export const logout = async() => {
  await signOut(auth);
}

export const sendVerification = async() => {
  await sendEmailVerification(auth.currentUser);
}
