import React, { useState, useEffect, useContext } from 'react'

import { MiddleHeader } from './MiddleHeader'
import { BottomHeader } from './BottomHeader'
import NavBackground from '../Util/NavBackground'

import styled from 'styled-components'

import { UserContext } from '../../contexts/user-context'
import { BagContext } from '../../contexts/bag-context'
import { ProductContext } from '../../contexts/product-context'
import { ModalContext } from '../../contexts/modal-context'
import { SideDrawerContext } from '../../contexts/sidedrawer-context'
import { FavContext } from '../../contexts/fav-context'


export default function HeaderWrapper() {

    const { user, admin, logOutUser } = useContext(UserContext)
    const { favItems, removeFav } = useContext(FavContext)
    const { bagItems, bagTotal, removeFromBag } = useContext(BagContext)
    const { open } = useContext(ModalContext)
    const { toggleDrawer } = useContext(SideDrawerContext)

    const [ small, setSmall ] = useState('')

    const resizeOnScroll = () => {
        window.onscroll = () => {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                setSmall('small')
            } else {
                setSmall('')
            }
        }
    }
    

    useEffect(() => {
        window.addEventListener('scroll', resizeOnScroll)
    }, [])


    return (
        <>
            <ContainerStyled>
                <MiddleHeader 
                    small={small}

                    user={user}
                    admin={admin}
                    logOutUser={logOutUser}

                    favItems={favItems}
                    removeFav={removeFav}

                    bagItems={bagItems}
                    bagTotal={bagTotal}
                    removeFromBag={removeFromBag}
                    open={open}
                    />
                <BottomHeader 
                    small={small}

                    admin={admin}
                    user={user}
                    favItems={favItems}
                    bagItems={bagItems}

                    toggleDrawer={toggleDrawer}
                    />
            </ContainerStyled>
            <NavBackground />
        </>
    )
}

const ContainerStyled = styled.div`
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 999;
`
