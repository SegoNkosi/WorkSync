import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCALlTAcBPciX0fGdOQ2zPltkcLZKj_ItM",
  authDomain: "worksync-dd64a.firebaseapp.com",
  projectId: "worksync-dd64a",
  storageBucket: "worksync-dd64a.firebasestorage.app",
  messagingSenderId: "1056942712858",
  appId: "1:1056942712858:web:890a9f8479418c26a7c9a3"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username, email, password) => {
try {
  const res = await createUserWithEmailAndPassword(auth,email,password);
  const user = res.user;
  await setDoc(doc(db,"users",user.uid),{
    id:user.uid,
    username:username.toLowerCase(),
    email,
    name:"",
    avatar:"",
    bio:"Hey there! I am using WorkSync",
    lastSeen:Date.now()
  })
  await setDoc(doc(db,"chats",user.uid),{
    chatData:[]
  })
} catch (error) {
  console.error(error)
  toast.error(error.code)
}
}

export {signup}