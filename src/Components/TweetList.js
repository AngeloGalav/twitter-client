//components
import Tweet from "./Tweet";
import notFoundTweets from "../Media/undraw_not_found_-60-pq.svg"

import { useSelector } from "react-redux";

export const TweetList = ({ setCenter }) => {

    //redux stuff
    const { statuses } = useSelector((state) => state.tweetReducer);

    
    return (
        <div className="laptop:overflow-y-auto h-full smartphone:px-4 noScrollBar">
            {statuses.length > 0 ? (
                <>
                    <ul className="list-none flex flex-col gap-4 py-4">
                        {statuses.map((tweet) => (
                            <Tweet
                                key={tweet.id}
                                setCenter={setCenter}
                                tweet={{
                                    id_str: tweet.id_str,
                                    text: `${
                                        tweet.retweeted_status
                                            ? `${tweet.retweeted_status.full_text.substring(
                                                  tweet.retweeted_status
                                                      .display_text_range[0],
                                                  tweet.retweeted_status
                                                      .display_text_range[1]
                                              )}`
                                            : `${tweet.full_text.substring(
                                                  tweet.display_text_range[0],
                                                  tweet.display_text_range[1]
                                              )}`
                                    }`,
                                    retweet: `${
                                        tweet.retweeted_status
                                            ? `${tweet.entities.user_mentions[0].screen_name}`
                                            : ""
                                    }`,
                                    created_at: new Date(tweet.created_at),
                                    retweet_count:
                                        tweet.retweeted_status == null
                                            ? tweet.retweet_count
                                            : tweet.retweeted_status
                                                  .retweet_count,
                                    favorite_count:
                                        tweet.retweeted_status == null
                                            ? tweet.favorite_count
                                            : tweet.retweeted_status
                                                  .favorite_count,
                                    comment_count: "", // è disponibile solo per Api di tipo enterprise, quindi non possiamo saperlo
                                    image: `${
                                        tweet.entities.media
                                            ? `${tweet.entities.media[0].media_url}`
                                            : ""
                                    }`,
                                    user: {
                                        profile_image_url:
                                            tweet.user.profile_image_url,
                                        name: tweet.user.name,
                                        screen_name: tweet.user.screen_name,
                                    },
                                    place: tweet.place,
                                    isVerified: tweet.user.verified
                                }}
                            />
                        ))}
                    </ul>
                </>
            ) : (
                <div style={{height: "calc(100% - 2rem)"}} className="flex flex-col mt-8 px-4 gap-20 laptop:gap-0 items-center">
                    <p className="w-full text-left text-base">Nessun risultato trovato ... <i class="bi bi-emoji-frown"></i></p>
                    <div className="w-full h-full flex justify-center items-center">
                    <img className="max-w-md mx-auto w-full" src={notFoundTweets} alt="" />
                    </div>
                    
                </div>
            )}
        </div>
    );
};

export default TweetList;
