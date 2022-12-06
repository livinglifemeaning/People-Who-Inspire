import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  deleteUser,
  getAdditionalUserInfo,
} from "firebase/auth";
import { useRouter } from "next/router";
import { writeInitialData } from "../firebase/databaseFunctions";

const AuthContext = createContext();
export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [userIsNew, setUserIsNew] = useState();
  const router = useRouter();
  console.log(currentUser, userIsNew);

  const GoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const { isNewUser } = getAdditionalUserInfo(result);
        setUserIsNew(isNewUser);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signup = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const { isNewUser } = getAdditionalUserInfo(result);
        setUserIsNew(isNewUser);
        return result;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signout = () => {
    return signOut(auth);
  };

  const deleteAccount = () => {
    deleteUser(auth.currentUser)
      .then(() => {
        router.push("/");
        location.reload();
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (userIsNew) {
      writeInitialData(currentUser.uid);
    }
    setUserIsNew(false);
  }, [userIsNew]);

  useEffect(() => {
    if (!currentUser) {
      router.push("/");
    }
  }, [currentUser]);

  const value = {
    currentUser,
    signup,
    GoogleLogin,
    login,
    signout,
    deleteAccount,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
