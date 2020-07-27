import React from 'react'

import { Switch, BrowserRouter as Router, Route, Link } from 'react-router-dom'
import ProtectedRoute from './routes/ProtectedRoute'
import AuthRoute from './routes/AuthRoute'

import Home from './pages/Home'

import Login from './pages/login/Login'

import UserPanel from './pages/users/Panel'
import UserCreate from './pages/users/Create'
import UserEdit from './pages/users/Edit'

import ProductPanel from './pages/products/Panel'
import ProductCreate from './pages/products/Create'
import ProductEdit from './pages/products/Edit'

import CategoryPanel from './pages/categories/Panel'
import CategoryCreate from './pages/categories/Create'
import CategoryEdit from './pages/categories/Edit'

import PicturePanel from './pages/pictures/Panel'
import PictureCreate from './pages/pictures/Create'
// import PictureEdit from './pages/pictures/Edit'
import MainContainer from './components/layout/MainContainer'


import OrderPanel from './pages/order/Panel'

import Header from './components/header/Header'
import SideMenu from './components/menu/SideMenu'


export default function routes() {

    return (
        <>
            <Route exact path='/login' component={Login} /> 

            <MainContainer> 
            <ProtectedRoute exact path='/' component={Home} />
        
            <ProtectedRoute exact path='/products' component={ProductPanel}/>
            <ProtectedRoute exact path='/products/create' component={ProductCreate}/>
            <ProtectedRoute exact path='/products/edit/:productId' component={ProductEdit}/>

            <ProtectedRoute exact path='/users' component={UserPanel}/>
            <ProtectedRoute exact path='/users/create' component={UserCreate}/>
            <ProtectedRoute exact path='/users/edit/:userId' component={UserEdit}/>

            <ProtectedRoute exact path='/categories' component={CategoryPanel}/>
            <ProtectedRoute exact path='/categories/create' component={CategoryCreate}/>
            <ProtectedRoute exact path='/categories/edit/:categoryId' component={CategoryEdit}/>

            <ProtectedRoute exact path='/pictures' component={PicturePanel}/>
            <ProtectedRoute exact path='/pictures/create' component={PictureCreate}/>
            {/* <ProtectedRoute exact path='/pictures/edit/:pictureId' component={PictureEdit}/> */}

            <ProtectedRoute exact path='/orders' component={OrderPanel}/>
            </MainContainer>

        </>
    )
}
