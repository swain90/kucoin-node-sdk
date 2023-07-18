const Datafeed = require('../../lib/datafeed');
const { postOrder } = require('../../rest/Trade/Orders');
const { Client } = require('node-postgres');
 
(async () => {
  const client = new Client({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'KuCoinAPI',
    password: '123456',
    port: 5432
  });
  
  await client.connect();
 
  const res = await client.query('SELECT * from public.prices');
  console.log(res);
  await client.end();
})().catch(console.error);

const datafeed = new Datafeed();
datafeed.connectSocket();
datafeed.onClose(() => {
  log('ws closed, status ', datafeed.trustConnected);
});

const topic = `/market/ticker:ETH-USDT`;
datafeed.subscribe(topic, (message) => {
  if (message.topic === topic) {
    log(message.data);
    console.log('hello');
  }
});

/**
 * @name priceTopics.indexPrice
 * @description Subscribe to this topic to get the index price for the margin trading.
 * @updateTime 
 * @return {Object} 
 * {
    "id":"5c24c5da03aa673885cd67a0",
    "type":"message",
    "topic":"/indicator/index:USDT-BTC",
    "subject":"tick",
    "data":{
        "symbol": "USDT-BTC",
        "granularity": 5000,
        "timestamp": 1551770400000,
        "value": 0.0001092
    }
}
 */ 
let priceTopics = {indexPrice: 500};
priceTopics = {"id":"5c24c5da03aa673885cd67a0",
"type":"message",
"topic":"/indicator/index:USDT-BTC",
"subject":"tick",
"data":{
    "symbol": "USDT-BTC",
    "granularity": 5000,
    "timestamp": 1551770400000,
    "value": 0.0001092
}};

const callbackId = datafeed.subscribe(priceTopics.indexPrice, (message) => {
    if (message.topic === priceTopics.indexPrice) {
      console.log(message.data);
    }
  })