const fetch = require('node-fetch')
// An api key is emailed to you when you sign up to a plan
const coinApiKey = ''

// https://api.digitalsurge.com.au/#log-in-obtain-access-token
const digitalSurge = {
    "access_token": "",
    "expires_in": 604800,
    "token_type": "Bearer",
    "scope": "read write",
    "refresh_token": "pkTqWH58OfMUbdXdqbogO41pHdzPdE"
};

function getURL(url, headers, callback) {
  fetch(url, {
    method: 'get',
    headers : headers
  })
  .then(res => res.text())
  .then(json => {
    // console.log("Data: ", json);
    if (callback) {
      callback(json);
    }
  });
};

// Get General Crypto Prices
// getURL("https://rest.coinapi.io/v1/symbols", { 'X-CoinAPI-Key': coinApiKey });

var exchangeRate = 0.78844524;
// Digital Surge
getURL("https://secure.digitalsurge.com.au/api/public/market/eth-aud/bids", {}, function(json) {
  console.log("Digital Surge Bid (sell) price", JSON.parse(json)["results"][0]["price"] * exchangeRate);
});

getURL("https://secure.digitalsurge.com.au/api/public/market/eth-aud/asks", {}, function(json) {
  // console.log(JSON.parse(json))
  console.log("Digital Surge Ask (buy) price", JSON.parse(json)["results"][0]["price"] * exchangeRate);
})

// Binance
getURL("https://api.binance.com/api/v3/depth?symbol=ETHBUSD", {}, function(json){
    console.log("Binance Bid (sell) price", JSON.parse(json)["bids"][0][0]);
    console.log("Binance Ask (buy) price", JSON.parse(json)["asks"][0][0])
});

// Kraken
// a = ask
// b = bid
// c = last trade closed
// v = volume
// p = volume weighted average price
// t = number of trades
// l = low
// h = high
// o = today's opening price

getURL("https://api.kraken.com/0/public/Ticker?pair=ETHUSD", {}, function(json){
    console.log("Kraken Bid (sell) price", JSON.parse(json)["result"]["XETHZUSD"]["b"][0]);
    console.log("Kraken Ask (buy) price", JSON.parse(json)["result"]["XETHZUSD"]["a"][0])
})

// Gemini
getURL("https://api.gemini.com/v1/pubticker/ethusd", {}, function(json){
  console.log("Gemini Bid (sell) price", JSON.parse(json)["bid"]);
  console.log("Gemini Ask (buy) price", JSON.parse(json)["ask"])
})

// Independent Reserve
getURL("https://api.independentreserve.com/Public/GetMarketSummary?primaryCurrencyCode=eth&secondaryCurrencyCode=usd", {},
  function(json) {
    console.log("Independent Reserve Highest Price: ", JSON.parse(json)["LastPrice"]);
  }
)
