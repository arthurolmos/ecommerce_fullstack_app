import React from 'react'

import DefaultContainer from '../Util/DefaultContainer' 
import PanelButton from './PanelButton'

import { faBoxOpen, faUser, faFileAlt } from '@fortawesome/free-solid-svg-icons'

export default function ControlPanel() {


    return (
        <DefaultContainer 
            title='Painel de Controle'
            component={
                <>
                    <PanelButton
                        title='Gerenciar Usuários'
                        link='/'
                        icon={faUser}
                    />

                    <PanelButton
                        title='Gerenciar Produtos'
                        link='/productpanel'
                        icon={faBoxOpen}
                    />

                    <PanelButton
                        title='Relatórios'
                        link='/'
                        icon={faFileAlt}
                    />
                </>
            }
        />
    )
}
