import React, { useContext } from 'react'
import { BrowserRouter as Router, Switch, Route, useLocation, Redirect, useRouteMatch } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'

import Home from '../pages/Home'
import ProductDetail from '../pages/ProductDetail'
import ProductCategory from '../pages/ProductCategory'
import AccountPanel from '../pages/AccountPanel'
import Favorites from '../pages/Favorites'
import SignUp from '../pages/SignUp'
import Login from '../pages/Login'
import EditProfile from '../pages/EditProfile'
import Bag from '../pages/Bag'
import CreateProduct from '../pages/CreateProduct'
import NoMatch from '../pages/NoMatch'
import ControlPanel from '../pages/ControlPanel'
import ProductPanel from '../pages/ProductPanel'

import { UserContext } from '../contexts/user-context'
import { LinkContext } from '../contexts/link-context'


export default function Routes() {

    const { user, admin } = useContext(UserContext)
    const { homeLink, accountLink, loginLink, signupLink, addressesLink, editProfileLink } = useContext(LinkContext)

    return (
        <Switch>
            <Route exact path={homeLink} component={ Home } />
            
            <Route exact path={accountLink} condition={user} redirect ={loginLink} component={ AccountPanel } />

            <PrivateRoute exact path={signupLink} condition={!user} redirect ={homeLink} component={ SignUp } />
            <PrivateRoute exact path={loginLink} condition={!user} redirect ={homeLink}  component={ Login } />

            <Route exact path='/products/:category' component={ ProductCategory } />
            <Route path='/products/details/:_id' component={ ProductDetail } />
            <Route path='/favorites' component={ Favorites } />
            <Route path='/bag' component={ Bag } />
            <PrivateRoute path='/controlpanel' component={ ControlPanel } />
            <PrivateRoute path='/productpanel' component={ ProductPanel } />
            <Route path='/createproduct' component={ CreateProduct } />


            <Route path ='*'>
                <NoMatch />
            </Route>
        </Switch>
    )
}
