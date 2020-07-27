import React from 'react'
import {
    Container,
    ListGroup,
    ListGroupItem,
    InputGroup,
    Input,
    InputGroupAddon,
    Button
} from 'reactstrap'
import Collapsible from 'react-collapsible'
import styled from 'styled-components'

export default function FooterEmail() {
    const SignEmail = () => {
        return (
            <ListGroupStyled flush>
                <ItemStyledHeader>
                    Newsletter
                </ItemStyledHeader>

                <ItemStyled>
                    Cadastre seu email para receber novidades e promoções!
                </ItemStyled>
            </ListGroupStyled>
        )
    }

    const EmailInput = () => {
        return (
            <InputGroupStyled>
                <InputStyled placeholder='Insira seu email...'/>

                <InputGroupAddon addonType='append'>
                    <SearchButton>
                        OK
                    </SearchButton>
                </InputGroupAddon>
            </InputGroupStyled>
        )
    }

    return (
        <ContainerStyled fluid>
            <SignEmail />
            <EmailInput />
        </ContainerStyled>
    )
}


const ContainerStyled = styled(Container)`
    display: block;
    height: 200px;
    background: black;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 15px;
    fixed: bottom;
`;

const InputGroupStyled = styled(InputGroup)`
    display: inline-flex;
    width: 500px;

    @media (max-width: 414px) {
        max-width: 280px;
        
        &:focus{
            box-shadow: none;
        }
    }
`;

const InputStyled = styled(Input)`
    border-radius: 0px;
    border: 1px white solid;

    &.form-control{
        transition: none;
    }

    &:focus{
        border: none;
        box-shadow: none;
    }

    @media (max-width: 414px) {
        max-width: 100%;

        &:focus{
            box-shadow: none;
        }
    }
`;

const SearchButton = styled(Button)`
    color: darkred;
    border-radius: 0px;
    border: none;
    background: white;

    &:hover{
        background: #ddd;
        color: darkred;
    }

    @media (max-width: 414px) {
        border: .5px solid black;
        margin-right: 5px;

        &:focus{
            background: #ddd;
            color: darkred;
            box-shadow: none;
        }
    }
`;



const ListGroupStyled = styled(ListGroup)`
    margin: 10px;
`;


const ItemStyled = styled(ListGroupItem)`
    background: none;
    padding: 3px;
    color: lightgray;
`;

const ItemStyledHeader = styled(ItemStyled)`
    text-transform: uppercase;
    font-weight: bold;
    color: white;
`;