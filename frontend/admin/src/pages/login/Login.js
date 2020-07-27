import React, { useState, useContext } from 'react'

import { 
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Button,
    Spinner
} from 'reactstrap'

import Auth from '../../services/Auth'
import api from '../../services/api'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'


export default function Login() {

    const [ loading, setLoading ] = useState(false)

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const history = useHistory()


    async function onSubmit(e) { 
        e.preventDefault()

        try { 
            setLoading(true)

            const resp = await api.post('/login', { email, password })
            new Auth().setLocalStorage(resp.data.jwt)

            setLoading(false)
            return history.push('/')

        } catch (err) { 
            console.log(err)
            setLoading(false)
            return { result: false, error: err }
        }
    }


    return (
        <ContainerStyled fluid>
            {loading ? 
                <Spinner />
                :
                <FormContainerStyled>
                    <RowStyled>
                        <ColStyled>
                            <h1>LOGIN</h1>
                        </ColStyled>
                    </RowStyled>
                    <Row>
                        <Col>
                            <Form onSubmit={e => onSubmit(e)}>
                                <FormGroup>
                                    <Label>Email</Label>
                                    <Input 
                                        id='email'
                                        name='email'
                                        type='email'
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label>Senha</Label>
                                    <Input 
                                        id='password'
                                        name='password'
                                        type='password'
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Button color={'primary'}>ENTRAR</Button>
                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>
                </FormContainerStyled>
            }
        </ContainerStyled>
    )
}


const ContainerStyled = styled(Container)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
`

const FormContainerStyled = styled(Container)`
    width: 300px;
    height: 400px;
    background: lightgray;
`

const ColStyled = styled(Col)`
    display: flex;
    justify-content: center;
    align-items: center;
`

const RowStyled = styled(Row)`
    margin-top: 25px;
    margin-bottom: 25px;
`