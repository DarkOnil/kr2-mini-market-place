import { Link } from "react-router-dom";
import { useShopStore } from "../store/shopStore";

export default function ProductCard({ product }) {
    const favorites = useShopStore(state => state.favorites)
    const toggleFavorite = useShopStore(state => state.toggleFavorite)
    const addToCart = useShopStore(state => state.addToCart)
    const favorite = favorites.some(item => item.id === product.id)
    const image = product.images?.[0]

    return (
        <article className="product-card">
            <Link to={`/products/${product.id}`}>
                <img src={image} alt={product.title} onError={(e) => { e.currentTarget.src = 'https://placehold.co/300x200?text=Product' }} />
                </Link>
                <h3><Link to={`/products/${product.id}`}>{product.title}</Link></h3>
                <p>${product.price}</p>
                <button onClick={() => toggleFavorite(product)}>{favorite ? '♥ Убрать из избранного' : '♡ В избранное'}</button>
                <button onClick={() => addToCart(product)}> В корзину</button>
        </article>
    )
}