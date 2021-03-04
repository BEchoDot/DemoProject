let express = require('express');
let router = express.Router();
// let Utils = require('../application/utils');

router.route('/params').all(function (req, res) {
    return res.send(JSON.stringify(req.query));
});

module.exports = router;