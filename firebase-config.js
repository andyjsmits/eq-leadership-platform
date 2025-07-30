// Firebase Configuration
// Replace these values with your actual Firebase config from the console

const firebaseConfig = {
  apiKey: "AIzaSyDGVQsKrQscmvqXUDRl15cnltW9IPFMp9o",
  authDomain: "eqcq-83bf3.firebaseapp.com",
  projectId: "eqcq-83bf3",
  storageBucket: "eqcq-83bf3.firebasestorage.app",
  messagingSenderId: "574429234092",
  appId: "1:574429234092:web:a061ed1c58995599687009",
  measurementId: "G-PGCWFCQ3SY"
};

// Initialize Firebase
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  serverTimestamp
} from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Authentication functions
export const signUp = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Create user profile in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      displayName: displayName,
      email: email,
      createdAt: new Date(),
      completedExercises: [],
      eqAssessmentScore: null,
      currentFocus: 'self-awareness'
    });
    
    return { success: true, user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// User profile functions
export const getUserProfile = async (userId) => {
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { success: true, data: docSnap.data() };
    } else {
      return { success: false, error: 'User profile not found' };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateUserProgress = async (userId, exerciseId, progress) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const userData = userSnap.data();
      const completedExercises = userData.completedExercises || [];
      
      // Update or add exercise progress
      const existingIndex = completedExercises.findIndex(ex => ex.exerciseId === exerciseId);
      if (existingIndex >= 0) {
        completedExercises[existingIndex] = { exerciseId, progress, completedAt: new Date() };
      } else {
        completedExercises.push({ exerciseId, progress, completedAt: new Date() });
      }
      
      await setDoc(userRef, { completedExercises }, { merge: true });
      return { success: true };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Google Sign-In
export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    
    // Check if user profile exists, create if not
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        displayName: user.displayName || 'User',
        email: user.email,
        createdAt: new Date(),
        completedExercises: [],
        eqAssessmentScore: null,
        currentFocus: 'self-awareness'
      });
    }
    
    return { success: true, user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Auth state observer
export const observeAuthState = (callback) => {
  return onAuthStateChanged(auth, callback);
};