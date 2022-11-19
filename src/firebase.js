
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDoc, doc, deleteDoc, addDoc} from "firebase/firestore";




const firebaseConfig = {
  apiKey: "AIzaSyDFyeisOIm_dVfls81TWtHPSu9894aOfh0",
  authDomain: "blog-4bef9.firebaseapp.com",
  projectId: "blog-4bef9",
  storageBucket: "blog-4bef9.appspot.com",
  messagingSenderId: "934134163560",
  appId: "1:934134163560:web:342355f10becfc4cb773dd"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
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
  await addDoc(collection(db, "posts"), post);
}
