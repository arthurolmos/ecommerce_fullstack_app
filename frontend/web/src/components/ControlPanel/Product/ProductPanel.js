import React, { useContext, useState, useEffect } from 'react'

import {
    Row,
    Col,
    Container,
    Input,
    Label
} from 'reactstrap'
import ProductTable from './ProductTable'
import { CommonButton } from '../../Util/Buttons'
import { Link } from 'react-router-dom'
import DefaultContainer from '../../Util/DefaultContainer'

import styled from 'styled-components'


export default function ProductPanel() {

    const PanelBody = () => {

        const [ filter, setFilter ] = useState('')

        const handleClick = () => {}

        return (
            <Container>
                <Row className='mb-3'>
                    <Col>
                        <Link to='/addproduct'>
                            <CommonButton   
                                color='red'
                                title= '+ novo'
                                handleClick={handleClick}
                            />
                        </Link>
                    </Col>
                    <Col>
                        <Input 
                            placeholder='Filtro...'
                            type='text'
                            value={filter}
                            onChange={e => setFilter(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ProductTable filter={filter}/>
                    </Col>
                </Row>
            </Container>
        )
    }

    return (
        <DefaultContainer 
            title='Painel de Produtos'
            component={<PanelBody />}
        />
    )
}