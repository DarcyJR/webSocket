const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

// Lista de clientes conectados
const clients = new Set();

server.on('connection', (socket) => {
    console.log("Novo cliente conectado!");
    clients.add(socket);

    // Mensagem recebida do cliente
    socket.on('message', (message) => {
        console.log("Mensagem recebida:", message);

        // Enviar a mensagem para todos os clientes conectados
        for (const client of clients) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        }
    });

    // Remover cliente quando desconectar
    socket.on('close', () => {
        console.log("Cliente desconectado.");
        clients.delete(socket);
    });
});

console.log("Servidor WebSocket rodando em ws://localhost:8080");
