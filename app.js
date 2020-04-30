const https = require('https');
const express = require('express')
const app = express()
const azureKey = require('./config/azureKey');
const config = require('./config/config');
const SUBSCRIPTION_KEY = azureKey;
if (!SUBSCRIPTION_KEY) {
  throw new Error('Missing the AZURE_SUBSCRIPTION_KEY environment variable')
}

app.get('/:name/', function(req,response) {
    var query = req.params.name;
    https.get({
        hostname: 'api.cognitive.microsoft.com',
        path:     '/bing/v7.0/search?q=' + query,
        headers:  { 'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY },
      }, res => {
        let body = ''
        res.on('data', part => body += part)
        res.on('end', () => {
            response.status(201).send(JSON.parse(body));
        })
        res.on('error', e => {
            console.log('Error: ' + e.message)
            throw e
        })
      });
    
});

app.get('/:name/:count', function(req,response) {
    var query = req.params.name;
    var count = req.params.count;
    https.get({
        hostname: 'api.cognitive.microsoft.com',
        path:     '/bing/v7.0/search?q=' + query + '&count=' + count,
        headers:  { 'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY },
      }, res => {
        let body = ''
        res.on('data', part => body += part)
        res.on('end', () => {
            response.status(201).send(JSON.parse(body));
        })
        res.on('error', e => {
            console.log('Error: ' + e.message)
            throw e
        })
      });
    
});


app.listen(8080);
