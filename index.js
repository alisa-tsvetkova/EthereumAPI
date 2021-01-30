const express = require('express');
const log = require('./libs/log')(module);
const axios = require('axios');
var config = require('./config.json');
const { param, validationResult } = require('express-validator');

const app = express();

const headers = {
    'Content-Type': 'application/json'
}

//GET /api/block/latest 
app.get('/api/block/latest', function (request, response) {
    const params = {
        jsonrpc: "2.0",
        method: "eth_getBlockByNumber",
        params: ["latest", true],
        id: 1
    };

    axios
        .post(config.apiUrl, params, headers)
        .then(result => {
            if (result.data)
                response.send(result.data);
            else {
                const error = { "msg": "Invalid or empty data" };
                log.error(error);
                response.status(422).json({ errors: [error] })
            }
        })
        .catch(error => {
            log.error(error);
            response.status(500).json({ errors: [error] })
        })
});


//GET /api/block/11000000
app.get('/api/block/:id', param('id').isNumeric(), function (request, response) {
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
        log.error(errors.array());
        response.status(422).json({ errors: errors.array() })
    }
    else {
        const params = {
            jsonrpc: "2.0",
            method: "eth_getBlockByNumber",
            params: ["latest", false],
            id: request.params.id
        };
        axios
            .post(config.apiUrl, params, headers)
            .then(result => {
                response.send(result.data);
            })
            .catch(error => {
                log.error(error);
                response.status(500).json({ errors: [error] })
            })
    }
});

app.listen(config.port, function () {
    log.info(`Express server listening on port ${config.port}`);
});