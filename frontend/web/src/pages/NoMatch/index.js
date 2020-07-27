import React, { useContext } from 'react'

import DefaultContainer from '../../components/Util/DefaultContainer'
import { LinkContext } from '../../contexts/link-context'
import { Link } from 'react-router-dom'

export default function NoMatch() {
    
    const { homeLink } = useContext(LinkContext)

    const Message = () => {
        return(
            <div className='d-block'> 
                <h3>
                    Página não encontrada!
                </h3>
                <Link to={homeLink}>Voltar à página inicial</Link>
            </div>
        )
    }

    return (
        <DefaultContainer
            title='ooops!'
            component={ <Message /> }
        />
    )
}
