import firebase from 'firebase/app'
import 'firebase/auth'


const auth = firebase.auth()

export const authFunctions = {
    getAuth: () => { return auth },

    createUser: async (email, password) => {

        const resp = await firebase.auth()
                        .createUserWithEmailAndPassword(email, password)
                        .then(() => {
                            return ({result: true})
                        })
                        .catch(error => {
                            console.log('ERROR ON CREATE USER! : ', error)
                            return ({result: false, error: error})
                        })
        
        return resp
    },

    signIn: async(email, password) => {
        const resp = await auth.signInWithEmailAndPassword(email, password)
                    .then(() => { return ({result: true}) })
                    .catch(error => {
                        return ({result: false, error: error})
                    })
        return resp
    },

    signOut: async() => {
        const resp = await firebase.auth().signOut()
                        .then(() => {
                            return({result: true})
                        })
                        .catch(error =>  {
                            return({result: false, error: error})
                        })
        return resp
    },


    updateProfile: async (name) => {

        const user = auth.currentUser

        console.log('DISPLAY NAME', name)
        
        const resp = await user.updateProfile({
                        displayName: name
                    }).then(() => {
                        return ({result: true})
                    }).catch(error => {
                        console.log('ERROR ON USER UPDATE!: ', error)
                        return ({result: false, error: error})
                    })
        return resp
    }
}