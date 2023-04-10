import { useContext } from "react"
import { ShopContext } from "../context"


// Компонент корзины
function Cart() { 
    const{order, handleBasketShow = Function.prototype} = useContext(ShopContext)
 const quantity = order.length

    // Отображение значка корзины и количества товаров в корзине
    return <div className="cart blue darken-4 white-text" onClick={handleBasketShow}>
        <i className="material-icons">shopping_cart</i>
        {quantity ? <span className="cart-quantity">{quantity}</span> : null}
    </div>
}
export {Cart}