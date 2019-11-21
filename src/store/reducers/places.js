import { CURRENT_USER} from "../actions/actionTypes";

const initialState = {
    places: [],
    selectedPlace: null,
    searchedPlace: {},
    dataSource:[],
    searchedData: {},
    currentUser:{}
};

const reducer = (state = initialState, action   ) => {
    switch(action.type) {
        
        case CURRENT_USER:
            return {                // same return javascript obj as in action creator  
                ...state,           // old state
                currentUser: action.user_obj
            }
        default:
            return state;

    }
};

export default reducer;