import { CHANGE_THEME } from "../Actions/Types";

const initalState = {
    theme: "light",
};

export default function userReducer(state = initalState, action) {
    switch (action.type) {
        case CHANGE_THEME:
            return {
                ...state,
                theme: action.payload.theme,
            };
        default:
            return state;
    }
}
