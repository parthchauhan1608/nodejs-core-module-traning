
const http = require('http');

const server = http.createServer((req, res)=>{
    if(req.url === '/'){
    res.write('Hello parth');
    res.end();
    }
    if(req.url === '/api/courses'){
        res.write(JSON.stringify(["Parth","Trusha","Hariom","Jainee","Mitashu"]));
        res.end();
    }
});

/*server.on('connection', (socket)=>{
    console.log('connected...');
});*/
server.listen(3000);

console.log('Listening on port 3000...');