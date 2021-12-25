//API virus total
const nvt = require('node-virustotal');
const defaultTimedInstance = nvt.makeAPI();

class virusTotal {

    //Convert to valid URL - virustotal API can read it
    validURL(url) {
        var results = ''
        var match
        if (match = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im)) {
            results = match[1]
            // if (match = result.match(/^[^\.]+\.(.+\..+)$/)) {
            //     result = match[1]
            // }
        }
        results = 'http://' + results + '/';
        return results;
    }

    resultAnalysis(url) {
        return new Promise((resolve, reject) => {
            const hashed = nvt.sha256(url);
            const theSameKey = defaultTimedInstance.setKey('3603b9eebdd57284643ace954577ff8d2d6415c027d20c867a22d8c7597e5431');
            defaultTimedInstance.urlLookup(hashed, function (err, resp) {
                if (err) {
                    console.log('Well, crap.');
                    reject(err)
                }
                resolve(resp)
            })
        })

    }

    async calculatePercent(url) {
        var resp = await this.resultAnalysis(url)
        var temp = JSON.parse(resp)
        temp = temp.data.attributes.last_analysis_results;

        //Get all engine name
        var engine = [];
        for (var k in temp) engine.push(k);
        //console.log(engine)

        //Get all type
        const type = new Map();
        for (var k in engine) {
            type.set(temp[engine[k]].result, 1);

        }
        //console.log(type)

        //Convert Map to Array
        let array = Array.from(type, ([name, value]) => ({
            name,
            value
        }));


        //Get result for each engine
        const value = new Map();
        //var clean = malware = unrated = malicious = 1;
        for (var index in engine) {
            //Get number of type
            for (let count = 0; count < array.length; count++) {
                //push type name and quantity of that type
                if (temp[engine[index]].result == array[count].name) {
                    value.set(array[count].name, array[count].value++)
                }
            }
        }

        var ketqua=[]
        for (let count = 0; count < array.length; count++) {
            ketqua.push(array[count].name)
            ketqua.push((Number(value.get(array[count].name)) / engine.length * 100).toFixed(2))
            // var arr = array[count].name, (Number(value.get(array[count].name)) / engine.length * 100).toFixed(2)
            // ketqua.push(arr)

        }

        /**
         * ketqua = [
         *  [name1: percent],
         *  [name2: percent],
         *  [name3: percent]
         * ]
         */
        return ketqua
    }
}

//Xuất class
module.exports = new virusTotal();