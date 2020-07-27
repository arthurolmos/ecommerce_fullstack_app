  import React, { useState, useContext, useEffect } from 'react'
import {
    Form,
    FormGroup,
    FormFeedback,
    Input,
    Label,
    Button,
    Row,
    Col,
    Container
} from 'reactstrap'

import { LinkContext } from '../../contexts/link-context'

import { Link } from 'react-router-dom'

import { BigSpinner } from '../Util/Spinners'
import { CommonButton } from '../Util/Buttons'
import { CpfInput, PhoneInput } from '../Util/Inputs'

import styled from 'styled-components'


export default function UserForm(props) {

    const { title, edit, userData, loading, handleSubmit } = props

    const { loginLink } = useContext(LinkContext)

    const [ firstName, setFirstName ] = useState('')
    const [ validFirstName, setValidFirstName ] = useState(true)

    const [ lastName, setLastName ] = useState('')
    const [ validLastName, setValidLastName ] = useState(true)

    const [ email, setEmail ] = useState('')
    const [ validEmail, setValidEmail ] = useState(true)
    const [ emailFeedback, setEmailFeedback ] = useState('')

    const [ cpf, setCpf ] = useState('')
    const [ validCpf, setValidCpf ] = useState(true)
    const [ cpfFeedback, setCpfFeedback ] = useState('')

    const [ cellphone, setCellphone ] = useState('')
    const [ validCellphone, setValidCellphone ] = useState(true)
    const [ cellphoneFeedback, setCellphoneFeedback ] = useState('')

    const [ password, setPassword ] = useState('')
    const [ validPassword, setValidPassword ] = useState(true)
    const [ passwordFeedback, setPasswordFeedback ] = useState('')

    const [ confirmPassword, setConfirmPassword ] = useState('')
    const [ validConfirmPassword, setValidConfirmPassword ] = useState(true)
    const [ confirmPasswordFeedback, setConfirmPasswordFeedback ] = useState('')

    useEffect(() => {
        if(edit && userData ){
            const { firstName, lastName, email, cpf, cellphone } = userData

            setFirstName(firstName)
            setLastName(lastName)
            setEmail(email)
            setCpf(cpf)
            setCellphone(cellphone)
        }
    }, [ edit, userData ])


    const onFormSubmit = async(e) => {
        e.preventDefault()

        // if(validForm()){
            
            window.scrollTo(0, 0)
            
            const user = {
                email,
                password,
                firstName,
                lastName,
                cellphone,
                cpf
            }

            const resp = await handleSubmit(user)
                
            if(!resp.result){
                const { error } = resp
                console.log('ERRO: ', error)

                if(error.code === 'auth/weak-password'){
                    setPassword('')
                    setConfirmPassword('')
                    setValidPassword(false)
                    setPasswordFeedback('Senha deve possuir pelo menos 6 caracteres!')
                }

                if(error.code === 'auth/email-already-in-use'){
                    setValidEmail(false)
                    setEmailFeedback('Email já cadastrado!')
                }

                if(error.code === 'auth/invalid-email'){
                    setValidEmail(false)
                    setEmailFeedback('Endereço de email inválido!')
                }
            }
        // }    

    }

    const validForm = () => {
        let valid = true

        if(firstName === ''){
            valid = false
            setValidFirstName(false)
        }

        if(lastName === ''){
            valid = false
            setValidLastName(false)
        }

        if(email === ''){
            valid = false
            setValidEmail(false)
        }

        if(cpf === ''){
            valid = false
            setValidCpf(false)
        }

        if(cellphone === ''){
            valid = false
            setValidCellphone(false)
        }

        if(password === ''){
            valid = false
            setValidPassword(false)
        }

        if(confirmPassword === ''){
            valid = false
            setValidConfirmPassword(false)
        }

        if(password !== confirmPassword){
            valid = false
            setConfirmPassword('')
            setValidConfirmPassword(false)

            setConfirmPasswordFeedback('As senhas estão diferentes!')
        }

        return valid

    }


    return (
        loading ? 
            <BigSpinner />
            :
            <FormStyled >
                <FormTitle>{title}</FormTitle>

                <FormGroup>
                    <Label for='firstName'>Nome</Label>
                    <InputStyled 
                        id='firstName' 
                        type='text' 
                        name='firstName' 
                        value={firstName} 
                        onChange={e => {
                            setFirstName(e.target.value)
                            !validFirstName && setValidFirstName(true)
                        }}
                        readOnly={loading ? true : false}
                        invalid={!validFirstName}
                    />
                </FormGroup>

                <FormGroup>
                    <Label for='lastName'>Sobrenome</Label>
                    <InputStyled 
                        id='lastName' 
                        type='text' 
                        name ='lastName' 
                        value={lastName}
                        onChange={e => {
                            setLastName(e.target.value)
                            !validLastName && setValidLastName(true)
                        }}
                        readOnly={loading ? true : false }
                        invalid={!validLastName}
                    />
                </FormGroup>

                <FormGroup>
                    <Label for='email'>Email</Label>
                    <InputStyled 
                        id='email' 
                        type='email' 
                        name ='email' 
                        value={email}
                        onChange={e => {
                            setEmail(e.target.value)
                            !validEmail && setValidEmail(true)
                        }}
                        readOnly={loading ? true : false }
                        invalid={!validEmail}
                        disabled={edit ? true : false}
                    />
                    <FormFeedback>{emailFeedback}</FormFeedback>
                </FormGroup>

                <FormGroup>
                    <Label for='cpf'>CPF</Label>
                    <CpfInput 
                        name='cpf'
                        id='cpf'
                        value={cpf}
                        onChange={e => {
                            setCpf(e.target.value)
                            !validCpf && setValidCpf(true)
                        }}
                        invalid={ !validCpf }
                    />
                    <FormFeedback>CPF inválido!</FormFeedback>
                </FormGroup>

                <FormGroup>
                    <Label for='cellphone'>Celular</Label>
                    <PhoneInput 
                        name='cellphone'
                        id='cellphone'
                        value={cellphone}
                        onChange={e => {
                            setCellphone(e.target.value)
                            !validCellphone && setValidCellphone(true)
                        }}
                        invalid={ !validCellphone }
                    />
                    <FormFeedback>Número inválido!</FormFeedback>
                </FormGroup>

                {!edit && 
                    <>
                        <FormGroup>
                            <Label for='password'>Senha</Label>
                            <InputStyled  
                                id='password' 
                                name ='password' 
                                type='password' 
                                value={password}
                                onChange={e => {
                                    setPassword(e.target.value)
                                    !validPassword && setValidPassword(true)
                                }}
                                readOnly={loading ? true : false }
                                invalid={!validPassword}
                            />
                            <FormFeedback>{passwordFeedback}</FormFeedback>
                        </FormGroup>
                        
                        <FormGroup>
                            <Label for='confirmPassword'>Confirmar senha</Label>
                            <InputStyled  
                                id='confirmPassword' 
                                name ='confirmPassword' 
                                type='password' 
                                value={confirmPassword}
                                onChange={e => {
                                    setConfirmPassword(e.target.value)
                                    !validConfirmPassword && setValidConfirmPassword(true)
                                }}
                                readOnly={loading ? true : false }
                                invalid={!validConfirmPassword}
                            />
                            <FormFeedback>{confirmPasswordFeedback}</FormFeedback>
                        </FormGroup>                    
                    </>
                }
                
                <FormGroup row>
                    <Col>
                        <CommonButton 
                            width='100%'
                            color='black' 
                            handleClick={e => onFormSubmit(e)}
                            title={edit ? 'Atualizar' : 'Cadastrar'}
                        />
                    </Col>
                    {!edit && 
                        <Col>
                            <LinkStyled to={loginLink}>Entre com uma conta já existente</LinkStyled>
                        </Col>
                    }
                </FormGroup>
            </FormStyled>
    )
}


const FormStyled = styled(Form)`
    // margin: 15px;
    max-width: 400px;
    box-sizing: border-box;

    // padding-left: 25px;
    // padding-right: 25px;
`
const FormTitle = styled.h2`
    margin-bottom: 15px;
    font-family: Fjalla One, sans-serif;
    text-transform: uppercase;
`

const InputStyled = styled(Input)`
    border-radius: 0;
`

const ButtonStyled = styled(Button)`
    border-radius: 0;
    background: darkred;
    color: white;
    text-transform: uppercase;

    &:hover{
        background: red;
    }
`


const LinkStyled = styled(Link)`
    font-size: 12px;
    // text-decoration: none;
    color: black;

    &:hover{
        color: black;
    }
`