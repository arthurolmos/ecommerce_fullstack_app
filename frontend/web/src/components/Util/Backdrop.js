import React from 'react'
import {
    Container
} from 'reactstrap'
import styled from 'styled-components'


export default function Backdrop( props) {
    let open

    if(props.isOpen)
        open = 'open'
    else
        open = ''

    return (
        <ContainerStyled fluid onClick={ props.handleClick } className={ open }/>
    )
}


const ContainerStyled = styled(Container)`
    transition: all 0.3s ease;

    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    z-index: 99999;

    visibility: hidden;

    &.open {
        visibility: visible;
        background: rgba(0, 0, 0, 0.8);
    }
`;