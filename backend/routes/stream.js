const Twitter = require('twitter');

module.exports = (app, io) => {
    let twitter = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });

    // let socketConnection;
    // let twitterStream;

    app.locals.connectedSockets = new Map();

    setInterval(() => {

       let currentSockets =  Object.fromEntries(app.locals.connectedSockets)
       if (Object.keys(currentSockets).length > 0) {
        console.log("Current sockets connected:")
        Object.keys(currentSockets).forEach(socket => console.log(socket + "\n"))
       } else {
           console.log("There aren't sockets connected currently")
       }
       
       
    }, 2000);

    /**
     * Resumes twitter stream.
     */
    const stream = (currentSocketId) => {
        console.log('Resuming for ' + app.locals.connectedSockets.get(currentSocketId));
        twitter.stream('statuses/filter', app.locals.connectedSockets.get(currentSocketId).filter, (stream) => {
            stream.on('data', (tweet) => {
                sendMessage(tweet, app.locals.connectedSockets.get(currentSocketId).socketConnection);
            });

            stream.on('error', (error) => {
                console.log(error);
            });

            app.locals.connectedSockets.get(currentSocketId).twitterStream = stream;
        });
    }

    /**
     * Sets search term for twitter stream.
     */
    app.post('/api/setFilter', async (req, res, next) => {
        if (!req.body.socketId) {
            return res.status(400).json({message: "no socket id"})
        }
        let filter = req.body.filter;
        console.log(req.body)
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
        app.locals.connectedSockets.get(req.body.socketId).filter = filter;
        if (app.locals.connectedSockets.get(req.body.socketId) && app.locals.connectedSockets.get(req.body.socketId).twitterStream) {
            app.locals.connectedSockets.get(req.body.socketId).twitterStream.destroy();
        }
        //stream();
        res.status(200).json({message: "filter ok"})
    });

    /**
     * Pauses the twitter stream.
     */
    app.post('/api/pause', (req, res) => {
        if (!req.body.socketId) {
            return res.status(400).json({message: "no socket id"})
        }
        console.log('Pause');
        if (app.locals.connectedSockets.get(req.body.socketId) && app.locals.connectedSockets.get(req.body.socketId).twitterStream) {
            app.locals.connectedSockets.get(req.body.socketId).twitterStream.destroy();
        }
        res.status(200).json({message: "pause ok"})
    });

    /**
     * Resumes the twitter stream.
     */
    app.post('/api/resume', (req, res) => {
        if (!req.body.socketId) {
            return res.status(400).json({message: "no socket id"})
        }
        console.log('Resume');
        stream(req.body.socketId);
        res.status(200).json({message: "resume ok"})
    });

    //Establishes socket connection.
    io.on("connection", socket => {
        app.locals.connectedSockets.set(socket.id, {
            socketConnection: socket,
            twitterStream: null,
            filter: null
        })
        //stream();
        socket.on("connection", () => console.log("Client connected"));
        socket.on("disconnect", () => {
            if (app.locals.connectedSockets.get(socket.id).twitterStream) {
                app.locals.connectedSockets.get(socket.id).twitterStream.destroy();
                app.locals.connectedSockets.delete(socket.id);
            }
            socket.disconnect()
            console.log("Client disconnected")
        });
    });

    /**
     * Emits data from stream.
     * @param {String} msg 
     */
    const sendMessage = (msg, socketConnection) => {
        socketConnection.emit("tweets", msg);
    }
};