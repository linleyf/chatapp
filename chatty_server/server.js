// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('node-uuid');

// Set the port to 4000
const PORT = 4000;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

let usersOnline = 0


wss.broadcast = function broadcast(outgoingMessage) {
  wss.clients.forEach(function each(client) {
    client.send(outgoingMessage);
  });
  console.log("sending" + outgoingMessage)
};



// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', function connection(ws) {
  // console.log('Client connected');

  usersOnline += 1

  var userObject = {
    type: 'userCount',
    data: {
      usersOnline: usersOnline
    }
  }
   wss.broadcast(JSON.stringify(userObject));

  ws.on('message', function incoming(message) {
  var parsedMessage = JSON.parse(message)
  console.log(parsedMessage);
  var typeMessage = parsedMessage.type;

console.log(typeMessage, "this is type")
    if (typeMessage === "postMessage") {
      let uniqueid = uuid.v1();
      let outgoingMessage = {
        type: "incomingMessage",
        id: uniqueid,
        username: parsedMessage.username,
        content: parsedMessage.content
      }
      wss.broadcast(JSON.stringify(outgoingMessage));
    } else if (typeMessage === "postNotification") {
        let outgoingNotification = {
          type: "incomingNotification", 
          content: parsedMessage.content 
        }
        wss.broadcast(JSON.stringify(outgoingNotification));
      }
  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
      usersOnline -= 1
      var userObject = {
        type: 'userCount',
        data: {
          usersOnline: usersOnline
        }
      }
   wss.broadcast(JSON.stringify(userObject));
  });
  //console.log('Client disconnected')

});
