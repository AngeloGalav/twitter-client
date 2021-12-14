import React from "react";
import { useSelector } from "react-redux";
import TweetMessage from "./TweetMessage";

const StreamingTab = () => {

     //redux stuff
     const { streamingStatuses } = useSelector((state) => state.streamReducer);
    
    return (
        <div className="laptop:overflow-y-auto h-full smartphone:px-4 text noScrollBar">
            {streamingStatuses.length > 0 ? (
                <>
                    <ul className="list-none flex flex-col gap-4 text- py-4 bg">
                        {streamingStatuses.map((tweet) => (
                            <TweetMessage
                                tweet={{
                                    created_at: new Date(tweet.created_at).toLocaleTimeString("it-IT", {hour: "2-digit", minute: "2-digit"}),
                                    id_str: tweet.id_str,
                                    text: `${
                                        tweet.retweeted_status
                                            ? (!tweet.retweeted_status
                                                  .extended_tweet
                                                ? tweet.retweeted_status.text
                                                : tweet.retweeted_status.extended_tweet.full_text?.substring(
                                                      tweet.retweeted_status
                                                          .extended_tweet
                                                          ?.display_text_range[0],
                                                      tweet.retweeted_status
                                                          .extended_tweet
                                                          ?.display_text_range[1]
                                                  ))
                                            : (tweet.text)
                                    }`,
                                    user: {
                                        profile_image_url:
                                            tweet.user?.profile_image_url,
                                        name: tweet.user?.name || "User",
                                        screen_name: tweet.user?.screen_name || "Username",
                                    },
                                    color: `${
                                        tweet.user?.screen_name.length < 10
                                            ? "cyan"
                                            : tweet.user?.screen_name.length < 15
                                            ? "deep-orange"
                                            : "pink"
                                    }`,
                                    image: `${
                                        tweet.entities?.media
                                            ? `${tweet.entities.media[0].media_url}`
                                            : ""
                                    }`,
                                    retweet: `${
                                        tweet.retweeted_status
                                            ? `${tweet.entities.user_mentions[0].screen_name}`
                                            : ""
                                    }`,
                                }}
                            />
                        ))}
                    </ul>
                </>
            ) : (
                <div
                    style={{ height: "calc(100% - 2rem)" }}
                    className="flex flex-col mt-8 gap-20 laptop:gap-0 items-center justify-center"
                >
                    Ancora nessun messaggio ...
                </div>
            )}
        </div>
    );
};

export default StreamingTab;
