// action creator file
// serves as factory which spits out actions

import { CURRENT_USER} from "./actionTypes";

// actions are just javascript objects

export const userData = (obj) => {
    return {
        type: CURRENT_USER,
        user_obj: obj
    }
}

