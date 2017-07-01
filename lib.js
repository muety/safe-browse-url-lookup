'use strict';

const request = require('request');
const BASE_URL = 'https://safebrowsing.googleapis.com/v4/threatMatches:find?key={key}';

let options = {
    clientId: 'safe-browse-url-lookup',
    clientVersion: '1.0.0'
};

function checkMulti(urls) {
    let body = {
        client: {
            clientId: options.clientId,
            clientVersion: options.clientVersion
        },
        threatInfo: {
            threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION", "THREAT_TYPE_UNSPECIFIED"],
            platformTypes: ["ANY_PLATFORM"],
            threatEntryTypes: ["URL"],
            threatEntries: urls.map(u => Object.assign({}, { url: u }))
        }
    }

    return new Promise((resolve, reject) => {
        request({
            url: BASE_URL.replace('{key}', options.apiKey),
            method: 'POST',
            json: body
        }, (err, response, body) => {
            if (err || !body || !body.hasOwnProperty('matches')) {
                console.log('[ERROR] An error has occured.');
                return reject(err);
            }

            let matchingUrls = body.matches.map(m => m.threat.url);
            resolve(Object.assign({}, ...urls.map(url => {
                let entry = {};
                entry[url] = matchingUrls.includes(url);
                return entry;
            })));
        });
    });
}

function checkSingle(url) {
    return checkMulti([url]).then(matches => matches[url]);
}

module.exports = (opts) => {
    if (!opts.apiKey) return console.log('[ERROR] You need to specify an API key.');
    Object.assign(options, opts);

    return {
        checkSingle: checkSingle,
        checkMulti: checkMulti
    }
};