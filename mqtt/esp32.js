const mqtt = require('mqtt');
const {
    brokerUrl,
    brokerPort,
    username,
    password,
    topic
  } = require('../config');
const client = mqtt.connect(brokerUrl, {
  clientId: 'machine1',
  username,
  password,
  brokerPort,
});

// Function to generate a random delay between 0 and 1 seconds
function getRandomDelay() {
  return 300; // Convert to milliseconds
}
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
// Function to publish the message and schedule the next publication
function publishMessage() {
  const message = {
    device_id: 'machine'+generateRandomNumber(5,15),
    message: 'Device Detected'
  };
  client.publish(topic, JSON.stringify(message));
  console.log('Published:', JSON.stringify(message));

  // Schedule the next publication
  setTimeout(publishMessage, getRandomDelay());
}

// Connect to the MQTT broker
client.on('connect', function () {
  console.log('Connected to MQTT Broker');

  // Start publishing messages
  publishMessage();
});

// Handle MQTT connection errors
client.on('error', function (error) {
  console.error('MQTT Error:', error);
});
