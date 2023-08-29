const express = require('express')
const next = require('next')

const port = 80
const app = next({ dev: true, hostname: 'localhost', port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  //console.log(__dirname + "/uploads")
  server.use("/uploads", express.static(__dirname + "/public/uploads"));
  server.all('*', (req, res) => {
      //console.log('handle', req.url);
      return handle(req, res)
  });

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})