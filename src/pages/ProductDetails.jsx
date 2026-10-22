import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deleteProduct, getProduct } from '../api/products'
import { useShopStore } from '../store/shopStore'

export default function ProductDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)
    const [error, setError] = useState('')
    const favorites = useShopStore(state => state.favorites)
    const toggleFavorite = useShopStore(state => state.toggleFavorite)
    const addToCart = useShopStore(state => state.addToCart)
    const favorite = favorites.some(item => item.id === Number(id))
    const ownedIds = JSON.parse(localStorage.getItem('my-marketplace-products') || '[]')
    const owned = ownedIds.includes(Number(id))
    
    useEffect(() =>  {
        getProduct(id).then(setProduct).catch(() => setError('Товар не найден'))
    }, [id])
    async function removeProduct() {
        if (!owned || !window.confirm('Удалить свой товар?')) return
        try {
            await deleteProduct(id)
            const ids = JSON.parse(localStorage.getItem('my-marketplace-products') || '[]')
            const updateIds = ids.filter(item => item !== Number(id))
            localStorage.setItem('my-marketplace-products', JSON.stringify(updateIds))
            navigate('/')
        } catch {
            setError('Не удалось удалить товар.')
        }
    }
    
    if (error && !product) return <main className='container'><p>{error}</p><Link to="/"></Link></main>
    if (!product) return <main className='container'><p>Загрузка...</p></main>

    return <main className='container detail-page'>
        <Link to="/">← В каталог</Link>
        {error && <p className="error">{error}</p>}
        <div className='detail'>
            <img src={product.images?.[0]} alt={product.title} onError={e => { e.currentTarget.src = 'https://placehold.co/400x300?text=Product' }} />
            <div><h1>{product.title}</h1><h2>${product.price}</h2><p>Категория: {product.category?.name}</p><p>{product.description}</p>
            <button onClick={() => addToCart(product)}>В корзину</button>
            <button onClick={() => toggleFavorite(product)}>{favorite ? '♥ В избранном' : '♡ В избранное'}</button>
            {owned && <div><p>Твой товар</p><Link to={`/products/${id}/edit`}>Редактировать</Link> 
            <button onClick={removeProduct}>Удалить</button></div>}
        </div>
    </div>
</main>
}