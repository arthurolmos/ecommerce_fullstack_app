import React ,{ useContext, useState, useEffect } from 'react'
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    Media,
    Container,
    Button,
    Input,
    InputGroup,
    InputGroupAddon,
    Row,
    Col
} from 'reactstrap'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import backgroundImg from '../../img/layout/nav-bg-img.jpg'
import logoImg from '../../img/layout/logo-clean.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBag, faHeart, faUser, fa, faSearch, faDoorOpen, faCog } from '@fortawesome/free-solid-svg-icons'
import { WidgetButton } from '../Util/Buttons'
import { floatToCurrencyString } from '../Util/Conversors'
import { LinkContext } from '../../contexts/link-context'



export const MiddleHeader = (props) => {
    const { small } = props

    const { user, admin, logOutUser, 
            favItems, removeFav,
            bagItems, bagTotal, removeFromBag,
            open 
        } = props

    const [ input, setInput ] = useState('')

    const { loginLink, signupLink, homeLink, accountLink } = useContext(LinkContext)


    const FloatingUserContainer = () => {        
        return (
            <FloatingContainer fluid>
                {user == null ? 
                    <Container>
                        <TitleStyled> USUÁRIO </TitleStyled>
                        <Container>
                            {/* Efetue seu <OpenLoginModal onClick={()=> open()}>login</OpenLoginModal> ou <LinkLogin tag={Link} to='/user/signup'>cadastre-se</LinkLogin>! */}
                            Efetue seu <LinkStyled to={loginLink}>login</LinkStyled> ou <LinkStyled to={signupLink}>cadastre-se</LinkStyled>!
                        </Container>
                    </Container>
                    : 
                    <Container>
                        <TitleStyled> Olá, {user.displayName}!</TitleStyled>
                        <ButtonLogout onClick={() => logOutUser()}>
                            <FontAwesomeIcon icon={faDoorOpen} className='mr-2'/>
                            SAIR
                        </ButtonLogout>
                    </Container>
                }
            </FloatingContainer>
        )
    }


    const FloatingList = (props) => {
        const { items, bag } = props

        const list =  items.map(item => {
            const { _id, name, pictures, quantity, regularPrice, thumbnailIndex } = item
            
            return(
                <FloatingListItemStyled fluid key={_id}>
                    <Row>
                        <Col className='p-0 d-flex justify-content-center align-items-center'>
                            <MediaStyled object src={pictures[thumbnailIndex].thumbnailUrl} alt="Product" />
                        </Col>
                        <Col>
                            <RowTitleStyled>
                                {name}
                            </RowTitleStyled>
                            {bag ? 
                                <RowQtyStyled>
                                    Qtd: {quantity}
                                </RowQtyStyled>
                                : null
                            }
                            <RowPriceStyled>
                                Preço: {
                                    bag ? 
                                        floatToCurrencyString(regularPrice * quantity) 
                                        : 
                                        floatToCurrencyString(regularPrice)
                                    }
                            </RowPriceStyled>
                        </Col>
                        <Col sm='auto'>
                            <Button 
                                close
                                onClick={
                                    bag ? 
                                        () => removeFromBag(item)
                                    :
                                        () => removeFav(item)
                                } 
                            />
                        </Col>
                    </Row>
                </FloatingListItemStyled>
            )
        })

        return (
            <FloatingContainer>
                <TitleStyled> {bag ? 'Sacola' : 'Favoritos'} </TitleStyled>
                <Container>
                    {list.length > 0 ? list : 'Não há itens para serem exibidos!'}
                </Container>
                {bag ? 
                    <ContainerTotal>
                        Total: {floatToCurrencyString(bagTotal)}
                    </ContainerTotal>
                    :
                    null
                }
            </FloatingContainer>
        )
    }

    

    const SearchInput = () => {
        return (
            <InputGroup size='sm' className='d-none d-lg-flex'>
                <InputStyled 
                    placeholder='O que procura?'
                    value={input}
                    onChange={e => setInput(e.target.value)}/>

                <InputGroupAddon addonType='append'>
                    <SearchButton>
                        <FontAwesomeIcon icon={faSearch} />
                    </SearchButton>
                </InputGroupAddon>
            </InputGroup>
        )
    }

    return (
        <NavbarStyled expand='md' className={small}>
            <ContainerMd fluid className='d-none d-md-flex'>
                <NavbarBrand tag={Link} to={homeLink}>
                    <Logo object src={logoImg} alt='Logo'/>
                </NavbarBrand>

                <NavStyled navbar>
                    <NavItemStyled>
                        <SearchInput/>
                    </NavItemStyled>

                    {user ? 
                        <NavItemStyled>
                            <TitleLink to={accountLink}>Olá, {user.displayName} </TitleLink>
                        </NavItemStyled>
                        :
                        <NavItemStyled>
                            <WidgetButton 
                                icon={faUser}
                                link={accountLink}
                                handleClick={() => console.log('User!')}
                            />
                            <FloatingUserContainer />
                        </NavItemStyled>
                    }
                    
                    <NavItemStyled>
                        <WidgetButton
                            count={favItems.length} 
                            handleClick={() => console.log('Favorites!')}
                            link='/favorites'
                            icon={faHeart}/>
                        <FloatingList items={favItems} handleClick={removeFav}/>
                    </NavItemStyled>
                    <NavItemStyled>
                        <WidgetButton   
                            count={bagItems.length} 
                            handleClick={() => console.log('Shopping bag!')}
                            link='/bag'
                            icon={faShoppingBag}/>
                        <FloatingList bag items={bagItems} handleClick={removeFromBag}/>
                    </NavItemStyled>
                    {admin ? 
                        <NavItemStyled>
                            <WidgetButton   
                                handleClick={() => console.log('Config!')}
                                link='/controlpanel'
                                icon={faCog}/>
                        </NavItemStyled>
                        :
                        null
                    }
                </NavStyled>
            </ContainerMd>

            <ContainerSm fluid className='d-flex d-md-none'>
                <NavbarBrand tag={Link} to={homeLink}>
                    <Logo object src={logoImg} alt='Logo'/>
                </NavbarBrand>
            </ContainerSm>
        </NavbarStyled> 
    )
}



//STYLED COMPONENTS
const TitleLink = styled(Link)`
    font-size: 16px;
    color: white;

    &:hover{
        text-decoration: none;
        color: white;
    }
`


const ContainerMd = styled(Container)`
    margin-left: 30px;
    margin-right: 30px;
`

const ContainerSm = styled(Container)`
    display: flex;
    justify-content: center !important;
`


const Logo = styled(Media)`
    width: 300px;
    margin-left: 20px;
    margin-right: 30px;
    transition: all 0.2s ease-in-out;


    @media (max-width: 414px) {
        width: 280px;
        margin: 0px;
    }
`

const NavbarStyled = styled(Navbar)`
    height: 100px;
    padding: 5px;
    background-color: darkred;
    background-image: url(${backgroundImg});
    background-position: 80% 90%;

    transition: all 0.2s ease-in-out;

    @media(min-width: 768px){
        &.small{
            height: 80px;
            // padding: 15px;

            ${Logo}{

                width: 240px;
            }
        }
    }
`


const NavItemStyled= styled(NavItem)`
    margin-left: 10px;
    margin-right: 10px;
    position: relative;
`

const NavStyled = styled(Nav)`
    margin-right: 50px;    
    align-items: center;
`

const FloatingContainer = styled(Container)`
    visibility: hidden;
    position: absolute;
    z-index: 999;
    width: 300px;
    min-height: 100px;
    max-height: 400px;
    box-sizing: border-box;
    background: white;
    overflow: auto;
    right: 0;
    top: 100%;

    ${NavItemStyled}:hover & {
        visibility: visible;
    }
`
const FloatingListItemStyled = styled(Container)`
    border-top: 1px solid black;
    margin-top: 10px;
    padding: 10px 0 10px 0;
    position: relative;

    &:first-child{
        border: none;
    }
`

const MediaStyled = styled(Media)`
    min-height: 80px;
    height: 80px;
    margin-right: 5px;
`


const InputStyled = styled(Input)`
    border-bottom: none !important;

    border-radius: 0px;

    &.form-control{
        transition: none;
    }

    &:focus{
        border: 1px solid white;
        box-shadow: none;
    }

    @media (max-width: 414px) {
        max-width: 100%;

        &:focus{
            box-shadow: none;
        }
    }
`

const SearchButton = styled(Button)`
    color: darkred;
    border-radius: 0px;
    border: none;
    background: white;

    &:hover{
        background: #ddd;
        color: darkred;
    }

    @media (max-width: 414px) {
        border: .5px solid black;
        margin-right: 5px;

        &:focus{
            background: #ddd;
            color: darkred;
            box-shadow: none;
        }
    }
`

const TitleStyled = styled(Container)`
    text-transform: uppercase;
    font-size: 20px;
    font-weight: bold;
    padding: 0;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 0 15px 0 15px;

    font-family: Fjalla One, sans-serif;
`

const RowTitleStyled = styled(Row)`
    margin-bottom: 15px;
    font-size: 16px;
    Fjalla One, sans-serif;
`

const RowQtyStyled = styled(Row)`
    font-weight: bold;
    font-size: 12px;
    color: grey;
    font-family: Fjalla One, sans-serif;
`

const RowPriceStyled = styled(Row)`
    font-weight: bold;
    font-size: 16px;
    font-family: Fjalla One, sans-serif;
`

const LinkStyled = styled(Link)`
    color: black;
    font-weight: bold;

    &:hover{
        color: black;
    }
`

const OpenLoginModal = styled.span` 
    color: black;
    font-weight: bold;

    cursor: pointer;

    &:hover{
        color: black;
        text-decoration: underline;
    }
`

const ButtonLogout = styled(Button)`
    color: white;
    background: darkred;
    border-radius: 0;
    margin: 5px;
    width: 100%;

    &:hover{
        background: red;
    }
`

const ContainerTotal = styled(Container)`
    margin-top: 10px;
    font-weight: bold;
    font-size: 16px;
    border-top: 2px solid black;
`