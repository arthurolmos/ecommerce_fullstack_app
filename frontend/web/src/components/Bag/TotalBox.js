import React, { useContext, useState, useEffect } from 'react'
import {
    Container,
    Row,
    Col,
    Spinner,
    Button
} from 'reactstrap'
import styled from 'styled-components'
import { BagContext } from '../../contexts/bag-context'
import { Link } from 'react-router-dom'
import { floatToCurrencyString } from '../Util/Conversors'
import InputMask from 'react-input-mask'
import { DefaultInput } from '../Util/Inputs'




export const TotalBox = (props) => {

    const { selectedZip } = props
    const { bagTotal, calcZip, tax, loading } = useContext(BagContext)

    const [ zip, setZip ] = useState('')



    const handleCalcZip = (e) => {
        e.preventDefault()

        if(zip != '')
            calcZip(zip)
    }

    useEffect(() => {
        setZip(selectedZip)
    }, [ selectedZip ])

    return (
        <Container className='p-0'>
            <Row className='mt-2 mb-2 d-inline-flex'>
                <Col>
                    <DefaultInput style={{width: '130px'}}
                        tag={InputMask}
                        mask='99999-999'
                        id='zip' 
                        type='text' 
                        name='zip' 
                        value={zip} 
                        autoComplete='off'
                        onChange={e => setZip(e.target.value)}
                        />
                </Col>
                <Col>
                    {loading ? 
                        <Spinner color='danger' className='ml-2 mr-2' />
                        :
                        <ButtonRed onClick={e => handleCalcZip(e)}>Calc</ButtonRed>
                    }
                </Col>
            </Row>
            <Row className='mt-2 mb-2'>
                <Col>
                    Frete: {floatToCurrencyString(tax)}
                </Col>
            </Row>
            <Row>
                <Col>
                    <TotalStyled>TOTAL: {floatToCurrencyString(bagTotal)}</TotalStyled>
                </Col>
            </Row>
        </Container>
    )
}




const TitleBox = styled.h4`
    font-family: Fjalla One, sans-serif;
    text-transform: uppercase;
    font-weight: bold;
`

const TotalStyled = styled.h3`
    font-family: Fjalla One, sans-serif;
    text-transform: uppercase;
`

const ButtonStyled = styled(Button)`
    border-radius: 0;
    text-transform: uppercase;
`

const ButtonRed = styled(ButtonStyled)`
    background: darkred;
    color: white;

    &:hover{
        background: red;
        text-decoration: none;
    }
`