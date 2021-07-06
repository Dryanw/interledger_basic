const fetch = require('node-fetch');
const fs = require('fs');
var accountID = '';
var authToken = '';

async function checkBalance(accountID, authToken) {
    const response = await fetch(`https://ripplex.io/portal/ilp/hermes/accounts/${accountID}/balance`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${authToken}`
        }
    });
    const resultJson = await response.json();
    console.log(resultJson);
}


accountID = fs.readFileSync('./accountID.txt', 'utf8');
authToken = fs.readFileSync('./authToken.txt', 'utf8');
console.log(`accountID: ${accountID}`);
console.log(`authToken: ${authToken}`);



checkBalance(accountID, authToken);