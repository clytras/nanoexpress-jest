const nanoexpress = require('nanoexpress');
const cors = require('cors');
const auth = require('./authenticate');

const app = nanoexpress();

function logRequest(req, res, cb) {
    console.log("req = ", req);
    console.log("res = ", res);
    cb();
}

app.use(logRequest);

app.options('/v1/users/:userId', cors());

app.get('/slow', cors(), async (req, res) => {
    console.log("slow handler starts");
    const response = createDefaultResponse(res);
    setTimeout(() => res.send(response), 2000);
    return res;
});

app.get('/v1/users/:userId', cors(), auth.optional, async (req, res) => {
    console.log("getUser handler starts");
    const response = createDefaultResponse(res);
    res.send(response);
    return res;
});

app.get('/v1/polls/', async (req, res) => {
    console.log("getPolls handler starts");
    const response = createDefaultResponse(res);
    res.send(response);
    return res;
});

app.get('/bff/polls/last', auth.optional, async (req, res) => {
    console.log("getLastPoll handler starts");
    const response = createDefaultResponse(res);
    res.send(response);
    return res;
});

app.get('/bff/polls/:slug', auth.optional, async (req, res) => {
    console.log("getPoll handler starts");
    const response = createDefaultResponse(res);
    res.send(response);
    return res;
})

app.get('/bff/polls/:pollId/votes', async (req, res) => {
    console.log("getVotes handler starts");
    const response = createDefaultResponse(res);
    res.send(response);
    return res;
});

app.get('/bff/polls/:pollId/votes', async (req, res) => {
    console.log("getVotes handler starts");
    const response = createDefaultResponse(res);
    res.send(response);
    return res;
})

function createDefaultResponse(res) {
    const response = {
        api: '1.0',
        status: 'OK'
    };
    res.status(200);
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    return response;
}

app.setErrorHandler(
    (err, req, res) => {
        console.log("ERROR", err);
        return res.send({
            status: 'error',
            status_code: 500,
            message: 'oops'
        })
    }
);

app.setNotFoundHandler((res, req) => {
    return res.send({ code: 404, message: 'You entered wrong url' });
});

module.exports = app;

