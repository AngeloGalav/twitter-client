import { TWEET_REQUEST, TWEET_SUCCESS, TWEET_FAIL } from "../Actions/Types";

const initalState = {
    statuses: [],
    wordCloud: null,
    sentimentAnalysis: null,
    generalStats: null,
    isLoading: false,
    coordinates: null,
};

export default function userReducer(state = initalState, action) {
    switch (action.type) {
        case TWEET_SUCCESS:
            return {
                ...state,
                isLoading: false,
                statuses: action.payload.statuses,
                wordCloud: action.payload.wordCloud,
                sentimentAnalysis: action.payload.sentimentAnalysis,
                coordinates: action.payload.coordinates,
                generalStats: action.payload.generalStats
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
                streamingStatuses: [],
                wordCloud: null,
                sentimentAnalysis: null,
                coordinates: null,
                generalStats: null
            }
        default:
            return state;
    }
}
