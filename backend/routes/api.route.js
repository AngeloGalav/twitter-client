const router = require("express").Router();
const Twitter = require("twitter");

// ci logghiamo in modalita application,
// in modo che possiamo leggere un sacco di tweet alla volta
var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    bearer_token: process.env.TWITTER_BEARER_TOKEN,
});

//ricerca per keyword
router.get("/Keyword", async (req, res, next) => {
    try {
        var params = req.query;
        if (!params) return;
        let filterObj = {};
        filterObj.q = params.q;
        filterObj.result_type = "mixed";
        filterObj.tweet_mode = "extended";
        params.position != "null" && params.radius != "null"
            ? (filterObj.geocode = `${params.position},${params.radius}km`)
            : (filterObj = filterObj);

        const tweet = await client.get("search/tweets.json", filterObj);

        res.status(200).json({ ...tweet });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

//ricerca per hashtag
router.get("/Hashtag", async (req, res, next) => {
    try {
        var params = req.query;
        if (!params) return;
        let filterObj = {};
        filterObj.q = `%23${params.q}`;
        filterObj.result_type = "mixed";
        filterObj.tweet_mode = "extended";
        params.position != "null" && params.radius != "null"
            ? (filterObj.geocode = `${params.position},${params.radius}km`)
            : (filterObj = filterObj);

        const tweet = await client.get("search/tweets.json", filterObj);

        res.status(200).json({ ...tweet });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

//ricerca per username
router.get("/Username", async (req, res, next) => {
    try {
        var params = req.query;
        if (!params) return;
        let filterObj = {};
        filterObj.q = `from:${params.q}`;
        filterObj.result_type = "mixed";
        filterObj.tweet_mode = "extended";
        params.position != "null" && params.radius != "null"
            ? (filterObj.geocode = `${params.position},${params.radius}km`)
            : (filterObj = filterObj);

        const tweet = await client.get("search/tweets.json", filterObj);

        res.status(200).json({ ...tweet });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

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

module.exports = router;
