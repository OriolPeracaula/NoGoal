/**
* Aqui estan les dades que permeten la connexió amb la BD.
*/


import firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBTWBbCAX5DwbxZ4qGhf3lpLKWE9NKHNS0",
    authDomain: "reactnativebackend-2a4a4.firebaseapp.com",
    databaseURL: "https://reactnativebackend-2a4a4.firebaseio.com",
    projectId: "reactnativebackend-2a4a4",
    storageBucket: "reactnativebackend-2a4a4.appspot.com",
    messagingSenderId: "811199032541",
    appId: "1:811199032541:web:32cd8892564ac3d6ca7f34"

};
/*let app = firebase.initializeApp(firebaseConfig);
export const db = app.database();*/


let Firebase = firebase.initializeApp(firebaseConfig);

// ... before export default statemen
export const db = firebase.firestore();

/*db.settings({
	timestampsInSnapshots: true
})*/

export default Firebase;