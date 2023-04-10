import { useContext } from "react";
import { ShopContext } from "../context";

function GoodsItem(props) {
// Деструктуризация объекта props для получения значений свойств товара и функции addToBasket, если они переданы, и установка по умолчанию для функции Function.prototype
const {
    id,
    name,
    description,
    price,
    full_background,
    } = props;

    const {addToBasket} = useContext(ShopContext)

    return <div className="card">
        <div className="card-image">
            <img src={full_background} alt={name} />
            {/* <span className="card-title">{name}</span> */}
        </div>
        <div className="card-content">
            <p>{description}</p>
        </div>
        <div className="card-action">
            <button className="btn" onClick={()=>addToBasket({
                id,
                name,
                price,
            })}>Купить</button>
            <span className="right">{price} руб.</span>
        </div>
    </div>

}

export {GoodsItem}