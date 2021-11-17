//components
import Tweet from "./Tweet";

export const TweetList = ({tweets}) => {
    
    if (tweets != null)
    {
        const content = tweets.map((tweet) =>
        <Tweet
                tweet={{
                    text: tweet.text,
                    created_at: tweet.created_at,
                    retweet_count: tweet.retweeted_status == null ? tweet.retweet_count : tweet.retweeted_status.retweet_count,
                    favorite_count: tweet.retweeted_status == null ? tweet.favorite_count : tweet.retweeted_status.favorite_count,
                    comment_count: 0, // è disponibile solo per Api di tipo enterprise, quindi non possiamo saperlo
                    image: "https://scontent.faoi1-1.fna.fbcdn.net/v/t45.1600-4/cp0/q90/spS444/p526x296/25512597_23842814002640488_7683803252546076672_n.png.jpg?_nc_cat=103&ccb=1-5&_nc_sid=68ce8d&_nc_ohc=zoBppQJ08rgAX8sW0bf&_nc_ht=scontent.faoi1-1.fna&oh=57befabfd86f767b675cccfe5e0717d1&oe=61981963",
                    user: {
                        profile_image_url:
                            tweet.user.profile_image_url,
                        name: tweet.user.name,
                        screen_name: tweet.user.screen_name,
                    },
                }}
            />
        );
    }

    return (
        <ul
            id="twitter-list-container"
            className="list-none laptop:overflow-y-auto h-full flex flex-col gap-4 smartphone:px-4 py-4"
        >
            {content}
        </ul>
    );
};

export default TweetList;
