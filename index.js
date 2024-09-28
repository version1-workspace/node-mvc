const http = require('node:http');
// server
const server = http.createServer((req, res) => {
  console.log('Request URL', req.url);
  console.log('Request Method', req.method);

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('Hello World!');
  res.end();
});

console.log('Server is running on http://localhost:8000');
server.listen(8000)
