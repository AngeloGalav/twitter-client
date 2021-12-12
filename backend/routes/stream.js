const Twitter = require('twitter');

module.exports = (app, io) => {
    let twitter = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });

    let socketConnection;
    let twitterStream;

    app.locals.filter = {};

    /**
     * Resumes twitter stream.
     */
    const stream = () => {
        console.log('Resuming for ' + app.locals.filter);
        twitter.stream('statuses/filter', app.locals.filter, (stream) => {
            stream.on('data', (tweet) => {
                sendMessage(tweet);
            });

            stream.on('error', (error) => {
                console.log(error);
            });

            twitterStream = stream;
        });
    }

    /**
     * Sets search term for twitter stream.
     */
    app.post('/api/setFilter', async (req, res, next) => {
        let filter = req.body.filter;
        if (filter.follow) {
            try {
                const userId = await twitter.get("users/lookup", {screen_name: filter.follow.split("@")[1]})
                filter.follow = userId[0].id_str;
            } catch (error) {
                if (twitterStream) {
                    twitterStream.destroy();
                }
                console.log(error)
                return next(error)
            }
        }
        app.locals.filter = filter;
        console.log(filter)
        if (twitterStream) {
            twitterStream.destroy();
        }
        //stream();
        res.status(200).json({message: "filter ok"})
    });

    /**
     * Pauses the twitter stream.
     */
    app.post('/api/pause', (req, res) => {
        console.log('Pause');
        if (twitterStream) {
            twitterStream.destroy();
        }
        res.status(200).json({message: "pause ok"})
    });

    /**
     * Resumes the twitter stream.
     */
    app.post('/api/resume', (req, res) => {
        console.log('Resume');
        stream();
        res.status(200).json({message: "resume ok"})
    });

    //Establishes socket connection.
    io.on("connection", socket => {
        socketConnection = socket;
        //stream();
        socket.on("connection", () => console.log("Client connected"));
        socket.on("disconnect", () => {
            console.log("Client disconnected")
            socket.disconnect();
        });
    });

    /**
     * Emits data from stream.
     * @param {String} msg 
     */
    const sendMessage = (msg) => {
        socketConnection.emit("tweets", msg);
    }
};