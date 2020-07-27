import React, { useContext } from 'react'

import { Route, Redirect } from 'react-router-dom'

import Auth from '../services/Auth'

function isLogged() { 
    return new Auth().isLoggedIn()
}


export default function ProtectedRoute({component: Component, ...rest}) {

    return (
        <Route {...rest} render={props => (
            isLogged() ?
            <Component {...props} />
            : 
            <Redirect to='/login' />
        )} />
    )
}