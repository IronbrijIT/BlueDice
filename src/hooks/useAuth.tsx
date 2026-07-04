import { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase";
import { syncUserData, setupSyncListener, clearLocalStorage } from "../services/firestoreSync";

export type UserProfile = {
  uid: string;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
};

type AuthContextType = {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  logout: () => Promise<void>;
  saveProfile: (name: string, email: string) => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  logout: async () => {},
  saveProfile: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeProfile: (() => void) | null = null;
    let cleanupSync: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      // Clean up previous listeners
      if (unsubscribeProfile) {
        unsubscribeProfile();
        unsubscribeProfile = null;
      }
      if (cleanupSync) {
        cleanupSync();
        cleanupSync = null;
      }

      if (currentUser) {
        setLoading(true);
        // Start syncing
        await syncUserData(currentUser.uid);
        cleanupSync = setupSyncListener(currentUser.uid);

        // Subscribe to user profile document in Firestore
        const userDocRef = doc(db, "users", currentUser.uid);
        unsubscribeProfile = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            setProfile(docSnap.data() as UserProfile);
          } else {
            setProfile(null);
          }
          setLoading(false);
        }, (error) => {
          console.error("Error fetching user profile snapshot:", error);
          setLoading(false);
        });
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeProfile) unsubscribeProfile();
      if (cleanupSync) cleanupSync();
    };
  }, []);

  const logout = async () => {
    setLoading(true);
    await signOut(auth);
    clearLocalStorage();
  };

  const saveProfile = async (name: string, email: string) => {
    if (!user) throw new Error("No authenticated user");
    
    const userDocRef = doc(db, "users", user.uid);
    const existingSnap = await getDoc(userDocRef);
    const now = new Date().toISOString();
    
    const profileData = {
      uid: user.uid,
      name,
      email,
      updatedAt: now,
    };
    
    if (existingSnap.exists()) {
      await updateDoc(userDocRef, profileData);
    } else {
      await setDoc(userDocRef, {
        ...profileData,
        createdAt: now,
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, logout, saveProfile }}>
      {children}
    </AuthContext.Provider>
  );
}
