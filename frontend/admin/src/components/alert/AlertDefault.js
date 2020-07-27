import React, { useContext } from 'react'

import { 
    Alert
} from 'reactstrap'

import { AlertContext } from '../../contexts/AlertContext'

import styled from 'styled-components'


export default function AlertDefault() {

    const { color, message, visible, onDismiss } = useContext(AlertContext)

    return (
        <AlertStyled 
            color={color} 
            isOpen={visible} 
            toggle={onDismiss}
        >
            {message}
        </AlertStyled>
    )
}


const AlertStyled = styled(Alert)`
    position: fixed;
    z-index: 999;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
`

