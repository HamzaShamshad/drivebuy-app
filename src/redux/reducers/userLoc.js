import { CURRENT_LOC } from "../actions/userLoc";



export function user_loc(state = [], action){
    switch(action.type) {
        case CURRENT_LOC:
            return [ action.curr_loc ]
        default:
            return state;
    }
}