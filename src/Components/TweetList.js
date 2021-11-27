//components
import Tweet from "./Tweet";

export const TweetList = ({ tweets }) => {
    return (
        <ul
            id="twitter-list-container"
            className="list-none laptop:overflow-y-auto h-full flex flex-col gap-4 smartphone:px-4 py-4"
        >
            {tweets.length > 0 ? (
               tweets.map(tweet => (
                <Tweet key={tweet.id}
                    tweet={{
                        id_str: tweet.id_str,
                        text: `${tweet.retweeted_status ? `${tweet.retweeted_status.full_text.substring(tweet.retweeted_status.display_text_range[0], tweet.retweeted_status.display_text_range[1])}` : `${tweet.full_text.substring(tweet.display_text_range[0], tweet.display_text_range[1])}`}`,
                        retweet: `${tweet.retweeted_status ? `${tweet.entities.user_mentions[0].screen_name}` : ""}`,
                        created_at: new Date(tweet.created_at),
                        retweet_count:
                            tweet.retweeted_status == null
                                ? tweet.retweet_count
                                : tweet.retweeted_status.retweet_count,
                        favorite_count:
                            tweet.retweeted_status == null
                                ? tweet.favorite_count
                                : tweet.retweeted_status.favorite_count,
                        comment_count: "", // è disponibile solo per Api di tipo enterprise, quindi non possiamo saperlo
                        image: `${tweet.entities.media ? `${tweet.entities.media[0].media_url}` : ""}`,
                        user: {
                            profile_image_url: tweet.user.profile_image_url,
                            name: tweet.user.name,
                            screen_name: tweet.user.screen_name,
                        },
                    }}
                />
            ))
            ) : (
                <p>Nessun risultato trovato ...</p>
            )}
        </ul>
    );
};

export default TweetList;
