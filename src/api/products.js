import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.escuelajs.co/api/v1'
})

export const getProducts = (params) => api.get('/products', { params }).then(res => res.data)
export const getProduct = (id) => api.get(`/products/${id}`).then(res => res.data)
export const getCategories = () => api.get('/categories').then(res => {
  const validNames = ['clothes', 'clothing', 'electronics', 'electronic', 'furniture', 'shoes', 'miscellaneous', 'other']

  return res.data.filter(category => {
    const name = String(category.name || '')
      .replace(/\s*from config/gi, '')
      .trim()
      .toLowerCase()

    return validNames.includes(name)
  })
})
export const createProduct = (product) => api.post('/products/', product).then(res => res.data)
export const updateProduct = (id, product) => api.put(`/products/${id}`, product).then(res => res.data)
export const deleteProduct = (id) => api.delete(`/products/${id}`).then(res => res.data)

export function getCategoryName(name) {
  if (!name) return 'Без категории'

  const category = String(name)
    .replace(/\s*from config/gi, '')
    .trim()
    .toLowerCase()

  const names = {
    clothes: 'Одежда',
    clothing: 'Одежда',
    electronics: 'Электроника',
    electronic: 'Электроника',
    furniture: 'Мебель',
    shoes: 'Обувь',
    miscellaneous: 'Разное',
    other: 'Разное'
  }

  return names[category] || category.charAt(0).toUpperCase() + category.slice(1)
}
