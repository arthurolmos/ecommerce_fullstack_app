import React, { useContext, useEffect, useState } from 'react'
import { 
    Container,
    ListGroup,
    ListGroupItem,
    Row,
    Col,
    Media,
    Form,
    FormGroup,
    Input,
    Button
} from 'reactstrap'
import { BagContext } from '../../contexts/bag-context'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { floatToCurrencyString } from '../Util/Conversors'


export default function BagItems() {

    const { bagItems, addQty, subQty, changeQty, removeFromBag } = useContext(BagContext)
    
    const bagList = bagItems.map(item => {
        
        const { _id, name, price, qty, totalPrice, pictures, thumbnailIndex } = item

        return(
            <ListGroupItem
                key={_id}
                id={_id}
                item={item}
                className='mt-2'>

                <Container>
                    <Row>
                        <Col className='d-flex justify-content-end my-2 p-0' >
                            <Button close onClick={() => removeFromBag(item)} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6}>
                            <MediaStyled src={pictures[thumbnailIndex].thumbnailUrl}/>
                        </Col>

                        <Col >
                            <Row>
                                <Col>
                                    <Title>{name}</Title>
                                </Col>
                            </Row>
                        
                            <Row className='d-flex justify-content-between'>
                                <Col xs={3} className='d-inline-flex align-items-center justify-content-center'>
                                    <FontAwesomeIconStyled 
                                        icon={faMinus} 
                                        onClick={() => subQty(item)}
                                        />
                                </Col>
                                <Col xs={4} className='d-flex align-items-center justify-content-center'>
                                    <InputStyled 
                                        id='qty'
                                        name='qty'
                                        type='number'
                                        value={qty}
                                        onChange={e => changeQty(e.target.value, item)}
                                        />
                                </Col>
                                <Col xs={3} className='d-flex align-items-center justify-content-center'>
                                    <FontAwesomeIconStyled 
                                        icon={faPlus} 
                                        onClick={() => addQty(item)}
                                        />
                                </Col>
                            </Row>

                            <Row className='d-flex mt-3'>
                                <ColPriceStyled>
                                    Unt.: {floatToCurrencyString(price)}
                                </ColPriceStyled>
                            </Row>
                            <Row className='d-flex my-2'>
                                <ColPriceStyled style={{fontWeight: 'bold'}}>
                                    Total: {floatToCurrencyString(totalPrice)}
                                </ColPriceStyled>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </ListGroupItem>
        )
    })

    return (
        <ListGroupStyled>
            <TitleBox>Itens</TitleBox>
            {bagList.length > 0 ? bagList : 'Não há itens na sua sacola!'}
        </ListGroupStyled>
    )
}


const MediaStyled = styled(Media)`
    max-width: 100px;
    height: auto;
`

const Title = styled.h5`
    font-family: Fjalla One, sans-serif;
    text-transform: uppercase;
`

const TitleBox = styled.h4`
    font-family: Fjalla One, sans-serif;
    text-transform: uppercase;
    font-weight: bold;
`

const ListGroupStyled = styled(ListGroup)`
    // width: 500px;
`

const FontAwesomeIconStyled = styled(FontAwesomeIcon)`
    cursor: pointer;

    &:hover{
        color: darkred;
    }
`

const InputStyled = styled(Input)`
    border-radius: 0;
    min-width: 50px;
    max-width: 50px;
    margin-left: 5px;
    margin-right: 5px;

    ::-webkit-inner-spin-button{
        -webkit-appearance: none; 
        margin: 0; 
    }
    ::-webkit-outer-spin-button{
        -webkit-appearance: none; 
        margin: 0; 
    }  
`

const CloseIconStyled = styled(FontAwesomeIcon)`
    cursor: pointer;
`

const ColPriceStyled = styled(Col)`
    font-size: 16px;
    font-family: Fjalla One, sans-serif;
`