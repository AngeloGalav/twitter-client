const router = require('express').Router();
const Twitter = require('twitter')

// ci logghiamo in modalita application,
// in modo che possiamo leggere un sacco di tweet alla volta
var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  bearer_token: process.env.TWITTER_BEARER_TOKEN
});

router.get('/', async (req, res, next) => {
  try{

    // ricerca per keyword tramite parametro nella query
    var keyword = req.query.keyword
    param_string = keyword ? '?q=' + keyword  + '&result_type=popular' : ''
    const tweet = await client.get('search/tweets.json' + param_string, {id: 1})

    res.send(tweet.statuses[0].text);

  } catch (error){
    next(error);
  }
});

module.exports = router;
