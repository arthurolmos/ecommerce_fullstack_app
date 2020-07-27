import React, { useEffect, useState } from 'react'
import {
    Container,
    Row,
    Col,
    Spinner,
    Form,
    FormGroup,
    Label,
    Input,
    Breadcrumb, 
    BreadcrumbItem
} from 'reactstrap'
import { DefaultInput } from '../../components/Util/Inputs'
import Breadcrumbs from '../../components/Util/Breadcrumbs'
import { useParams } from 'react-router-dom'
import DefaultContainer from '../../components/Util/DefaultContainer'
import ProductList from '../../components/Products/ProductList'
import styled from 'styled-components'
import { useContext } from 'react'
import { ProductContext } from '../../contexts/product-context'
import { Link } from 'react-router-dom'
import { translate } from '../../components/Util/Translator'



export default function ProductCategory() {
    
    const { products } = useContext(ProductContext)

    const [ title, setTitle ] = useState('')
    const [ filtered, setFiltered ] = useState([])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const { category } = useParams()

    useEffect(() => {
        console.log(category)
        
        const cat = translate(category)
        setTitle(cat)   

        const filtered = products.filter(prod => prod.category === category )
        setFiltered(filtered)

    }, [ category ])


    const CategoryContainer = () => {
        const path = [
            {category: '', title: 'Home'},
            {category: category, title: title},
        ]

        return (
            <Container>
                <Row>
                    <Col>
                        <Breadcrumbs 
                            path={path}
                        />
                    </Col>
                </Row>
                <Row className='mb-3'>
                    <Col>
                        <Label for='size' className='mx-3'>Tamanho: </Label>
                        <DefaultInput 
                            style={{width: '100px'}} 
                            type='select'
                            name='size' 
                            id="size"
                        >
                            <option>Todos</option>
                            <option>G</option>
                            <option>M</option>
                            <option>P</option>
                        </DefaultInput>
                    </Col>
                    {/* <Col>
                    
                    </Col> */}
                </Row>
                <Row>
                    <Col>
                        <ProductList 
                            category={category}
                            products={filtered}
                        />
                    </Col>
                </Row>
            </Container>
        )
    }

    return (
        <DefaultContainer 
            title={title}
            component = {
                <CategoryContainer />
            }
        />
                

    )
}


const FilterCol = styled(Col)`
`
