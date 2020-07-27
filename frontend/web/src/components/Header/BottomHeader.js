import React, { useContext, useState, useEffect  } from 'react'
import {
    Button,
    Container,
    Navbar,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { WidgetButton } from '../Util/Buttons'
import { faShoppingBag, faHeart, faUser, faCog } from '@fortawesome/free-solid-svg-icons'

import { LinkContext } from '../../contexts/link-context'



export const BottomHeader = (props) => {

    const { admin, user, toggleDrawer, favItems, bagItems } = props
    const { accountLink, homeLink } = useContext(LinkContext)
    
    const ToggleButton = () =>{
        return (
            <ButtonStyled onClick={ toggleDrawer }>
                <ButtonLine />
                <ButtonLine />
                <ButtonLine />
            </ButtonStyled>
        )
    }

    return (
        <NavbarStyled>
            <BigNavStyled className='d-none d-md-flex'>
                <NavItemStyled>
                    <NavLinkStyled tag={Link} to={'/products/skirts'}>
                        Saias
                    </NavLinkStyled>
                </NavItemStyled>
                <NavItemStyled>
                    <NavLinkStyled tag={Link} to={'/products/socks'}>
                        Meias
                    </NavLinkStyled>
                </NavItemStyled>
                <NavItemStyled>
                    <NavLinkStyled tag={Link} to={'/products/earrings'}>
                        Brincos
                    </NavLinkStyled>
                </NavItemStyled>
                <NavItemStyled>
                    <NavLinkStyled tag={Link} to={'/products/necklaces'}>
                        Colares
                    </NavLinkStyled>
                </NavItemStyled>
                <NavItemStyled>
                    <NavLinkStyled tag={Link} to={'/products/carpets'}>
                        Tapetes
                    </NavLinkStyled>
                </NavItemStyled>
            </BigNavStyled>


            <Nav className='d-flex d-md-none p-1'>
                <NavItem>
                    <ToggleButton />
                </NavItem>
                <NavItem className='d-inline-flex align-items-center'>
                </NavItem>
            </Nav>

            <Nav className='d-flex d-md-none mr-3 p-1'>
                { user ? 
                    <NavButtonItem>
                        <TitleLink to={accountLink}>Olá, {user.displayName} </TitleLink>
                    </NavButtonItem>
                    :
                    <NavButtonItem>
                        <WidgetButton 
                            icon={faUser}
                            link={accountLink}
                            handleClick={() => console.log('User!')}
                        />
                    </NavButtonItem>
                }
                <NavButtonItem>
                    <WidgetButton
                        count={favItems.length} 
                        handleClick={() => console.log('Favorites!')}
                        link='/favorites'
                        icon={faHeart}
                    />
                </NavButtonItem>
                <NavButtonItem>
                    <WidgetButton
                        count={bagItems.length} 
                        handleClick={() => console.log('Shopping bag!')}
                        link='/bag'
                        icon={faShoppingBag}
                    />
                </NavButtonItem>
                { admin ? 
                    <NavButtonItem>
                        <WidgetButton
                            handleClick={() => console.log('Config')}
                            link='/controlpanel'
                            icon={faCog}
                        />
                    </NavButtonItem>
                    :
                    null
                }
            </Nav>
        </NavbarStyled>
    )
}



const TitleLink = styled(Link)`
    font-size: 12px;
    color: white;

    &:hover{
        text-decoration: none;
        color: white;
    }
`

const BigNavStyled = styled(Nav)`
    margin-left: 30px;
    margin-right: 30px;
`

const NavLinkStyled = styled(NavLink)`
    color: white;
    // font-family: Fjalla One, sans-serif;
    font-family: Staatliches, cursive;
    font-size: 18px;
`

const NavItemStyled = styled(NavItem)`
    height: 100%;
    transition: background 0.2s ease-in-out;

    &:hover{
        background: darkred;

        ${NavLinkStyled}{
            color: white;
        }
    }
`

const ButtonLine = styled(Container)`
    margin-top: 3px;
    margin-bottom: 3px;
    width: 20px;
    height: 1px;
    background: gray;
    padding: 1px;
    border-radius: 5px;
`

const ButtonStyled = styled(Button)`
    background: white;
    margin: 5px 5px 5px 30px;
    padding: 2px 4px 2px 4px;

    &:active{
        ${ButtonLine}{
            background: white;
        }
    }
`

const NavButtonItem = styled(NavItem)`
    margin-left: 8px;
    margin-right: 8px;
`


const NavbarStyled = styled(Navbar)`
    background: black;
    color: white;
    padding: 0px;
    justify-content: center;

    transition: all 0.5s ease-in-out


    @media(min-width: 768px){
        &.small{
            height: 0;

            ${NavItemStyled}{
                visibility: hidden;
            }
        }
    }


    @media (max-width: 768px){
        justify-content: space-between;
    }
`