import { Link } from "react-router-dom"
import { useShopStore } from "../store/shopStore"


export default function Cart() {
    const cart = useShopStore(state => state.cart)
    const changeQuantity = useShopStore(state => state.changeQuantity)
    const removeFromCart = useShopStore(state => state.removeFromCart)
    const clearCart = useShopStore(state => state.clearCart)
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return <main className="container"><h1>Корзина</h1>
        {cart.length === 0 ? <p>Корзина пуста. <Link to="/">Выбрать товары</Link></p> : <>
            {cart.map(item => <div className="cart-row" key={item.id}>
                <Link to={`/products/${item.id}`}>{item.title}</Link>
                <span>${item.price}</span>
                <button onClick={() => changeQuantity(item.id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => changeQuantity(item.id, 1)}>+</button>
                <button onClick={() => removeFromCart(item.id)}>Убрать</button>
                </div>)}
                <h2>Итого: ${total.toFixed(2)}</h2>
                <button onClick={clearCart}>Очистить корзину</button>
        </>}
    </main> 
    }