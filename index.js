const express = require('express');
const app = express();
const port = 3000; // You can choose any available port


app.get("http://sql.cs.oberlin.edu/bchermsi/Motivation_Website/index.html", (request, response) => {
    const userName = request.query.userName;
    const password = request.query.password; 
    readFile('./index.html', 'utf8', (error, html) => {
        response.send(html);
    });
    
})

// app.listen(port, () => {
//     console.log(`Server listening on port ${port}`);
// });

// const { createServer } = require('node:http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });