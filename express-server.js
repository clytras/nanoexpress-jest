const express = require('express');
const cors = require('cors');

const app = express();
app.options('/v1/users/:userId', cors(), () => {});

app.get('/slow', cors(), async (req, res) => {
    console.log("slow handler starts");
    const response = prepareResponse(res);
    setTimeout(() => res.send(response), 2000);
    return res;
});

app.get('/v1/users/:userId', cors(), async (req, res) => {
    console.log("getUser handler starts");
    const response = prepareResponse(res);
    res.send(response);
    return res;
});

app.listen(3000, () => console.log("Server started"));

function prepareResponse(res) {
    const response = {
        api: '1.0',
        status: 'OK'
    };
    res.status(200);
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    return response;
}
