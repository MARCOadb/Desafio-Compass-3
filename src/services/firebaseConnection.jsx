import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyD4BbRxM7TNt-nWAZIZa5XVP2pz8LerMwg",
    authDomain: "planner-a5fda.firebaseapp.com",
    projectId: "planner-a5fda",
    storageBucket: "planner-a5fda.appspot.com",
    messagingSenderId: "731015899415",
    appId: "1:731015899415:web:115c3b07564612506b6f52"
};

const firebaseApp = initializeApp(firebaseConfig)

const auth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp)

export { db, auth }