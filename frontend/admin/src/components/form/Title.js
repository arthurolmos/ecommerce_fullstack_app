import React from 'react'

import styled from 'styled-components'

export default function Title(props) {
    return (
        <TitleStyled>{props.children}</TitleStyled>
    )
}


const TitleStyled = styled.h4`
    text-transform: uppercase;
`