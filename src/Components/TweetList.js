//components
import Tweet from "./Tweet";

import { TwitterApi } from "twitter-api-v2";

// import {useState} from "react";

// DISCLAIMER: SICCOME LE API DI TWITTER NON ABILITANO IL CORS, NON POSSIAMO FARE RICHIESTE/RICEVERE RISPOSTE DA UNA BROWSER APP,
// BENSI E' NECESSARIO CREARE UN SERVER PROXY (OVVERO UN SERVER MIDDLEWARE, CHE STA NEL MEZZO) CON NODEJS.

/*
QUESTE (ASSIEME AL BEARER TOKEN QUI SOTTO) SONO VALORI IMPORTANTI CHE CI SERVONO PER LOGGARE LA NOSTRA APP SU TWITTER

const user = new Twitter({
  consumer_key: "9Do51SWwjcRQpBGheiEaZAORh",
  consumer_secret: "AWG7X1Hr24bYHqDudjuroI7o8DjAq8r42bcOxI87snnkn4QGOY",
  access_token_key: "1448259020637212676-Komo8dJXszXCCZwHivq7fvHeZro43h",
  access_token_secret: "bjnhJOJjDYqpHR2owRie4ypNJdADepBh1bmTSg8SdqSlA"
});

*/

export const TweetList = () => {
    //const MY_BEARER_TOKEN = 'AAAAAAAAAAAAAAAAAAAAAEubVAEAAAAAKCxUBGiiiPqLoSw39uwOc6xLXEI%3DsgF83neaDxkh08z9yuJ3RQwE2PTUY0Tr5Xr8FX4c3TKcIarxqa';
    const client = new TwitterApi(
        "AAAAAAAAAAAAAAAAAAAAAEubVAEAAAAAKCxUBGiiiPqLoSw39uwOc6xLXEI%3DsgF83neaDxkh08z9yuJ3RQwE2PTUY0Tr5Xr8FX4c3TKcIarxqa"
    );
    //const [tweets, setTweets] = useState([]);

    /*
  const getTweet = async () => {
    const foundUsers = await client.v1.searchUsers('alki');
    console.log(foundUsers);
  }*/

    return (
        <ul
            id="twitter-list-container"
            className="list-none laptop:overflow-y-auto h-full flex flex-col gap-4 smartphone:px-4"
        >
            <Tweet
                tweet={{
                    text: "Testo di prova",
                    created_at: new Date(),
                    retweet_count: 0,
                    favorite_count: 0,
                    comment_count: 0,
                    image: "https://scontent.faoi1-1.fna.fbcdn.net/v/t45.1600-4/cp0/q90/spS444/p526x296/25512597_23842814002640488_7683803252546076672_n.png.jpg?_nc_cat=103&ccb=1-5&_nc_sid=68ce8d&_nc_ohc=zoBppQJ08rgAX8sW0bf&_nc_ht=scontent.faoi1-1.fna&oh=57befabfd86f767b675cccfe5e0717d1&oe=61981963",
                    user: {
                        profile_image_url:
                            "https://scontent.ffco3-1.fna.fbcdn.net/v/t1.6435-1/cp0/p40x40/159815637_283650673113103_2245126220456639466_n.jpg?_nc_cat=1&ccb=1-5&_nc_sid=c6021c&_nc_ohc=HFWW9GS2E-QAX_kxFwG&_nc_ht=scontent.ffco3-1.fna&oh=9a030a762572bfda0d715386f0063dba&oe=61B8ED2F",
                        name: "Demo name",
                        screen_name: "Demo_name",
                    },
                }}
            />

            <Tweet
                tweet={{
                    text: "Testo di prova",
                    created_at: new Date(),
                    retweet_count: 0,
                    favorite_count: 0,
                    comment_count: 0,
                    image: "https://scontent.faoi1-1.fna.fbcdn.net/v/t45.1600-4/cp0/q90/spS444/p526x296/25512597_23842814002640488_7683803252546076672_n.png.jpg?_nc_cat=103&ccb=1-5&_nc_sid=68ce8d&_nc_ohc=zoBppQJ08rgAX8sW0bf&_nc_ht=scontent.faoi1-1.fna&oh=57befabfd86f767b675cccfe5e0717d1&oe=61981963",
                    user: {
                        profile_image_url:
                            "https://scontent.ffco3-1.fna.fbcdn.net/v/t1.6435-1/cp0/p40x40/159815637_283650673113103_2245126220456639466_n.jpg?_nc_cat=1&ccb=1-5&_nc_sid=c6021c&_nc_ohc=HFWW9GS2E-QAX_kxFwG&_nc_ht=scontent.ffco3-1.fna&oh=9a030a762572bfda0d715386f0063dba&oe=61B8ED2F",
                        name: "Demo name",
                        screen_name: "Demo_name",
                    },
                }}
            />
            <Tweet
                tweet={{
                    text: "Testo di prova",
                    created_at: new Date(),
                    retweet_count: 0,
                    favorite_count: 0,
                    comment_count: 0,
                    image: "https://scontent.faoi1-1.fna.fbcdn.net/v/t45.1600-4/cp0/q90/spS444/p526x296/25512597_23842814002640488_7683803252546076672_n.png.jpg?_nc_cat=103&ccb=1-5&_nc_sid=68ce8d&_nc_ohc=zoBppQJ08rgAX8sW0bf&_nc_ht=scontent.faoi1-1.fna&oh=57befabfd86f767b675cccfe5e0717d1&oe=61981963",
                    user: {
                        profile_image_url:
                            "https://scontent.ffco3-1.fna.fbcdn.net/v/t1.6435-1/cp0/p40x40/159815637_283650673113103_2245126220456639466_n.jpg?_nc_cat=1&ccb=1-5&_nc_sid=c6021c&_nc_ohc=HFWW9GS2E-QAX_kxFwG&_nc_ht=scontent.ffco3-1.fna&oh=9a030a762572bfda0d715386f0063dba&oe=61B8ED2F",
                        name: "Demo name",
                        screen_name: "Demo_name",
                    },
                }}
            />

            <Tweet
                tweet={{
                    text: "Testo di prova",
                    created_at: new Date(),
                    retweet_count: 0,
                    favorite_count: 0,
                    comment_count: 0,
                    image: "https://scontent.faoi1-1.fna.fbcdn.net/v/t45.1600-4/cp0/q90/spS444/p526x296/25512597_23842814002640488_7683803252546076672_n.png.jpg?_nc_cat=103&ccb=1-5&_nc_sid=68ce8d&_nc_ohc=zoBppQJ08rgAX8sW0bf&_nc_ht=scontent.faoi1-1.fna&oh=57befabfd86f767b675cccfe5e0717d1&oe=61981963",
                    user: {
                        profile_image_url:
                            "https://scontent.ffco3-1.fna.fbcdn.net/v/t1.6435-1/cp0/p40x40/159815637_283650673113103_2245126220456639466_n.jpg?_nc_cat=1&ccb=1-5&_nc_sid=c6021c&_nc_ohc=HFWW9GS2E-QAX_kxFwG&_nc_ht=scontent.ffco3-1.fna&oh=9a030a762572bfda0d715386f0063dba&oe=61B8ED2F",
                        name: "Demo name",
                        screen_name: "Demo_name",
                    },
                }}
            />
        </ul>
    );
};

export default TweetList;
