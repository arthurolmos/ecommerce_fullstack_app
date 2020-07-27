
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'


const db = firebase.firestore()
const storage = firebase.storage()

export const dbFunctions = {
    
    getDbInstance: () => { return db },

    createData: async (_id, ref, data) => {

        let resp

        if(_id) {
            resp = await ref.doc(_id).set({...data})
                            .then(docRef => {
                                return ({result: true, id: _id })
                            })
                            .catch(error => {
                                return ({ result: false, error: error }) 
                            })


        } else {
            resp = await ref.add({...data})
                            .then(docRef => {
                                return ({ result: true, id: docRef.id })
                            })
                            .catch(error => {
                                return ({ result: false, error: error }) 
                            })
        }

        if(resp.result){
            const id = resp.id

            resp = await ref.doc(id).update({ _createdAt: firebase.firestore.FieldValue.serverTimestamp() })
                                .then(() => {
                                    return ({ result: true })
                                })
                                .catch(error => {
                                    return ({ result: false, error: error }) 
                                })
        }

        return resp
    },

    getData: async (ref) => {
        
        const resp = await ref.get()
                        .then(doc =>{
                            return ({result: true, data: doc.data()})
                        })
                        .catch(error => {
                            return ({result: false, error: error})
                        })

        return resp
    },

    getCollection: async (ref) => {

        const resp = await ref.get()
                        .then(snapshot => {

                            const list = []
                            snapshot.forEach(doc => {
                                list.push(doc.data())
                            })
                            return ({result: true, data: list})
                        })
                        .catch(error => {
                            return ({result: false, error: error})
                        })

        return resp
    },

    deleteData: async (ref) => {

        const resp = await ref.delete()
                        .then(snapshot => {
                            return ({result: true })
                        })
                        .catch(error => {
                            return ({result: false, error: error})
                        })

        return resp
    },

    updateBatchedData: async (collection, _id, data) => {
 

        const { changes, history, version } = data      
        
        const batch = db.batch()

        const histRef = db.collection('histories').doc(collection).collection(_id).doc(version.toString())
        batch.set(histRef, {...history})

        changes.version = version + 1

        const mainRef = db.collection(collection).doc(_id)
        batch.update(mainRef, {...changes})

        const resp = await batch.commit()
                                .then(() => { return ({ result:true }) })
                                .catch(error => { return ({ result:false, error: error }) 
                            })

        console.log(resp)
        return resp
    },

    updateTransactionData: async (ref, data) => {

        const { newData, oldData } = data

        const resp = await db.runTransaction( async transaction => {
                        return transaction.get(ref).then(doc => {
                            if(!doc.exists) {
                                throw 'Document not exists!'
                            }

                            let { version = 0 } = doc.data()
                            console.log('VERSION ', version)

                            const changesRef = ref.collection('changes').doc(version.toString())

                            transaction.set(changesRef, {...oldData})
                            transaction.update(changesRef, {_updatedAt: firebase.firestore.FieldValue.serverTimestamp()})

                            newData.version = version + 1
                            transaction.update(ref, {...newData})
                            
                        })
                    })
                    .then(() => { return ({ result: true })})
                    .catch(error => { return ({ result: false, error: error })})

        console.log('RESP', resp)            
        
        return resp
    },

    queryData: async (query) => {

        let list = []

        const resp = await query.get()
                            .then(querySnapshot => {
                                querySnapshot.forEach(doc => {
                                    list.push(doc.data())
                                })

                                return ({ result: true, data: list })
                            })
                            .catch(error => {
                                return ({ result: false, error: error})
                            })
        return resp
    }
}