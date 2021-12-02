import axios from "axios";
import { TWEET_REQUEST, TWEET_SUCCESS, TWEET_FAIL } from "../Actions/Types";

export const getTweetsAction = (params, location) => async (dispatch) => {
    //inizia la richiesta di fetching tweets
    dispatch({ type: TWEET_REQUEST, payload: {} });

    try {
        const { data } = await axios.get(
            `/api/${location.pathname.substring(
                location.pathname.lastIndexOf("/") + 1
            )}?${params}`
        );

        dispatch({
            type: TWEET_SUCCESS,
            payload: {
                statuses: data.statuses || [],
                wordCloud: data.wordCloud,
                sentimentAnalysis: data.sentimentAnalysis
            },
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: TWEET_FAIL,
        });
    }
};
