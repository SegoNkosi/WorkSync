import { doc, getDoc, updateDoc } from "firebase/firestore";
import { createContext, useState } from "react";
import { auth, db } from "../config/firebase";
import { useNavigate } from 'react-router-dom';

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [chatData, setChatData] = useState(null);

  
  const loadUserData = async (uid, shouldRedirect = true) => {
    try {
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();
      setUserData(userData);

      
      if (shouldRedirect) {
        if (userData.name) {
          navigate('/chat');
        } else {
          navigate('/profile');
        }
      }

      
      await updateDoc(userRef, {
        lastSeen: Date.now()
      });

     
      setInterval(async () => {
        const currentUser = auth.currentUser;
        if (currentUser) {
          await updateDoc(userRef, {
            lastSeen: Date.now()
          });
        }
      }, 60000);
    } catch (error) {
      console.error("Failed to load user data:", error);
    }
  };

  const value = {
    userData, setUserData,
    chatData, setChatData,
    loadUserData
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
