import React, { useState, useEffect } from 'react'

const AlertContext = React.createContext();

function AlertProvider(props) {

    const [ open, setOpen ] = useState(false)
    const [ color, setColor ] = useState('')
    const [ text, setText ] = useState('')

    const close = () => setOpen(false)

    useEffect(() => {
        window.setTimeout(() => {
            setOpen(false)
        }, 3000)

    }, [open])


    useEffect(() => {
        return () => { 
            setOpen(null)         
            setColor('')         
            setText('')         
        }
    }, [])

    return (
        <AlertContext.Provider value={{
            open: open,
            color: color,
            text: text,

            close: close,

            setOpen: setOpen,
            setColor: setColor,
            setText: setText
        }}>
            {props.children}
        </AlertContext.Provider>
    )
}

export { AlertProvider, AlertContext }