import {
    CHANGE_RADIUS,
    CHANGE_POSITION,
    CHANGE_NEW_SEARCH,
    CHANGE_SELECTION_RANGE,
    CHANGE_POPULAR,
    CHANGE_ONLY_ITALIAN,
    CHANGE_STREAMING,
    CHANGE_TWEET_MODE,
    CHANGE_TWEET_COUNT
} from "../Actions/Types";

const initalState = {
    radius: null,
    position: null,
    newSearch: false,
    selectionRange: {
        startDate: new Date(new Date().setDate(new Date().getDate() - 7)),

        endDate: new Date(),
    },
    popular: false,
    onlyItalian: false,
    streaming: false,
    twitterMode: false,
    tweetCount: 15
};

export default function filterReducer(state = initalState, action) {
    switch (action.type) {
        case CHANGE_RADIUS:
            return {
                ...state,
                radius: action.payload.radius,
            };

        case CHANGE_POSITION:
            return {
                ...state,
                position: action.payload.position,
            };

        case CHANGE_NEW_SEARCH:
            return {
                ...state,
                newSearch: action.payload.newSearch,
            };

        case CHANGE_SELECTION_RANGE:
            return {
                ...state,
                selectionRange: action.payload.selectionRange,
            };

        case CHANGE_POPULAR:
            return {
                ...state,
                popular: action.payload.popular,
            };

        case CHANGE_ONLY_ITALIAN:
            return {
                ...state,
                onlyItalian: action.payload.onlyItalian,
            };
        case CHANGE_STREAMING:
            return {
                ...state,
                streaming: action.payload.streaming
            }
        case CHANGE_TWEET_MODE:
            return {
                ...state,
                twitterMode: action.payload.twitterMode,
                tweetCount: 15
            }
        case CHANGE_TWEET_COUNT:
            return {
                ...state,
                tweetCount: action.payload.tweetCount,
            }
        default:
            return state;
    }
}
