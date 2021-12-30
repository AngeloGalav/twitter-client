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

        const coordinates = new Map();
        
        //costruisce una mappa del tipo
        //[coordinate] = {numero di coordinate uguali presenti, lista di indici che si rifanno ai tweet in questione}
        data.statuses?.forEach((tweet, i) => {
            if (tweet.place) {
                const key = [
                    tweet.place.bounding_box.coordinates[0][0][1],
                    tweet.place.bounding_box.coordinates[0][0][0],
                ].toString();
                
                if (coordinates.has(key)) {
                    coordinates.set(key, {
                        value: coordinates.get(key).value + 1,
                        index: [...coordinates.get(key).index, i]
                    });
                } else {
                    coordinates.set(key, {
                        value: 1,
                        index: [ i ]
                    });
                }
            }
        });


        dispatch({
            type: TWEET_SUCCESS,
            payload: {
                statuses: data.statuses || [],
                wordCloud: data.wordCloud,
                sentimentAnalysis: data.sentimentAnalysis,
                coordinates: Object.fromEntries(coordinates),
                generalStats: data.generalStats
            },
        });

        return Promise.resolve();
    } catch (error) {
        console.log(error);
        dispatch({
            type: TWEET_FAIL,
        });
        return Promise.reject();
    }
};
