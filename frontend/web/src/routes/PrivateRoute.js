import React, { useContext } from 'react'

import { Redirect, Route } from 'react-router-dom'
import { UserContext } from '../contexts/user-context'

// export const PrivateRoute = ({component: Component, ...rest}) => {

//     console.log(rest)

//     const { user, admin } =  useContext(UserContext)

//     return (
//         <Route
//             {...rest} //exact path etc...

//             render = { props => 
//                 admin ? 
//                 <Component {...props} />
//                 : //if not, redirects...
//                 <Redirect to='/' />
//             }>
//         </Route>
//     )
// }


export const PrivateRoute = ({component: Component, condition: condition, redirect: redirect, ...rest}) => {

    return (
        <Route
            {...rest} //exact path etc...

            render = { props => 
                condition ? 
                    <Component {...props} />
                    : //if not, redirects...
                    <Redirect to={redirect} />
            }>
        </Route>
    )
}
    