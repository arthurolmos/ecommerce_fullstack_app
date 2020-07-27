import api from '../services/api'

export async function validateName(value, productId=null){ 
    const resp = await api.get('/products', { params: { name: value }})
    return  resp.data.length > 0 ? 
                productId ? resp.data.some(item => item.id === parseInt(productId)) : false
            : true
}
