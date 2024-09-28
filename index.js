const http = require('node:http');
const { bodyParser, json, routes, requestLogger } = require('./middlewares');

// server
const server = http.createServer((req, res) => {
  midllewares(req, res);
});

const midllewares = async (req, res) => {
  try {
    const list = [
      bodyParser,
      json,
      requestLogger,
      routes
    ]
    for (let i = 0; i < list.length; i++) {
      const middleware = list[i];
      const next = await middleware(req, res);
      if (!next) {
        return
      }
    }
  } catch (error) {
    console.error("caught error", error);
    res.writeHead(500);
    res.end(JSON.stringify({ message: 'Internal Server Error' }));
  }
}



console.log('Server running at http://localhost:8000');
server.listen(8000);
