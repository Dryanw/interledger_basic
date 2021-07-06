const fetch = require('node-fetch');
const fs = require('fs');
var accountID = '';
var authToken = '';

async function pay(accountID, authToken, receiverName, amount) {
    const bodyJson = {
        'amount': amount,
        destinationPaymentPointer: `$ripplex.money/${receiverName}`
    };

    const response = await fetch(`https://ripplex.io/portal/ilp/hermes/accounts/${accountID}/pay`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(bodyJson)
    });
    const resultJson = await response.json();
    console.log(resultJson);
}


accountID = fs.readFileSync('./accountID.txt', 'utf8');
receiverID = fs.readFileSync('./receiverID.txt', 'utf8');
if (!accountID || !receiverID) {
    console.error(`Empty ID: from ${accountID} to ${receiverID}`);
    return
}
authToken = fs.readFileSync('./authToken.txt', 'utf8');
console.log(`accountID: ${accountID}`);
console.log(`authToken: ${authToken}`);

pay(accountID, authToken, receiverID, '1');