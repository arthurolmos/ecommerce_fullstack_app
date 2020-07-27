import React, { useContext, useState, useEffect } from 'react'
import {
    Container,
    Row,
    Col,
    ListGroup,
    ListGroupItem,
    Button,
    Input,
    Spinner,
    CustomInput
} from 'reactstrap'
import styled from 'styled-components'
import { BagContext } from '../../contexts/bag-context'
import { UserContext } from '../../contexts/user-context'
import { ModalContext } from '../../contexts/modal-context'
import { Link } from 'react-router-dom'
import { floatToCurrencyString } from '../Util/Conversors'
import InputMask from 'react-input-mask'
import { DefaultInput } from '../Util/Inputs'
import { TotalBox } from './TotalBox'

export default function BagTotal() {

    const { user, userData, userAddress, loadingUserAddress } = useContext(UserContext)
    const { bagTotal, calcZip, tax, loading } = useContext(BagContext)
    const { open } = useContext(ModalContext)

    const [ rSelected, setRSelected ] = useState(null);
    const [ selectedZip, setSelectedZip ] = useState('')

    let counter = 0
    const addressList = userAddress ? userAddress.map(address => {
        console.log('ADDRESS: ', address)

        const { id } = address
        const { street, number, comp, neighborhood, zip, state, city } = address.data
        const i = counter++

        return(
            <ListGroupItem
                key={id}
                id={id}
                className='mt-2'
            >   
                <Container>
                    <Row>
                        <Col xs={1}>
                            <Input
                                type='radio' 
                                onChange={() => {
                                    setRSelected(i)
                                    setSelectedZip(zip)
                                    }}
                                checked={ rSelected === i }
                                />
                        </Col>
                        <Col>
                            <Row>
                                <Col>{street}</Col>
                            </Row>
                            <Row>
                                <Col>{number} {comp ? ` - ${comp}` : null}</Col>
                            </Row>
                            <Row>
                                <Col>{neighborhood}</Col>
                            </Row>
                            <Row>
                                <Col>{zip}</Col>
                            </Row>
                            <Row>
                                <Col>{city} - {state}</Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>

            </ListGroupItem>
        )
    }) : null

    const LoggedUserData = () => {
    
        return (
            <Col className='d-flex justify-content-center'>
                {loadingUserAddress ? 
                    <Spinner color='danger'/>
                    :
                    userAddress ?                         
                        addressList.length > 0 ? 
                        <Container>
                            <Row>
                                <Col>
                                    Selecione um endereço:
                                </Col>
                            </Row>
                            <ListGroup>
                                {addressList}
                            </ListGroup>
                        </Container>
                        :
                        <Container>
                            <Link to='/newaddress'>Cadastre um endereço!</Link>
                        </Container>
                    : null
                }
            </Col>
        )
    }

    const DoLogin = () => {
        return (
            <Container>
                Efetue seu <OpenLoginModal onClick={()=> open()}>login</OpenLoginModal> ou <LinkLogin tag={Link} to='/newuser'>cadastre-se</LinkLogin>!
            </Container>
        )
    }

    return (
        <>
            <TitleBox>Total</TitleBox>
            <ContainerStyled className='mt-3'>
                <Row className='my-3'>
                    {user ? 
                        <LoggedUserData />
                        :
                        <DoLogin />
                    }
                    <Col className='mt-3'>
                        <TotalBox selectedZip={selectedZip}/>
                    </Col>
                </Row>
            </ContainerStyled>
        </>       
    )
}



const TitleBox = styled.h4`
    font-family: Fjalla One, sans-serif;
    text-transform: uppercase;
    font-weight: bold;
`

const TotalStyled = styled.h3`
    font-family: Fjalla One, sans-serif;
    text-transform: uppercase;
`

const ContainerStyled = styled(Container)`
    border: 1px solid black;
`


const LinkLogin = styled(Link)`
    color: black;
    font-weight: bold;

    &:hover{
        color: black;
    }
`

const OpenLoginModal = styled.span` 
    color: black;
    font-weight: bold;

    cursor: pointer;

    &:hover{
        color: black;
        text-decoration: underline;
    }
`


const ButtonStyled = styled(Button)`
    border-radius: 0;
    text-transform: uppercase;
`

const ButtonRed = styled(ButtonStyled)`
    background: darkred;
    color: white;

    &:hover{
        background: red;
        text-decoration: none;
    }
`
