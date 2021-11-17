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
    var params = req.query
    console.log(params);
    if (!params) return
    param_string = '?q=' + params['q']; 
    // if (params['keyword']) param_string += params['keyword']
    // if (params['username']) param_string += 'from%3A' + params['username']
    // if (params['hashtag']) param_string += '%20%23' + params['hashtag']
    param_string += '&result_type=popular'
    const tweet = await client.get('search/tweets.json' + param_string, {id: 1, tweet_mode: 'extended'});

    res.status(200).json({... tweet});

  } catch (error){
    next(error);
  }
});

module.exports = router;
