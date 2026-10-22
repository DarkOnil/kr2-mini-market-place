import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { useShopStore } from '../store/shopStore'

export default function Favorites() {
    const favorites = useShopStore(state => state.favorites)
    return <main className='container'><h1>Избранное</h1>
    {favorites.length ? <div className="product-grid">{favorites.map(item => <ProductCard key={item.id} />)}
    </div> : <p>Избранное пока пустое. <Link to="/">Открыть католог</Link></p>}
    </main>
}