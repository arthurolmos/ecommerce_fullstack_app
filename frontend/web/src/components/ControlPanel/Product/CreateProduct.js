import React, { useState, useContext, useEffect } from 'react'
import { 
    Spinner,
    Alert
} from 'reactstrap'
import DefaultContainer from '../../Util/DefaultContainer'
import ProductForm from './ProductForm'
import { ProductContext } from '../../../contexts/product-context'
import styled from 'styled-components'


export default function CreateProduct() {
    
    const { createProduct, loading } = useContext(ProductContext)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <DefaultContainer 
            title='Adicionar Produto...'
            component={
                loading ? 
                    <Spinner color='danger'/>
                    :
                    <ProductForm 
                        handleSubmit={createProduct}
                    />
            }
        />
    )
}
