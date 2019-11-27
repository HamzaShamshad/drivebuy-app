import { REGESTERED_USER } from "../actions/registered";



export function register(state = [], action){
    switch(action.type) {
        case REGESTERED_USER:
            return [ action.user_obj ]  
        default:
            return state;
    }
}
