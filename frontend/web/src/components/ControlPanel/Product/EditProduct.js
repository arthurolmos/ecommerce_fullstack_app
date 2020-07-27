import React, { useState, useContext, useEffect } from 'react'
import { 
    Spinner,
    Alert
} from 'reactstrap'
import DefaultContainer from '../../Util/DefaultContainer'
import ProductForm from './ProductForm'
import { ProductContext } from '../../../contexts/product-context'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'


export default function EditProduct() {
    
    const { updateProduct, getProductById, loading } = useContext(ProductContext)
    const { product, setProduct } = useContext(null)

    const productId = useParams('productId')

    useEffect(() => {
        window.scrollTo(0, 0)

        const product = getProductById(productId)

        console.log(product)

        if(product)
            setProduct(product)

    }, [])

    return (
        <DefaultContainer 
            title='Editar Produto...'
            component={
                loading ? 
                    <Spinner color='danger'/>
                    :
                    <ProductForm 
                        handleSubmit={editProduct}
                        edit
                        product={product}
                    />
            }
        />
    )
}
