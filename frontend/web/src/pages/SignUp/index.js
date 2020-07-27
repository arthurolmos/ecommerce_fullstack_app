import React, { useContext } from 'react'

import DefaultContainer from '../../components/Util/DefaultContainer'
import UserForm from '../../components/User/UserForm'
import { UserContext } from '../../contexts/user-context'

export default function SignUp() {

    const { createUser } = useContext(UserContext)

    const handleCreateUser = async (user) => {
        const resp = await createUser(user)

        console.log(resp)

        return resp
    }

    return (
        <DefaultContainer   
            title='Registre-se'
            component={
                <UserForm 
                    title='cadastre-se'
                    handleSubmit={handleCreateUser}
                />
            }
        />
    )
}
