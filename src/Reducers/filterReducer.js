import { CHANGE_RADIUS, CHANGE_POSITIONS, CHANGE_NEW_SEARCH, CHANGE_DATE_RANGE, CHANGE_POPULAR, CHANGE_LANGUAGE, CHANGE_CENTER} from "../Actions/Types";

const initalState = {
    radius : null, 
    position : null,
    newSearch : false, 
    dateRange : {startDate: new Date(new Date().setDate(new Date().getDate() - 7)),
    endDate: new Date()},
    popular : false,
    language : false,
    center : [41.9109, 12.4818]
};

export default function filterReducer(state = initalState, action) {
    switch (action.type) {
        case CHANGE_RADIUS:
            return {
                ...state,
                radius: action.payload.radius,
            };
        case CHANGE_POSITIONS:
            return {
                ...state,
                position: action.payload.position,
            };
        case CHANGE_NEW_SEARCH:
            return {
                ...state,
                newSearch: action.payload.newSearch,
            };
        case CHANGE_DATE_RANGE:
            return {
                ...state,
                dateRange: action.payload.dateRange,
            };
//
        
        default:
            return state;
    }
}

