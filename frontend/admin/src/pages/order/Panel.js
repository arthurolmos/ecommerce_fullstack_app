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

    const [ loading, setLoading ] = useState(false)
    const [ orders, setOrders ] = useState([])

    useEffect(() => {

        let isSubscribed = true

        async function getAllOrders() { 

            setLoading(true)

            try { 
                const resp = await api.get('/orders')
                const products = resp.data
                
                if(isSubscribed)
                    setOrders(products)
            
            } catch(err) { 
                console.log('ERROR', err)
            }

            setLoading(false)
        }

        getAllOrders()

        return () => isSubscribed = false
    }, [])

    const columns = useMemo(() => { 
        return [
            // {
            //     Header: 'Id',
            //     accessor: 'id'
            // },
            // {
            //     Header: 'Name',
            //     accessor: 'name'
            // },
            // {
            //     Header: 'Description',
            //     accessor: 'description'
            // },
            // {
            //     Header: 'Price',
            //     accessor: 'price',
            //     Filter: SliderColumnFilter,
            //     filter: 'equals',
            // },
            // {
            //     Header: 'StockQuantity',
            //     accessor: 'stockQuantity',
            //     Filter: SliderColumnFilter,
            //     filter: 'equals',
            // },
            // {
            //     id: 'available',
            //     Header: 'Available',
            //     accessor: 'available',
            //     Cell: ({ value }) => String(value),
            //     Filter: SelectColumnFilter,
            //     filter: 'includes',
            // },
            // {
            //     id: 'visible',
            //     Header: 'Visible',
            //     accessor: 'visible',
            //     Cell: ({ value }) => String(value),
            //     Filter: SelectColumnFilter,
            //     filter: 'includes',
            // },
        ]
    }, [])

    const data = useMemo(() =>  orders, [ orders ])

    const buttons = () => { 
        return[
            <Button onClick={() => history.push('/orders/create')}>Novo</Button>
        ]
    }

    return (
        <DefaultContainer 
            title={'pedidos'}
            backAction={() => history.push('/')}
        >
            {loading ? 
                <Spinner />
                :
                <Table 
                    columns={columns}
                    data={data}
                    buttons={buttons}
                />
            }
        </DefaultContainer>
    )
}
