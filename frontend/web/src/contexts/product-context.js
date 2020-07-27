import React, { useState, useEffect } from 'react'

import { authFunctions as auth } from '../firebase/authFunctions'
import { dbFunctions as db } from '../firebase/dbFunctions'


const ProductContext = React.createContext()

function ProductProvider(props) {
    const [ products, setProducts ] = useState([])
    
    const [ loading, setLoading ] = useState(false)

    let productDataListener = null

    const getProductById = async(_id) => {
        
        const inst = db.getDbInstance()
        const ref = inst.collection('products').doc(_id)

        const doc = await db.getData(ref)
        
        return doc
    }

    const createProduct = async(product) => {

    }

    useEffect(() => {
        productDataListener = addProductListener()
            
        return () => {
            productDataListener()
        }
        
    }, [])

    const addProductListener = () => {
        const inst = db.getDbInstance()
        const ref = inst.collection('products')

        return ref.onSnapshot(snapshot => {

            let products = []
            snapshot.forEach(product => {
                product._id = product.id
                
                products.push(product)
            })
            console.log('PRODUCT DATA', products)

            setProducts(products)
        })
    }

    return (
        <ProductContext.Provider value={{
            products: products,
            loading: loading,

            getProductById: getProductById,

        }}>
            {props.children}
        </ProductContext.Provider>
    )
}

export { ProductProvider, ProductContext }