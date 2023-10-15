const mosca = require('mosca');

// MQTT broker settings
const settings = {
  port: 1883, // MQTT broker port
  http: {
    port: 3000, // MQTT over WebSocket port
    bundle: true,
  },
};

// Create a new MQTT broker instance
const server = new mosca.Server(settings);

// MQTT broker ready event
server.on('ready', () => {
  console.log('MQTT broker is ready and listening on port', settings.port);
});

// MQTT client connected event
server.on('clientConnected', (client) => {
  console.log('Client connected:', client.id);
});

// MQTT client disconnected event
server.on('clientDisconnected', (client) => {
  console.log('Client disconnected:', client.id);
});

// MQTT published event
server.on('published', (packet, client) => {
  console.log('Published:', packet.payload.toString());
});

// Handle unhandled MQTT packets
server.on('unsubscribed', (topic) => {
  console.log('Unsubscribed:', topic);
});

// Handle unsubscribed topics
server.on('unsubscribed', (topic) => {
  console.log('Unsubscribed:', topic);
});

// Handle MQTT broker errors
server.on('error', (err) => {
  console.log('MQTT broker error:', err);
});
