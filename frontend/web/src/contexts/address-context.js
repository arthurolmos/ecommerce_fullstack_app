import React, { useState, useEffect } from 'react'

import { authFunctions as auth} from '../firebase/authFunctions'
import { dbFunctions as db } from '../firebase/dbFunctions'

const AddressContext = React.createContext();

function AddressProvider(props) {
    
    const [ userAddress, setUserAddress ] = useState(null)

    const [ loading, setLoading ] = useState(false)    
    const [ loadingUserAddress, setLoadingUserAddress ] = useState(false)  

    let userAddressListener = null


    //ADDRESS FUNCTIONS
    const createAddress = async(data) => {
        
        const user = auth.getAuth().currentUser

        if(user){
            setLoading(true)

            const _id = user.uid
            const inst = db.getDbInstance()
            const ref = inst.collection('addresses')
            
            let resp = await db.createData(_id, ref, data)

            setLoading(false)
            return resp
        }        
    }

    const updateAddress = async(data) => {
        
        const user = auth.getAuth().currentUser

        if(user){
            setLoading(true)

            const _id = user.uid
            const inst = db.getDbInstance()

            const ref = inst.collection('addresses').doc(_id)
    
            const resp = await db.updateTransactionData(ref, data)
    
            setLoading(false)
            return resp
        }

    }

    const deleteAddress = async(address) => {

        const user = auth.getAuth().currentUser

        if(user){
            const _id = user.uid
            const inst = db.getDbInstance() 
            const ref = inst.collection('addresses').doc(_id)
    
            const resp = await db.deleteData(ref)
    
            return resp
        }
    }


    //AUTH LISTENER
    useEffect(() => {
        auth.getAuth().onAuthStateChanged(user => {

            if (user) {
                const _id = user.uid
                userAddressListener = addUserAddressListener(_id)

            } else {
                userAddressListener()
            }
        })
    }, [])


    const addUserAddressListener = (_id) => {
        console.log(_id)
        const inst = db.getDbInstance()
        const ref = inst.collection('addresses').doc(_id)

        console.log(ref)

        return ref.onSnapshot(doc => {
                    console.log('USER ADDRESS', doc.data())
                    
                    setUserAddress(doc.data())
                })
    }


    return (
        <AddressContext.Provider value={{

            loading: loading,
            loadingUserAddress: loadingUserAddress,

            userAddress: userAddress,

            createAddress: createAddress,
            deleteAddress: deleteAddress,
            updateAddress: updateAddress
        }}>
            {props.children}
        </AddressContext.Provider>
    )
}

export { AddressProvider, AddressContext }