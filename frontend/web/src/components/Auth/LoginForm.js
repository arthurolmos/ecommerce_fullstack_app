import React, { useContext, useState } from 'react'
import {
    Form, 
    FormGroup,
    FormText,
    FormFeedback,
    Input,
    Button,
    Col,
    Spinner,
    Label
} from 'reactstrap'
import { Link } from 'react-router-dom'
import { BigSpinner } from '../Util/Spinners'
import { CommonButton } from '../Util/Buttons'
import { UserContext } from '../../contexts/user-context';
import { ModalContext } from '../../contexts/modal-context';
import styled from 'styled-components'
import { LinkContext } from '../../contexts/link-context'


export default function LoginForm() {
    const { loginWithEmail, loading, error } =  useContext(UserContext)
    const { signupLink } = useContext(LinkContext)

    const [ email, setEmail ] = useState('')
    const [ validEmail, setValidEmail ] = useState(true)
    const [ emailFeedback, setEmailFeedback] = useState('')

    const [ password, setPassword ] = useState('')
    const [ validPassword, setValidPassword ] = useState(true)
    const [ passwordFeedback, setPasswordFeedback] = useState(true)

    const onFormSubmit = async(e) => {
        e.preventDefault()
        window.scrollTo(0, 0)

        if(validForm()){
            const resp = await loginWithEmail(email, password)
        }
    }

    const validForm = () => {
        let valid = true

        if(email === ''){
            valid = false
            setValidEmail(false)
        }

        if(password === ''){
            valid = false
            setValidPassword(false)
        }

        return valid
    }

        
    return (
        loading ? 
            <BigSpinner/>
            :
            <FormStyled>
                <FormTitle>LOGIN</FormTitle>
                <FormGroup >
                    <Label for='email'>Email</Label>
                    <InputStyled
                        type='email' 
                        name='email' 
                        id='email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        invalid={!validEmail}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='password'>Senha</Label>
                    <InputStyled 
                        type='password' 
                        name='password' 
                        id='password'
                        autoComplete='on'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        invalid={!validPassword}
                    />
                </FormGroup>

                <FormGroup>
                        <LinkStyled to='#'>Esqueceu a senha?</LinkStyled>
                </FormGroup>

                <FormGroup row>
                    <Col>
                        <CommonButton 
                            width='100%'
                            color='red'
                            handleClick={e => onFormSubmit(e)}
                            title='Login'>
                        </CommonButton>
                    </Col>
                    <Col>
                        <LinkStyled to={signupLink}>Crie uma conta</LinkStyled>
                    </Col>
                </FormGroup>
            </FormStyled>
    )
}



const FormStyled = styled(Form)`
    box-sizing: border-box;
    // margin: 15px;
    width: 400px;
    
    padding-left: 25px;
    padding-right: 25px;

`

const FormTitle = styled.h2`
    margin-bottom: 15px;
    font-family: Fjalla One, sans-serif;
    text-transform: uppercase;
`

const LoginButton = styled(Button)`
    background: darkred;
    border-radius: 0;

    transition: box-shadow 0.5s linear;

    &:hover{
        background: red;
        box-shadow: none;
    }
`

const ColStyled = styled(Col)`
    display: flex;
    justify-content: flex-end;
`

const InputStyled = styled(Input)`
    border-radius: 0;
`

const LinkStyled = styled(Link)`
    font-size: 12px;
    // text-decoration: none;
    color: black;

    &:hover{
        color: black;
    }
`