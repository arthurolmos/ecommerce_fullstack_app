import React, { useState, useEffect } from 'react'

const BagContext = React.createContext();

function BagProvider(props) {
    const [ bagItems, setBagItems ] = useState([])
    const [ bagTotal, setBagTotal ] = useState(0)

    const [ tax, setTax ] = useState(0)
    const [ deliveryDays, setDeliveryDays ] = useState('')
    
    const [ loading, setLoading ] = useState(false)

    useEffect(() => {
        console.log('BAG: ', bagItems)
    }, [ bagItems ])

    const addToBag = (product) => {
        const tempItems = [...bagItems]

        const p = tempItems.find(item => item._id === product._id)

        if(p){
            addQty(p)

        }else{
            product.quantity = 1
            product.totalPrice = product.regularPrice

            tempItems.push(product)
        }

        setBagItems(tempItems)
    }

    const addQty = (product) => {
        const tempItems = [...bagItems]

        const p = tempItems.find(item => item._id === product._id)

        p.quantity++
        if(p.quantity > 10) { p.quantity = 10 }

        p.totalPrice = (p.quantity * p.regularPrice)

        const index = tempItems.indexOf(p)
        tempItems[index] = p

        setBagItems(tempItems)
    }

    const subQty = (product) => {
        const tempItems = [...bagItems]

        const p = tempItems.find(item => item._id === product._id)

        p.quantity--
        if(p.quantity < 1) { p.quantity = 1 }

        p.total = (p.quantity * p.regularPrice)

        const index = tempItems.indexOf(p)
        tempItems[index] = p

        setBagItems(tempItems)
    }

    const changeQty = (quantity, product) => {
        if(quantity > 10) { quantity = 10 }
        if(quantity < 1 ) { quantity = 1 }
        
        const tempItems = [...bagItems]
        
        const p = tempItems.find(item => item._id === product._id)
        p.quantity = quantity

        const index = tempItems.indexOf(p)
        tempItems[index] = p

        setBagItems(tempItems)
    }


    function removeFromBag(product){
        const bag = bagItems

        if(bag.find(item => item._id === product._id)){ //Remove from Bag
            const filteredItems = bag.filter(item => item._id !== product._id )
            setBagItems(filteredItems)
        }
    }

    const calcBagTotal = () => {
        if(bagItems){
            let total = 0
            
            bagItems.forEach(item => {
                total = parseFloat(total) + parseFloat(item.totalPrice)
                console.log('TOTAL: ', total)
            })

            total += parseFloat(tax)

            setBagTotal(total)
        }else {
            setBagTotal(0)
        }
    }

    const calcZip = (selectedZip) => {
        setLoading(true)

        const trim = selectedZip.replace(/-/g, '')

        const params = {
            'nCdEmpresa': '', 
            'sDsSenha': '',
            'nCdServico': '04014',
            'sCepOrigem': '09541450',
            'sCepDestino': trim,
            'nVlPeso': '1', 
            'nCdFormato': '10', 
            'nVlComprimento': '10',
            'nVlAltura': '10', 
            'nVlLargura': '10', 
            'nVlDiametro': '30', 
            'sCdMaoPropria': 'n', 
            'nVlValorDeclarado': '0', 
            'sCdAvisoRecebimento': 'n'
        }

        const urlParams = new URLSearchParams(Object.entries(params));
        const url = 'https://cors-anywhere.herokuapp.com/http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx/CalcPrecoPrazo?' + urlParams

        const headers = new Headers({
            "Content-Type": "text/plain",
            "X-Custom-Header": "ProcessThisImmediately",
            'Access-Control-Allow-Origin': '*'
        })

        var req = { 
                method: 'GET',
                mode: 'cors',
                headers: headers,
                cache: 'default',
                credentials: 'same-origin'
            }
            
        fetch(url, req)
        .then(resp => {
            return resp.text()
        })
        .then(data => {
            console.log('RESP: ', data)

            const parser = new DOMParser()
            const xml = parser.parseFromString(data, 'text/xml')
            
            let valor = xml.getElementsByTagName('Valor')
            valor = valor[0].firstChild.nodeValue
            valor = valor.replace(',', '.')
            valor = parseFloat(valor)
            valor = valor

            console.log(valor)

            const prazo = xml.getElementsByTagName('PrazoEntrega')
            
            setTax(valor)
            setDeliveryDays(prazo)
            setLoading(false)
        })
        .catch(error => {
            console.log(error)
            setLoading(false)
        })
    }

    useEffect(() => {
        // const bag = JSON.parse(localStorage.getItem('bag'))
        
        // if(bag){ setBagItems(bag) }
    }, [])


    useEffect(() => {
        // localStorage.setItem('bag', JSON.stringify(bagItems))

        // calcBagTotal()
        // console.log('BAG ITEMS: ', bagItems)
        // console.log('TAX: ', tax)

    }, [bagItems, tax])


    useEffect(() => {
        console.log('BAG TOTAL: ', bagTotal)
    }, [bagTotal])


    useEffect(() => {
        calcBagTotal()
    }, [bagItems])


    return (
        <BagContext.Provider value={{
            bagItems: bagItems,
            addToBag: addToBag,
            removeFromBag: removeFromBag,

            addQty: addQty,
            subQty: subQty,
            changeQty: changeQty,

            bagTotal: bagTotal,

            calcZip: calcZip,
            tax: tax,

            loading: loading,
        }}>
            {props.children}
        </BagContext.Provider>
    )
}

export { BagProvider, BagContext }