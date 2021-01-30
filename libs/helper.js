const axios = require('axios');

module.exports = class Helper {
    static axiosPost(url, params, headers, response, logger) {
        axios
            .post(url, params, headers)
            .then(result => {
                if (result.data)
                    response.send(result.data);
                else {
                    const error = { "msg": "Invalid or empty data" };
                    logger.error(error);
                    response.status(422).json({ errors: [error] })
                }
            })
            .catch(error => {
                logger.error(error);
                response.status(500).json({ errors: [error] })
            })
    }
}
