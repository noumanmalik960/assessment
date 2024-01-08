import {FIRESTORE_API_KEY, FIRESTORE_APP_ID} from '@env';
import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

// firebase connection
export const firebaseConfig = {
  apiKey: FIRESTORE_API_KEY,
  authDomain: 'assessment-task-a07f2.firebaseapp.com',
  projectId: 'assessment-task-a07f2',
  storageBucket: 'assessment-task-a07f2.appspot.com',
  messagingSenderId: '464593792093',
  appId: FIRESTORE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
