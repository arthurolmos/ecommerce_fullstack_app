import React from 'react'
import { 
    Spinner
} from 'reactstrap'


export const BigSpinner = () => {
    return(
        <Spinner color='danger' style={{width: '100px', height: '100px'}} />
    )
}