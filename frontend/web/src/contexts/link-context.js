import React from 'react'


const LinkContext = React.createContext()

function LinkProvider(props) {
    const homeLink = '/'

    const accountLink = '/account'

    const editProfileLink = '/account/editprofile'
    const addressesLink = '/account/addresses'
    
    const loginLink = '/account/login'
    const signupLink = '/account/signup'

    const categoryLink = '/category/:category'
    const productLink = '/product/:id'


    return (
        <LinkContext.Provider value={{
            homeLink, 

            accountLink,
            loginLink,
            signupLink,
            addressesLink,
            editProfileLink,

            categoryLink,
            productLink
        }}>
            {props.children}
        </LinkContext.Provider>
    )
}

export { LinkProvider, LinkContext }