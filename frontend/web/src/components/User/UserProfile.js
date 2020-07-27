import React, { useContext, useState, useEffect } from 'react'
import {
    Col,
    Row,
    Container,
    ListGroupItem
} from 'reactstrap'
import { BigSpinner } from '../Util/Spinners'
import UserForm from './UserForm'
import { Link } from 'react-router-dom'
import { UserContext } from '../../contexts/user-context'
import styled from 'styled-components'

export default function UserProfile(props) {

    const { userData, updateUser, loading } = useContext(UserContext)

    const handleSubmit = async(data) => {

        let update = false
        let resp = {result: true}

        const newData = {}
        const oldData = {}

        let firstName = userData.firstName
        let lastName = userData.lastName

        if(data.firstName !== userData.firstName){
            newData.firstName = data.firstName
            oldData.firstName = userData.firstName
            firstName = data.firstName
            update = true
        }

        if(data.lastName !== userData.lastName){
            newData.lastName = data.lastName
            oldData.lastName = userData.lastName
            lastName = data.lastName
            update = true
        }

        if(data.cpf !== userData.cpf){
            newData.cpf = data.cpf
            oldData.cpf = userData.cpf
            update = true
        }

        if(data.cellphone !== userData.cellphone){
            newData.cellphone = data.cellphone
            oldData.cellphone = userData.cellphone
            update = true
        }

        if(update){
            const displayName = firstName + ' ' + lastName

            const changes = { newData, oldData }

            resp = await updateUser(changes, displayName)
        }

        return resp
    } 
    

    return(
        loading ? 
            <Container className='d-flex justify-content-center align-items-center'>
                <BigSpinner color='danger'/>
            </Container>
            :
            <Container>
                <Row className='mb-3'>
                    <Col>
                        <Title>Dados pessoais</Title>
                    </Col>
                </Row>

                <UserForm 
                    edit
                    userData={userData}
                    handleSubmit={handleSubmit}
                />
            </Container>
        
    )
}



const Title = styled.h2`
    font-family: Fjalla One, sans-serif;
    text-transform: uppercase;

`

const LinkStyled = styled(Link)`
    color: #666;
    text-decoration: none;
    font-weight: bold;

    &:hover{
        color: black;
    }
`

const UserDataStyled = styled(ListGroupItem)`
    border: none;
    padding: 3px;
`