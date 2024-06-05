const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', socket => {
    console.log('Client connected');
    socket.send(JSON.stringify({ type: 'message', data: 'Welcome to the WebSocket server!' }));

    setInterval(() => {
        socket.send(JSON.stringify({ type: 'time', data: new Date().toISOString() }));
    }, 1000);

    socket.on('message', message => {
        console.log('Received:', message);
    });
});

console.log('WebSocket server is running on ws://localhost:8080');
