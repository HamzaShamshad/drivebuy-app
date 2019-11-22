export  const  CURRENT_USER= "CURRENT_USER"
export const ADD_TO_CART = "ADD_TO_CART"
export const REMOVE_FROM_CART = "REMOVE_FROM_CART"

export const userDetail=(obj) =>{
    return {
        type: CURRENT_USER,
        user_obj: obj
    }
}

export const addToList = (payload) =>{
    return{
        type: ADD_TO_CART,
        payload
    }
}
export const removeFromList = (payload) =>{
    return{
        type: REMOVE_FROM_CART,
        payload
    }
}
