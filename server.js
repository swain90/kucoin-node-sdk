const express = require('express');
const app = express()

const baseURL = 'https://api.kucoin.com/';

app.get('/', (req, res) => {
    console.log('server started');
    res.send('response');
});

const longRouter = require('/routes/strategies/long');
app.use('/strategies/long');

app.listen(3000)