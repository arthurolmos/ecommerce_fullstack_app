import React, { useContext, useState, useEffect } from 'react'
import {
    Container,
    Row,
    Col,
    ListGroup,
    ListGroupItem
} from 'reactstrap'
import UserProfile from '../../components/User/UserProfile'
import UserAddress from '../../components/Address/UserAddress'
import DefaultContainer from '../../components/Util/DefaultContainer'
import Breadcrumbs from '../../components/Util/Breadcrumbs'
import { LinkContext } from '../../contexts/link-context'

import { useRouteMatch } from 'react-router-dom'

import styled from 'styled-components'
import { UserContext } from '../../contexts/user-context'


export default function AccountPanel() {

    const { logOutUser } = useContext(UserContext)

    const { accountLink } = useContext(LinkContext)

    const match = useRouteMatch(accountLink)
    const breadPath = match ? match.url : []

    const [ optionSelected, setOptionSelected ] = useState(0)
    const [ optionPanel, setOptionPanel ] = useState(null)

     useEffect(() => {
        switch(optionSelected) {

            case 0: return setOptionPanel(<UserProfile />)
            case 1: return setOptionPanel(<UserAddress />)
            case 2: return setOptionPanel("olar")
            
            default: return setOptionSelected(0)
        }
    }, [optionSelected])
    
    const PanelMenu = () => {
        
        return (
            <ListGroup>
                <MenuOptionStyled
                    onClick={() => {
                        setOptionSelected(0)
                    }}
                    active={optionSelected === 0 ? true : false}
                >
                    Perfil
                </MenuOptionStyled>

                <MenuOptionStyled
                    onClick={() => {
                        setOptionSelected(1)
                    }}
                    active={optionSelected === 1 ? true : false}
                >
                    Endereços
                </MenuOptionStyled>
                <MenuOptionStyled
                    onClick={() => {
                        setOptionSelected(2)
                    }}
                    active={optionSelected === 2 ? true : false}
                >
                    Pedidos
                </MenuOptionStyled>
                <MenuOptionStyled
                    onClick={() => {
                        setOptionSelected(3)
                    }}
                    active={optionSelected === 3 ? true : false}
                >
                    Alterar Senha
                </MenuOptionStyled>
                
                <MenuOptionStyled
                    onClick={() => logOutUser()}
                >
                    Sair
                </MenuOptionStyled>
            </ListGroup>
        )
    }



    return (
        <DefaultContainer 
            component = {
                <Container>
                    <Row>
                        <Col>
                            <Breadcrumbs path={breadPath}/>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={3}>
                            <PanelMenu />
                        </Col>
                        
                        <Col>
                            {optionPanel}
                        </Col>
                    </Row>
                </Container>
            }
        />
    )
}

const MenuOptionStyled = styled(ListGroupItem)`
    cursor: pointer;
    font-weight: bold;
    color: #666;

    &:hover{
        color: black;
        text-decoration: underline;
    }

    &.active {
        background: darkred;
        border-color: black;

        &:hover{
            color: white;
            text-decoration: none;
        }


    }
`