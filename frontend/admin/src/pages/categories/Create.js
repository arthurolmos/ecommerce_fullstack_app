import React, { useState, useContext, useEffect, useRef } from 'react'

import { 
    Container,
    Row,
    Col,
    Button
} from 'reactstrap'
import * as Yup from 'yup'
import Title from '../../components/form/Title'
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
    
    const categoryFields = [ 
        { name: 'name', type: 'text',  label: 'Nome',   },
        { name: 'description',  type: 'textarea',  label: 'Descrição',  },
    ]

    async function create(data, { reset }) {
        try { 
            formRef.current.setErrors({})

            setLoading(true)

            const schema = Yup.object().shape({
                name: Yup.string()
                                .required('Preencha o nome corretamente!')
                                // .test(
                                //     'Same email', 
                                //     'Email já cadastrado!',
                                //     async value => console.log()
                                // ),
            })

            await schema.validate(data, {
                abortEarly: false,
            })

            await api.post('/categories', data)
            reset()
            showAlert({ message: 'Categoria inserida com sucesso!', color: 'success'})

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
            title={'Criar categoria'}
            backAction={() => history.push('/categories')}
            buttons={buttons}
        >
            <LoadingScreen loading={loading} />
            <Form 
                ref={formRef}
                onSubmit={create}
            >
                <FormFields 
                    fields={categoryFields}
                />
                <button 
                    ref={submitRef} 
                    type='submit' 
                    style={{visibility: 'hidden'}}
                />
            </Form>
        </DefaultContainer>
    )
}
