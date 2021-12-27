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
    async result(req, res, next) {
        var ketqua = await virusTotal.calculatePercent(virusTotal.validURL(req.body.q))
        ketqua = ketqua.toString()
        res.json(ketqua)
        // res.render('totalResult', {
        //     z: ketqua
        // })
        
    }



    test(req, res, next) {

        //var a = 
        //var z =[]
        // for (var i of a) {
        //     z.push({
        //         label: i[0],
        //         y:i[1]
        //     })
        // }
        var ketqua = ['malware', 80, 'phishing', 10, 'unrated', 6, 'malicious', 4]
        res.json(ketqua)
        // res.render('totalResult', {
        //     z: 'malware,80,phishing,10,unrated,6,malicious,4'
        // })
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