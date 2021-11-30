var sentiment = require("multilang-sentiment");

exports.sentimentAnalysis = (req, res, next) => {
    if (req.data.statuses.length > 0) {
        let sentimentAnalysis = {
            score: 0,
            comparative: 0,
            positives: 0,
            negatives: 0
        };

        for (let i = 0; i < req.data.statuses.length; i++) {
            try {
                let partial = sentiment(
                    req.data.statuses[i].full_text,
                    req.data.statuses[i].lang || "en"
                );
                sentimentAnalysis.comparative += partial.comparative;
                sentimentAnalysis.score += partial.score;
                
                sentimentAnalysis.positives += partial.positive.length
                sentimentAnalysis.negatives += partial.negative.length
            } catch (error) {
                console.log(error)
            }
        }

        sentimentAnalysis.score /= req.data.statuses.length;
        sentimentAnalysis.comparative /= req.data.statuses.length;
        console.log(sentimentAnalysis.comparative)
        sentimentAnalysis.comparative += 5;

        req.data.sentimentAnalysis = sentimentAnalysis;
        next();
    } else {
        next();
    }
};
