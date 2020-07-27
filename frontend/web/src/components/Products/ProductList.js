import React, { useContext, useState, useEffect } from 'react'
import {
    Container,
    Spinner
} from 'reactstrap'
import ProductCard from './ProductCard'
import { BagContext } from '../../contexts/bag-context'
import { ProductContext } from '../../contexts/product-context'
import { FavContext } from '../../contexts/fav-context'

export default function ProductList(props) {

    const { products, loading } = useContext(ProductContext)
    const { addToBag } = useContext(BagContext)
    const { toggleFav } = useContext(FavContext)

    const productList = products ? products.map(product => {
        
        const { _id, name, price, thumbnailUrl, thumbnailIndex, isFav } = product

        return (
            <ProductCard 
                key = { _id }
                _id = { _id }
                name = { name }
                price = { price }
                isFav = { isFav }
                thumbnailIndex = { thumbnailIndex }
                product = { product }
                thumbnail = { thumbnailUrl }

                addToBag = { addToBag }
                toggleFav = { toggleFav }
            >

            </ProductCard>
        )
    }) : null  

    return (
        <Container fluid 
            className='d-inline-flex flex-wrap justify-content-center align-items-center' >
            {loading ? 
                <Spinner className='m-5' color='danger' /> 
                : 
                productList
            }
        </Container>
    )
}
