import React, { useState, useMemo, useEffect, useRef } from 'react'
import { 
    Media,
    Container,
    Button,
} from 'reactstrap'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export const ThumbsSmallPanel = (props) => {

    console.log(props)

    const { thumbnails, thumbIndex, setThumbIndex, deleteThumbnail, isAddMode, handleImagesUpload } = props

    const inputThumbsRef = useRef()

    const previewListItem = 
        thumbnails ? 
            thumbnails.map((thumbnail, index) => {
                return (
                    <ListGroupItemStyled key={index} >
                        <Wrapper >
                            {isAddMode ? <ButtonStyled close onClick={() => deleteThumbnail(index)}/> : null }
                            <MediaStyled 
                                className={thumbIndex === index ? 'active' : ''}
                                src={thumbnail.thumbnailUrl} 
                                onClick={() => {
                                        setThumbIndex(index)
                                        }}/>
                            <Background />
                        </Wrapper>
                    </ListGroupItemStyled>
                )
            })
        : []
    

    return (
        previewListItem.length != 0 ?  
                <ListGroupStyled>
                    {previewListItem}
                    {previewListItem.length < 4 && isAddMode ? 
                        <ListGroupItemStyled>
                            <LabelStyled onClick={() => inputThumbsRef.current.click()}>
                                +
                            </LabelStyled>
                            <input 
                                ref={inputThumbsRef}
                                id='image'
                                name='image'
                                type='file'
                                accept='image/*'
                                multiple
                                className='d-none'
                                onChange={e => handleImagesUpload(e.target.files)}
                            /> 
                        </ListGroupItemStyled>
                        :
                        null
                    }
                </ListGroupStyled>
            :
            null
    )
}

const ListGroupStyled = styled.ul`
    display: inline-flex
    flex-wrap: wrap;
    min-width: 220px;
    width: 220px;

    box-sizing: border-box;
    list-style: none;
    padding: 0;
`

const ListGroupItemStyled = styled.li`
    display: inline-block;

    
    border-radius: 0;    
    padding: 5px;    
`

const MediaStyled = styled(Media)`

    max-width: 100px;
    height: auto;

    background-color: black;
    transition: opacity 0.3s ease-in-out

    position: relative;


    &:hover {
        opacity: 0.7;
    }

    &.active {
        border: 1px solid black;
    }

    z-index: 6;
`

const Background = styled(Container)`
    position: absolute;
    top: 0;

    width: 100%;
    height: 100%;

    z-index: 5;
    background: black;
    display: block;
`

const Wrapper = styled.div`
    position: relative;

    width: 100px;
    height: auto;

    display: inline-block;

    cursor: pointer;
`

const FontAwesomeIconStyled = styled(FontAwesomeIcon)`
    position: absolute;

    top: 0;
    left: 0;

    font-size: 22px;
    color: green;
    z-index: 8;

    visibility: hidden;

    &.active{
        visibility: visible;
    }
`

const ButtonStyled = styled(Button)`
    position: absolute;

    top: 0;
    right: 0;

    z-index: 8;
`

const LabelStyled = styled.label`
    width: 100px;
    height: 100%;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    background: lightgrey;
    transition: all 0.3s ease-in-out

    cursor: pointer;

    &:hover{
        background: grey;
    }

    font-size: 40px;
    color: white;
    font-weight: bold;
`


