import { CURRENT_USER , ADD_TO_CART,REMOVE_FROM_CART} from "../actions/userDetail";



export function user(state = [], action){
    switch(action.type) {
        case CURRENT_USER:
            return [ action.user_obj ]  
        case ADD_TO_CART:
            return [...state, action.payload]
        case REMOVE_FROM_CART:
            return state.filter(cartItem=>cartItem.id !== action.payload.id)
        default:
            return state;
    }
}



