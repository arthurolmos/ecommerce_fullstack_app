import React, { createContext, useState, useEffect } from 'react'


const AlertContext = createContext()

function AlertProvider(props) {

    const [message, setMessage] = useState('')
    const [color, setColor] = useState('')

    const [visible, setVisible] = useState(false)

    const onDismiss = () => setVisible(false)

    function showAlert({ message, color }) { 
        setMessage(message)
        setColor(color)

        setVisible(true)
    }

    useEffect(() => {

        if(visible)
            setTimeout(() => { onDismiss() }, 2000)

        return () => clearTimeout()
    }, [visible])


    return (
        <AlertContext.Provider 
            value={{
                message,
                color,
                visible,

                showAlert,
                
                onDismiss
            }}
        >
            {props.children}
        </AlertContext.Provider>
    )
}


export { AlertContext, AlertProvider }