import { CURRENT_USER } from "../actions/userDetail";



export function user(state = [], action){
    switch(action.type) {
        case CURRENT_USER:
            return [ 
                action.user_obj
            ]  
        default:
            return state;
    }
}



