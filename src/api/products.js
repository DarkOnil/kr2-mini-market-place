import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.escuelajs.co/api/v1'
})

export const getProducts = (params) => api.get('/products', { params }).then(res => res.data)
export const getProduct = (id) => api.get(`/products/${id}`).then(res => res.data)
export const getCategories = () => api.get('/categories').then(res => res.data)
export const createProduct = (product) => api.post('/products/', product).then(res => res.data)
export const updateProduct = (id, product) => api.put(`/products/${id}`, product).then(res => res.data)
export const deleteProduct = (id) => api.delete(`/products/${id}`).then(res => res.data)

export function getCategoryName(name) {
  const names = {
    clothes: 'Одежда',
    electronics: 'Электроника',
    furniture: 'Мебель',
    shoes: 'Обувь',
    miscellaneous: 'Разное'
  }
  return names[String(name || '').toLowerCase()] || name || 'Без категории'
}
