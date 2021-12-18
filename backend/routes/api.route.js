const router = require("express").Router();
const Twitter = require("twitter");
const {createWordCloud} = require("../middleware/createWordCloud")
const {sentimentAnalysis} = require("../middleware/sentimentAnalysis")

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

// router.get("/trends", async (req, res, next) => {
//     try {
//         var params = req.query;
//         const tweet = await client.get("trends/place.json", { id: params.id });

//         res.status(200).json({ ...tweet });
//     } catch (error) {
//         console.log(error);
//         next(error);
//     }
// });

router.get("/Contest", async (req, res, next) => {
    try {
        var params = req.query;
        const tweet = await client.get("search/tweets.json", {q: params.q, count: 100});
        if (tweet.statuses.length > 0) {
            let data = new Map();
            let fav1 = 0;
            let fav100 = 0;
            const HashtagRegex = /#[^\s!@#$%^&*()=+.\/,\[{\]};:'"?><]+/g;
            tweet.statuses.forEach((tweet, i) => {
                const partecipant = tweet.text.replace(HashtagRegex, "");
                if (!data.has(partecipant)) {
                    data.set(partecipant, tweet.favorite_count)
                }
                if (tweet.favorite_count > 0) {
                    fav1++;
                }
                if (tweet.favorite_count > 100) {
                    fav100++;
                }
            })

            const dataSort = [...data.entries()].sort((a, b) => b[1] - a[1]);
            const total = tweet.statuses.length;
            res.status(200).json({ranking: dataSort,
                total,
                fav1,
                fav100
            })
        } else {
            throw "Nessun tweet trovato"
        }

    } catch (error) {
        console.log(error);
        next(error);
    }
});


module.exports = router;