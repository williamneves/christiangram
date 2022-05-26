// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyB-lIt6pOyIBgX_C0DgNKBShwPbSiKHvo8',
	authDomain: 'christagram-73377.firebaseapp.com',
	projectId: 'christagram-73377',
	storageBucket: 'christagram-73377.appspot.com',
	messagingSenderId: '23529914077',
	appId: '1:23529914077:web:772e21bfcd5670fd9b6534',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };