import React from 'react'
import {
    Container,
    Row,
    Col,
    ListGroup,
    ListGroupItem
} from 'reactstrap'
import Collapsible from 'react-collapsible'
import styled from 'styled-components'

export default function Footer() {
    const About = () => {
        return (
            <ListGroupStyled flush>
                <ItemStyledHeader>
                    Sanguinaria
                </ItemStyledHeader>

                <ItemStyled>Lojinha do meu amo, feita especialmente para comprarmos nossa fazendinha</ItemStyled>
            </ListGroupStyled>
        )
    }

    const Support = () => {
        return (
            <ListGroupStyled flush>
                <ItemStyledHeader className='d-none d-md-block'>
                    Atendimento
                </ItemStyledHeader>

                <ItemStyled>Cras justo odio</ItemStyled>
                <ItemStyled>Dapibus ac facilisis in</ItemStyled>
                <ItemStyled>Morbi leo risus</ItemStyled>
                <ItemStyled>Porta ac consectetur ac</ItemStyled>
                <ItemStyled>Vestibulum at eros</ItemStyled>
            </ListGroupStyled>
        )
    }

    const Institutional = () => {
        return (
            <ListGroupStyled flush>
                <ItemStyledHeader className='d-none d-md-block'>
                    Institucional
                </ItemStyledHeader>

                <ItemStyled>Cras justo odio</ItemStyled>
                <ItemStyled>Dapibus ac facilisis in</ItemStyled>
                <ItemStyled>Morbi leo risus</ItemStyled>
                <ItemStyled>Porta ac consectetur ac</ItemStyled>
                <ItemStyled>Vestibulum at eros</ItemStyled>
            </ListGroupStyled>
        )
    }

    const Payment = () => {
        return (
            <ListGroupStyled flush>
                <ItemStyledHeader className='d-none d-md-block'>
                    Formas de pagamento
                </ItemStyledHeader>

                <ItemStyled>Cras justo odio</ItemStyled>
                <ItemStyled>Dapibus ac facilisis in</ItemStyled>
                <ItemStyled>Morbi leo risus</ItemStyled>
                <ItemStyled>Porta ac consectetur ac</ItemStyled>
                <ItemStyled>Vestibulum at eros</ItemStyled>
            </ListGroupStyled>
        )
    }


    return (
        <ContainerStyled fluid >
            {/* MD - MENU */}
            <Row className='d-block d-md-none'>
                <Col className='mb-3'>
                    <About />
                </Col>
                
                <Col className='mb-3'>
                    <Collapsible 
                        trigger='atendimento' 
                        triggerStyle={{
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            color: 'white'
                        }}
                    >
                        <Support />
                    </Collapsible>
                </Col>
            
                <Col className='mb-3'>
                    <Collapsible 
                        trigger='institucional' 
                        triggerStyle={{
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            color: 'white'
                        }}
                    >
                        <Institutional />
                    </Collapsible>
                </Col>

                <Col className='mb-3'>
                    <Collapsible 
                        trigger='formas de pagamento' 
                        triggerStyle={{
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            color: 'white'
                        }}
                    >
                        <Payment />
                    </Collapsible>
                </Col>
            </Row>

            {/* SM - MENU */}
            <Row className='d-none d-md-flex'>
                <Col>
                    <About />
                </Col>
                <Col>
                    <Support />
                </Col>
                <Col>
                    <Institutional/>
                </Col>
                <Col>
                    <Payment/>
                </Col>
            </Row>
        </ContainerStyled>
    )
}


const ContainerStyled= styled(Container)`
    background: black;
    height: 100%;
    padding: 30px;
    font-size: 12px;
    fixed: bottom;
`;

const ListGroupStyled = styled(ListGroup)`

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