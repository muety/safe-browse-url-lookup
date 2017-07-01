# safe-browse-url-lookup

## What is this?
This is a simplified wrapper for NodeJS for Google's Safe Browsing API v4 to check whether a URL is malicious or not. See [developers.google.com/safe-browsing/v4](https://developers.google.com/safe-browsing/v4/) for more information.

Currently this library only implements lookup functionality for URLs, where all types of threats are being requested. 

## How to use
### Check single URL for safety
```javascript
const lookup = require('./lib')({ apiKey: '<YOU GOOGLE API KEY HERE>' });

lookup.checkSingle('http://vipprojects.cn')
    .then(isMalicious => {
        console.log(isMalicious ? 'Hands off! This URL is evil!' : 'Chill out, man.');
    })
    .catch(err => {
        console.log('So sad...');
        console.log(err);
    });
```

### Check multiple URLs at once
```javascript
const lookup = require('./lib')({ apiKey: '<YOU GOOGLE API KEY HERE>' });

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
```

### Options
To initialize the library, you call its exported function with an options object that can have the following properties.

* `apiKey` - It's mandatory to pass your API key you got from the Google Developer's Console
* `clientId` _[optional]_ - A client ID that (hopefully) uniquely identifies the client implementation of the Safe Browsing API. ([Reference](https://developers.google.com/safe-browsing/v4/reference/rest/v4/ClientInfo)). If not specified, a default value is used.
* `clientVersion` _[optional]_ - The version of the client implementation. If not specified, a default value is used.

## Contribute
Feel free to implement the remaining API features and make a PR! 

## License
MIT @ [Ferdinand Mütsch](https://ferdinand-muetsch.de)