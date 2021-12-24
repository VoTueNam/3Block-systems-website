// Để tương tác với Model từ controller
const User = require('../models/BlackList');

//Import VirusTotal API
const virusTotal = require('../Function/virusTotal')
const urlScan = require('../Function/urlScan')


//Contructor
//Những hàm ở đây trg Class này sẽ đc gọi ở route/
class SiteController {

    // GET /search
    home(req, res) {
        res.render('home');
    }

    // GET 404
    error404(req, res, next) {
        res.status(404).render('404', {
            layout: 'nothing.hbs'
        });
    }

    //POST - result
    result(req, res, next) {

        virusTotal.apiVirusTotal(virusTotal.validURL(req.body.q),res)
        // res.send('ok')
    }

    test(req, res, next) {

        res.render('test')
    }

    testResult(req, res, next) {
        var inputValue = req.body.vote;

        if (inputValue == "virusTotal") {
            res.send('virusTotal')
        } else {
            res.send('urlScan')
        }
    }
}

//Xuất class
module.exports = new SiteController();