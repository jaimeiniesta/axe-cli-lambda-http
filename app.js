const { createServer } = require('http');
const { parse: parseURL } = require('url');

const { PORT = 3000 } = process.env;

const analyze = async url => {
  let results;

  try {
    const execSync = require('child_process').execSync;
    var cmd = './node_modules/axe-cli/axe-cli -j ' + url;

    results = execSync(cmd);
  } catch (err) {
    // Re-throw
    throw err;
  }

  return results;
};

const server = createServer((req, res) => {
  // Ensure ?url= was provided
  const { query = {} } = parseURL(req.url, true);
  const { url } = query;
  if (!url) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('URL required');
    return;
  }

  // Analyze the URL
  analyze(url)
    .then(results => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(results);
    })
    .catch(err => {
      console.error('Runtime error', { error: err.message, stack: err.stack });
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end(err.message || 'Unknown error');
    });
});

server.listen(PORT);
