exports.generalStats = (req, res, next) => {
    if (req.data.statuses.length > 0 && req.genStats) {
        let avgLikes = 0;
        let mapLanguages = new Map();
        let avgRetweets = 0;
        const n = req.data.statuses.length;
        for (let i = 0; i < n; i++) {
            let tweet = req.data.statuses[i];
            if (!tweet.retweeted_status) {
                avgLikes = avgLikes + (parseFloat(tweet.favorite_count) / n);
                avgRetweets = avgRetweets + (parseFloat(tweet.retweet_count) / n);
            } else {
                avgLikes = avgLikes + (parseFloat(tweet.retweeted_status.favorite_count) / n);
                avgRetweets = avgRetweets + (parseFloat(tweet.retweeted_status.retweet_count) / n);
            }
            
            if (mapLanguages.has(tweet.lang)) {
                mapLanguages.set(tweet.lang, mapLanguages.get(tweet.lang) + 1)
            } else {
                mapLanguages.set(tweet.lang, 1)
            }
        }

        req.data.generalStats = {
            avgLikes: avgLikes.toFixed(1),
            avgRetweets: avgRetweets.toFixed(1),
            mostActiveLanguage: [...mapLanguages.entries()].sort((a, b) => b[1] - a[1])[0][0]
        }

    

        console.log(req.data.generalStats)
        next();
    } else {
        next();
    }
};
