const {TwitterApi} = require('twitter-api-v2');
require('dotenv').config({path: __dirname + '/.env'});

const client = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

const bearer = new TwitterApi(process.env.TWITTER_BEARER_TOKEN);

const twitterClient = client.readWrite;
const twitterBearer = bearer.readOnly;
module.exports = {twitterClient, twitterBearer};

const tweet = async () => {
    try{
        const response = await twitterClient.v2.tweet("Hello, world!");
        console.log("Tweet created successfully:", response);
    } catch (error) {
        console.error("Error tweeting:", error);
    }
}

tweet();