import { TwitterApi } from 'twitter-api-v2';
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
  const client = new TwitterApi('AAAAAAAAAAAAAAAAAAAAAEubVAEAAAAAKCxUBGiiiPqLoSw39uwOc6xLXEI%3DsgF83neaDxkh08z9yuJ3RQwE2PTUY0Tr5Xr8FX4c3TKcIarxqa');
  //const [tweets, setTweets] = useState([]);

  /*
  const getTweet = async () => {
    const foundUsers = await client.v1.searchUsers('alki');
    console.log(foundUsers);
  }*/
  
  return (
    <div>
  
    </div>
  )
}

export default TweetList;