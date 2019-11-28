import { REGESTERED_USER, IS_LOADING } from "../actions/registered";


const initialState = {
    loading: false
}

export function register(state = initialState, action){
    switch(action.type) {
        case REGESTERED_USER:
            return [ action.user_obj ] 
        case IS_LOADING: 
            return {
                loading: action.payload
            }
        default:
            return state;
    }
}
