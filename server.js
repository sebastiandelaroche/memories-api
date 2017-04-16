
// @todo mejorar todo el bootstrap del server

const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;
const server = http.createServer(app).listen(port);


server.on('error', err => {

	console.log('err', err);
	
});

server.on('listening', () => {

    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    console.log(`Listening on ${bind}`);

});