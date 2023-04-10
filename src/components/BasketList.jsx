import {BasketItem} from './BasketItem'

import { useContext } from "react"
import {ShopContext} from '../context'

// Импорт компонента BasketItem, который используется в компоненте BasketList
function BasketList() {
    const { order = [], 
        handleBasketShow = Function.prototype,
    } = useContext(ShopContext);

    // Вычисление общей стоимости всех элементов в корзине
    const totalPrice = order.reduce((sum, el) => {
        return sum + el.price * el.quantity
    }, 0)

    return (
        // Отображение списка элементов корзины и общей стоимости
        <ul className="collection basket-list">
            <li className="collection-item active">Корзина</li>

            {order.length
                ? order.map((item) => <BasketItem 
                key={item.id} 
                {...item} />)
                :  <li className='collection-item'>Корзина пуста</li>
            }

            <li className="collection-item active">
                Общая стоимость: {totalPrice} руб.
            </li>
            <li className="collection-item">
                <button className="btn btn-small">Оформить</button>
            </li>
            <i className='material-icons basket-close' 
            onClick={handleBasketShow}
            >close</i>
        </ul>
    );
}

export { BasketList };