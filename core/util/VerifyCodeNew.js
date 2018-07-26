var svgCaptcha = require('svg-captcha');

exports.Generate = function (W, H,fontSize) {

    var captcha = svgCaptcha.create({
        size: 4,  // 验证码长度
        ignoreChars: '0o1i', // 验证码字符中排除 0o1i
        noise: 1, // 干扰线条的数量
        color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
        background: '#cc9966' ,// 验证码图片背景颜色
        width: W,// width of captcha
        height: H, // height of captcha
        fontSize: fontSize // captcha text size
    });

    return {
        code: captcha.text,
        dataURL: captcha.data,
    };
}