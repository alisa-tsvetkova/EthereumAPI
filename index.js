const express = require('express');
const log = require('./libs/log')(module);
const config = require('./config.json');
const helper = require('./libs/helper');
const { param, validationResult } = require('express-validator');

const app = express();

const headers = {
    'Content-Type': 'application/json'
}

//GET /api/block/latest 
app.get('/api/block/latest', function (_request, response) {
    const params = {
        jsonrpc: "2.0",
        method: "eth_getBlockByNumber",
        params: ["latest", true],
        id: 1
    };

    helper.axiosPost(config.apiUrl, params, headers, response, log);
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

        helper.axiosPost(config.apiUrl, params, headers, response, log);
    }
});

app.listen(config.port, function () {
    log.info(`Express server listening on port ${config.port}`);
});