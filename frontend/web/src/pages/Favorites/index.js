import React, { useContext, useEffect }  from 'react'

import { FavContext } from '../../contexts/fav-context'
import { BagContext } from '../../contexts/bag-context'
import ProductCard from '../../components/Products/ProductCard'

import DefaultContainer from '../../components/Util/DefaultContainer'
import ProductList from '../../components/Products/ProductList'


export default function FavoritesList() {

    const { favItems, toggleFav } = useContext(FavContext)
    const { addToBag } = useContext(BagContext)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <DefaultContainer 
            title='Favoritos' 
            component={
                favItems.length > 0 ? 
                    <ProductList
                        products={favItems}
                    /> 
                : 
                'Não há items para serem exibidos!'}
        />
    )
}
