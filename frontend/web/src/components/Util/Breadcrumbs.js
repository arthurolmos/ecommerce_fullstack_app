import React, { useContext } from 'react'
import { 
    Breadcrumb, 
    BreadcrumbItem
} from 'reactstrap'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { translate } from '../../components/Util/Translator'
import { LinkContext } from '../../contexts/link-context'


export default function Breadcrumbs(props) {

    const { homeLink } = useContext(LinkContext)

    const { path } = props
    const split = path.split('/')
    // console.log('SPLIT ', split)

    const listItems = split.map((link, index) => {

        if(index === 0){
            return ( 
                <BreadcrumbItemStyled key={index}>
                    <LinkStyled to={homeLink}>Home</LinkStyled>
                </BreadcrumbItemStyled>
            )
        }

        if(index === split.length -1){
            return (
                <BreadcrumbItemStyled key={index} active>
                    {translate(link)}
                </BreadcrumbItemStyled>
            )
        }

        if(index < split.length) {
            return (
                <BreadcrumbItemStyled key={index}>
                    <LinkStyled to={`/${link}`}>
                        {translate(link)}
                    </LinkStyled>
                </BreadcrumbItemStyled>
            )
        }
    })

    return (
        <BreadcrumbStyled listClassName='list'>
            {listItems}
        </BreadcrumbStyled>
    )
}



const BreadcrumbStyled = styled(Breadcrumb)`
    .list{
        background-color: white;
    }
`

const BreadcrumbItemStyled = styled(BreadcrumbItem)`
    text-transform: uppercase;
    font-size: 14px;
    padding: 0;
`

const LinkStyled = styled(Link)`
    color: black;

    &:hover{
        color: black;
    }
`