import React, { useState, useContext, useEffect, useRef } from 'react'

import {
    Container, 
    Row,
    Col,
    Button
} from 'reactstrap'
import * as Yup from 'yup'
import { validateName } from '../../components/form/validations/category'
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
    const { categoryId } = useParams()
    const submitRef = useRef()
    const formRef = useRef()
    const { showAlert } = useContext( AlertContext )
    const [ loading, setLoading ] = useState(false)


    useEffect(() => { 
        let isSubscribed = true

        async function getCategory() {
            
            setLoading(true)

            try { 
                const resp = await api.get(`/categories/${categoryId}`)
                const category = resp.data

                if(isSubscribed) { 
                    formRef.current.setData({
                        name: category && category.name,                       
                        description: category && category.description,
                    })
                }

            } catch (err) {
                console.log(err)
            }

            setLoading(false)
        }
        
        getCategory()

        return () => isSubscribed = false
    }, [ categoryId ])

    const categoryFields = [ 
        { name: 'name', type: 'text',  label: 'Nome',   },
        { name: 'description',  type: 'text',  label: 'Descrição',  },
    ]


    async function update(data) {
        try { 
            formRef.current.setErrors({})

            setLoading(true)

            const schema = Yup.object().shape({
                name: Yup.string()
                                .required('Preencha o nome corretamente!')
                                .test(
                                    'Same name', 
                                    'Categoria com mesmo nome já cadastrado!',
                                    async value => validateName(value)
                                ),
            })

            await schema.validate(data, {
                abortEarly: false,
            })

            console.log(data)

            await api.put(`/categories/${categoryId}`, data)
            showAlert({ message: 'Categoria atualizada com sucesso!', color: 'success'})

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
                    await api.delete(`/categories/${categoryId}`) 
                    history.push('/categories')
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
            title={'Editar categoria'}
            backAction={() => history.push('/categories')}
            buttons={buttons}
        >
            <LoadingScreen loading={loading} />
            <Form 
                ref={formRef}
                onSubmit={update}
            >
                <FormFields 
                    fields={categoryFields}
                />
                <button 
                    ref={submitRef} 
                    type='submit' 
                    style={{visibility: 'hidden'
                }} />
            </Form>
        </DefaultContainer>
    )
}


const ButtonStyled = styled(Button)`
    margin-right: 10px;
`

