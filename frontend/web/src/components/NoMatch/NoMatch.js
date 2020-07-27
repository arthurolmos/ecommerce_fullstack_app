import React from 'react'
import DefaultContainer from '../Util/DefaultContainer'

export default function NoMatch() {
    const Message = () => {
        return(
            <h3>
                Página não encontrada!
            </h3>
        )
    }

    return (
        <DefaultContainer
            title='ooops!'
            component={ <Message /> }
        />
    )
}
