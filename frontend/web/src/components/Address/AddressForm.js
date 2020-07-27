import React, { useState, useContext, useEffect } from 'react'
import {
    Form,
    FormGroup,
    Label,
    Button,
    Spinner,
    Col,
    Row,
} from 'reactstrap'
import { ZipInput, DefaultInput } from '../Util/Inputs'
import { generalFetch } from '../../api/api'
import styled from 'styled-components'
import { CommonButton } from '../Util/Buttons'


export default function AddressForm(props) {

    const { title, edit, userAddress, loading, handleSubmit } = props

    const [ street, setStreet ]                     = useState('')
    const [ number, setNumber ]                     = useState('')
    const [ comp, setComp ]                         = useState('')
    const [ neighborhood, setNeighborhood ]         = useState('')
    const [ city, setCity ]                         = useState('')
    const [ state, setState]                        = useState('')
    const [ zip, setZip ]                           = useState('')

    const [ loadingZipSearch, setLoadingZipSearch ] = useState(false)


    useEffect(() => {
        let isSubscribed = true

        
        const searchZip = async (e) => {

            const trim = zip.replace(/-/g, '')
            const url = `https://viacep.com.br/ws/${trim}/json/unicode/`

            const resp = await generalFetch(url)

            if(!resp.result && isSubscribed){
                setStreet(resp.logradouro || '')
                setNeighborhood(resp.bairro || '')
                setCity(resp.localidade || '')
                setState(resp.uf || '')
                
                setLoadingZipSearch(false)
                isSubscribed = false
            }                
        }


        if (loadingZipSearch)
            searchZip()


        return () => {
            isSubscribed = false
        }     

    }, [loadingZipSearch])

    useEffect(() => {
        if(edit && userAddress){
            
            const { street, number='', comp='', neighborhood='', city='', state='', zip='' } = userAddress

            setStreet(street)
            setNumber(number)
            setComp(comp)
            setNeighborhood(neighborhood)
            setCity(city)
            setState(state)
            setZip(zip)
        }

    }, [ edit, userAddress ])

    const onSubmit = (e) => {
        e.preventDefault()

        // if(validAddress) { 
            window.scrollTo(0, 0)

            const newAddress = {
                street,
                number,
                comp,
                neighborhood,
                city,
                state,
                zip
            }
    
            handleSubmit(newAddress)
        // }
    }

  
    return (
        <FormStyled 
            onSubmit={e => onSubmit(e)}>

            <FormTitle>{title}</FormTitle>

            <FormGroup>
                <Label for='zip'>CEP</Label>
                <Row form>
                    <Col>
                        <ZipInput
                            id='zip' 
                            name='zip' 
                            value={zip} 
                            autoComplete='off'
                            onChange={e => setZip(e.target.value)}
                            readOnly={loadingZipSearch  ? true : false}
                        />
                    </Col>
                    <Col>
                        {loadingZipSearch ? 
                            <Spinner color='danger' />
                            :
                            <CommonButton
                                title='Buscar'
                                handleClick={e => setLoadingZipSearch(true)}
                                color='red'
                            />
                        }
                    </Col>
                </Row>
                    
            </FormGroup>

            <FormGroup>
                <Label for='street'>Rua</Label>
                <DefaultInput 
                    id='street' 
                    type='text' 
                    name='street' 
                    value={street} 
                    onChange={e => setStreet(e.target.value)}
                    readOnly={loadingZipSearch ? true : false}
                />
            </FormGroup>

            <Row form>
                <Col>
                    <FormGroup>
                        <Label for='number'>Número</Label>
                            <DefaultInput 
                                id='number' 
                                type='text' 
                                name='number' 
                                value={number} 
                                onChange={e => setNumber(e.target.value)}
                                readOnly={loadingZipSearch  ? true : false}
                            />
                    </FormGroup>
                </Col>

                <Col>
                    <FormGroup>
                        <Label for='comp'>Complemento</Label>
                            <DefaultInput 
                                id='comp' 
                                type='text' 
                                name='comp' 
                                value={comp} 
                                onChange={e => setComp(e.target.value)}
                                readOnly={loadingZipSearch  ? true : false}
                            />
                    </FormGroup>
                </Col>
            </Row>
            
            <FormGroup>
                <Label for='neighborhood'>Bairro</Label>
                <DefaultInput 
                    id='neighborhood' 
                    type='text' 
                    name='neighborhood' 
                    value={neighborhood} 
                    onChange={e => setNeighborhood(e.target.value)}
                    readOnly={loadingZipSearch  ? true : false}
                />
            </FormGroup>

            <FormGroup>
                <Label for='city'>Cidade</Label>
                    <DefaultInput 
                        id='city' 
                        type='text' 
                        name='city' 
                        value={city} 
                        onChange={e => setCity(e.target.value)}
                        readOnly={loadingZipSearch  ? true : false}
                    />
            </FormGroup>

            <FormGroup>
                <Label for='state'>Estado</Label>
                    <DefaultInput 
                        id='state' 
                        type='text' 
                        name='state' 
                        value={state} 
                        onChange={e => setState(e.target.value)}
                        readOnly={loadingZipSearch  ? true : false}
                    />
            </FormGroup>
            
            {loading ? 
                <Spinner color='danger' />
                :
                <CommonButton
                    title={edit ? 'Atualizar' : 'Salvar'}
                    color='black'
                    width='100%'
                />
            }
        </FormStyled>
    )
}

const FormStyled = styled(Form)`
    max-width: 400px;
    box-sizing: border-box;
`

const FormTitle = styled.h2`
    margin-bottom: 15px;
    font-family: Fjalla One, sans-serif;
    text-transform: uppercase;
`

const ButtonStyled = styled(Button)`
    border-radius: 0;
    text-transform: uppercase;
`

