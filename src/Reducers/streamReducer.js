import { UPDATE_STREAM, EMPTY_STREAM } from "../Actions/Types";

const initalState = {
    streamingStatuses: [],
};

export default function userReducer(state = initalState, action) {
    switch (action.type) {
        case UPDATE_STREAM:
            return {
                ...state,
                streamingStatuses: (state.streamingStatuses.length < 100 ? [...state.streamingStatuses, action.payload.tweet] : [...state.streamingStatuses.slice(Math.ceil(state.streamingStatuses.length / 2), state.streamingStatuses.length), action.payload.tweet])
            }
        case EMPTY_STREAM:
            return {
                ...state,
                streamingStatuses: []
            }
        default:
            return state;
    }
}
