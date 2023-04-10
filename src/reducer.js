export function reducer(state, { type, payload }) {
    switch (type) {
        // Устанавливаем список товаров
        case 'SET_GOODS':
            return {
                ...state,
                goods: payload || [], // если payload не определен, то пустой массив
                loading: false,
            };
            // Добавляем товар в корзину

        case 'ADD_TO_BASKET': {
            // Ищем индекс товара в корзине по его id
            const itemIndex = state.order.findIndex(
                (orderItem) => orderItem.id === payload.id
            );

            let newOrder = null;
                    // Если товара еще нет в корзине, то добавляем его

            if (itemIndex < 0) {
                const newItem = {
                    ...payload,
                    quantity: 1,
                };
                newOrder = [...state.order, newItem];
            } else { // Иначе увеличиваем количество товара на 1
                newOrder = state.order.map((orderItem, index) => {
                    if (index === itemIndex) {
                        return {
                            ...orderItem,
                            quantity: orderItem.quantity + 1,
                        };
                    } else {
                        return orderItem;
                    }
                });
            }

            return {
                ...state,
                order: newOrder,
                alertName: payload.name,
            };
        }
            // Удаляем товар из корзины

        case 'REMOVE_FROM_BASKET':
            return {
                ...state,
                order: state.order.filter((el) => el.id !== payload.id),
            };
                // Увеличиваем количество товара на 1
        case 'INCREMENT_QUANTITY':
            return {
                ...state,
                order: state.order.map((el) => {
                    if (el.id === payload.id) {
                        const newQuantity = el.quantity + 1;
                        return {
                            ...el,
                            quantity: newQuantity,
                        };
                    } else {
                        return el;
                    }
                }),
            };
                // Уменьшаем количество товара на 1

        case 'DECREMENT_QUANTITY':
            return {
                ...state,
                order: state.order.map((el) => {
                    if (el.id === payload.id) {
                        const newQuantity = el.quantity - 1;
                        return {
                            ...el,
                            quantity: newQuantity >= 0 ? newQuantity : 0,
                        };
                    } else {
                        return el;
                    }
                }),
            };
                // Закрываем уведомление

        case 'CLOSE_ALERT':
            return {
                ...state,
                alertName: '',
            };
                // Показываем/скрываем корзину

        case 'TOGGLE_BASKET':
            return {
                ...state,
                isBasketShow: !state.isBasketShow,
            };
                // Возвращаем текущее состояние, если действие неизвестно
        default:
            return state;
    }
}