import React from 'react'
import {
    Row,
    Col,
    Container
} from 'reactstrap'
import styled from 'styled-components'


export default function Divider(props) {
    const { text } = props

    return (
        <RowStyled>
            <Col className='py-2'>
                <Line />
            </Col>
            <ColStyled className='d-inline-flex justify-content-center'>
                {text}   
            </ColStyled>
            <Col className='py-2'>
                <Line />
            </Col>
        </RowStyled>
    )
}


const RowStyled= styled(Row)`
    margin: 10px;
`

const Line = styled(Container)`
    height: 0.5px;
    width: 100%;
    background: black;
`

const ColStyled = styled(Col)`
    text-transform: uppercase;
`