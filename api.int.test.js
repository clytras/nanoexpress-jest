const axios = require('axios').default;
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.headers.patch['Content-Type'] = 'application/json; charset=utf-8';
const logger = require("./logging");
const app = require('./nano-server');
const API = "http://localhost:3000/v1", BFF = "http://localhost:3000/bff";

describe("user accounts", () => {
    test('create user', async (done) => {
        // let response = await axios.get(`${API}/users/1234`);
        let response = await axios.get(`${API}/users/1234`, getAuthHeader()); // TODO error with Authorization header

        expect(response.data.status).toBe('OK');
        // expect(response.data.data).toBeDefined();
        // let profile = response.data.data;
        // expect(profile.bio.nickname).toMatch("leos");
        // expect(profile.auth.email).toMatch("leos@email.bud");

        done();
    });
});

function getAuthHeader() {
    const config = { headers: { } };
    config.headers.Authorization = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxZTQwdjBiMWo1Iiwibmlja25hbWUiOiJsaXRlcmFrbCIsInB3ZFRpbWVzdGFtcCI6IjIwMjAtMDMtMjJUMTE6MTA6NDkuNDg2WiIsInJvbGVzIjpbImFkbWluOnBvbGwiXSwiaWF0IjoxNTg2NjkwNzc2LCJleHAiOjE1ODkzNjkxNzZ9.N5MfpZ9i9Sjv-izdYItR4gXCmzVkqkuVcVSEL_6Q89c";
    return config;
}

beforeEach(() => {
    jest.setTimeout(10000);
});

beforeAll(() => {
    console.log('BEFORE ALL');
    app.listen(3000, '0.0.0.0')
        .then(r => logger.info("Server started"));
});

afterAll(() => {
    console.log('AFTER ALL SERVER');
    if (app.close())
        logger.info("Server stopped");
});
