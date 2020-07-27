import React from 'react'
import {
    Container
} from 'reactstrap'
import styled from 'styled-components'


export default function NavBackground() {
    return (
        <ContainerStyled fluid/>
    )
}

const ContainerStyled = styled(Container)`
    width: 100%;
    height: 140px;
    background: black;
`

