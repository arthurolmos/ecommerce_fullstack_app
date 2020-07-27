import React, { useEffect, useState } from 'react';

import './App.css';
import HeaderWrapper from './components/Header/HeaderWrapper'
import SideWrapper from './components/SideDrawer/SideWrapper'
import FooterWrapper from './components/Footer/FooterWrapper'

// import { StaticRouter as Router, Switch, Route, Redirect, useLocation } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './routes/Routes'

import { SideDrawerProvider } from './contexts/sidedrawer-context'
import { ProductProvider } from './contexts/product-context'
import { UserProvider } from './contexts/user-context'
import { AddressProvider } from './contexts/address-context'
import { BagProvider } from './contexts/bag-context'
import { ModalProvider } from './contexts/modal-context'
import { FavProvider } from './contexts/fav-context'
import { LinkProvider } from './contexts/link-context'

import './assets/css/fonts.css'

export default function App() {
  return (
    <Router>
      <LinkProvider>
        <ModalProvider>
          <UserProvider>
            <AddressProvider>
              <ProductProvider>
                <FavProvider>
                  <BagProvider>

                        <SideDrawerProvider>
                          <SideWrapper />
                          <HeaderWrapper />
                        </SideDrawerProvider>

                        <Routes />

                        <FooterWrapper />

                  </BagProvider>
                </FavProvider>
              </ProductProvider>
            </AddressProvider>
          </UserProvider>
        </ModalProvider>
      </LinkProvider>
    </Router>
  )
}
