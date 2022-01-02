import axios from 'axios'

describe('Fetch Contest', () => {
    it("no params should return error", async () => {
        try {
            await axios.get("http://localhost:3001/api/Contest", {
                adapter: require('axios/lib/adapters/http'), //inserire sempre questo
            }) // no params
            expect(true).toBe(false)
        } catch (error) {
            expect(true).toBe(true)
        }
    })

    it("bad hashtag should return error", async () => {
        try {
            await axios.get("http://localhost:3001/api/Contest?q=sw1 from:username", {
                adapter: require('axios/lib/adapters/http'), //inserire sempre questo
            }) // no params
            expect(true).toBe(false)
        } catch (error) {
            expect(true).toBe(true)
        }
    })

    it("no username should return error", async () => {
        try {
            await axios.get("http://localhost:3001/api/Contest?q=testswe11", {
                adapter: require('axios/lib/adapters/http'), //inserire sempre questo
            }) // no params
            expect(true).toBe(false)
        } catch (error) {
            expect(true).toBe(true)
        }
    })

    it("good request should return tweets", async () => {
        try {
            const { data } = await axios.get("http://localhost:3001/api/Contest?q=testswe11 from:username", {
                adapter: require('axios/lib/adapters/http'), //inserire sempre questo
            }) // no params
            expect(data.ranking).toBeDefined()
        } catch (error) {
            expect(error.response.data.message).toBe("Nessun tweet trovato")
        }
    })
});
