# teton-recent

![FLO](public/example.png)

teton-recent is a simple webapp displaying recent Teton County records posted to FLO Blockchain using OIP, expressjs, pug, and js-oip. 

## Install
Clone this repository and use `npm install` to install oip-express.
```
npm install
```

## Build
Call the babel binary directly to compile js to the lib directory:
```
./node_modules/.bin/babel src --out-dir lib
```
or, use our builtin custom package script:
```
npm run compile
```

## Run
After compiling with babel, start the webserver:
```
npm start
```

For convenience, run both commands in sequence:
```
npm run compile && npm start
```

## Contents
Currently, this application project contains the Recent Teton County records found at [Teton County Public Records](https://maps.greenwoodmap.com/tetonwy/clerk/query/). 

## Documentation
Documentation for packages oip-express depends on can be found in the following repositories:
* [js-oip](https://www.npmjs.com/package/js-oip) | ([github](https://github.com/oipwg/js-oip))
* [pug](https://pugjs.org/api/getting-started.html)
* [expressjs](https://expressjs.com/)

In particular, js-oip is the main driver behind oip-express; understanding how to use js-oip will allow the developer to parse the FLO blockchain and create a webapp quickly and efficiently. 

## Configuration
Configuration is done through modifying `src/index.js` at the moment. In the future a configuration file is planned. 
```
const port = 3000

let api = new DaemonApi('https://oip.mediciland.com/oip');
```
