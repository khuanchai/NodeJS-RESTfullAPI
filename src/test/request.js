var request = require('request');
request({
    url: 'http://localhost:3000/api/digital-trading/lotus/search/mappingproduct',
    method: 'POST',
    body: { eanCode: '8859308300686' },
    json: true
}, (error, response, body) => {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
});