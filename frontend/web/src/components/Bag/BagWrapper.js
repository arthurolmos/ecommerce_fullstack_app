import React, { useEffect } from 'react'
import {
    Container,
    Row,
    Col
} from 'reactstrap'

import BagItems from './BagItems'
import BagTotal from './BagTotal'
import DefaultContainer from '../Util/DefaultContainer'

export default function BagWrapper() {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <DefaultContainer
            title='sacola' 
            component={
                <Container>
                    <Row>
                        <Col>
                            <BagItems />
                        </Col>
                        <Col>
                            <BagTotal />
                        </Col>
                    </Row>
                </Container>
            }/>
    )
}
