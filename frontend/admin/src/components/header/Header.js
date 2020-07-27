import React, { useState, useContext } from 'react'

import { 
    Navbar,
    Nav,
    NavItem,
    NavLink,
    NavbarBrand,
    NavbarText,
    NavbarToggler,
    Collapse,
    DropdownMenu,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownItem
} from 'reactstrap'

import { useHistory } from 'react-router-dom'
import Auth from '../../services/Auth'
import styled from 'styled-components'


export default function Header(props) {

    const history = useHistory()

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <Navbar color="light" light expand="md"  >
            <NavbarBrand href="/">reactstrap</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
                <NavItem>
                <NavLink href="/components/">Components</NavLink>
                </NavItem>
                <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                    Options
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem>
                    Option 1
                    </DropdownItem>
                    <DropdownItem>
                    Option 2
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                    Reset
                    </DropdownItem>
                </DropdownMenu>
                </UncontrolledDropdown>
            </Nav>
            <NavbarTextStyled 
                    onClick={() => { 
                            new Auth().logout()
                            history.push('/login')
                    }}
            >Logout</NavbarTextStyled>
            </Collapse>
        </Navbar>
    )
}


const NavbarTextStyled = styled(NavbarText)`
    text-transform: uppercase;
    cursor: pointer;

    &:hover { 
        font-weight: bold;
    }
`