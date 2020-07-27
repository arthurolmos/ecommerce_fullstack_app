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
    const [ categories, setCategories ] = useState([])

    useEffect(() => {

        let isSubscribed = true

        async function getAllCategories() { 

            setLoading(true)

                const resp = await api.get('/categories')
                const categories = resp.data
                
                if(isSubscribed) { 
                    setCategories(categories)
                }

            setLoading(false)

        }

        getAllCategories()

        return () => isSubscribed = false
    }, [])

    const columns = useMemo(() => { 
        return [
            {
                title: 'id',
                field: 'id'
            },
            {
                title: 'Nome',
                field: 'name'
            },
            {
                title: 'Descrição',
                field: 'description'
            }
        ]
    }, [])


    const buttons = [
        <Button color='primary' onClick={() => history.push('/categories/create')} key={'new'}>Novo</Button>
    ]

    return (
        <DefaultContainer 
            title={'categorias'}
            backAction={() => history.push('/')}
            buttons = { buttons }
        >
            {loading ? 
                <Spinner />
                :
                <Table 
                    columns={columns}
                    data={categories}
                    buttons={buttons}
                />
            }
        </DefaultContainer>
    )
}
