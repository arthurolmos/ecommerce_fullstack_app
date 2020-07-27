import React, { useContext, useEffect, useState } from 'react'
import { 
    Card, 
    CardImg, 
    CardText, 
    CardBody,
    CardTitle, 
    CardSubtitle, 
    Spinner,
    Button,
    Label
} from 'reactstrap'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeartSolid, faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartBorder} from '@fortawesome/free-regular-svg-icons'
import { floatToCurrencyString } from '../Util/Conversors'
import { FavIcon } from '../../components/Util/Buttons'


export default function ProductCard(props) {

    const { _id, name, price, isFav, thumbnailIndex, product, thumbnail } = props
    const { toggleFav, addToBag } = props 

    return (
        <CardStyled>
                <LabelStyled>
                    <FavIcon 
                        toggleFav={toggleFav}
                        product={product}
                        isFav={isFav}
                    />
                </LabelStyled>
            <Link tag={Link} to={`/products/details/${_id}`}>
                <CardImgStyled top width="100%" src={ thumbnail ? thumbnail : null } alt="Card image cap" />
            </Link>

            <CardBodyStyled>
                <CardTitleStyled>{name}</CardTitleStyled>
                <CardText>{floatToCurrencyString(price)}</CardText>
                <ButtonStyled onClick={() => addToBag({...product})}>
                    <FontAwesomeIcon icon={faShoppingBag}/> Adicionar
                </ButtonStyled>
            </CardBodyStyled>
        </CardStyled> 
    )
}


const LabelStyled = styled(Label)`
    position: absolute;
    top: 10px;
    right: 10px;
`

const CardStyled = styled(Card)`
    min-width: 200px;
    width: 200px;
    margin: 10px 10px 30px 10px;
    border: 1
    px solid black;
    border-radius: 0;

    padding: 0;
    transition: all 0.2s linear;

    &:hover{
        // box-shadow: 2px -2px gray;

        // ${CardImg .img}{
        //     transform: scale(1.02);
        // }
    }
`

const CardImgStyled = styled(CardImg)`
    min-height: 200px; 
    height: 200px; 
`

const CardTitleStyled = styled(CardTitle)`
    font-weight: bold;
    margin-bottom: 0;
`

const CardBodyStyled = styled(CardBody)`
    text-align: center;
    padding: 0;
    color: black;

    &:hover{
        text-decoration: none;
    }
`

const ButtonStyled = styled(Button)`
    text-transform: uppercase;
    background: black;
    border-radius: 0;
    width: 100%;
    margin: 0;
    box-shadow: none;

    &:focus {
        box-shadow: none;
    }
`
