import { initializeApp } from 'firebase/app';
import { getStorage } from '@firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'forex-explore.firebaseapp.com',
  projectId: 'forex-explore',
  storageBucket: 'forex-explore.appspot.com',
  messagingSenderId: '830336131172',
  appId: '1:830336131172:web:a25fe3c61d8e4c757d3f71',
  measurementId: 'G-FMJ6W06TRR',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };
