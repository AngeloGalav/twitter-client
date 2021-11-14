const router = require('express').Router();
const Twitter = require('twitter')

// ci logghiamo in modalita application, in modo che possiamo leggere un sacco di tweet alla volta
var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  bearer_token: process.env.TWITTER_BEARER_TOKEN
});

router.get('/', async (req, res, next) => {
  try{

  const tweet = await client.get('trends/place.json', {id: 1}) // per ora mostra solo le tendenza del paese con id 1 (ovvero i trend nel mondo intero)

  res.status(200).json(tweet);

  } catch (error){
    next(error);
  }
});

router.get("/sampleTweets", async (req, res, next) => {

  try {

    const data = await client.get("search/tweets", {q: "football", result_type: "popular", tweet_mode: "extended"})

    res.status(200).json(data);

  } catch (error) {
    console.log(error)
    next(error)
  }
});

module.exports = router;
