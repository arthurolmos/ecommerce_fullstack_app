import firebase from 'firebase/app'

const config = {
    apiKey: "AIzaSyAgYbedaBwffqPDIvSXZ67It1e-z6CQxhc",
    authDomain: "sanguinaria-store-app.firebaseapp.com",
    databaseURL: "https://sanguinaria-store-app.firebaseio.com",
    projectId: "sanguinaria-store-app",
    storageBucket: "sanguinaria-store-app.appspot.com",
    messagingSenderId: "375216956776",
    appId: "1:375216956776:web:18f33b9a0645598dd8e2dd",
    measurementId: "G-QG47N12CD9"
}

firebase.initializeApp(config)

export default firebase
