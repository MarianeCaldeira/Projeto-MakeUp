import { action } from "typesafe-actions";
import { CartsTypes } from './types';

export const addToCart = (product) => {
    return action(CartsTypes.ADD_TO_CART, product)
}

export const removeFromCart = (id) => {
    return action(CartsTypes.REMOVE_FROM_CART, {id})
}

export const updateAmount = (id,amount) => {
    return action(CartsTypes.UPDATE_AMOUNT, {id,amount})
}