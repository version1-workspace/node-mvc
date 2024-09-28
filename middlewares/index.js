const users = require('../controllers/user');

const bodyParser = (req, res) => {
  return new Promise((resolve, reject) => {
    if (!['POST', 'PATCH', 'PUT'].includes(req.method)) {
      resolve({});
      return
    }

    const body = [];
    try {
      req
        .on('data', chunk => {
          body.push(chunk);
        })
        .on('end', () => {
          const json = Buffer.concat(body).toString();
          req.body = JSON.parse(json);
          resolve({});
        })
        .on('error', (error) => {
          reject(error);
        });
    } catch (error) {
      console.error("error on bodyParser", error);
      reject(error);
    }
  })
}

const json = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  return true;
}

const requestLogger = (req, res) => {
  console.log('Request URL:', req.url);
  console.log('Request Method:', req.method);
  if (req.body) {
    console.log('Request Body:', req.body);
  }

  return true
}

const routes = (req, res) => {
  const hit = [
    {
      url: new RegExp('/api/v1/users/(?<id>[0-9]+)'),
      method: 'GET',
      handeler: users.show
    },
    {
      url: new RegExp('/api/v1/users/(?<id>[0-9]+)'),
      method: 'PATCH',
      handeler: users.update
    },
    {
      url: new RegExp('/api/v1/users/(?<id>[0-9]+)'),
      method: 'DELETE',
      handeler: users.destroy
    },
    {
      url: new RegExp('/api/v1/users'),
      method: 'GET',
      handeler: users.index
    },
    {
      url: new RegExp('/api/v1/users'),
      method: 'POST',
      handeler: users.create
    },
  ].some((route) => {
    const test = req.url.match(route.url);
    if (test && req.method === route.method) {
      req.params = test.groups;

      route.handeler(req, res);
      return true;
    }

    return false;
  });

  if (!hit) {
    res.writeHead(404);
    res.end(JSON.stringify({ message: 'Route not found' }));
  }

  return false;
}

module.exports = {
  bodyParser,
  json,
  requestLogger,
  routes,
}
