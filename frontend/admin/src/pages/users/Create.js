import React, { useState, useContext, useEffect, useRef } from 'react'

import { 
    Container,
    Row,
    Col,
    Button
} from 'reactstrap'
import * as Yup from 'yup'
import Title from '../../components/form/Title'
import { validateEmail, validatePassword } from '../../validations/user'
import { Form } from '@unform/web'
import FormFields from '../../components/form/FormFields'
import LoadingScreen from '../../components/layout/LoadingScreen'
import DefaultContainer from '../../components/layout/DefaultContainer'
import { useParams, useHistory } from 'react-router-dom'
import { AlertContext } from '../../contexts/AlertContext'


import api from '../../services/api'


export default function Create() {

    const history = useHistory()
    
    const submitRef = useRef()
    const formRef = useRef()

    const { showAlert } = useContext( AlertContext )

    const [ loading, setLoading ] = useState(false)
    
    const userFields = [ 
        { name: 'firstName', type: 'text',  label: 'Nome',   },
        { name: 'lastName',  type: 'text',  label: 'Sobrenome',  },
        { name: 'email',     type: 'email', label: 'Email' }, 
        { name: 'password',  type: 'text',  label: 'Senha' }, 
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

    async function create(data, { reset }) {
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
                                    async value => validateEmail(value)
                                ),
                password: Yup.string()
                                .required()
                                .test(
                                    'Invalid password', 
                                        'Senha inválida! Senha deve conter pelo menos: ' +
                                        '8 caracteres;' + 
                                        '1 letra maiúscula;' + 
                                        '1 letra minúscula;' + 
                                        '1 número;', 
                                    async value => validatePassword(value)
                                ),
            })

            await schema.validate(data, {
                abortEarly: false,
            })

            await api.post('/users', data)
            reset()
            showAlert({ message: 'Usuário inserido com sucesso!', color: 'success'})

        } catch (err) { 
            const validationErrors = {};

            if (err instanceof Yup.ValidationError) {
                err.inner.forEach(error => {
                    validationErrors[error.path] = error.message
                })

                formRef.current.setErrors(validationErrors)
            } else { 
                showAlert({ message: 'Erro ao salvar!', color: 'danger' })
            }
        }

        setLoading(false)
    }


    const buttons = [
        <Button onClick={e => submitRef.current.click()} key='save' color='success'>Salvar</Button>
    ]


    return (
        <DefaultContainer 
            title={'Criar usuário'}
            backAction={() => history.push('/users')}
            buttons={buttons}
        >
            <LoadingScreen loading={loading} />
            <Form 
                ref={formRef}
                onSubmit={create}>
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
                        style={{visibility: 'hidden'}}
                    />
                </Container>
            </Form>
        </DefaultContainer>
    )
}
