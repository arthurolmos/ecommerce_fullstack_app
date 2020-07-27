import React, { useContext, useState, useEffect } from 'react'

import {
    Table,
    Row,
    Col,
    Container,
    Label,
    Media,
    Input
} from 'reactstrap'
import { Link } from 'react-router-dom'
import { ProductContext } from '../../../contexts/product-context'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faCopy, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

import styled from 'styled-components'


export default function ProductTable(props) {

    const { filter } = props

    const [ productList, setProductList ] = useState([])

    const { products, deleteProduct } = useContext(ProductContext)

    useEffect(() => {
        const list = products && products.map(product => {
            return <ProductTableRow product={product} key={product.id}/>
        })

        setProductList(list)
    }, [products])


    useEffect(() => {
        let tempList = products

        if(filter.length > 3){
            let re = new RegExp(filter, 'gi')
            tempList = products.filter(p => p.title.match(re))
        }
            
        const list = tempList.map(product => {
            return <ProductTableRow product={product} key={product.id}/>
        })

        setProductList(list)

    }, [filter])


    const ProductTableRow = (props) => {

        const { product } = props
        const { id, title, info, price, thumbURL, category, type } = product

        const [ active, setActive ] = useState(true)
        const toggleActive = () =>{
            setActive(!active)
        }

        const copyProduct = product => {
            console.log('COPY! ', product)
        }

        const handleDelete = product => {
            // console.log('DELETE! ', product)
            deleteProduct(product)
        }
    
        const [ expand, setExpand ] = useState(false)

        const TableLine = (props) => {
            const { title, value } = props

            return(
                <Row>
                    <Col>
                        <Title>{title}</Title>
                    </Col>
                    <Col>
                        {value}
                    </Col>
                </Row>
            )
        }

        return [
            <tr key={id}>
                <td>
                    {active ? 
                        <CheckGreenStyled
                            icon={faCheck} 
                            onClick={() => toggleActive()}
                        />
                        :
                        <CheckRedStyled
                            icon={faTimes} 
                            onClick={() => toggleActive()}
                        />
                }
                </td>
                <ThStyled scope='row' onClick={() => setExpand(!expand)}>{id}</ThStyled>
                <td>{title}</td>
                {/* <TableData>{info}</TableData> */}
                <td>{price}</td>
                <td>
                    <FontAwesomeIconStyled 
                        icon={faCopy} 
                        onClick={() => copyProduct(product)}
                    />
                </td>
                <td>
                    <Link to='editproduct/:idProduct'>
                        <FontAwesomeIconStyled icon={faEdit} />
                    </Link>
                </td>
                <td>
                    <FontAwesomeIconStyled 
                        icon={faTrash} 
                        onClick={() => handleDelete(product)}
                    />
                </td>
            </tr>
            , 
                expand && (
                    <tr key={id + '_child'}>
                        <td colSpan='7'>
                            <ContainerStyled>
                                <Row>
                                    <ColStyled >
                                        <TitleDetail>Detalhes</TitleDetail>
                                    </ColStyled>
                                </Row>
                                <Row>
                                    <ColStyled lg={4}>
                                        <MediaStyled src={thumbURL}/>
                                    </ColStyled>
                                    <Col>
                                        <Row>
                                            <Col>
                                                <TableLine title='id' value={id} />
                                                <TableLine title='titulo' value={title} />
                                                <TableLine title='descricao' value={info} />
                                            </Col>
                                            <Col>
                                                <TableLine title='preço' value={price} />
                                                <TableLine title='categoria' value={category} />
                                                <TableLine title='tipo' value={type} />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </ContainerStyled>
                        </td>
                    </tr>
                )
        ]
    }

        

    return (
        <TableStyled striped responsive hover>
            <thead>
                <tr>
                    <th>Ativo</th>
                    <th>#id</th>
                    <th>Título</th>
                    {/* <th>Descrição</th> */}
                    <th>Preço</th>
                    <th colSpan='7' style={{textAlign: 'center'}}>Ações</th>
                </tr>
            </thead>
            <tbody>
            {productList}
            </tbody>
        </TableStyled>
    )
}




const TableData = styled.td`
    white-space: nowrap; 
    max-width: 250px; 
    overflow: hidden;
    text-overflow: ellipsis; 
`

const TableStyled = styled(Table)`
    
`

const FontAwesomeIconStyled = styled(FontAwesomeIcon)`
    color: black;
    cursor: pointer;

    & :hover{
        color: darkred;
    }
`

const CheckGreenStyled = styled(FontAwesomeIcon)`
    color: green;
    cursor: pointer;

    & :hover{
        color: blue;
    }
`

const CheckRedStyled = styled(FontAwesomeIcon)`
    color: red;
    cursor: pointer;

    & :hover{
        color: blue;
    }
`

const CollapsibleRow = styled.tr`
    visibility: hidden;

    &.
`

const ThStyled = styled.th`
    cursor: pointer;

    &:hover{
        color: darkred;
    }
`

const MediaStyled = styled(Media)`
    height: 250px;
    width: auto;
    margin-bottom: 25px;
`

const ContainerStyled = styled(Container)`
    margin: 15px;
`

const Title = styled(Label)`
    font-weight: bold;

    text-transform: uppercase;

    ::after{
        content: ': ';
    }
`

const TitleDetail = styled.h4`
    font-family: Fjalla One, sans-serif;
    text-transform: uppercase;
`

const ColStyled = styled(Col)`
    display: flex;
    justify-content: center;
    marginBottom: 5px;
`