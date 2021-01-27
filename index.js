const express = require('express');
const log = require('./libs/log')(module);
const axios = require('axios');

const app = express();

const headers = {
    'Content-Type': 'application/json'
}

const url = 'https://cloudflare-eth.com';

//GET /api/block/latest 
app.get('/api/block/latest', function (request, response) {
    const params = {
        jsonrpc: "2.0",
        method: "eth_getBlockByNumber",
        params: ["latest", true]
    };

    axios
        .post(url, params, headers)
        .then(result => {
            console.log(result.data);
            response.send(result.data);
        })
        .catch(error => {
            console.error(error);
        })
});


//GET /api/block/11000000
app.get('/api/block/:id', function (request, response) {
    const params = {
        jsonrpc: "2.0",
        method: "eth_getBlockByNumber",
        params: ["latest", false],
        id: request.params.id
    };

    axios
        .post(url, params, headers)
        .then(result => {
            console.log(result.data);
            response.send(result.data);
        })
        .catch(error => {
            console.error(error);
        })

});

app.listen(3033, function () {
    log.info('Express server listening on port 3033');
});