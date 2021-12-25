const urlScan = require('urlscan-api')
const fs = require('fs')

const URLScan = (url) => {
    return new Promise((resolve, reject) => {
        const APIKey = "8367409a-668c-42ae-9875-6fca2fab183b"

        new urlScan().submit(APIKey, url).then(function (submitOutput) {
            get_result(submitOutput.uuid)
            //console.log(JSON.stringify(submitOutput, null, 4))
        })


        get_result = (uuid) => {
            var breakInterval = setInterval(function () {
                new urlScan().result(uuid).then(function (objResult) {
                    if (objResult.statusCode != 404) {
                        fs.writeFileSync('./dataPornhub.json', JSON.stringify(objResult, null, 2) , 'utf-8');
                        resolve(objResult);
                        clearInterval(breakInterval)
                    }
                })
            }, 10 * 1000) // re-check every 10 second
        };
    })

}

var a = async () => {
    const result = await URLScan("pornhub.com")
    console.log('Type of ' + typeof result);
    console.log('done!!!');
}
