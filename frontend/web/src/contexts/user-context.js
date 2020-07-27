import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { authFunctions as auth} from '../firebase/authFunctions'
import { dbFunctions as db } from '../firebase/dbFunctions'

const UserContext = React.createContext();

function UserProvider(props) {
    const [ user, setUser ] = useState(null)
    const [ admin, setAdmin ] = useState(false)

    const [ userData, setUserData ] = useState(null)

    const [ loading, setLoading ] = useState(false)    
    const [ loadingUserData, setLoadingUserData ] = useState(false)    

    let userDataListener = null

    let history = useHistory()


    //USER FUNCTIONS
    const createUser = async(data) => {

        setLoading(true)
        
        const { email, password, firstName, lastName, cellphone, cpf } = data
        
        let resp = await auth.createUser(email, password) 

        if(resp.result){
            const user = auth.getAuth().currentUser
            const _id = user.uid  
            const name = firstName + ' ' + lastName

            //Updating User Profile
            resp = await auth.updateProfile(name)

            //Insert into DB
            if(resp.result){
                const newUser = {
                    _id,
                    firstName,
                    lastName,
                    email,
                    cellphone,
                    cpf
                }

                const inst = db.getDbInstance()
                const ref = inst.collection('users')

                resp = await db.createData(_id, ref, newUser)

                if(resp.result){
                    history.push('/')
                }
            }

        } else {
            console.log('Erro ao criar o usuário! ', resp.error)
        }

        setLoading(false)
        return resp
    }

    const updateUser = async(data, displayName) => {
        console.log('USER ', user)

        if(user){
            setLoading(true)

            const _id = user.uid
            const inst = db.getDbInstance()
            const ref = inst.collection('users').doc(_id)
            
            // let resp = await db.updateBatchedData('users', _id, data)
            let resp = await db.updateTransactionData(ref, data)

            if(resp) {
                resp = await auth.updateProfile(displayName)
            }


            setLoading(false)
            return resp
        }
    }

    const loginWithEmail  = async(email, password) => {
        setLoading(true)

        let resp = await auth.signIn(email, password)
        console.log('SIGN IN: ', resp.result)

        setLoading(false)

        if(resp.result){
            history.push('/')            
        }else{
            console.log(resp.error)
        }

    }
   
    const logOutUser = async() => {
        
        setLoading(true)
        
        const resp = await auth.signOut()
        
        if(resp.result){
            history.push('/')
        } else {
            console.log('ERROR ', resp.error)
        }
        
        setLoading(false)
    }

    const getUserData = async(_id) => {
        setLoading(true)
        
        const inst = db.getDbInstance()
        const ref = inst.collection("users").doc(_id)

        const resp = await db.getData(ref)

        if(resp.result){
            setUserData(resp.data)
        }

        setLoading(false)

        return resp
    }


    //AUTH LISTENER
     useEffect(() => {
        auth.getAuth().onAuthStateChanged(user => {
            if (user) {
                const _id = user.uid

                setUser(user)

                userDataListener = addUserDataListener(_id)
            } else {
                setUser(null)
                setUserData(null)

                userDataListener()
            }
        })
    }, [])


    const addUserDataListener = (_id) => {
        const inst = db.getDbInstance()
        const ref = inst.collection('users').doc(_id)

        return ref.onSnapshot(doc => {
                        console.log('USER DATA', doc.data())

                        setUserData(doc.data())
                    })
    }


    return (
        <UserContext.Provider value={{
            user: user,
            admin: admin,
            userData,

            getUserData,

            loading: loading,
            loadingUserData: loadingUserData,

            createUser: createUser,
            loginWithEmail: loginWithEmail,
            logOutUser: logOutUser,
            updateUser: updateUser,
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export { UserProvider, UserContext }