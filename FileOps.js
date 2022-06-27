const http = require('http');
const fs = require('fs');

http.createServer((req,resp) =>
{
  const FileName = req.url.slice(1);
  const CORS = {'Access-Control-Allow-Origin': '*'};

  if (req.method === 'GET')
    if(fs.existsSync(FileName))
    {
      resp.writeHead(200, CORS);
      resp.end(fs.readFileSync(FileName));
    }
    else
    {
      resp.writeHead(404, CORS);
      resp.end(`404 - file not found.  File attempted: '${FileName}'`);
    }
  else if (req.method === 'POST')
  {
    req.on('data', (FileText) =>
    {
      fs.writeFileSync(FileName, FileText);
      resp.writeHead(200, CORS);
      resp.end("File written.");
    });
  }
  else
  {
    resp.writeHead(405, CORS);
    resp.end(`405 - method not allowed. Method attempted: '${req.method}'`);
  }

}).listen(8003, 'localhost');
