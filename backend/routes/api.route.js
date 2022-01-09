const router = require("express").Router();
const Twitter = require("twitter");
const {createWordCloud} = require("../middleware/createWordCloud")
const {sentimentAnalysis} = require("../middleware/sentimentAnalysis")
const {generalStats} = require("../middleware/generalStats")

// ci logghiamo in modalita application,
// in modo che possiamo leggere un sacco di tweet alla volta
var client = new Twitter({
    consumer_key: "9Do51SWwjcRQpBGheiEaZAORh",
    consumer_secret: "AWG7X1Hr24bYHqDudjuroI7o8DjAq8r42bcOxI87snnkn4QGOY",
    bearer_token:"AAAAAAAAAAAAAAAAAAAAAEubVAEAAAAAKCxUBGiiiPqLoSw39uwOc6xLXEI%3DsgF83neaDxkh08z9yuJ3RQwE2PTUY0Tr5Xr8FX4c3TKcIarxqa"
});





//ricerca per keyword
router.get("/Keyword", async (req, res, next) => {
    try {
        var params = req.query;

        if (!params.startDate || !params.endDate || !params.q) {
            return next(new Error("Richiesta non corretta"))
        }

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
        filterObj.count = params.tweetCount;
        const tweet = await client.get("search/tweets.json", filterObj);

        req.data = tweet
        req.genStats = params.genStats === 'true'
        return next()
        //res.status(200).json({ ...tweet });
    } catch (error) {
        console.log(error);
        next(error);
    }
},generalStats, sentimentAnalysis, createWordCloud);

//ricerca per hashtag
router.get("/Hashtag", async (req, res, next) => {
    try {
        var params = req.query;
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
        filterObj.count = params.tweetCount;
        const tweet = await client.get("search/tweets.json", filterObj);

        req.data = tweet
        req.genStats = params.genStats === 'true'
        return next()
        
    } catch (error) {
        console.log(error);
        next(error);
    }
},generalStats, sentimentAnalysis, createWordCloud);

//ricerca per username
router.get("/Username", async (req, res, next) => {
    try {
        var params = req.query;
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
        filterObj.count = params.tweetCount;
        const tweet = await client.get("search/tweets.json", filterObj);

        req.data = tweet
        req.genStats = params.genStats === 'true'
        return next()

    } catch (error) {
        console.log(error);
        next(error);
    }
},generalStats, sentimentAnalysis, createWordCloud);

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
        if (!params.q || !params.q.includes("from:") || !params.q.includes("swe11")) {
            return next(new Error("Richiesta non corretta"))
        }
        const tweet = await client.get("search/tweets.json", {q: "%23"+params.q, count: 100});
        if (tweet.statuses.length > 0) {
            let data = new Map();
            let fav1 = 0;
            let fav100 = 0;
            let total = 0;
            const HashtagRegex = /#[^\s!@#$%^&*()=+.\/,\[{\]};:'"?><]+/g;
            tweet.statuses.forEach((tweet, i) => {
                const partecipant = tweet.text.replace(HashtagRegex, "");
                if (!data.has(partecipant) && partecipant) {
                    data.set(partecipant, tweet.favorite_count)
                }
                if (tweet.favorite_count > 0 && partecipant) {
                    fav1++;
                }
                if (tweet.favorite_count > 100 && partecipant) {
                    fav100++;
                }
                if (partecipant) {
                    total++
                }
            })

            const dataSort = [...data.entries()].sort((a, b) => b[1] - a[1]);
            res.status(200).json({ranking: dataSort,
                total,
                fav1,
                fav100
            })
        } else {
            next(new Error("Nessun tweet trovato"))
        }

    } catch (error) {
        console.log(error);
        next(error);
    }
});


module.exports = router;