import React, { useContext, useState } from 'react'

import { 
    Container,
    Row,
    Col,
    Spinner
} from 'reactstrap'
import SideMenu from '../menu/SideMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import styled, { css } from 'styled-components'


export default function ContainerDefault(props) {

    const { title, backAction, buttons } = props

    return (
        <ContainerMainStyled fluid>
                <RowTitleStyled>
                    <ColStyled sm={1} >
                        <FontAwesomeIconStyled onClick={() => backAction()} icon={faArrowLeft} />
                    </ColStyled>
                    <Col>
                        <TitleStyled>{title}</TitleStyled>
                    </Col>
                    <ColButtonsStyled>
                        {buttons}
                    </ColButtonsStyled>
                </RowTitleStyled>
                <RowBodyStyled>
                    <ColContentStyled>
                        {props.children}
                    </ColContentStyled>
                </RowBodyStyled>
        </ContainerMainStyled>
    )
}


const ColButtonsStyled = styled(Col)`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`


const ColStyled = styled(Col)`
    display: inline-flex;
    align-items: center;
`

const ColContentStyled = styled(Col)`
    display: block;
    max-height: 500px;
    overflow: auto;
`

const ContainerMainStyled = styled(Container)`
    padding: 30px;
    width: 100%;
    height: 100vh;
`

const TitleStyled = styled.h2`
    text-transform: uppercase;
`

const RowTitleStyled = styled(Row)`
    margin-bottom: 10px;
`

const RowBodyStyled = styled(Row)`
    // height: 100%;   
`

const FontAwesomeIconStyled = styled(FontAwesomeIcon)`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 20px;

    transition: all .2s ease-in-out;

    &:hover{
        transform: scale(1.2)
    }
`

