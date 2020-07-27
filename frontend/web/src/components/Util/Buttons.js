import React, { useState, useEffect } from 'react'
import {
    Button
} from 'reactstrap'
import { Link } from 'react-router-dom'

import { faShoppingBag, faHeart, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartBorder} from '@fortawesome/free-regular-svg-icons'
import styled from 'styled-components'


//BUTTONS
export const BagWidgetButton = (props) => {
    const { count, handleClick } = props

    return (
        <RoundButton  onClick={handleClick}>
            <NumberWidget>{count}</NumberWidget>
            <FontAwesomeIconStyled icon={faShoppingBag}/>
        </RoundButton>
    )
}

export const FavWidgetButton = (props) => {
    const { count, handleClick } = props

    return (
        <RoundButton onClick={handleClick}>
            <NumberWidget>{count}</NumberWidget>
            <FontAwesomeIconStyled icon={faHeart}/>
        </RoundButton>
    )
}

export const UserButton = () => {
    return (
        <RoundButton>
            <FontAwesomeIconStyled icon={faUser}/>
        </RoundButton>
    )
}

export const CommonButton = (props) => {
    const { title, handleClick, color, width } = props
    
    return (
        <ButtonStyled 
            style={{width: width ? width : 'auto' }}
            onClick={handleClick}
            className={color}
            >
            {title}
        </ButtonStyled>
    )
}

export const FavIcon = (props) => {

    const { product, isFav, toggleFav } = props

    return(
        <FavIconStyled 
            icon={isFav ? faHeartSolid : faHeartBorder } 
            className={isFav? 'fav' : ''} 
            onClick={()=> toggleFav(product)}
        />
    )
}



export const WidgetButton = (props) => {
    const { icon, count, handleClick } = props
    const { link } = props

    return (
        <Link tag={Link} to={link}>
            <RoundButton  onClick={() => handleClick()}>
                {count ? <NumberWidget>{count}</NumberWidget> : null}
                <FontAwesomeIconStyled icon={icon}/>
            </RoundButton>
        </Link>
    )
}

export const LoggedUserButton = () => {
    
}


//CSS
const NumberWidget = styled.span`
    display: inline-block;
    align-items: center;
    justify-content: center;
    padding: 1px 8px 1px 8px;
    font-size: 12px;
    background-color: darkred;
    border-radius: 50%;
    color: white;
    position: absolute;
    top: -10px;
    right: -10px;

    @media (max-width: 414px){
        font-size: 10px;
        padding: 1px 4px 1px 4px;
        top: -5px;
        right: -5px;
    }
`


const FontAwesomeIconStyled = styled(FontAwesomeIcon)`
    font-size: 20px;

    @media (max-width: 414px){
        font-size: 12px;
    }
`

const RoundButton = styled(Button)`
    border-radius: 50%;
    background: white;
    height: 40px;
    width: 40px;
    
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    color: black;
    position: relative;

    &:hover{
        background: #ddd;
        color: darkred;

        ${FontAwesomeIconStyled}{
            transition: transform 0.2s ease-in-out;
            transform: scale(1.1)
        }
    }

    @media (max-width: 414px){
        width: 25px;
        height: 25px;
    }
`



const ButtonStyled = styled(Button)`
    color: white;
    border-radius: 0;
    text-transform: uppercase;

    &:hover{
        text-decoration: none;
    }

    &.red{
        background: darkred;

        &:hover{
            background: red;
        }
    }

    &.black{
        background: black;

        &:hover{
            background: gray;
        }
    }
`


const FavIconStyled = styled(FontAwesomeIcon)`
    color: black;
    cursor: pointer;

    display: inline-block;

    font-size: 25px;

    &.fav{
        color: darkred;
    }
    
    transition: all 0.2s linear;
    
    &:hover{
        transform: scale(1.1);
    }
    
    &:active{
        transform: scale(1.3);
    }
`