const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 3031 });

wss.on("connection", function connection(ws) {
  console.log("conecte");
  ws.on("message", function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});
