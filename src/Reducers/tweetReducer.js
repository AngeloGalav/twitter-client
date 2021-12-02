import { TWEET_REQUEST, TWEET_SUCCESS, TWEET_FAIL } from "../Actions/Types";

const initalState = {
    statuses: [],
    wordCloud: null,
    sentimentAnalysis: null,
    isLoading: false
};

export default function userReducer(state = initalState, action) {
    switch (action.type) {
        case TWEET_SUCCESS:
            return {
                ...state,
                isLoading: false,
                statuses: action.payload.statuses,
                wordCloud: action.payload.wordCloud,
                sentimentAnalysis: action.payload.sentimentAnalysis
            };
        case TWEET_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case TWEET_FAIL:
            return {
                ...state,
                isLoading: false,
                statuses: [],
                wordCloud: null,
                sentimentAnalysis: null
            }
        default:
            return state;
    }
}
