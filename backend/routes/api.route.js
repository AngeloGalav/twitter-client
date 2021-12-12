const router = require("express").Router();
const Twitter = require("twitter");
const Twitterv2 = require("twitter-v2");
const {createWordCloud} = require("../middleware/createWordCloud")
const {sentimentAnalysis} = require("../middleware/sentimentAnalysis")

// ci logghiamo in modalita application,
// in modo che possiamo leggere un sacco di tweet alla volta
var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    bearer_token: process.env.TWITTER_BEARER_TOKEN,
});

// var clientStream = new Twitter({
//     consumer_key: process.env.TWITTER_CONSUMER_KEY,
//     consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
//     access_token_key: process.env.TWITTER_ACCESS_TOKEN,
//     access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
// })

// var clientv2 = new Twitterv2({
//     bearer_token: process.env.TWITTER_BEARER_TOKEN,
// });

// // codice per lo streaming 
// async function listenForever(streamFactory, dataConsumer) {
//     try {
//       for await (const { data } of streamFactory()) {
//         dataConsumer(data);
//       }
//       // The stream has been closed by Twitter. It is usually safe to reconnect.
//       console.log('Stream disconnected healthily. Reconnecting.');
//       listenForever(streamFactory, dataConsumer);
//     } catch (error) {
//       // An error occurred so we reconnect to the stream. Note that we should
//       // probably have retry logic here to prevent reconnection after a number of
//       // closely timed failures (may indicate a problem that is not downstream).
//       console.warn('Stream disconnected with error. Retrying.', error);
//       listenForever(streamFactory, dataConsumer);
//     }
// }





//ricerca per keyword
router.get("/Keyword", async (req, res, next) => {
    try {
        var params = req.query;
        if (!params) return;
        let filterObj = {};
        filterObj.q =
            params.q + ` since:${params.startDate} until:${params.endDate}`;
        filterObj.result_type = `${
            params.popular === "true" ? "popular" : "mixed"
        }`;
        params.onlyItalian === "true"
        ? (filterObj.lang = "it")
        : (filterObj = filterObj);
        filterObj.tweet_mode = "extended";
        params.position != "null" && params.radius != "null"
            ? (filterObj.geocode = `${params.position},${params.radius}km`)
            : (filterObj = filterObj);

        const tweet = await client.get("search/tweets.json", filterObj);

        req.data = tweet
        return next()
        //res.status(200).json({ ...tweet });
    } catch (error) {
        console.log(error);
        next(error);
    }
}, sentimentAnalysis, createWordCloud);

//ricerca per hashtag
router.get("/Hashtag", async (req, res, next) => {
    try {
        var params = req.query;
        if (!params) return;
        let filterObj = {};
        filterObj.q = `%23${params.q} since:${params.startDate} until:${params.endDate}`;
        filterObj.result_type = `${
            params.popular === "true" ? "popular" : "mixed"
        }`;
        filterObj.tweet_mode = "extended";
        params.onlyItalian === "true"
            ? (filterObj.lang = "it")
            : (filterObj = filterObj);
        params.position != "null" && params.radius != "null"
            ? (filterObj.geocode = `${params.position},${params.radius}km`)
            : (filterObj = filterObj);

        const tweet = await client.get("search/tweets.json", filterObj);

        req.data = tweet
        return next()
        
    } catch (error) {
        console.log(error);
        next(error);
    }
}, sentimentAnalysis, createWordCloud);

//ricerca per username
router.get("/Username", async (req, res, next) => {
    try {
        var params = req.query;
        if (!params) return;
        let filterObj = {};
        filterObj.q = `from:${params.q} since:${params.startDate} until:${params.endDate}`;
        filterObj.result_type = `${
            params.popular === "true" ? "popular" : "mixed"
        }`;
        params.onlyItalian === "true"
        ? (filterObj.lang = "it")
        : (filterObj = filterObj);
        filterObj.tweet_mode = "extended";
        params.position != "null" && params.radius != "null"
            ? (filterObj.geocode = `${params.position},${params.radius}km`)
            : (filterObj = filterObj);

        const tweet = await client.get("search/tweets.json", filterObj);

        req.data = tweet
        return next()

    } catch (error) {
        console.log(error);
        next(error);
    }
}, sentimentAnalysis, createWordCloud);

router.get("/trends", async (req, res, next) => {
    try {
        var params = req.query;
        const tweet = await client.get("trends/place.json", { id: params.id });

        res.status(200).json({ ...tweet });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// router.get("/stream", async (req, res, next) => {
//     clientStream.stream('statuses/filter', {track: 'javascript'}, stream => {
//         stream.on('data', tweet => {
//             res.status(200).json({test: tweet.text});
//     });
   
//     stream.on('error', error => {
//       throw error;
//       console.log(error)
//     });
//   });
// });

module.exports = router;