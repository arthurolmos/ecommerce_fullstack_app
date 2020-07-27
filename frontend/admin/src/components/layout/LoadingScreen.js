
import React from 'react'

import { 
    Container,
    Row,
    Col,
    Spinner
} from 'reactstrap'

import styled, { css } from 'styled-components'



export default function LoadingScreen({ loading }) {

    return (
        <LoadingStyled isOpen={loading}>
            <SpinnerStyled color='primary'/>
        </LoadingStyled>
    )
}


const LoadingStyled = styled.div`
    width: 100%;
    height: 100vh;
    background: black;
    opacity: .3;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 990;
    display: flex;
    justify-content: center;
    align-items: center;
    visibility: hidden;

    ${props => props.isOpen && css`
        visibility: visible;
    `}
`

const SpinnerStyled = styled(Spinner)`
    z-index: 991;
    width: 200px;
    height: 200px;
    border-width: .5rem;
    border-style: solid;
`
