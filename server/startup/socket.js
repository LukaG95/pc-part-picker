const authController = require('../Controllers/authController');

module.exports = function (app, port) {
  const http = require('http').createServer(app);
  const io = require('socket.io')(http);

  io.testPing = testPing.bind(io);

  io.on('connection', async (socket) => {

    try {
      const cookie = socket.handshake.headers.cookie;
      if (!cookie){
        socket.emit('auth', 'failure');
        return socket.disconnect();
      }
    
      const { jwt } = parseCookie(cookie); 
      const { decoded, err } = await authController.getUserIdFromToken(jwt);
 
      if (err) {
        console.error('Authentication failed:', err);
        socket.emit('auth', 'failure');
        return socket.disconnect();
      }

      //socket.shouldDisconnect = false;
      socket.join(decoded.id+process.env.ROOM_SECRET);
      //socket.token = decoded.id;
      socket.emit('auth', 'success'); 

    } catch(e) {
      socket.emit('auth', 'failure');
      console.log(e, "Something went wrong getting token from request");
      return socket.disconnect();
    }

  });

  http.listen(port, () => {
    console.log(`listening on *:${port}`);
  });

  app.set('socket', io);
};

function testPing(recipientId, messageObj) {
  this.to(recipientId).emit('test', messageObj);
}

function parseCookie(cookie) {
  cookie = cookie.split('; ').join(';');
  cookie = cookie.split(';');

  const object = {};
  for (let i = 0; i < cookie.length; i++) {
    const parts = cookie[i].split('=');
    if (parts.length === 2) {
      object[parts[0]] = decodeURIComponent(parts[1]);
    }
  }
  return object;
}
