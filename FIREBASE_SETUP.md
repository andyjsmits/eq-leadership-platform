# Firebase Setup Guide for EQ Leadership Platform

This guide will help you set up Firebase Authentication and Firestore for your EQ Leadership Platform.

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **"Create a project"** (or "Add project")
3. Enter project name: **"EQ Leadership Platform"**
4. Enable Google Analytics (recommended)
5. Choose or create Analytics account
6. Click **"Create project"**

## Step 2: Set Up Authentication

1. In your Firebase project, click **"Authentication"** in the left sidebar
2. Click **"Get started"**
3. Go to **"Sign-in method"** tab
4. Enable **"Email/Password"**:
   - Toggle the switch to enable
   - Click **"Save"**
5. (Optional) Enable **"Google"** sign-in:
   - Click on Google provider
   - Toggle enable switch
   - Enter your project's public-facing name
   - Choose support email
   - Click **"Save"**

## Step 3: Set Up Firestore Database

1. Click **"Firestore Database"** in the left sidebar
2. Click **"Create database"**
3. Choose **"Start in test mode"** for now
4. Select a location (choose closest to your users)
5. Click **"Done"**

## Step 4: Get Firebase Configuration

1. Click the **settings gear icon** next to "Project Overview"
2. Select **"Project settings"**
3. Scroll down to **"Your apps"** section
4. Click **"Add app"** and select **Web** (</>) icon
5. Enter app nickname: **"EQ Leadership Platform"**
6. Check **"Also set up Firebase Hosting"** (optional)
7. Click **"Register app"**
8. **Copy the Firebase configuration object**

## Step 5: Update Your Website Configuration

1. Open `firebase-config.js` in your project
2. Replace the placeholder values with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-actual-sender-id",
  appId: "your-actual-app-id"
};
```

## Step 6: Update Firestore Security Rules

1. In Firebase Console, go to **"Firestore Database"**
2. Click **"Rules"** tab
3. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read and write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Exercise data can be read by authenticated users
    match /exercises/{exerciseId} {
      allow read: if request.auth != null;
    }
    
    // User progress tracking
    match /progress/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

4. Click **"Publish"**

## Step 7: Set Up Firebase Hosting (Optional)

If you want to deploy directly to Firebase:

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Select your Firebase project
5. Set public directory as current directory (`.`)
6. Configure as single-page app: **Yes**
7. Deploy: `firebase deploy`

## Step 8: Test Authentication

1. Open your website
2. Go to the Sign In page (`auth.html`)
3. Try creating a new account
4. Check Firebase Console > Authentication > Users to see the new user

## Database Structure

Your Firestore will automatically create these collections:

### Users Collection (`/users/{userId}`)
```json
{
  "displayName": "John Doe",
  "email": "john@example.com",
  "createdAt": "2024-07-30T10:00:00Z",
  "completedExercises": [
    {
      "exerciseId": "daily-weather-report",
      "progress": 100,
      "completedAt": "2024-07-30T12:00:00Z"
    }
  ],
  "eqAssessmentScore": {
    "overall": 3.4,
    "selfAwareness": 4.0,
    "selfManagement": 3.0,
    "socialAwareness": 3.5,
    "relationshipManagement": 3.2,
    "completedAt": "2024-07-30T09:00:00Z"
  },
  "currentFocus": "self-management"
}
```

## Features Included

✅ **Email/Password Authentication**
- Sign up with email and password
- Sign in with existing account
- Password reset functionality

✅ **User Dashboard**
- Personalized welcome message
- EQ score tracking
- Exercise progress monitoring
- Learning streak tracking

✅ **Progress Tracking**
- Completed exercises storage
- Progress percentages
- Assessment results storage

✅ **Security**
- Secure Firestore rules
- User data isolation
- Authentication state management

## Troubleshooting

### Common Issues:

1. **"Firebase not defined" error**
   - Make sure you've updated `firebase-config.js` with your actual config
   - Check that Firebase modules are importing correctly

2. **Permission denied errors**
   - Verify Firestore security rules are published
   - Ensure user is authenticated before accessing data

3. **Authentication not working**
   - Check that Email/Password is enabled in Firebase Console
   - Verify the correct project configuration

4. **Dashboard not loading**
   - Check browser console for errors
   - Verify user profile document exists in Firestore

### Getting Help:

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Console](https://console.firebase.google.com)
- Check browser developer tools console for specific error messages

## Next Steps

Once Firebase is set up, your EQ Leadership Platform will have:

- **User Authentication**: Secure sign-up and sign-in
- **Personalized Dashboards**: Track individual progress
- **Exercise Progress**: Save and resume exercises
- **Assessment Results**: Store and display EQ scores
- **Learning Paths**: Customized recommendations

Your users can now create accounts, track their progress through the EQ exercises, and have a personalized experience on your platform!