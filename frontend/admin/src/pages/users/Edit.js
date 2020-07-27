import React, { useState, useContext, useEffect, useRef } from 'react'

import {
    Container, 
    Row,
    Col,
    Button
} from 'reactstrap'
import * as Yup from 'yup'
import { validateEmail, validatePassword } from '../../validations/user'
import Title from '../../components/form/Title'
import { Form } from '@unform/web'
import LoadingScreen from '../../components/layout/LoadingScreen'
import FormFields from '../../components/form/FormFields'
import DefaultContainer from '../../components/layout/DefaultContainer'
import { useParams, useHistory } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { AlertContext } from '../../contexts/AlertContext'
import styled from 'styled-components'

import api from '../../services/api'


export default function Edit() {

    const history = useHistory()
    const { userId } = useParams()
    const submitRef = useRef()
    const formRef = useRef()
    const { showAlert } = useContext( AlertContext )
    const [ loading, setLoading ] = useState(false)


    useEffect(() => { 
        let isSubscribed = true

        async function getUser() {
            
            setLoading(true)

            try { 
                const resp = await api.get(`/users/${userId}`)
                const user = resp.data

                if(isSubscribed) { 
                    formRef.current.setData({
                        firstName: user && user.firstName,                       
                        lastName: user && user.lastName,
                        email: user && user.email, 
                        // password: user && user.password,
                        cpf: user && user.cpf,
                        phone: user && user.phone,
                        
                        street: user.address && user.address.street,          
                        number: user.address && user.address.number,     
                        complement: user.address && user.address.complement, 
                        neighborhood: user.address && user.address.neighborhood,   
                        city: user.address && user.address.city,            
                        state: user.address && user.address.state,      
                        zipCode: user.address && user.address.zipCode   
                    })
                }

            } catch (err) {
                console.log(err)
            }

            setLoading(false)
        }
        
        getUser()

        return () => isSubscribed = false
    }, [ userId ])

    const userFields = [ 
        { name: 'firstName', type: 'text',  label: 'Nome',   },
        { name: 'lastName',  type: 'text',  label: 'Sobrenome',  },
        { name: 'email',     type: 'email', label: 'Email', }, 
        // { name: 'password',  type: 'text',  label: 'Senha' }, 
        { name: 'cpf',       type: 'text',  label: 'CPF' }, 
        { name: 'phone',     type: 'text',  label: 'Telefone',  },
    ]

    const addressFields = [
        { name: 'street',         type:'String', label: 'Rua' },
        { small: [
            { name: 'number',     type:'String', label: 'Numero' },
            { name: 'complement', type:'String', label: 'Complemento' }
        ]},
        { name: 'neighborhood',   type:'String', label: 'Bairro'},
        { name: 'city',           type:'String', label: 'Cidade' },
        { small: [
            { name: 'state',      type:'String', label: 'UF' },
            { name: 'zipCode',    type:'String', label: 'CEP' }
        ]},
    ]

    async function update(data) {
        try { 
            formRef.current.setErrors({})

            setLoading(true)

            const schema = Yup.object().shape({
                firstName: Yup.string().required('Preencha o nome corretamente!'),
                lastName: Yup.string().required('Preencha o sobrenome corretamente!'),
                email: Yup.string()
                                .email()
                                .required('Preencha o email corretamente!')
                                .test(
                                    'Same email', 
                                    'Email já cadastrado!',
                                    async value => validateEmail(value, userId)
                                ),
            })

            await schema.validate(data, {
                abortEarly: false,
            })

            console.log(data)

            await api.put(`/users/${userId}`, data)
            showAlert({ message: 'Usuário atualizado com sucesso!', color: 'success'})

        } catch (err) { 
            const validationErrors = {};

            if (err instanceof Yup.ValidationError) {
                err.inner.forEach(error => {
                    validationErrors[error.path] = error.message
                })

                formRef.current.setErrors(validationErrors)
            } else { 
                showAlert({ message: 'Erro ao atualizar!', color: 'danger' })
            }
        }
        setLoading(false)
    }

    async function destroy(e) { 
        e.preventDefault()

        confirmAlert({
            title: 'Excluir',
            message: 'Deseja confirmar a exclusão?',
            buttons: [
              {
                label: 'Sim',
                onClick: async() => { 
                    await api.delete(`/users/${userId}`) 
                    history.push('/users')
                }
              },
              {
                label: 'Não',
                onClick: () => { return }
              }
            ]
        });
    }


    const buttons = [
        <ButtonStyled onClick={e => submitRef.current.click()} key='update' color='success' >Atualizar</ButtonStyled>,
        <Button key='destroy' color='danger' onClick={e => destroy(e)}>Excluir</Button>,
    ]


    return (
        <DefaultContainer 
            title={'Editar usuário'}
            backAction={() => history.push('/users')}
            buttons={buttons}
        >
            <LoadingScreen loading={loading} />
            <Form 
                ref={formRef}
                onSubmit={update}
            >
                <Container>
                    <Row>
                        <Col>
                            <Title>Dados Pessoais</Title>
                            <FormFields 
                                fields={userFields}
                            />
                        </Col>
                        <Col>
                            <Title>Endereço</Title>
                            <FormFields 
                                fields={addressFields}
                            />
                        </Col>
                    </Row>
                    <button 
                        ref={submitRef} 
                        type='submit' 
                        style={{visibility: 'hidden'
                    }} />
                </Container>
            </Form>
        </DefaultContainer>
    )
}


const ButtonStyled = styled(Button)`
    margin-right: 10px;
`

