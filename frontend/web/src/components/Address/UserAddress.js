import React, { useContext, useState, useEffect } from 'react'
import {
    Container,
    Row,
    Col
} from 'reactstrap'
import styled from 'styled-components'

import AddressForm from './AddressForm'
import { BigSpinner } from '../Util/Spinners'
import { AddressContext } from '../../contexts/address-context'

export default function UserAddress(props) {

    const { userAddress, loading, createAddress, updateAddress } = useContext(AddressContext)
    console.log(userAddress)

    const handleCreateAddress = async (address) => {
        
        const resp = await createAddress(address)
            
        console.log(resp)
    }

    const handleUpdateAddress = async (newAddress) => {
        console.log(newAddress)
        console.log(userAddress)

        let update = false

        let newData = {}
        let oldData = {}

        if(newAddress.street !== userAddress.street){
            newData.street = newAddress.street
            oldData.street = userAddress.street
            update = true
        }
        
        if(newAddress.number !== userAddress.number){
            newData.number = newAddress.number
            oldData.number = userAddress.number
            update = true
        }

        if(newAddress.comp !== userAddress.comp){
            newData.comp = newAddress.comp
            oldData.comp = userAddress.comp
            update = true
        }

        if(newAddress.neighborhood !== userAddress.neighborhood){
            newData.neighborhood = newAddress.neighborhood
            oldData.neighborhood = userAddress.neighborhood
            update = true
        }

        if(newAddress.city !== userAddress.city){
            newData.city = newAddress.city
            oldData.city = userAddress.city
            update = true
        }

        if(newAddress.state !== userAddress.state){
            newData.state = newAddress.state
            oldData.state = userAddress.state
            update = true
        }

        if(newAddress.zip !== userAddress.zip){
            newData.zip = newAddress.zip
            oldData.zip = userAddress.zip
            update = true
        }

        if(update){
            const changes = { newData, oldData }

            const resp = await updateAddress(changes)
            console.log(resp)
        }
    }
    
    return (
        loading ? 
            <Container className='d-flex justify-content-center align-items-center'>
                <BigSpinner color='danger'/>
            </Container>
            :
            <Container>
                <Row className='mb-3'>
                    <Col>
                        <Title>Endereço</Title>
                    </Col>
                </Row>          
                
                <AddressForm 
                    edit={userAddress? true : false}
                    userAddress={userAddress}
                    handleSubmit={userAddress? handleUpdateAddress : handleCreateAddress}
                />
            </Container>
    )
}

const Title = styled.h2`
    font-family: Fjalla One, sans-serif;
    text-transform: uppercase;

`