import React, { useState, useContext, useEffect, useRef } from 'react'

import { 
    Container,
    Row,
    Col,
    Button
} from 'reactstrap'
import * as Yup from 'yup'
import Title from '../../components/form/Title'
import { validateName } from '../../validations/product'
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


    async function create(data, { reset }) { 
        try { 
            formRef.current.setErrors({})

            const picturesId = pictures.map(picture => {
                return picture.id
            })

            const form = { 
                ...data,
                mainPictureId: mainPicture.id,
                picturesId
            }

            setLoading(true)

            const schema = Yup.object().shape({
                name: Yup.string()
                                .required('Preencha o nome corretamente!')
                                .test(
                                    'Same name', 
                                    'Produto com mesmo nome cadastrado!',
                                    async value => await validateName(value)
                                ),
                categoryId: Yup.number().typeError('Selecione uma categoria!').required('Selecione uma categoria!'),
                price: Yup.number().min(0, 'Valor deve ser maior que 0!'),  
                stockQuantity: Yup.number().min(0, 'Valor deve ser maior que 0!')
            })

            await schema.validate(data, {
                abortEarly: false,
            })

            await api.post('/products', form)
            reset()
            formRef.current.setData({ 
                    available: true, 
                    visible: true, 
                    price: 0, 
                    stockQuantity: 0,
                })
            setMainPicture({})
            setPictures([])
            showAlert({ message: 'Produto criado com sucesso!', color: 'success' })

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
        <Button onClick={e => submitRef.current.click()} color='success' key='save'>Salvar</Button>
    ]


    return (
        <DefaultContainer 
            title={'Criar produto'}
            backAction={() => history.push('/products')}
            loading={loading}
            buttons={buttons}
        >
            <LoadingScreen loading={loading} />
            <Form 
                initialData={{ 
                    available: true, 
                    visible: true,
                    price: 0, 
                    stockQuantity: 0 
                }}
                ref={formRef}
                onSubmit={create}>
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
                        style={{visibility: 'hidden'}}
                    />
                </Container>
            </Form>
        </DefaultContainer>
    )
}
