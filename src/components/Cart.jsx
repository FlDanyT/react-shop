// Компонент корзины
function Cart(props) { 
    const{quantity = 0, handleBasketShow = Function.prototype} = props
    // Отображение значка корзины и количества товаров в корзине
    return <div className="cart blue darken-4 white-text" onClick={handleBasketShow}>
        <i className="material-icons">shopping_cart</i>
        {quantity ? <span className="cart-quantity">{quantity}</span> : null}
    </div>
}
export {Cart}