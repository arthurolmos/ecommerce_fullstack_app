import React, { useState, useEffect, useContext } from 'react'
import {
    Alert
} from 'reactstrap'
import styled from 'styled-components'
import { ProductContext } from '../../contexts/product-context'

export const ResultAlert = () => {

    const [ open, setOpen ] = useState(false)
    const [ color, setColor ] = useState('')
    const [ text, setText ] = useState('')

    const close = () => setOpen(false)

    useEffect(() => {
        window.setTimeout(() => {
            setOpen(false)
        }, 3000)

    }, [open])

    const { result } = useContext(ProductContext)

    useEffect(() => {
        console.log('RESULT', result)

        if(result != null){
            const { resp, message } = result

            const color = resp ? 'success' : 'danger'
            
            setColor(color)
            setText(message)
            setOpen(true)
        } 

    }, [result])

    return (
        <AlertStyled 
            isOpen={open} 
            toggle={close} 
            color={color}
        >
            {text}
        </AlertStyled>
    )
}

export const DefaultAlert = (props) => {

    console.log('ALERT PROPS: ', props)

    const { color, text } = props
    const { alertOpen, setAlertOpen } = props
    const close = () => setAlertOpen(false)

    useEffect(() => {
        if(alertOpen) { 
            const timer = window.setTimeout(() => {
                setAlertOpen(false)
            }, 3000)
            
            return () => {
                clearTimeout(timer)
            }
        }
    }, [alertOpen])


    return (
        <AlertStyled 
            isOpen={alertOpen} 
            toggle={close} 
            color={color}
        >
            {text}
        </AlertStyled>
    )
}

const AlertStyled = styled(Alert)`
    z-index: 999999;
    position: fixed;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
`
