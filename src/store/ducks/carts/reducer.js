import produce from 'immer';
import { CartsTypes } from './types';

const INITIAL_STATE = {
    products: []
}

export default function carts(state = INITIAL_STATE, action = null) {
    console.log(action)
    const addToCart = () => {
        const currentProductIndex = state.products.findIndex(
            product => product.id === action.payload.id,
        );
        if (currentProductIndex < 0) {
            const nextState = [...state.products, { ...action.payload, amount: 1 }];
            return nextState;
        }
        state.products[currentProductIndex].amount += 1;

        return state.products;
    }

    const updateAmount = () => {
        if (action.payload.amount === 0) {
            // state = state.filter((product) => product.id !== action.payload.id);
            return state.products;
        }

        let products = state.products.map(product => {
            if (product.id === action.payload.id){
                return {...product, amount: action.payload.amount}
            }

            return product;
        });

        return products;
    }

return produce(state, newState => {
    switch (action.type) {
        case CartsTypes.ADD_TO_CART:
            newState.products = addToCart()
            break;
        case CartsTypes.REMOVE_FROM_CART:
            newState.products = state.products(product => product.id !== action.payload.id);
            break;
        case CartsTypes.UPDATE_AMOUNT:
            newState.products = updateAmount()
            break;
        default:
            break;
    }
})
}