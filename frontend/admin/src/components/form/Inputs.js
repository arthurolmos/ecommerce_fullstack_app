import React, { useEffect, useRef, useState, useMemo } from 'react';
import ReactSelect, {
  Props as SelectProps,
} from 'react-select';
import { 
  Button,
  Media,
  Container,
  Input
} from 'reactstrap'
import PictureSelectionModal from '../modal/PictureSelectionModal'
import { useField } from '@unform/core';
import styled from 'styled-components'



export function DefaultInput({ name, ...rest }) {

    const inputRef = useRef(null);
    const { fieldName, defaultValue, registerField, error } = useField(name);

    useEffect(() => {
      registerField({
        name: fieldName,
        ref: inputRef.current,
        path: 'value',
      });
    }, [fieldName, registerField]);

    return (
      <>
        <InputStyled 
          ref={inputRef} 
          defaultValue={defaultValue} 
          className={error ? 'has-error' : ''}
          {...rest}
        />
        { error && <ErrorSpan className="error">{error}</ErrorSpan> }
      </>
    )
}



export function NumberInput({ name, ...rest }) {
    const inputRef = useRef(null);
    const { fieldName, defaultValue, registerField, error } = useField(name);

    useEffect(() => {
      registerField({
        name: fieldName,
        ref: inputRef.current,
        path: 'value',
      });

      inputRef.current.addEventListener('change', e => {
        if (e.target.value === '' || e.target.value < 0) {
          e.target.value = 0
        }
      })
    }, [fieldName, registerField]);


    return (
      <>
        <InputStyled 
          ref={inputRef} 
          defaultValue={defaultValue} 
          className={error ? 'has-error' : ''}
          {...rest}
        />
        { error && <ErrorSpan className="error">{error}</ErrorSpan> }
      </>
    )
}



export function TextAreaInput({ name, ...rest }) {

  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
      <TextAreaInputStyled ref={inputRef} defaultValue={defaultValue} {...rest} />
  )
}



export function SelectInput({ name, options, ...rest }) {

  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const optionItems = options.map(option => { 
                            return { value: option.id, label: option.name }
                      })

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'state.value',
      getValue: (ref) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option) => option.value);
        } else {
          if (!ref.state.value) {
            return '';
          }
          return ref.state.value.value;
        }
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <>
      <ReactSelect
          options={optionItems}
          ref={selectRef}
          className={error ? 'has-error' : ''}
          classNamePrefix="react-select"
          placeholder='Selecione uma opção...'
          defaultValue={defaultValue}
      />
      { error && <ErrorSpan className="error">{error}</ErrorSpan> }
    </>
    
  );
};


export function CheckboxInput({ name, ...rest }) { 

  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'checked',
    });
  }, [fieldName, registerField]);

  return (
      <CheckInputStyled ref={inputRef} defaultChecked={defaultValue} {...rest} />
  );
}

export function PictureField({ field }) {

  const [ modal, setModal ] = useState(false)
  const [ title, setTitle ] = useState('')
  const [ selected, setSelected ] = useState([])
  const [ multiple, setMultiple ] = useState(false)

  const toggle = () => setModal(!modal)

  return (
      <>
          <PictureSelectionModal 
                  modal={modal}
                  toggle={toggle}
                  action={field.setter}
                  selected={selected}
                  multiple={multiple}
                  title={title}
          />
          <LabelStyled>Imagem Principal</LabelStyled>
          {field.value.url && 
              <MainPictureContainerStyled
                  onClick={()=> field.setter({})}
              >
                  {<MediaStyled 
                    src={'http://localhost:3333' + field.value.url} 
                    onError={() => console.log('Picture not found')}   
                  />}
              </MainPictureContainerStyled>
          }
          <ButtonStyled 
                color='primary'
                onClick={() => {
                    setTitle('Selecionar imagens')
                    setSelected(field.value)
                    setMultiple(false)
                    setModal(true)
          }}>Adicionar</ButtonStyled>
      </>
  )
}


export function SmallPictureField({ field }) {

  const [ modal, setModal ] = useState(false)
  const [ title, setTitle ] = useState('')
  const [ selected, setSelected ] = useState([])
  const [ multiple, setMultiple ] = useState(false)

  const toggle = () => setModal(!modal)


  const smallThumbnails = field.value.map(picture => { 
      const { id, url } = picture

      const formattedUrl = 'http://localhost:3333' + url

      function remove(id) { 
          const index = field.value.findIndex(picture => picture.id === id)
          if(index !== -1) { 
              const newArray  = [ ...field.value ]
              newArray.splice(index, 1)

              field.setter(newArray)
          }
      }

      return (
          <SmallMediaStyled 
              key={id}
              src={formattedUrl} 
              onClick={()=> remove(id)}
              onError={() => console.log('Picture not found')}   
          />
      )
  })

  return (
      <>
          <PictureSelectionModal 
                  modal={modal}
                  toggle={toggle}
                  action={field.setter}
                  selected={selected}
                  multiple={multiple}
                  title={title}
          />
          <LabelStyled>Imagens Menores</LabelStyled>
          {field.value.length > 0 && 
              <SmallThumbnailsContainerStyled>
                  {smallThumbnails}
              </SmallThumbnailsContainerStyled>
          }
          <ButtonStyled 
                color='primary'
                onClick={() => {
                    setTitle('Selecionar imagens')
                    setSelected(field.value)
                    setMultiple(true)
                    setModal(true) 
          }}>Adicionar</ButtonStyled>
      </>
  )
}


export function FilterInput(){
  return( 
    <div style={{ padding: '16px' }}>
      <DivStyled style={{ position: 'relative' }}>
        <div style={{ marginRight: '8px', alignItems: 'center', display: 'flex' }}>
          <input style={{ border: 0, margin: 0, display: 'block', padding: '6px 0 7px'}} />
        </div>
      </DivStyled>
    </div>
  )
}

const DivStyled = styled.div`
  position: relative;

  &::before { 
    left: 0;
    right: 0;
    bottom: 0;
    content: '\00a0';
    position: absolute;
    transition: border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border-bottom: 1px solid rgba(0, 0, 0, 0.42);
    pointer-events: none;
  }

  color: black;
  cursor: text;
  display: inline-flex;
  align-items: center;
`


const LabelStyled = styled.label`
  display: block;
`


const ButtonStyled = styled(Button)`
  width: 100%;
`

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

const SmallThumbnailsContainerStyled = styled(Container)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 10px;
  box-sizing: border-box;

`

const SmallMediaStyled = styled(Media)`
  width: 100px;
  height: 100px;
  box-sizing: border-box;
  margin: 5px;

  cursor: pointer;

  &:hover { 
      opacity: .8;
  }
`

const InputStyled = styled.input`
    display: block;
    min-height: 38px;
    border-radius: 4px;
    border-color: hsl(0,0%,80%);
    border-width: 1px;
    border-style: solid;
    background-color: hsl(0,0%,100%);
    padding: 2px 8px;
    width: 100%;

    &:focus{
      outline-color: #2684ff;
    }
`

const CheckInputStyled = styled.input`
    transform: scale(1.5);
    margin-right: 10px;
`

const TextAreaInputStyled = styled.textarea`
    overflow: auto;
    resize: vertical;
    height: auto;
    display: block;
    min-height: 38px;
    border-radius: 4px;
    border-color: hsl(0,0%,80%);
    border-width: 1px;
    border-style: solid;
    background-color: hsl(0,0%,100%);
    padding: 2px 8px;
    width: 100%;

    &:focus{
      outline-color: #2684ff;
    }
`

const ErrorSpan = styled.span`
    color: red;
`