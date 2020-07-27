import React, { useEffect } from 'react'
import {
    Input,
    InputGroup,
    InputGroupAddon,
    Button
} from 'reactstrap'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'
import InputMask from 'react-input-mask'

export const SearchInput = () => {
    return (
        <InputGroup size='sm'>
            <InputStyled placeholder='O que procura?'/>

            <InputGroupAddon addonType='append'>
                <SearchButton>
                    <FontAwesomeIcon icon={faSearch} />
                </SearchButton>
            </InputGroupAddon>
        </InputGroup>
    )
}


export const CurrencyInput = (props) => {

    const { id, name, maxLength, value, invalid, handleChange } = props

    const formatCurrency = (value) => {
        console.log(value)

        let string = value.replace(/\D/g, '')
        
        if(string.length > 2){
            string = string.substring(0, string.length - 2) + ',' + string.substring(string.length -2, string.length)
        }

        return string
    }

    return(
        <InputNumberStyled
            id={id}
            name={name}
            maxLength={maxLength}
            value={value}
            invalid={invalid}
            onChange={e => handleChange(formatCurrency(e.target.value)) }
        />  
    )
}


export const NumberInput = (props) => {
    return (
        <InputNumberStyled 
            type='number'
            {...props} />  
    )   
}

export const DefaultInput = props => {
    return <InputStyled {...props} />
}

export const CpfInput = props => {
    
    return (
        <DefaultInput 
            tag={InputMask}
            mask='999.999.999-99'
            type='text'
            {...props}
        />
    )
}

export const PhoneInput = props => {

    return (
        <DefaultInput 
            tag={InputMask}
            mask='(99)99999-9999'
            type='text'
            {...props}
        />
    )
}


export const ZipInput = props => {
    return (
        <InputStyled 
            tag={InputMask}
            mask='99999-999'
            type='text' 
            {...props}
        />
    )
}

const InputNumberStyled = styled(Input)`
    border-radius: 0;

    // ::-webkit-inner-spin-button{
    //     -webkit-appearance: none; 
    //     margin: 0; 
    // }
    // ::-webkit-outer-spin-button{
    //     -webkit-appearance: none; 
    //     margin: 0; 
    // }  
`



const InputStyled = styled(Input)`
    border-radius: 0px;
    display: inline-block;
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
