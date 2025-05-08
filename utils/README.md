# Firebase Admin Setup Instructions

## Seeding Firestore Database

To seed your Firestore database with sample blog posts, follow these steps:

### 1. Generate a Firebase Service Account Key

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click the ⚙️ gear icon next to "Project Overview" and select "Project settings"
4. Go to the "Service accounts" tab
5. Click "Generate new private key"
6. Save the downloaded JSON file as `firebase-service-account-key.json` in the root of your project
   - **IMPORTANT**: Never commit this file to your repository. Add it to your `.gitignore` file.

### 2. Install Firebase Admin SDK

```bash
npm install firebase-admin
```

### 3. Run the Seed Script

```bash
node utils/admin-seed-firestore.js
```

## Deleting All Blog Posts

There are two ways to delete all blog posts from your Firestore database:

### Client SDK Method (Standard)

This method uses the client-side Firebase SDK:

```bash
node utils/delete-blog-posts.js
```

This method follows your Firestore security rules. Make sure your security rules allow document deletion.

### Admin SDK Method (Bypasses Security Rules)

This method uses the Firebase Admin SDK to bypass security rules:

```bash
node utils/admin-delete-blog-posts.js
```

This method requires the Firebase service account key mentioned in the setup section above.

## Firestore Security Rules

For development, you can use these security rules that allow read access to everyone and write access to authenticated users:

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      // Allow anyone to read data
      allow read: if true;

      // Allow write operations only for authenticated users
      allow write: if request.auth != null;
    }
  }
}
```

To set these rules:

1. Go to the Firebase Console
2. Navigate to Firestore Database
3. Click on the "Rules" tab
4. Replace the current rules with the ones above
5. Click "Publish"

For production, you should implement more restrictive security rules based on your application's requirements.
