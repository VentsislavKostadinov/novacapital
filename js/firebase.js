// Your web app's Firebase configuration
let firebaseConfig = {
    apiKey: "AIzaSyAgMgn63pLCK2bHUjNtoKxspncZqPwkPAc",
    authDomain: "test-c05c4.firebaseapp.com",
    databaseURL: "https://test-c05c4.firebaseio.com",
    projectId: "test-c05c4",
    storageBucket: "test-c05c4.appspot.com",
    messagingSenderId: "613264734465",
    appId: "1:613264734465:web:9bec88843beebe42b40300"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();