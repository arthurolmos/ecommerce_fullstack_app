import React, { useContext, useState } from 'react'

import { 
    Container,
    Row,
    Col,
    Spinner
} from 'reactstrap'
import SideMenu from '../menu/SideMenu'
import Header from '../header/Header'
import Auth from '../../services/Auth'

import styled, { css } from 'styled-components'



export default function MainDefault(props) {

    return (
        <ContainerStyled fluid>
            <Header />
            <Row>
                <ColMenuStyled sm={3}>
                    <SideMenu />
                </ColMenuStyled>
                <ColContentStyled>
                    {props.children}
                </ColContentStyled>
            </Row>
        </ContainerStyled>
    )
}


const ColContentStyled = styled(Col)`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    overflow: auto;
    box-sizing: border-box;
`

const ColMenuStyled = styled(Col)`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    overflow-y: auto;
    box-sizing: border-box;

`

const ContainerStyled = styled(Container)`
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100vh;

    overflow: hidden;
    box-sizing: border-box;

`

