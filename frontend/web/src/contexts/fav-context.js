import React, { useState, useEffect } from 'react'

const FavContext = React.createContext()

function FavProvider(props) {
    const [ favItems, setFavItems ] = useState([])    
    const [ user, setUser ] = useState(null)

    const toggleFav = (product) => {
        // if(!user){
        //     history.push('/user')

        // } else {
            console.log('FAV PROD: ', product.isFav)
            if(product.isFav){
                removeFav(product)
            } else {
                addFav(product)
            }
        // }
    }

    const addFav = (product) => {
        product.isFav = true
        setFavItems([...favItems, product])
    }

    const removeFav = (product) => {
        product.isFav = false

        const filter = favItems.filter(prod => prod._id !== product._id)
        setFavItems(filter)
    }

    useEffect(() => {
        console.log('FAV ITEMS: ', favItems)
    }, [favItems])

    return (
        <FavContext.Provider value={{
            favItems: favItems,

            toggleFav: toggleFav,
            removeFav: removeFav,
            addFav: addFav
        }}>
            {props.children}
        </FavContext.Provider>
    )
}

export { FavProvider, FavContext }