import React, { useState, useMemo, useContext, useEffect, useRef } from 'react'

import { 
    Container,
    Row,
    Col,
    Button,
    Media
} from 'reactstrap'
import * as Yup from 'yup'
import Title from '../../components/form/Title'
import { Form } from '@unform/web'
import FormFields from '../../components/form/FormFields'
import LoadingScreen from '../../components/layout/LoadingScreen'
import DefaultContainer from '../../components/layout/DefaultContainer'
import { useParams, useHistory } from 'react-router-dom'
import { AlertContext } from '../../contexts/AlertContext'
import ImageUploader from 'react-images-upload'
import styled from 'styled-components'
import api from '../../services/api'


export default function Create() {

    const history = useHistory()
    
    const submitRef = useRef()
    const formRef = useRef()

    const { showAlert } = useContext( AlertContext )

    const [ loading, setLoading ] = useState(false)
    // const [ categories, setCategories ] = useState([])
    const [ picture, setPicture ] = useState(null)

    // useEffect(() => { 
    //     let isSubscribed = true

    //     async function getAllCategories() { 

    //         try { 
    //             const resp = await api.get('/categories')
    //             const categories = resp.data

    //             if(isSubscribed)
    //                 setCategories(categories)

    //         } catch (err) {
    //             console.log(err)
    //         }
    //     }
        
    //     getAllCategories()

    //     return () => isSubscribed = false
    // }, [])

    const preview = useMemo(() => { 
        return picture ? URL.createObjectURL(picture) : null
    }, [ picture ])
    
    const categories = [ 
        { id: 0, name: 'Produtos', url: 'products'},
        { id: 1, name: 'Carrossel', url: 'carousel'}
    ]

    const formFields = [ 
        { name: 'name', type: 'text',  label: 'Nome',   },
        { name: 'categoryId',  type: 'select',  options: categories, label: 'Categoria',  },
        { name: 'description',  type: 'textarea',  label: 'Descrição',  },
        // { name: 'filePath',  type: 'text',  label: 'Caminho',  },
        // { name: 'url',  type: 'text',  label: 'URL',  },
    ]

    async function create(data, { reset }) {
        try { 
            formRef.current.setErrors({})

            setLoading(true)

            // const schema = Yup.object().shape({
            //     name: Yup.string()
            //                     .required('Preencha o nome corretamente!')
            //                     // .test(
            //                     //     'Same email', 
            //                     //     'Email já cadastrado!',
            //                     //     async value => console.log()
            //                     // ),
            // })

            // await schema.validate(data, {
            //     abortEarly: false,
            // })

            const category = categories[data.categoryId]

            const formData = new FormData()
            formData.append('name', data.name)
            formData.append('img', picture)

            console.log('FORN', formData)
            await api.post(`/pictures/${category.url}`, formData)
            reset()
            setPicture(null)
            showAlert({ message: 'Imagem inserida com sucesso!', color: 'success'})

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
            title={'Criar imagem'}
            backAction={() => history.push('/pictures')}
            buttons={buttons}
        >
            <LoadingScreen loading={loading} />
            <Form 
               ref={formRef}
               onSubmit={create}
               enctype='multipart/form-data'
           >
                <Row>
                    <Col>
                        <FormFields 
                            fields={formFields}
                        />
                        <button 
                            ref={submitRef} 
                            type='submit' 
                            style={{visibility: 'hidden'}}
                        />
                    </Col>
                    <Col>
                        <label>Imagem</label>
                        {picture ? 
                            <MainPictureContainerStyled
                                onClick={()=> setPicture(null)}
                            >
                                <MediaStyled src={preview} />
                            </MainPictureContainerStyled>
                            :
                            <ImageUploader
                                withIcon={true}
                                buttonText='Choose images'
                                onChange={file => setPicture(file[0])}
                                imgExtension={['.jpg', '.gif', '.png' ]}
                                maxFileSize={5242880}
                                singleImage={true}
                            />
                        }
                    </Col>
                </Row>
            </Form>
        </DefaultContainer>
    )
}



const MediaStyled = styled(Media)`
  width: 150px;
  height: 150px;
  box-sizing: border-box;

  cursor: pointer;
  
  &:hover { 
      opacity: .8;
  }
`

const MainPictureContainerStyled = styled(Container)`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  box-sizing: border-box;

`