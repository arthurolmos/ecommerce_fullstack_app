import React, { useContext } from 'react'
import {
    Container,
    Spinner
} from 'reactstrap'
import DefaultContainer from '../../components/Util/DefaultContainer'

import LoginForm from '../../components/Auth/LoginForm'
import { UserContext } from '../../contexts/user-context'
import { Redirect } from 'react-router'

export default function Login() {

    const { user, loading } = useContext(UserContext)

    return (
        <DefaultContainer   
            title='Entrar'
            component={
                <LoginForm />
            }
        />
    )
}
