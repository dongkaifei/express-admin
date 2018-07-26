var express = require('express');
var router = express.Router();
var VerifyCode = require('../core/util/VerifyCodeNew');
/* GET home page. */
router.get('/', async function (req, res, next) {
    var data = VerifyCode.Generate(80,33,32);

    req.session.verify_code = data.code;
    res.type('svg'); // 使用ejs等模板时如果报错 res.type('html')
    ///res.status(200).send(data.data);
    res.end(data.dataURL);
    //req.session.verify_code = data.code;
    //res.end(data.buffer);
});

module.exports = router;
