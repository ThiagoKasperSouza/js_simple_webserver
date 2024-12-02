const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 3000;
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm'
};

function renderComponent(path) {
    fetch(path)
    .then(response => response.text())
    .then(data => {
      document.getElementById(`main-placeholder`).innerHTML = data;
    })
    .catch(error => console.error(`Erro ao carregar o main:`, error));
  }
  

  

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;
    switch(filePath) {
        case "./":
            filePath = './index.html';
            break;
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code == 'ENOENT') {
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.end(`<h1>Erro ao carregar a pagina</h1><p>${error.message}</p>`, 'utf-8');
            } else {
                res.writeHead(500,{'Content-Type': 'text/html'});
                res.end(`<h1>Erro ao carregar a pagina</h1><p>${error.message}</p>`, 'utf-8');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});