import React ,{ useContext } from 'react'
import {
    Media,
    Container,
    Row,
    Col
} from 'reactstrap'
import { ProductContext } from '../../contexts/product-context'
import styled from 'styled-components'


export function FavModal(props) {
    const { fav, prod } = props

    const favProducts = fav.map(itemId => {
        return (
            prod.find(p => p.id === itemId)
        )
    })

    const favList = favProducts.map(item => {
        const { id, title, img } = item

        return (
            <Container key={id}>
                <Media data-src={img} />
                {title}
            </Container>
        )
    })
    
    return (
        <FloatingContainer> 
            {favList}
        </FloatingContainer>
    )
}


const FloatingContainer = styled(Container)`
    visibility: hidden;
    visibility: visible;
    position: absolute;
    z-index: 999999;
    width: 200px;
    height: 200px;
    background: white;
`;

// const FavContainer = styled(FloatingContainer)`
//     right: 0;
//     top: 100%;
// `;