import React, { useContext, useEffect, useState } from 'react'
import {
    Container,
    Row,
    Col,
    Media,
    Spinner,
    Form,
    FormGroup,
    Input,
    Button,
    Label,
    TextArea
} from 'reactstrap'
import { useParams, useRouteMatch } from 'react-router-dom'
import { ProductContext } from '../../contexts/product-context'
import { BagContext } from '../../contexts/bag-context'
import { FavContext } from '../../contexts/fav-context'
import DefaultContainer from '../../components/Util/DefaultContainer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faShoppingBag, faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartBorder} from '@fortawesome/free-regular-svg-icons'
import { floatToCurrencyString } from '../../components/Util/Conversors'
import { NumberInput } from '../../components/Util/Inputs'
import { FavIcon } from '../../components/Util/Buttons'
import { ThumbsSmallPanel } from '../../components/Util/Thumbs'
import Breadcrumbs from '../../components/Util/Breadcrumbs'

import styled from 'styled-components'


export default function ProductDetail() {
    const [ productDetail, setProductDetail ] = useState(null)

    const [ thumbnailIndex, setThumbnailIndex ] = useState(0)
    
    const { getProduct, getProductById, loading } = useContext(ProductContext)

    const { addToBag } = useContext(BagContext)
    const { toggleFav } = useContext(FavContext)
    
    const { _id } = useParams()
    const match = useRouteMatch('/products/:id')
    const breadPath = match.url.split('/')

    const { name, description, price, pictures, isFav } = productDetail ? productDetail : ''
 
    useEffect(() => {
        console.log(productDetail)
    }, [productDetail])


    useEffect(() => {
        const loadProduct = async() => {
            // const product = await getProduct(_id)
            const product = await getProductById(_id)
            console.log('PRODUCT DETAIL: ', product)

            if(product) {
                setProductDetail(product)
                setThumbnailIndex(product.thumbnailIndex)
            }

        }

        loadProduct()
    }, [])
    

    const Detail = () => {
        const [ qty, setQty ] = useState(1)

        useEffect(() => {
            if(qty <= 0) { setQty(1) }
            if(qty >= 10) { setQty(10) }   

        }, [qty])

        const subQty = () => setQty(qty-1)
        const addQty = () => setQty(qty+1)    
        
        const handleAddToBag = e => {
            e.preventDefault()

            if(productDetail){
                const temp = {...productDetail}
                temp.qty = qty

                addToBag(temp)
            }
        }

        return(
            <Container>
                <Row>
                    <Col>
                        <Breadcrumbs path={breadPath} />
                    </Col>
                </Row>
                <RowStyled>
                    <Col className='d-none d-lg-block'>
                        <Row style={{display: 'flex', flexWrap: 'nowrap', justifyContent:'center'}}> 
                            <ColThumbs>
                                <ThumbsSmallPanel
                                    thumbnails={productDetail ? productDetail.pictures : null}
                                    setThumbIndex={setThumbnailIndex}
                                />
                            </ColThumbs>
                            <ColMedia>
                                <MediaStyled
                                    src={pictures ? pictures[thumbnailIndex].thumbnailUrl : null }
                                    alt='Product Thumbnail' />
                            </ColMedia>
                        </Row>
                    </Col>
                    <Col className='d-block d-lg-none'>
                        <Row className='d-flex justify-content-center'>
                            <ColMedia>
                                <MediaStyled 
                                    src={pictures ? pictures[thumbnailIndex].thumbnailUrl : null } 
                                    alt='Product Thumbnail' />
                            </ColMedia> 
                        </Row>
                        <Row  style={{display: 'flex', flexWrap: 'nowrap', justifyContent:'center'}}    >
                            <ColThumbs>
                                <ThumbsSmallPanel
                                    thumbnails={productDetail ? productDetail.pictures : null}
                                    setThumbIndex={setThumbnailIndex}
                                />
                            </ColThumbs>
                        </Row>
                    </Col>
                    <ColInfo>
                        <Container className='d-block'>
                            <Form>
                                <FormGroup row>
                                    <TitleCol>
                                        <Title>
                                            {name}
                                        </Title>
                                    </TitleCol>
                                    <Col xs={4} className='d-inline-flex justify-content-end'>
                                        <FavIcon
                                            toggleFav={toggleFav}
                                            product={productDetail}
                                            isFav={isFav} a
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    {floatToCurrencyString(price)}
                                </FormGroup>
                                <FormGroup>
                                    <LabelStyled for='qty'>Quantidade</LabelStyled>
                                    <NumberInputStyled 
                                        id='qty'
                                        name='qty'
                                        type='number'
                                        value={qty}
                                        onChange={e => setQty(e.target.value)}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <ButtonStyled onClick={e => handleAddToBag(e)}>
                                        <FontAwesomeIcon icon={faShoppingBag}/> Adicionar
                                    </ButtonStyled>
                                </FormGroup>

                                <FormGroup>
                                    <DescriptionLabel for='description'>Descrição</DescriptionLabel>
                                    <Container className='p-0 m-0'>
                                        {description}
                                    </Container>
                                </FormGroup>
                            </Form>
                        </Container>
                    </ColInfo>
                </RowStyled>
            </Container>
        )
    }

    return (
        <DefaultContainer
            title={name}
            component={
                loading ? 
                    <Spinner color='danger'/> 
                    : 
                    productDetail && <Detail /> 
            } 
        />
    )
}

const MediaStyled = styled(Media)`
    max-height: 400px;
    height: 400px;
    box-sizing: border-box;

    transition: all 0.5s ease-in-out;

    @media(max-width: 320px){
        max-width: 250px;
        height: auto;
    }
`

const Title = styled.h4`
    font-family: Fjalla One, sans-serif;
    white-space: nowrap;
`

const ImageCol = styled(Col)`
    display: flex;
    justify-content: center;
`
const TitleCol = styled(Col)`
    display: flex;
    box-sizing: border-box;
    word-break: break-word;
`

const NumberInputStyled = styled(NumberInput)`
    border-radius: 0;
    max-width: 100px;
`

const ButtonStyled = styled(Button)`
    text-transform: uppercase;
    background: black;
    border-radius: 0;
    margin: 0;
    box-shadow: none;

    width: 100%;

    &:focus {
        box-shadow: none;
    }
`

const RowStyled = styled(Row)`
    align-items: stretch; 
    justify-content: space-between;

    margin: 0;
    
    @media (max-width: 770px){
        display: block;
        justify-content: center;
    }
`

const LabelStyled = styled(Label)`
    font-weight: bold;
    font-size: 16px;
    color: grey;
`

const DescriptionLabel = styled(Label)`
    font-weight: bold;
`

const  ColMedia = styled(Col)`
    display: flex; 
    justify-content: center;
    max-width: 300px;
    flex: 1 2 auto;
    margin: 0 15px 15px 15px;

`

const ColInfo = styled(Col)`
    display: block;
    max-width:400px;
`

const ColThumbs = styled(Col)`
    max-width: 250px;
`