'use strict';

const lookup = require('./lib')({ apiKey: '<YOU GOOGLE API KEY HERE>' });

lookup.checkSingle('http://vipprojects.cn')
    .then(isMalicious => {
        console.log(isMalicious ? 'Hands off! This URL is evil!' : 'Chill out, man.');
    })
    .catch(err => {
        console.log('So sad...');
        console.log(err);
    });

lookup.checkMulti(['http://vipprojects.cn', 'https://ferdinand-muetsch.de'])
    .then(urlMap => {
        for (let url in urlMap) {
            console.log(urlMap[url] ? `${url} is evil!` : `${url} is safe!`);
        }
    })
    .catch(err => {
        console.log('So sad...');
        console.log(err);
    });