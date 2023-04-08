import {GoodsItem} from './GoodItem'

function GoodsList (props) {
    const { goods =[], addToBasket = Function.prototype} = props

  // Если товары не переданы, возвращается заголовок "Nothing here"
if (!goods.length) {
    return <h3>Nothing here</h3>;
}

// Иначе отображается блок с классом 'goods', в котором для каждого товара из списка вызывается компонент GoodsItem с передачей ему свойств товара и функции addToBasket
return (
    <div className='goods'>
        {goods.map(item => (
            <GoodsItem key={item.id} {...item} addToBasket={addToBasket}/>
        ))}
    </div>
);
}

export {GoodsList}