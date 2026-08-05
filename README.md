# InkFlow

InkFlow is a lightweight blogging application built with React, Vite, and Firebase. Visitors can browse published posts, while signed-in users can create, edit, and delete their own posts using Google authentication.

## Features

- Browse a feed of blog posts, newest first
- Open full blog posts from the feed
- Sign in and out with Google
- Create new posts after signing in
- Edit or delete only posts owned by the signed-in user
- Show post author, creation date, and last-updated date
- Protect post creation and editing routes from unauthenticated access

## Tech stack

- React 19
- Vite 8
- React Router 7
- Firebase Authentication (Google provider)
- Cloud Firestore
- ESLint

## Prerequisites

Before starting, install:

- [Node.js](https://nodejs.org/) 20 or later
- An npm-compatible package manager (npm is included with Node.js)
- A Firebase project with Authentication and Cloud Firestore enabled

## Installation

1. Clone the repository and enter the project directory.

   ```bash
   git clone <repository-url>
   cd blog-app
   ```

2. Install dependencies.

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and add your Firebase web-app configuration.

   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. Start the development server.

   ```bash
   npm run dev
   ```

Vite will print the local URL, normally `http://localhost:5173`.

## Firebase setup

1. Create a project in the [Firebase console](https://console.firebase.google.com/), then register a **Web app**.
2. Copy the web configuration values into `.env` using the variable names above.
3. In **Authentication → Sign-in method**, enable **Google**.
4. In **Authentication → Settings → Authorized domains**, add the domain where you deploy the app. `localhost` is enabled for local development by default.
5. Create a **Cloud Firestore** database.

The app expects a Firestore collection called `blogs`. Each document has this shape:

```js
{
  title: "My first post",
  content: "Post body...",
  author: "Author display name",
  userId: "Firebase user ID",
  createdAt: Timestamp,
  updatedAt: Timestamp | null
}
```

### Suggested Firestore rules

For a production app, use rules that permit public reading but restrict writes to the post owner:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /blogs/{blogId} {
      allow read: if true;
      allow create: if request.auth != null
        && request.resource.data.userId == request.auth.uid;
      allow update, delete: if request.auth != null
        && resource.data.userId == request.auth.uid;
    }
  }
}
```

These rules should be reviewed and adapted to your application's requirements before deployment.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server with hot reload. |
| `npm run build` | Create an optimized production build in `dist/`. |
| `npm run preview` | Serve the production build locally. |
| `npm run lint` | Run ESLint across the project. |

## Routes

| Route | Access | Purpose |
| --- | --- | --- |
| `/` | Public | Welcome page |
| `/blogs` | Public | List all blog posts |
| `/blog/:id` | Public | View a single post |
| `/blog/new` | Signed-in users | Create a post |
| `/blog/edit/:id` | Signed-in users | Edit a post |

## Project structure

```text
src/
├── components/     # Shared UI components
├── context/        # Firebase authentication state
├── firebase/       # Firebase app, auth, and Firestore setup
├── pages/          # Route-level pages
├── routes/         # Route guards
├── App.jsx         # Route definitions
└── main.jsx        # Application entry point
```

## Deployment

Build the application with `npm run build`, then deploy the generated `dist/` directory to any static hosting provider. Configure the same `VITE_FIREBASE_*` environment variables in the provider's build environment, and add the deployed domain to Firebase Authentication's authorized domains.

## Security note

Vite environment variables are embedded into the client build. Firebase web configuration values are intended to be public, but Firestore Security Rules must enforce access control. Never store private server credentials or service-account keys in `VITE_*` variables.
