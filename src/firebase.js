import firebase from 'firebase/compat/app';
// import * as firebase from 'firebase/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

firebase.initializeApp({ 
    apiKey: "AIzaSyAM_oNEpgoQz5SU3h2RYTnVhKcpujaS6AI",
    authDomain: "class-component.firebaseapp.com",
    projectId: "class-component",
    storageBucket: "class-component.appspot.com",
    messagingSenderId: "763318721527",
    appId: "1:763318721527:web:2d07d69c616044b69c2cf2"
})
export const auth = firebase.auth();
const firestore = firebase.firestore();
export const database = {
    users : firestore.collection('users'),
    posts : firestore.collection('posts'),
    comments : firestore.collection('comments'),
    getCurrentTimeStamp : Date.now()
}
export const storage = firebase.storage();
// export default firebase