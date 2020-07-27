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
    const [ pictures, setCategories ] = useState([])

    useEffect(() => {

        let isSubscribed = true

        async function getAllCategories() { 

            setLoading(true)

                const resp = await api.get('/pictures')
                const pictures = resp.data
                
                if(isSubscribed) { 
                    setCategories(pictures)
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
            },
            {
                title: 'Categoria',
                field: 'category'
            },
            {
                title: 'Caminho',
                field: 'filePath'
            },
            {
                title: 'URL',
                field: 'url'
            },
        ]
    }, [])


    const buttons = [
        <Button color='primary' onClick={() => history.push('/pictures/create')} key={'new'}>Novo</Button>
    ]

    return (
        <DefaultContainer 
            title={'Imagens'}
            backAction={() => history.push('/')}
            buttons = { buttons }
        >
            {loading ? 
                <Spinner />
                :
                <Table 
                    columns={columns}
                    data={pictures}
                    buttons={buttons}
                />
            }
        </DefaultContainer>
    )
}
