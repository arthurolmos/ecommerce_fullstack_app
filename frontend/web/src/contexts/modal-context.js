import React, { useState, useEffect } from 'react'

const ModalContext = React.createContext()

function ModalProvider(props) {
    const [ modal, setModal ] = useState(false);

    const open = () => setModal(true);
    const toggle = () => setModal(!modal);
    const close = () => setModal(false);

    return (
        <ModalContext.Provider value={{
            modal: modal,
            
            open: open,
            toggle: toggle,
            close: close
        }}>
            {props.children}
        </ModalContext.Provider>
    )
}

export { ModalProvider, ModalContext }