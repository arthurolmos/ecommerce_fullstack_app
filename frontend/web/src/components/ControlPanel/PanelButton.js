import React from 'react'

import { 
    Label,
    Row,
    Col,
    Container
} from 'reactstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styled from 'styled-components'

export default function PanelButton(props) {
    
    const { title, link, icon} = props

    return (
        <LinkStyled to={link}>
            <Container>
                <Row>
                    <ColStyled>
                        <FontAwesomeIconStyled icon={icon} />
                    </ColStyled>
                </Row>
                <Row>
                    <ColStyled>
                        <Title>{title}</Title>
                    </ColStyled>
                </Row>
            </Container>
        </LinkStyled>
    )
}



const Title = styled(Label)`
    color: black;
    font-size: 20px;

    word-break: normal;
`

const ColStyled = styled(Col)`
    display: flex;
    justify-content: center;
    aligin-items: center;
`

const FontAwesomeIconStyled = styled(FontAwesomeIcon)`
    color: black;
    font-size: 40px;
`

const LinkStyled = styled(Link)`
    text-decoration: none;

    &:hover{
        text-decoration: none;

        ${Title}{
            color: darkred;
            text-decoration: none;
        }

        ${FontAwesomeIconStyled}{
            color: darkred;
        }
    }
`