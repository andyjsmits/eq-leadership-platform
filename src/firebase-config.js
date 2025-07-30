// Firebase Configuration
// Replace these values with your actual Firebase config from the console

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
  arrayUnion,
  serverTimestamp
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Authentication functions
export const signUp = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Create user profile in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      displayName: displayName,
      email: email,
      createdAt: serverTimestamp(),
      lastLoginAt: serverTimestamp(),
      completedExercises: [],
      eqAssessmentScore: null,
      currentFocus: 'self-awareness',
      learningStreak: 0,
      totalPoints: 0,
      preferences: {
        notifications: true,
        emailUpdates: true
      }
    });
    
    return { success: true, user };
  } catch (error) {
    console.error('Sign up error:', error);
    return { success: false, error: getErrorMessage(error.code) };
  }
};

export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Update last login timestamp
    await updateDoc(doc(db, 'users', userCredential.user.uid), {
      lastLoginAt: serverTimestamp()
    });
    
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('Sign in error:', error);
    return { success: false, error: getErrorMessage(error.code) };
  }
};

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Check if this is a new user
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    if (!userDoc.exists()) {
      // Create profile for new Google user
      await setDoc(doc(db, 'users', user.uid), {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
        completedExercises: [],
        eqAssessmentScore: null,
        currentFocus: 'self-awareness',
        learningStreak: 0,
        totalPoints: 0,
        preferences: {
          notifications: true,
          emailUpdates: true
        }
      });
    } else {
      // Update last login for existing user
      await updateDoc(doc(db, 'users', user.uid), {
        lastLoginAt: serverTimestamp()
      });
    }
    
    return { success: true, user };
  } catch (error) {
    console.error('Google sign in error:', error);
    return { success: false, error: getErrorMessage(error.code) };
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Sign out error:', error);
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
    console.error('Get user profile error:', error);
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
        completedExercises[existingIndex] = { 
          exerciseId, 
          progress, 
          completedAt: serverTimestamp(),
          lastUpdated: serverTimestamp()
        };
      } else {
        completedExercises.push({ 
          exerciseId, 
          progress, 
          completedAt: serverTimestamp(),
          lastUpdated: serverTimestamp()
        });
      }
      
      // Calculate points and streak
      const points = Math.floor(progress / 10);
      const newTotalPoints = (userData.totalPoints || 0) + points;
      
      await updateDoc(userRef, { 
        completedExercises,
        totalPoints: newTotalPoints,
        lastActivityAt: serverTimestamp()
      });
      
      return { success: true };
    }
  } catch (error) {
    console.error('Update progress error:', error);
    return { success: false, error: error.message };
  }
};

export const saveEQAssessment = async (userId, assessmentResults) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      eqAssessmentScore: {
        ...assessmentResults,
        completedAt: serverTimestamp()
      },
      lastActivityAt: serverTimestamp()
    });
    
    return { success: true };
  } catch (error) {
    console.error('Save assessment error:', error);
    return { success: false, error: error.message };
  }
};

// Auth state observer
export const observeAuthState = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// Helper function to convert Firebase error codes to user-friendly messages
function getErrorMessage(errorCode) {
  switch (errorCode) {
    case 'auth/user-not-found':
      return 'No account found with this email address.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters long.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection.';
    default:
      return 'An error occurred. Please try again.';
  }
}