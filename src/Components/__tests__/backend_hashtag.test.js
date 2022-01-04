import axios from 'axios'

const today = new Date().toISOString(0).split("T")[0];
const oneWeekAgo = new Date(
    new Date().setDate(
        new Date().getDate() - 7
    )
).toISOString(0).split("T")[0];
const defaultParams = `startDate=${oneWeekAgo}&endDate=${today}&position=null&radius=null&tweetCount=15`

describe('Fetch hashtag', () => {
    it("should return error cuz no params", async () => {
        try {
            await axios.get("http://localhost:3001/api/Hashtag", {
                adapter: require('axios/lib/adapters/http'), //inserire sempre questo
            }) // no params
            expect(true).toBe(false)
        } catch (error) {
            expect(true).toBe(true)
        }
    })

    it("should return error cuz no date", async () => {
        try {
            await axios.get("http://localhost:3001/api/Hashtag?q=ciao&position=null&radius=null&tweetCount=15", {
                adapter: require('axios/lib/adapters/http'), //inserire sempre questo
            }) // no params
            expect(true).toBe(false)
        } catch (error) {
            expect(true).toBe(true)
        }
    })

    it("should return error cuz no query", async () => {
        try {
            await axios.get(`http://localhost:3001/api/Hashtag?${defaultParams}`, {
                adapter: require('axios/lib/adapters/http'), //inserire sempre questo
            }) // no params
            expect(true).toBe(false)
        } catch (error) {
            expect(true).toBe(true)
        }
    })

    it("should return some tweets", async () => {
        try {
            const {data} = await axios.get(`http://localhost:3001/api/Hashtag?q=ciao&${defaultParams}`, {
                adapter: require('axios/lib/adapters/http'), //inserire sempre questo
            }) // no params
            expect(data.statuses.length).toBeGreaterThanOrEqual(0);
        } catch (error) {
            expect(true).toBe(false)
        }
    })

    it("should return only italians", async () => {
        try {
            const {data} = await axios.get(`http://localhost:3001/api/Hashtag?q=ciao&${defaultParams}&onlyItalian=true`, {
                adapter: require('axios/lib/adapters/http'), //inserire sempre questo
            }) // no params
            expect(data.statuses.length).toBeGreaterThanOrEqual(0);
            if (data.statuses.length > 0) {
                data.statuses.forEach(tweet => {
                    expect(tweet.lang).toBe("it")
                });
            }
        } catch (error) {
            expect(true).toBe(false)
        }
    })

    it("should generate statistics", async() => {
        try {
            const {data} = await axios.get(`http://localhost:3001/api/Hashtag?q=ciao&${defaultParams}&genStats=true`, {
                adapter: require('axios/lib/adapters/http'), //inserire sempre questo
            }) // no params
            expect(data.statuses.length).toBeGreaterThanOrEqual(0);
            if(data.statuses.length > 0){
                expect(data.wordCloud).toBeDefined();
                expect(data.generalStats).toBeDefined();
                expect(data.sentimentAnalysis).toBeDefined();
            }
        } catch (error) {
            expect(true).toBe(false)
        }
    })

    it("should not generate statistics", async() => {
        try {
            const {data} = await axios.get(`http://localhost:3001/api/Hashtag?q=ciao&${defaultParams}&genStats=false`, {
                adapter: require('axios/lib/adapters/http'), //inserire sempre questo
            }) // no params
            expect(data.statuses.length).toBeGreaterThanOrEqual(0);
            expect(data.wordCloud).toBeUndefined()
            expect(data.generalStats).toBeUndefined()
            expect(data.sentimentAnalysis).toBeUndefined()
        } catch (error) {
            expect(true).toBe(false)
        }
    })
});
