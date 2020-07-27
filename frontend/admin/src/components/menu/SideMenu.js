import React, { useState, useEffect } from 'react'

import { 
    Container
} from 'reactstrap'

import { Link, useLocation } from 'react-router-dom'

import styled, { css } from 'styled-components'

export default function SideMenu() {

    const location = useLocation()

    const [ selected, setSelected ] = useState([])

    function toggleSelection(opt) { 
        const index = selected.indexOf(opt)
        if(index === -1 )
            setSelected([...selected, opt])
        else { 
            const newArray = [ ...selected ]
            newArray.splice(index, 1)

            setSelected(newArray)
        } 
    }

    function isSelected(opt){
        return selected.find(item => opt === item)
    }

    return (
        <ContainerMenuStyled>
            <SpanStyled 
                onClick={() => toggleSelection('Cadastros')}
                selected={isSelected('Cadastros')}
            >
                Cadastros
            </SpanStyled>
            <DropContainerStyled
                selected={isSelected('Cadastros')}
            >
                <LinkStyled 
                    to='/products' 
                    selected={ location.pathname.substring(0, 9) === '/products' ? true: false }
                >Produtos</LinkStyled>

                <LinkStyled 
                    to='/users' 
                    selected={ location.pathname.substring(0, 6) === '/users' ? true: false }
                > Usuários</LinkStyled>

                <LinkStyled 
                    to='/categories' 
                    selected={ location.pathname.substring(0, 11) === '/categories' ? true: false }
                > Categorias</LinkStyled>

                <LinkStyled 
                    to='/pictures' 
                    selected={ location.pathname.substring(0, 10) === '/pictures' ? true: false }
                > Imagens</LinkStyled>

                {/* <LinkStyled 
                    to='/test' 
                    selected={ location.pathname.substring(0, 6) === '/test' ? true: false }
                > Teste</LinkStyled> */}

            </DropContainerStyled>

            <SpanStyled 
                onClick={() => toggleSelection('Pedidos')}
                selected={isSelected('Pedidos')}
            >
                Pedidos de Venda
            </SpanStyled>
            <DropContainerStyled
                selected={isSelected('Pedidos')}
            >
                <LinkStyled 
                    to='/orders' 
                    selected={ location.pathname.substring(0, 7) === '/orders' ? true: false }
                > Pedidos</LinkStyled>
            </DropContainerStyled>
            
        </ContainerMenuStyled>
    )
}


const SpanStyled = styled.span`
    cursor: pointer;
    text-transform: uppercase;
    display: block;
    padding: 5px 30px 5px 30px;
    color: white;

    transition: all .1s ease;

    &:hover{ 
        text-decoration: none;
        // font-weight: bold;
        color: white;
        background: lightblue;
    }

    ${props => props.selected && css`
        font-weight: bold;
    `}
`

const DropContainerStyled = styled(Container)`
    display: none;
    box-sizing: border-box;

    padding: 0;
    transition: all 1s ease-out;

    ${props => props.selected && css`
        display: block;
    `}
`


const ContainerMenuStyled = styled(Container)`
    margin: 0;
    padding: 0;
    padding-top: 20px;
    background: black;
    width: 100%;
    height: 100vh;
    z-index: 998;
`


const LinkStyled = styled(Link)`
    display: block;
    text-transform: capitalize;
    text-decoration: none;
    color: white;
    padding: 5px 30px 5px 50px;


    transition: all .1s ease;

    &:hover{ 
        text-decoration: none;
        // font-weight: bold;
        color: white;
        background: lightblue;
    }

    ${props => props.selected && css`
        font-weight: bold;
    `}
`