import React, { useContext } from 'react'

import { Route, Redirect } from 'react-router-dom'

import Auth from '../services/Auth'

export default function PrivateRoute({component: Component, ...rest}) {

    const isLoggedOut = new Auth().isLoggedOut()

    return (
        <Route {...rest} render={props => (
            isLoggedOut ?
                <Component {...props} />
            : <Redirect to='/' />
        )} />
    )
}