import api from '../services/api'

export async function validateName(value, categoryId){ 
    const resp = await api.get('/category', { params: { name: value }})
    return  resp.data.length > 0 ? 
                categoryId ? resp.data.some(item => item.id === parseInt(categoryId)) : false
            : true
}
