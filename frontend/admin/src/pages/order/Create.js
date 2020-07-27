import React from 'react'

import Form from '../../components/form/product/Form'
import DefaultContainer from '../../components/layout/DefaultContainer'
import { useParams, useHistory } from 'react-router-dom'

import api from '../../services/api'

export default function Create() {

    const history = useHistory()

    async function create(data) { 

        try { 
            const resp = await api.post('/products', data)
            const product = resp.data

            return { result: true, product }
        } catch (err) { 
            return { result: false, error: err }
        }
    }

    return (
        <DefaultContainer 
            title={'Criar produto'}
            backAction={() => history.push('/products')}
        >
            <Form 
                handleSubmit={create}
            />
        </DefaultContainer>
    )
}
