import { createContext, useReducer } from 'react';
import { reducer } from './reducer';
// экспортируем созданный контекст

export const ShopContext = createContext();
// задаем начальное состояние для хранилища

const initialState = {
    goods: [],
    loading: true,
    order: [],
    isBasketShow: false,
    alertName: '',
};
// экспортируем провайдер контекста

export const ContextProvider = ({ children }) => {
    // определяем методы для обновления состояния приложения через dispatch
    const [value, dispatch] = useReducer(reducer, initialState);

    value.closeAlert = () => {
        dispatch({ type: 'CLOSE_ALERT' });
    };

    value.addToBasket = (item) => {
        dispatch({ type: 'ADD_TO_BASKET', payload: item });
    };

    value.incQuantity = (itemId) => {
        dispatch({ type: 'INCREMENT_QUANTITY', payload: { id: itemId } });
    };

    value.decQuantity = (itemId) => {
        dispatch({ type: 'DECREMENT_QUANTITY', payload: { id: itemId } });
    };

    value.removeFromBasket = (itemId) => {
        dispatch({ type: 'REMOVE_FROM_BASKET', payload: { id: itemId } });
    };

    value.handleBasketShow = () => {
        dispatch({ type: 'TOGGLE_BASKET' });
    };

    value.setGoods = (data) => {
        dispatch({ type: 'SET_GOODS', payload: data });
    };
// возвращаем провайдер контекста с переданными в него значениями

    return (
        <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
    );
};