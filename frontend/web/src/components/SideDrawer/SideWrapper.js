import React, { useContext } from 'react'
import Backdrop from '../Util/Backdrop'
import SideDrawer from './SideDrawer'
import { SideDrawerContext } from '../../contexts/sidedrawer-context'


export default function SideWrapper() {
    const ctx = useContext(SideDrawerContext)

    return (
        <>
            <SideDrawer isOpen={ ctx.isDrawerOpen }/>
            <Backdrop handleClick={ ctx.closeDrawer } isOpen={ ctx.isDrawerOpen }/>
        </>
    )
}
