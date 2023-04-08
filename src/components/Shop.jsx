import {useState, useEffect} from "react"
import {API_KEY, API_URL} from '../config'

import {Preloader} from './Preloader'
import {GoodsList} from './GoodsList'
import { Cart } from "./Cart"
import {BasketList} from './BasketList'
import {Alert} from './Alert'

function Shop () {
    const [goods, setGoods] = useState([])
    const [loading, setLoading] = useState(true)
    const [order, SetOrder] = useState([])
    const [isBasketShow, setBasketShow] = useState(false)
    const [alertName, setAlertName ] = useState('')
    
    // Функция для добавления товара в корзину
    const addToBasket = (item) => {
        const itemIndex = order.findIndex(orderItem => orderItem.id === item.id)
    
        if(itemIndex <0) {
            const newItem = {
                ...item,
                quantity: 1,
            }
            SetOrder([...order, newItem]);
    
        } else{
            const newOrder = order.map((orderItem, index) => {
                if(index === itemIndex) {
                    return {
                        ...orderItem,
                        quantity: orderItem.quantity + 1
                    }
                } else {
                    return orderItem
                }
            })
            SetOrder(newOrder)
        }
        setAlertName(item.name)
    }
    
    // Функция для удаления товара из корзины
    const removeFromBasket = (itemId) => { 
        const newOrder = order.filter(el => el.id !== itemId)
        SetOrder(newOrder)
    }
    
    // Функция для увеличения количества товара в корзине
    const incQuantity = (itemId) => {
        const newOrder = order.map(el => {
            if(el.id === itemId) {
                const newQuantity = el.quantity +1
                return {
                    ...el,
                    quantity: newQuantity,
                }
            } else {
                return el;
            }
        })
        SetOrder(newOrder)
    }
    
    // Функция для уменьшения количества товара в корзине
    const decQuantity = (itemId) => {
        const newOrder = order.map(el => {
            if(el.id === itemId) {
                const newQuantity = el.quantity - 1
                return {
                    ...el,
                    quantity: newQuantity >= 0 ? newQuantity: 0,
                }
            } else {
                return el;
            }
        })
        SetOrder(newOrder)
    }
    
    // Функция для отображения/скрытия корзины
    const handleBasketShow = () => {
        setBasketShow(!isBasketShow)
    }
    
    // Функция для закрытия оповещения
    const closeAlert = () => {
        setAlertName('')
    }
    
    // Функция для получения данных с сервера
    useEffect(function getGoods() {
        fetch(API_URL, {
            headers: {
                'Authorization': API_KEY,
            }
        }).then(response => response.json()).then(data => {
            data.featured && setGoods(data.featured);
            setLoading(false);
        })
    }, [])
    return (  <main className="container content">
        <Cart quantity = {order.length} handleBasketShow={handleBasketShow}/>
        {loading ? (   <Preloader/> ) 
        :
        ( <GoodsList goods={goods} addToBasket={addToBasket}/>
     )}
    {
        isBasketShow && (
        <BasketList order={order} 
        handleBasketShow={handleBasketShow} 
        removeFromBasket={removeFromBasket}
        incQuantity={incQuantity}
        decQuantity={decQuantity}
        />
    )}
    {
        alertName && <Alert name={alertName} closeAlert={closeAlert}/>
    }
    </main>
    )
}

export {Shop}
