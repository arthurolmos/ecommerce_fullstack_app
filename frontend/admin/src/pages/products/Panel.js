import React, { useEffect, useState, useMemo } from 'react'

import { 
    Spinner,
    Button
} from 'reactstrap'

import DefaultContainer from '../../components/layout/DefaultContainer'
import Table from '../../components/table/Table'
import { SliderColumnFilter, SelectColumnFilter } from '../../components/table/TableFilters'
import { useParams, useHistory } from 'react-router-dom'

import api from '../../services/api'


export default function Panel() {

    const history = useHistory()

    const [ loading, setLoading ] = useState(true)
    const [ products, setProducts ] = useState([])

    useEffect(() => {

        let isSubscribed = true

        async function getAllProducts() { 

            setLoading(true)

                const resp = await api.get('/products')
                const products = resp.data
                
                if(isSubscribed) { 
                    setProducts(products)
                }

            setLoading(false)

        }

        getAllProducts()

        return () => isSubscribed = false
    }, [])

    const columns = [
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
            },
            {
                title: 'Preço',
                field: 'price',
            },
            {
                title: 'Qtd. em Estoque',
                field: 'stockQuantity',
            },
            {
                title: 'Disponível',
                field: 'available',
            },
            {
                title: 'Visível',
                field: 'visible',
            },
    ]

    const buttons = [
        <Button color='primary' onClick={() => history.push('/products/create')} key='new'>Novo</Button>
    ]

    return (
        <DefaultContainer 
            title={'produtos'}
            backAction={() => history.push('/')}
            buttons = { buttons }
        >
            {loading ? 
                <Spinner />
                :
                <Table 
                    columns={columns}
                    data={products}
                    buttons={buttons}
                />
            }
        </DefaultContainer>
    )
}
