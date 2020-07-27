import React from 'react'
import Collapsible from 'react-collapsible'
import { Link } from 'react-router-dom'
import {
    Container,
    Navbar,
    ListGroup,
    ListGroupItem
} from 'reactstrap'
import styled from 'styled-components'
import items from './categories'
import { SearchInput } from '../Util/Inputs'


export default function SideDrawer(props) {
    let open
    
    if(props.isOpen)
        open = 'open'


    const createListMenu = items.map(item => {
        // console.log('ITEM: ', item)

        return (    
            <ListGroupItemStyled key={item.id}>
                {item.sub.length > 0 ? 
                    <CollapsibleStyled trigger={item.categoria} transitionTime={200}>
                        <ListGroup>
                        {item.sub.map(item => {
                                return(
                                    <ListGroupItemStyled key={item.id} onClick={() => console.log('Clicked!')}>
                                        {item.cat}
                                    </ListGroupItemStyled>
                                )
                        })}
                        </ListGroup>
                    </CollapsibleStyled>
                
                    : item.categoria
                }
            </ListGroupItemStyled>
        )
    })

    return (
        <SideDrawerContainer fluid className={ open }>
            <BackgroundContainer>
                <NavbarStyled>
                    <MenuTitle className='my-3' style={{fontSize: '12px'}}>
                        contato.sanguinaria@gmail.com
                    </MenuTitle>
                    <SearchInput/>

                    <MenuTitle>CATEGORIAS</MenuTitle>
                </NavbarStyled>

                <MenuContainer>
                    <ListGroupMenu>
                        {createListMenu}
                    </ListGroupMenu>
                </MenuContainer>
            </BackgroundContainer>
        </SideDrawerContainer>
    )
}


const NavbarStyled = styled(Navbar)`
    background: darkred;
`;

const SideDrawerContainer = styled(Container)`
    height: 100%;
    width: 280px;
    background: rgba(255, 255, 255, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    display: inline-block;
    padding: 0px;
    z-index: 999999;
    transform: translateX(-100%);
    transition: transform 0.3s ease;

    &.open {
        transform: translateX(0);
    }
`;

const MenuTitle = styled(Container)`
    display: flex;
    flex: 1;
    padding: 10px;
    font-size: 20px;
    font-weight: bold;
    color: white
    text-transform: uppercase;
    justify-content: center !important;    
`;

const MenuContainer = styled(Container)`
    width: auto;
    height: 100%;
    overflow: auto;
    background: black;
    padding: 0;

`;

const ListGroupItemStyled = styled(ListGroupItem)`
    &:first-child, &:last-child {
        border-radius: 0;
    }    
    border: none;
`;


const ListGroupMenu = styled(ListGroup)`
    height: calc(100% - 200px);
    overflow: auto;
    text-transform: uppercase;
    font-weight: itallic;
`;

const BackgroundContainer = styled(Container)`
    background: rgba(255, 255, 255, 0.5);
    height: 100%;
    padding: 0px;
`;

const CollapsibleStyled = styled(Collapsible)`
    font-weight: bold;
    &.Collapsible__trigger::before {
        content: "*'" !important;
    }
`;

const MenuDivider = styled.div`
    margin-top: 15px;
    margin-bottom: 5px;
    height: 3px;
    width: 100%;
    background: black;
`