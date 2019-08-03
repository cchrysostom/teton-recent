import {DaemonApi} from 'js-oip'

const pug = require('pug')
const express = require('express')
const ta = require('../lib/timeago.js')
const https = require('https')

// expressjs configuration
const app = express()
const port = 3000
app.set('view engine', 'pug')

// Middleware function for async requests within expressjs
const asyncMiddleware = fn =>
    (req, res, next) => {
        Promise.resolve(fn(req, res, next))
        .catch(next)
    }

// Set static html/css for express
app.use(express.static('public'))

// Set the expressjs router with an endpoint for getting FLO data
app.get('/', asyncMiddleware(async(req, res, next) => {
    // Get OIP data and render using pug template engine
    https.get('https://api.oip.io/oip/floData/search?q=Cancel&q=Execution&q=Client%20Interest&q=Inventory%20Posted&limit=25', (resp) => {
        let data = '';
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Return the result.
        resp.on('end', () => {
            //formatTime(oipdata);
            res.render('index', { data: data })
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    })
}))
app.listen(port, () => console.log(`oip-express listening on port ${port}`))


const getFloDataHttp = async () => {
}
// js-oip API calls recent tZERO DLR records
let api = new DaemonApi("api.oip.io");
const getFloData = async () => {
    //let query = '"Cancel" OR "Execution Report" OR "Client Interest" OR "Inventory Posted"'
    let query = '"{"Cancel": 1}"'
    let limit = 25
    let {success, txs, error} = await api.searchFloData(query, limit)
    let floData = ''
    return txs
}

// Format OIP time data for rendering
function formatTime(oipdata) {
    for (let tx of oipdata) {
        // Set timeago to timeago(tx time)
        tx.tx.timeago = ta.ago(tx.tx.time * 1000);

        // Set tx.tx.time to human readable time
        var newDate = new Date();
        newDate.setTime(tx.tx.time * 1000);
        tx.tx.time = newDate.toUTCString();
    }
}
