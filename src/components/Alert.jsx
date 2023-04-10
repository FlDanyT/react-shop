
// Этот компонент реализует вывод сообщения-оповещения на экран при добавлении товара в корзину.
// Она использует хук useEffect для запуска таймера, который закрывает сообщение через 3 секунды после отображения.
// Параметры компоненты включают в себя имя товара, которое будет отображаться в сообщении, и функцию closeAlert, которая будет вызываться после закрытия сообщения.

import {  useEffect, useContext } from "react"
import { ShopContext } from "../context"

function Alert() {
    const {alerName: name='', closeAlert = Function.prototype} = useContext(ShopContext)
    useEffect(() => {
        const timerId = setTimeout(closeAlert, 3000)
        return () =>{
            clearTimeout(timerId)
        }
        // eslint-disable-next-line
    }, [name])
    return <div id="toast-container">
        <div className="toast">{name} добавлен в корзину</div>
    </div>
}

export{Alert}