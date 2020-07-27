import React, { useEffect, useState, useContext } from 'react'
import {
    Container,
    Row,
    Col,
    Spinner
} from 'reactstrap'
import CarouselProducts from '../../components/Products/CarouselProducts'
import ProductList from '../../components/Products/ProductList'
import { ProductContext } from '../../contexts/product-context'

import { carousel } from '../../data/carousel'

import styled from 'styled-components'
import firebase from 'firebase'


export default function Home() {
    const db = firebase.firestore()

    const { products, loading } = useContext(ProductContext)

    const [ promoProducts, setPromoProducts ] = useState([])
    const [ featProducts, setFeatProducts ] = useState([])

    useEffect(() => {
        const addFilter = () => {
            const f = products.filter(prod => prod.isFeat === true)
            setFeatProducts(f)

            const p = products.filter(prod => prod.isPromo === true)
            setPromoProducts(p)           
        }

        addFilter()
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
  
    return (
        <>
            <CarouselProducts 
                carousel={carousel}
            />

            <Container fluid className='d-flex flex-column p-0 m-0 align-items-center'>
                
                <Title>DESTAQUES</Title>
                <ProductList 
                    products={featProducts}
                />

                <Title>PROMOÇÃO</Title>
                <ProductList 
                    products={promoProducts}
                />

                <Title>TODOS</Title>
                <ProductList 
                    products={products}
                />
            </Container>
        </>
    )
}

const Title = styled(Container)`
    width: 80%;
    background: darkred;
    margin: 20px;
    align-items: center;
    display: flex;
    font-size: 25px;
    color: white;
    font-family: Staatliches, cursive;
    text-transform: uppercase;
`
