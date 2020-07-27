import React, { useState } from 'react'

const SideDrawerContext = React.createContext();

function SideDrawerProvider(props) {
    const [drawerOpenState, setDrawerOpenState] = useState(false)
    
    return (
        <SideDrawerContext.Provider value={{
            isDrawerOpen: drawerOpenState,
            toggleDrawer: () => setDrawerOpenState(!drawerOpenState),
            closeDrawer: () => setDrawerOpenState(false),
            stateChangeHandler: (newState) => setDrawerOpenState(newState.isOpen)
        }}>
            {props.children}
        </SideDrawerContext.Provider>
    )
}

export { SideDrawerProvider, SideDrawerContext }