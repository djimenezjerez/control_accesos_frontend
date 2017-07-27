const fs = require('fs');
const https = require('https');
const express = require('express');

let app = express();

https.createServer({
  key: fs.readFileSync('certs/server.key'),
  cert: fs.readFileSync('certs/server.crt')
}, app).listen(8443);

app.use(express.static(`${__dirname}/dist`));

app.get('*', (req, res) => {
  res.sendfile(`${__dirname}/dist/index.html`);
});
