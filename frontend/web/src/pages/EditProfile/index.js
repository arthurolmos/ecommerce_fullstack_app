import React, { useContext } from 'react';
import { 
    Container,
    Row,
    Col
} from 'reactstrap'

import { useRouteMatch } from 'react-router-dom'

import UserForm from '../../components/User/UserForm';
import DefaultContainer from '../../components/Util/DefaultContainer';
import Breadcrumbs from '../../components/Util/Breadcrumbs';
import { LinkContext } from '../../contexts/link-context';
import { UserContext } from '../../contexts/user-context';
import { BigSpinner } from '../../components/Util/Spinners';


export default function EditProfile() {

    const { editProfileLink } = useContext(LinkContext)
    const { userData, updateUser, loading } = useContext(UserContext)

    const match = useRouteMatch(editProfileLink)
    const breadPath = match ? match.url : [] 

    const handleSubmit = async(data) => {

        let update = false

        const newData = {}
        const oldData = {}

        let firstName = userData.firstName
        let lastName = userData.lastName

        if(data.firstName !== userData.firstName){
            newData.firstName = data.firstName
            oldData.firstName = userData.firstName
            firstName = data.firstName
            update = true
        }

        if(data.lastName !== userData.lastName){
            newData.lastName = data.lastName
            oldData.lastName = userData.lastName
            lastName = data.lastName
            update = true
        }

        if(data.cpf !== userData.cpf){
            newData.cpf = data.cpf
            oldData.cpf = userData.cpf
            update = true
        }

        if(data.cellphone !== userData.cellphone){
            newData.cellphone = data.cellphone
            oldData.cellphone = userData.cellphone
            update = true
        }

        if(update){
            const displayName = firstName + ' ' + lastName

            const changes = { newData, oldData }

            const resp = await updateUser(changes, displayName)

            return resp
        }
    } 


    return (
        <DefaultContainer
            component={
                loading ? 
                <Container className='d-flex justify-content-center align-items-center'>
                    <BigSpinner color='danger' />
                </Container>
                :
                <Container>
                    <Row>
                        <Col>
                            <Breadcrumbs path={breadPath} />
                        </Col>
                    </Row>
                    <Row>
                        <Col className='d-flex justify-content-center'>
                            <UserForm 
                                title='Editar perfil'
                                edit
                                userData={userData}
                                handleSubmit={handleSubmit}
                            />
                        </Col>
                    </Row>
                </Container>
            }
        />
    )
}
