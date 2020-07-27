import React from 'react'

import Form from '../../components/form/product/Form'
import DefaultContainer from '../../components/layout/DefaultContainer'

import { useParams, useHistory } from 'react-router-dom'

import api from '../../services/api'
 

export default function Create() {

    const { productId } = useParams()

    const history = useHistory()

    async function edit(data) { 

        console.log(data)
        try { 
            const resp = await api.put(`/products/${productId}`, data)

            console.log('RESP', resp)
            const product = resp.data

            return { result: true, product }
        } catch (err) { 
            return { result: false, error: err }
        }
    }

    return (
        <DefaultContainer 
            title={'Editar produto'}
            backAction={() => history.push('/products')}
        >
            <Form 
                handleSubmit={edit}
                edit
                productId={productId}
            />
        </DefaultContainer>
    )
}
