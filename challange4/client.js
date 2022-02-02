var WebSocketClient = require("websocket").client;
var client = new WebSocketClient();

client.onopen = function () {
  console.log("Anton");
  client.send("Anton");
};
client.onclose = function () {
  console.log("echo-protocol Client Closed");
};

client.onmessage = function (e) {
  if (typeof e.data === "string") {
    console.log("Received: '" + e.data + "'");
  }
};
client.connect("ws://3333.kodaktor.ru", "echo-protocol");
