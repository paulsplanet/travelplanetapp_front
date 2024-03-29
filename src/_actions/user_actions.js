import axios from 'axios';
import { USER_SERVER } from '../components/Config.js';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_TO_CART,
    GET_CART_ITEMS,
    REMOVE_CART_ITEM,
    ON_SUCCESS_BUY,
    ADD_TO_MYPICK,
    REMOVE_MYPICK_ITEM,
} from './types';

// import { response } from 'express';

export function registerUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/register`,dataToSubmit)
        .then(response => response.data);
    
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/login`,dataToSubmit, { withCredentials: true })
                .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function auth(){
    const request = axios.get(`${USER_SERVER}/auth`, { withCredentials: true })
    .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser(){
    const request = axios.get(`${USER_SERVER}/logout`, { withCredentials: true })
    .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

export function addToCart(id){
    let body = {
        productId: id
    }

    const request = axios.post(`${USER_SERVER}/addToCart`, body, { withCredentials: true })
        .then(response => response.data);

    return {
        type: ADD_TO_CART,
        payload: request
    }
}

export function getCartItems(cartItems, userCart) {
    
    const request = axios.get(`https://travelplanetserver.herokuapp.com/api/product/products_by_id?id=${cartItems}&type=array`)
        .then(response => {
            userCart.forEach(cartItem => {
                response.data.forEach((productDetail, index) => {
                    if(cartItem.id === productDetail._id) {
                        response.data[index].quantity = cartItem.quantity
                    }
                })
            })

            return response.data        
        });

    return {
        type: GET_CART_ITEMS,
        payload: request
    }
}

export function removeCartItem(productId) {
    
    const request = axios.get(`https://travelplanetserver.herokuapp.com/api/users/removeFromCart?id=${productId}`, { withCredentials: true })
        .then(response => {
            response.data.cart.forEach(item => {
                response.data.productInfo.forEach((product, index) => {
                    if(item.id === product._id) {
                        response.data.productInfo[index].quantity = item.quantity
                    }
                })
            })

            return response.data        
        });

    return {
        type: REMOVE_CART_ITEM,
        payload: request
    }
}

export function onSuccessBuy(data) {
    
    const request = axios.post(`https://travelplanetserver.herokuapp.com/api/users/successBuy`, data, { withCredentials: true })
        .then(response => response.data);

    return {
        type: ON_SUCCESS_BUY,
        payload: request
    }
}

export function addToMyPick(id){
    let body = {
        productId: id
    }

    const request = axios.post(`${USER_SERVER}/addToMyPick`, body, { withCredentials: true })
        .then(response => response.data);

    return {
        type: ADD_TO_MYPICK,
        payload: request
    }
}

export function removeMyPickItem(productId) {
    
    const request = axios.get(`https://travelplanetserver.herokuapp.com/api/users/removeFromMyPick?id=${productId}`, { withCredentials: true })
        .then(response => response.data)

    return {
        type: REMOVE_MYPICK_ITEM,
        payload: request
    }
}
