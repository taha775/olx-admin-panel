import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getDatabase} from 'firebase/database'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyA3IoYsKJwJSw45UQu4HDImp5BkJkryEKY",
    authDomain: "olx-panel.firebaseapp.com",
    projectId: "olx-panel",
    storageBucket: "olx-panel.appspot.com",
    messagingSenderId: "178444439896",
    appId: "1:178444439896:web:612569d711c99447bf952d"
  };




const app = initializeApp(firebaseConfig)
const auth =  getAuth(app)
const db =getDatabase(app)
const storage = getStorage(app)

export {auth,db ,storage}

