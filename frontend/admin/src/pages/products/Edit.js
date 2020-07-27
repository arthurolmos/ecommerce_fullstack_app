import React, { useState, useContext, useEffect, useRef } from 'react'

import {
    Container, 
    Row,
    Col,
    Button
} from 'reactstrap'
import * as Yup from 'yup'
import { validateName } from '../../validations/product'
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

    const { productId } = useParams()

    const history = useHistory()

    const submitRef = useRef()
    const formRef = useRef()

    const { showAlert } = useContext( AlertContext )

    const [ loading, setLoading ] = useState(false)
    const [ categories, setCategories ] = useState([])

    // const [ tag, setTag ] = useState('')
    // const [ tags, setTags ] = useState([])
    const [ mainPicture, setMainPicture ] = useState({})
    const [ pictures, setPictures ] = useState([])


    useEffect(() => { 
        let isSubscribed = true

        async function getAllCategories() { 

            try { 
                const resp = await api.get('/categories')
                const categories = resp.data

                if(isSubscribed)
                    setCategories(categories)

            } catch (err) {
                console.log(err)
            }
        }
        
        getAllCategories()

        return () => isSubscribed = false
    }, [])


    useEffect(() => { 
        let isSubscribed = true

        async function getProduct() {

            setLoading(true)

            try { 
                const resp = await api.get(`/products/${productId}`)
                const product = resp.data

                if(isSubscribed){ 
                    formRef.current.setData({ 
                        name: product && product.name,
                        categoryId: product && { 
                                        value: product.categoryId, 
                                        label: product.category.name 
                                    }, 
                        description: product && product.description,
                        price: product && product.price,
                        stockQuantity: product && product.stockQuantity,
                        available: product && product.available,
                        visible: product &&  product.visible
                    })
                    setMainPicture(product.mainPicture ? product.mainPicture : {})
                    setPictures(product.pictures ? product.pictures : [])
                }

            } catch (err) {
                console.log(err)
            }

            setLoading(false)
        }
        
        getProduct()

        return () => isSubscribed = false
    }, [ productId ])


    const productFields = [
        { name: 'name', type: 'text', label: 'Nome' },
        { name: 'categoryId', type: 'select', options: categories, label: 'Categorias' }, 
        { name: 'description', type: 'textarea', label: 'Descrição' },
        { small: [ 
            { name: 'stockQuantity', type: 'number', label: 'Qtd. Estoque', min: '0', step: '1' },
            { name: 'price', type: 'number', label: 'Preço', min: '0', step: '1'  },
        ]},
        { small: [
            { name: 'available', type: 'checkbox', label: 'Disponível' },
            { name: 'visible', type: 'checkbox', label: 'Visível' },
        ]}
    ]

    const pictureFields = [
        { value: mainPicture, setter: setMainPicture, type: 'singlepicture', name: 'Imagem Principal', },
        { value: pictures, setter: setPictures, type: 'pictures', name: 'Imagens Menores' },
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
                                    'Produto com mesmo nome cadastrado!',
                                    async value => await validateName(value, productId)
                                ),
                categoryId: Yup.number().typeError('Selecione uma categoria!').required('Selecione uma categoria!'),
                price: Yup.number().min(0, 'Valor deve ser maior que 0!'),  
                stockQuantity: Yup.number().min(0, 'Valor deve ser maior que 0!')
            })

            await schema.validate(data, {
                abortEarly: false,
            })

            const picturesId = pictures.map(picture => {
                return picture.id
            })
    
            const form = { 
                ...data,
                mainPictureId: mainPicture.id,
                picturesId
            }

            await api.put(`/products/${productId}`, form)
            showAlert({ message: 'Produto atualizado com sucesso!', color: 'success' })

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
                    await api.delete(`/products/${productId}`) 
                    history.push('/products')
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
        <ButtonStyled onClick={e => submitRef.current.click()} color='success' key='update'>Atualizar</ButtonStyled>,
        <Button onClick={e => destroy(e)} color='danger' key='destroy'>Excluir</Button>
    ]

    return (
        <DefaultContainer 
            title={'Editar produto'}
            backAction={() => history.push('/products')}
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
                            <Title>Produto</Title>
                            <FormFields 
                                fields={productFields}
                            />
                        </Col>
                        <Col>
                            <Title>Imagens</Title>
                            <FormFields 
                                fields={pictureFields}
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