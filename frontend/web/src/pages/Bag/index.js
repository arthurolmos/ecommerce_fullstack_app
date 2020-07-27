import React, { useEffect } from 'react'
import {
    Container,
    Row,
    Col
} from 'reactstrap'

import BagItems from '../../components/Bag/BagItems'
import BagTotal from '../../components/Bag/BagTotal'
import DefaultContainer from '../../components/Util/DefaultContainer'
import styled from 'styled-components'

export default function BagWrapper() {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <DefaultContainer
            component={
                <Container>
                    <RowStyled>
                        <ColStyled>
                            <BagItems />
                        </ColStyled>
                        <ColStyled>
                            <BagTotal />
                        </ColStyled>
                    </RowStyled>
                </Container>
            }/>
    )
}


const RowStyled = styled(Row)`
    @media(max-width: 770px){
        display: block;
    }

`

const ColStyled = styled(Col)`
    margin-bottom: 15px;
`