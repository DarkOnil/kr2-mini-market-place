import { Link } from "react-router-dom";
import { useShopStore} from "../store/shopStore";

export default function Header() {
    const favorites = useShopStore((state) => state.favorites)
    const cart = useShopStore((state) => state.cart)
    const count = cart.reduce((sum, item) => sum + item.quantity, 0)
    return <header><Link to="/" className="logo">Мини-Маркетплейс</Link><nav>
        <Link to="/">Каталог</Link>
        <Link to="favorites">Избранное ({favorites.length})</Link>
        <Link to="cart">Корзина ({count})</Link>
        <Link to="/products/new">Добавить товар</Link>
    </nav></header>
}