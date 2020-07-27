import React, { useState, useMemo, useEffect, useRef } from 'react'
import { 
    Form,
    Input,
    FormGroup,
    Col,
    Label,
    Row,
    Table,
    Container
} from 'reactstrap'
import { CommonButton } from '../../Util/Buttons'
import { DefaultAlert } from '../../Util/Alerts'
import { ThumbsSmallPanel } from '../../Util/Thumbs'
import { CurrencyInput, NumberInput, DefaultInput } from '../../Util/Inputs'
import styled from 'styled-components'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faCopy } from '@fortawesome/free-solid-svg-icons'



export default function ProductForm(props) {

    const { formAction, prod } = props

    const [ category, setCategory ] = useState(prod ? prod.category : '')
    const [ validCategory, setValidCategory ] = useState(true)

    const [ types, setTypes ] = useState([])
    const [ type, setType ] = useState(prod ? prod.type : '')
    const [ validType, setValidType ] = useState(true)

    const [ name, setName ] = useState(prod ? prod.name : '')
    const [ validName, setValidName ] = useState(true)

    const [ info, setInfo ] = useState(prod ? prod.info : '')
    const [ validInfo, setValidInfo ] = useState(true)
    
    const [ price, setPrice ] = useState(prod ? prod.price : '')
    const [ validPrice, setValidPrice ] = useState(true)

    const [ stock, setStock ] = useState(0)
    const [ validStock, setValidStock ] = useState(true)

    //Optional Fields
    const [ models, setModels ] = useState([])

    const [ modelStock, setModelStock ] = useState(0)
    const [ validModelStock, setValidModelStock ] = useState(true)

    const [ size, setSize ] = useState('')
    const [ validSize, setValidSize ] = useState(true)

    const [ color, setColor ] = useState('')
    const [ validColor, setValidColor ] = useState(true)

    const [ priceIncrement, setPriceIncrement ] = useState(0)
    const [ validPriceIncrement, setValidPriceIncrement ] = useState(true)

    const [ customs, setCustoms ] = useState([])
    const [ hasCustom, setHasCustom ] = useState(false)


    //Images Fields
    const [ images, setImages ] = useState([])
    const [ validImages, setValidImages ] = useState(true)

    const [ thumbnail, setThumbnail ] = useState(null)
    const [ validThumbnail, setValidThumbnail ] = useState(true)
    const [ thumbIndex, setThumbIndex ] = useState(0)

    const [ alert, setAlert ] = useState({color: '', text: '', open: false})
    

    const handleSubmit = (e, opt) => {

        e.preventDefault()

        window.scrollTo(0, 0)

        if (validForm()){
            const product = {

                category: category, 
                type: type,

                name: name,
                info: info, 

                price: price,
                stock: stock,

                images: images,
                thumbIndex: thumbIndex,

                models: models,
            }

            formAction(product, opt)
        }
    }

    const validForm = () => {
        let valid = true

        if(!category || category.size === 0){
            setValidCategory(false)
            valid = false
        }

        if(type === ''){
            setValidType(false)
            valid = false
        }

        if(name === ''){
            setValidName(false)
            valid = false
        }

        if(info === ''){
            setValidInfo(false)
            valid = false
        }
            
        if(price === ''){
            setValidPrice(false)
            valid = false
        }

        if(stock === ''){
            setValidStock(false)
            valid = false
        }

        if(images.length <= 0 ){
            setValidThumbnail(false)
            valid = false
        }

        return valid
    }

    //Custom Fields Function 
    //Funções relacionadas ao painel de itens customizados
    const validCustomFields = () => {
        let valid = true

        if(size === ''){
            setValidSize(false)
            valid = false
        }
            
        if(color === ''){
            setValidColor(false)
            valid = false
        }

        if(modelStock === ''){
            setValidModelStock(false)
            valid = false
        }

        if(priceIncrement === ''){
            setValidPriceIncrement(false)
            valid = false
        }

        return valid
    }
    
    const clearCustomFields = () => {
        setSize('')
        setModelStock(0)
        setColor('')
        setPriceIncrement(0)
    }

    //Organizar a lista de customs
    const sortCustoms = (temp) => {

        temp.sort((a, b) => {
            const aSize = a.size;
            const bSize = b.size;
            const aColor = a.color;
            const bColor = b.color;

            if(aSize == bSize)
            {
                return (aColor < bColor) ? -1 : (aColor > bColor) ? 1 : 0;
            }
            else
            {
                return (aSize < bSize) ? -1 : 1;
            }
        })

        return temp
    }


    const addCustom = () => {
        if(validCustomFields()){
            const temp = [...customs]

            //Valida se já existe chave do custom
            if(!temp.find(m => m.id === size+color)){
                const custom = {
                    id: size + color,
                    size: size,
                    color: color,
                    modelStock: modelStock,
                    priceIncrement: priceIncrement
                }
        
                temp.push(custom)
                const ordered = sortCustoms(temp)
        
                setCustoms(ordered)
                
                clearCustomFields()
            }
        }
    }

    const removeCustom = (custom) => {
        const temp = [...customs]

        const filtered = temp.filter(c => c.id !== custom.id)

        setCustoms(filtered)
    }

    const copyCustom = (custom) => {
        const temp = [...customs]

        const filtered = temp.find(c => c.id === custom.id)
        const { priceIncrement, modelStock, color, size } = filtered
        
        setPrice(priceIncrement)
        setModelStock(modelStock)
        setColor(color)
        setSize(size)
    }

    const customList = customs.map((custom, index) => {

        const { id, size, modelStock, priceIncrement, color } = custom

        return (
            <tr key={id}>
                <th scope="row">{index + 1}</th>
                <td>{size}</td>
                <td>{color}</td>
                <td>{modelStock}</td>
                <td>{priceIncrement}</td>
                <td>
                    <FontAwesomeIconStyled icon={faCopy} onClick={() => copyCustom(custom)}/>
                </td>
                <td>
                    <FontAwesomeIconStyled icon={faTrash} onClick={() => removeCustom(custom)} />
                </td>
            </tr>
        )
    })

    //Category and Type
    //TODO: passar para o DB?
    useEffect(() => {
        if(category === 'Acessorios')
            setTypes(accessoriesTypes)

        else if(category === 'Roupas')
            setTypes(clothesTypes)
           
        else if(category === 'Decoração')
            setTypes(decorationTypes)
    }, [category])

    const typeOptions = types ? types.map(t => {
        return <option key={t}>{t}</option>
    }) : null

    const accessoriesTypes = ['Brinco', 'Pulseira', 'Colar']
    const clothesTypes = ['Saia', 'Shorts', 'Meias']
    const decorationTypes = ['Tapete', 'Almofada']


    /***** IMAGES ****/
    //Tratamento das images antes de enviar para o componente ThumbsSmallPanel
    const handleImagesUpload = (values) => {
        const files = Array.from(values)
        console.log(files)

        if(files.length > 0){
            let temp = [...images]
            console.log(temp)

            while(files.length > 4) //Se subirem mais de 4 arquivos, corta para ficar só as 4 primeiras
                files.pop()

            for(let i=0; i < files.length && temp.length < 4; i++){ //corta para ficar só 4 imagens

                let img = files[i]
                console.log(img)

                if(validImageExtension(img)){
                    const obj = {
                        name: img.name,
                        thumbnailUrl: URL.createObjectURL(img),
                        image: img
                    }

                    temp.push(obj)
                }
            }

            setImages(temp)
        }
    }

    const validImageExtension = (image) => {

        if(image){
            const ext = image.name.split('.').pop()
            console.log(ext)

            switch (ext) {
                case 'jpg':
                case 'jpeg':
                case 'bmp':
                case 'png':
                case 'tif':
                    return true
                
                default:
                    setAlert({
                        color: 'danger',
                        text: 'Extensão incorreta!',
                        open: true
                    })
                    return false
            }
        }
    }   

    const deleteThumbnail = (index) => {
        const imgs = [...images]
        const remove = imgs[index]

        const filtered = imgs.filter(t => t !== remove)

        setImages(filtered)

        if (thumbIndex === index || filtered.length === 0)
            setThumbIndex(0)

        else if (thumbIndex > index)
            setThumbIndex(thumbIndex - 1)
    }

    //Efeito para atualizar a thumbnail quando atualizar o valor de active
    useEffect(() => {

        const index = images.length > 0 && images[thumbIndex] ? images[thumbIndex] : null
        
        setThumbnail(index)

    }, [ thumbIndex, images ])

    const inputThumbsRef = useRef()
    const openFilesDialog = () => {
        console.log(inputThumbsRef.current)
        inputThumbsRef.current.click()
    }


    return (
        <>
        <DefaultAlert 
            color={alert.color}
            text={alert.text}
            open={alert.open}
        />

        <FormStyled>
            <FormGroup row>
                <Col className='mb-5'>
                    <FormGroup>
                        <Label for='category'>Categoria</Label>
                        <DefaultInput 
                            id='category'
                            name='category'
                            type='select'
                            value={category}
                            onChange={e => {setCategory(e.target.value)
                                            if(!validCategory)
                                                setValidCategory(true)
                                    }}
                            invalid={!validCategory}
                        >   
                            <option value='' key='select'>Selecione...</option>
                            <option key='Acessorios'>Acessorios</option>
                            <option key='Roupas'>Roupas</option>
                            <option key='Decoração'>Decoração</option>
                        </DefaultInput>
                    </FormGroup>

                    <FormGroup>
                        <Label for='type'>Tipo</Label>
                        <DefaultInput 
                            id='type'
                            name='type'
                            type='select'
                            value={type}
                            onChange={e => {setType(e.target.value)
                                            if(!validType)
                                                setValidType(true)
                                    }}
                            invalid={!validType}
                        >
                            <option value='' key='select'>Selecione...</option>
                            {typeOptions}
                        </DefaultInput>   
                    </FormGroup>

                    <FormGroup>
                        <Label for='name'>Nome</Label>
                        <DefaultInput 
                            id='name'
                            name='name'
                            type='text'
                            value={name}
                            onChange={e => {setName(e.target.value)
                                            if(!validName)
                                                setValidName(true)
                                    }}
                            invalid={!validName}
                        />                    
                    </FormGroup>

                    <FormGroup>
                        <Label for='info'>Detalhes</Label>
                        <DefaultInput 
                            id='info'
                            name='info'
                            type='textarea'
                            value={info}
                            onChange={e => {setInfo(e.target.value)
                                            if(!validInfo)
                                                setValidInfo(true)
                                    }}
                            invalid={!validInfo}/>                    
                    </FormGroup>

                    <FormGroup>
                        <Label for='price'>Preço</Label>
                        <CurrencyInput
                            id='price'
                            name='price'
                            maxLength='9'
                            value={price}
                            invalid={!validPrice}

                            handleChange={value => {
                                setPrice(value)
                                                
                                if(!validPrice)
                                    setValidPrice(true)
                            }}
                        />     
                    </FormGroup>

                    {hasCustom ? 
                        null
                        :
                        <FormGroup>
                            <Label for='stock'>Estoque</Label>
                            <NumberInput
                                id='stock'
                                name='stock'
                                maxLength='4'
                                value={hasCustom ? 0 : stock}
                                onChange={e => {
                                            setStock(e.target.value)
                                            if(!validStock)
                                                setValidStock(true)
                                        }}
                                invalid={!validStock}
                            /> 
                        </FormGroup>      
                    }

                    <FormGroup check inline>
                        <Label check>
                            <DefaultInput
                                id='hasCustom'
                                name='hasCustom'
                                title='Customizado?'
                                type='checkbox'
                                value={hasCustom}
                                onClick={() => {
                                    setHasCustom(!hasCustom)
                                    setStock(0)
                                }}
                            />
                            Possui customizações?
                        </Label>
                    </FormGroup>

                    {hasCustom && 
                        <>
                            <FormGroup row className='mt-5'>
                                <Col>
                                    <FormTitleStyled>Customizados</FormTitleStyled>
                                </Col>
                                <Col className='d-flex justify-content-center'>
                                    <CommonButton
                                        color='red'
                                        title='+ Adicionar'
                                        handleClick={() => addCustom()}
                                    />
                                </Col>

                            </FormGroup>

                            <FormGroup row className='d-flex justify-content-between'>
                                <Col>
                                    <Label for='size'>Tamanho</Label>
                                    <DefaultInput 
                                        id='size'
                                        name='size'
                                        type='text'
                                        value={size}
                                        onChange={e => {setSize(e.target.value)
                                                        if(!validSize)
                                                            setValidSize(true)
                                                }}
                                        invalid={!validSize}/> 
                                </Col>

                                <Col>
                                    <Label for='color'>Cor</Label>
                                    <DefaultInput 
                                        id='color'
                                        name='color'
                                        type='text'
                                        value={color}
                                        onChange={e => {setColor(e.target.value)
                                                        if(!validColor)
                                                            setValidColor(true)
                                                }}
                                        invalid={!validColor}/>  
                                </Col>
                            </FormGroup>
                        
                            <FormGroup row className='d-flex justify-content-between'>
                                <Col>
                                    <Label for='modelStock'>Estoque do Modelo</Label>
                                    <NumberInput
                                        id='modelStock'
                                        name='modelStock'
                                        maxLength='4'
                                        value={stock}
                                        onChange={e => {
                                                    setModelStock(e.target.value)
                                                    if(!validModelStock)
                                                        setValidModelStock(true)
                                                }}
                                        invalid={!validStock}
                                    />       
                                </Col>

                                <Col>
                                    <Label for='priceIncrement'>Incremento de Preço (%)</Label>
                                    <NumberInput
                                        id='priceIncrement'
                                        name='priceIncrement'
                                        maxLength='3'
                                        value={priceIncrement}
                                        onChange={e => {
                                                    setPriceIncrement(e.target.value)
                                                    if(!validPriceIncrement)
                                                        setValidPriceIncrement(true)
                                                }}
                                        invalid={!validPriceIncrement}
                                    />                    
                                </Col>
                            </FormGroup> 

                            <Table responsive striped hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Tamanho</th>
                                        <th>Cor</th>
                                        <th>Estoque</th>
                                        <th>Incremento (%)</th>
                                        <th colSpan='2' style={{textAlign: 'center'}}>
                                            Ações
                                        </th>
                                    </tr>
                                </thead> 
                                <tbody>
                                    {customList}
                                </tbody>
                            </Table>
                        </>
                    }
                </Col>

                <Col style={{display: 'inline-flex', flexDirection: 'column', alignItems: 'center'}}>
                    <FormGroup row className='d-none'>
                        <Col>
                            <input 
                                ref={inputThumbsRef}
                                id='image'
                                name='image'
                                type='file'
                                accept='image/*'
                                multiple
                                onChange={e => handleImagesUpload(e.target.files)}
                            /> 
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col>
                            <Label>Imagem</Label>
                        </Col>
                        <Col>
                            <LabelStyled
                                id='thumbnail'
                                style={{backgroundImage: `url(${thumbnail ? thumbnail.thumbnailUrl : null})`}}
                                className={thumbnail ? 'hasThumbnail' : '' || validThumbnail ? '' : 'invalid'}  
                                onClick={!thumbnail ? e => openFilesDialog() : e => false}
                            >
                                {!thumbnail ? <BackgroundIconStyled icon={faCamera} /> : '' }
                            </LabelStyled>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <ThumbsSmallPanel 
                            thumbnails={ images } 
                            thumbIndex={thumbIndex}
                            setThumbIndex={ setThumbIndex }
                            deleteThumbnail={deleteThumbnail}
                            handleImagesUpload={handleImagesUpload}
                            isAddMode={true}
                        />
                    </FormGroup>

                    <FormGroup>
                           
                    </FormGroup>

                    <ButtonGroup>
                            <CommonButton
                                width='100%'
                                color='red'
                                title='Salvar'
                                handleClick={e => handleSubmit(e, 1) }
                                />
                    </ButtonGroup>
                    <ButtonGroup  style={{width: '80%'}}>
                            <CommonButton 
                                width='100%'
                                color='black'
                                title='Adicionar outro...'
                                handleClick={e => handleSubmit(e, 2) }
                            />
                    </ButtonGroup>  
                </Col>
            </FormGroup>
        </FormStyled>
    </>
    )
}


const BackgroundIconStyled = styled(FontAwesomeIcon)`
    color: white;
    font-size: 36px;

`


const LabelStyled = styled(Label)`
    max-width: 350px;
    width: 350px;
    min-width: 150px;

    cursor: pointer;

    @media(max-width: 515px){
        width: 200px;
    }

    max-height: 400px;
    height: 400px;
    min-height: 200px;
    
    display: inline-flex;
    justify-content: center;
    align-items: center;

    border: 1px dashed black;

    background: lightgrey;

    &:hover{
        background: grey;
        ${BackgroundIconStyled}{
            font-size: 40px;
        }
    }

    &.hasThumbnail{
        border: 0px;
        background-size:     cover; 
        background-repeat:   no-repeat;
        background-position: center center;

        cursor: auto;
    }

    &.invalid{
        border-color: red;
    }

`

const FormStyled = styled(Form)`
    width: 100%;
    margin-left: 15px;
    margin-right: 15px;
`

const FontAwesomeIconStyled = styled(FontAwesomeIcon)`
    color: black;
    cursor: pointer;
`

const FormTitleStyled = styled.h5`
    text-transform: uppercase;
`

const ButtonGroup = styled(FormGroup)`
    width: 80%;
`