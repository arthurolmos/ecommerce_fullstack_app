import React from 'react'
import { 
    Row,
    Col,
    Container
} from 'reactstrap'
import { 
    DefaultInput, 
    PictureField, 
    SmallPictureField, 
    SelectInput, 
    CheckboxInput,
    TextAreaInput,
    NumberInput
} from './Inputs'
import styled from 'styled-components'

function switchInput(field) { 

    switch(field.type) { 
        case 'singlepicture': return <FormGroupStyled key={field.name}>
                                         <PictureField field={field} />
                                     </FormGroupStyled>

        case 'pictures': return <FormGroupStyled key={field.name}>
                                    <SmallPictureField field={field}/>
                                </FormGroupStyled>

        case 'select': return <FormGroupStyled key={field.name}>
                                  <label>{field.label}</label>
                                  <SelectInput 
                                      name={field.name} 
                                      options={field.options} 
                                      type={field.type}
                                  />
                              </FormGroupStyled>          
        
        case 'checkbox': return <FormGroupStyled key={field.name}>
                                  <label>
                                  <CheckboxInput  
                                        name={field.name} 
                                        type={field.type} 
                                        disabled={field.disabled} 
                                    />
                                  {field.label}</label>
                              </FormGroupStyled>   
                              
        case 'textarea': return <FormGroupStyled key={field.name}>
                                    <label>{field.label}</label>
                                    <TextAreaInput  
                                        name={field.name} 
                                        type={field.type} 
                                        disabled={field.disabled} 
                                    />
                                </FormGroupStyled>                     
    
        case 'number': return  <FormGroupStyled key={field.name}>
                                    <label>{field.label}</label>

                                    <NumberInput 
                                        name={field.name} 
                                        type={field.type} 
                                        disabled={field.disabled} 
                                        min={field.min}
                                    />
                                </FormGroupStyled>   

        default: return <FormGroupStyled key={field.name}>
                            <label>{field.label}</label>

                            <DefaultInput name={field.name} type={field.type} disabled={field.disabled} />
                        </FormGroupStyled>   
    }
}


export default function FormFields({ fields }) {

    return fields.map((field, i) => { 
        if(field.small) { 
            const inputs = field.small.map(field => { 
                const input = switchInput(field)

                return <Col key={field.name}>{input}</Col>
            })

            return <Row key={i + 'Row'}>{inputs}</Row>

        } else {
            return switchInput(field)
        }
    })
}

const FormGroupStyled = styled.div`
    margin-bottom: 15px;
`

