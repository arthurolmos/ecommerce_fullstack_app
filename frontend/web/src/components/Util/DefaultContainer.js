import React, { useEffect } from 'react'
import {
    Container,
    Row,
    Col
 } from 'reactstrap'
 import styled from 'styled-components'

export default function DefaultContainer(props) {
    const { title, component } = props

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <ContainerStyled fluid>
            {component}
        </ContainerStyled>
    )
}

const ColStyled = styled(Col)`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: 15px 0 15px 0;
`


const ContainerStyled = styled(Container)`
    display: flex;
    min-height: 500px;
    height: 100%;

    margin-top: 25px;
    margin-bottom: 25px;
    justify-content: center;
    // align-items: center;
    
`

const Title = styled.h2`
    font-family: Fjalla One, sans-serif;
    text-transform: uppercase;

`
