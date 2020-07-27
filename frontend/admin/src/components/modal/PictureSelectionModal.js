import React, { useState, useEffect } from 'react'
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Media,
    Container,
    Row,
    Col,
    Input,
    Spinner
} from 'reactstrap'
import ImageUploader from 'react-images-upload'
import api from '../../services/api'
import styled, { css } from 'styled-components'


export default function UploadModal(props) {

    const { title, selected, modal, toggle, multiple, action } = props

    const [ loading, setLoading ] = useState(false)
    const [ filter, setFilter ] = useState('')
    const [ pictures, setPictures ] = useState([])
    const [ selection, setSelection ] = useState([])

    useEffect(() => {
        if(modal)
            if(multiple)
                setSelection(selected)
            else
                setSelection([selected])

    }, [ modal, selected, multiple ])


    useEffect(() => { 
        let isSubscribed = true

        async function getAllPictures() {
            setLoading(true)

            try { 
                const resp = await api.get('/pictures')
                const pictures = resp.data
    
                if(isSubscribed)
                    setPictures(pictures)
    
            } catch(err) { 
                console.log('ERROR!', err)
            }
           
            setLoading(false)
        }
        
        if(modal)
            getAllPictures()

        return () => isSubscribed = false
    }, [ modal ])


    function handleConfirm() { 

        if(selection.length > 0) { 
            multiple ? action(selection) : action(selection[0])
        } else {
            multiple ? action([]) : action({})
        }

        toggle()
        return setSelection([])
    }


    function handleCancel(){ 
        toggle()
        return setSelection([]) 
    }


    function isSelected(id) { 
        const found = selection.find(item => item.id === id)
        return found ? true : false
    }


    function toggleSelection(picture) { 
        const index = selection.findIndex(item => item.id === picture.id)

        if(index !== -1) { 
            const newArray = [ ...selection ]
            newArray.splice(index, 1)

            setSelection(newArray)

        } else { 
            multiple ? setSelection([ ...selection, picture ]) : setSelection([picture])
        }
    }


    async function onDrop(file) { 
        setLoading(true)

        try { 
            const data = new FormData()
            data.append('name', file[0].name)
            data.append('img', file[0])

            const resp = await api.post('/pictures/products', data)
            const picture = resp.data

            setPictures([ picture,  ...pictures ])

        } catch(err) { 
            console.log('Error on upload!', err)
        }

        setLoading(false)
        
    }

    const createThumbnails = pictures.map(picture => { 

        if(!picture.name.toLowerCase().match(filter.toLowerCase())) return null

        const { id, url } = picture

        const formattedUrl = 'http://localhost:3333' + url

        return(
            <ContainerMediaStyled
                key={id}
                onClick={() => toggleSelection(picture)}
                selected={isSelected(id)}
            >
                <MediaStyled src={formattedUrl} onError={() => console.log('Picture not found')}/>
            </ContainerMediaStyled>
        )   

    }, [ pictures ])



    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader>
                {title}
            </ModalHeader>
            <ModalBody>
                <RowStyled>
                    <ColFilterStyled>
                        Procurar por nome: 
                        <InputStyled 
                            placeholder='Search'
                            value={filter}
                            onChange={e => setFilter(e.target.value)}
                        />
                    </ColFilterStyled>
                </RowStyled>
                <Row>
                    <Col>
                        {loading ? 
                            <div style={{
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                height: '200px'
                            }}>
                                <Spinner />
                            </div>
                            :
                            <ContainerGridStyled>
                                {createThumbnails}  
                            </ContainerGridStyled>
                        }
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ContainerUploadStyled>
                            <ImageUploader
                                withIcon={true}
                                buttonText='Choose images'
                                onChange={onDrop}
                                imgExtension={['.jpg', '.gif', '.png' ]}
                                maxFileSize={5242880}
                                singleImage={true}
                            />
                        </ContainerUploadStyled>
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button onClick={() => handleConfirm()} color='success'>Confirmar</Button>    
                <Button onClick={() => handleCancel()} color='danger'>Cancelar</Button>    
            </ModalFooter>            
        </Modal>
    )
}


const RowStyled = styled(Col)`
    margin-bottom: ;
`

const InputStyled = styled(Input)`
    &::before {
        content: '◀';
        margin: 0 10px;
    }

    background-color: transparent;
    border: none;
    border-bottom: 1px solid #CCC;
    border-radius: 0;
    color: #555;
    box-sizing: border-box;
    max-width: 200px;
    margin-left: 15px;
    padding: 0;

    &:focus {
        outline: none;  
        box-shadow: none;
    }
`

const ColFilterStyled = styled(Col)`
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-end;
    align-items: center;
`

const ContainerUploadStyled = styled(Container)`
    display: flex;
    justify-content: center;
    align-items: center;
    background: lightgray;
    height: 200px;
`

const MediaStyled = styled(Media)`
    width: 120px;
    height: 120px;

    display: inline-block;

    margin: 0;
    padding: 0;

    &:hover { 
        opacity: .8;
    }
`

const ContainerGridStyled = styled(Container)`
    display: inline-grid;
    gap: 5px;
    grid-template-columns: repeat(auto-fit, minmax(130px, auto));
    justify-content: center;
    align-items: center;
    overflow: auto;
    max-height: 400px;
`       

const ContainerMediaStyled = styled(Container)`
    display: flex;
    margin: 0;
    padding: 0;
    justify-content: center;
    align-items: center;
    width: 130px;
    height: 130px;
    
    border: 3px solid transparent;
    cursor: pointer;

    ${props => props.selected && css`
        border: 3px solid lightgreen;
    `}
`