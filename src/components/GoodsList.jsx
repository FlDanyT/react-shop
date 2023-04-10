import {GoodsItem} from './GoodItem'
import { ShopContext } from '../context';
import { useContext } from 'react';

function GoodsList () {
    const { goods =[]} = useContext(ShopContext)

  // Если товары не переданы, возвращается заголовок "Nothing here"
if (!goods.length) {
    return <h3>Nothing here</h3>;
}

// Иначе отображается блок с классом 'goods', в котором для каждого товара из списка вызывается компонент GoodsItem с передачей ему свойств товара и функции addToBasket
return (
    <div className='goods'>
        {goods.map(item => (
            <GoodsItem key={item.id} {...item}/>
        ))}
    </div>
);
}

export {GoodsList}