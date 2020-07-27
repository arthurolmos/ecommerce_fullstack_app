import React, { useEffect, useState, useMemo } from 'react'

import { 
    Spinner,
    Button
} from 'reactstrap'

import DefaultContainer from '../../components/layout/DefaultContainer'
import Table from '../../components/table/Table'
import { useParams, useHistory } from 'react-router-dom'

import api from '../../services/api'


export default function Panel() {

    const history = useHistory()

    const [ loading, setLoading ] = useState(true)
    const [ users, setUsers ] = useState([])

    useEffect(() => {

        let isSubscribed = true

        async function getAllUsers() { 

            setLoading(true)

                const resp = await api.get('/users')
                const users = resp.data
                
                if(isSubscribed) { 
                    setUsers(users)
                }

            setLoading(false)

        }

        getAllUsers()

        return () => isSubscribed = false
    }, [])

    const columns = [
            {
                title: 'id',
                field: 'id'
            },
            {
                title: 'Nome',
                field: 'firstName'
            },
            {
                title: 'Sobrenome',
                field: 'lastName'
            },
            {
                title: 'Email',
                field: 'email'
            },
            {
                title: 'CPF',
                field: 'cpf'
            },
            {
                title: 'Telefone',
                field: 'phone'
            },
    ]

    const buttons = [
        <Button color='primary' onClick={() => history.push('/users/create')} key={'new'}>Novo</Button>
    ]

    return (
        <DefaultContainer 
            title={'usuários'}
            backAction={() => history.push('/')}
            buttons = { buttons }
        >
            {loading ? 
                <Spinner />
                :
                <Table 
                    columns={columns}
                    data={users}
                    buttons={buttons}
                />
            }
        </DefaultContainer>
    )
}
