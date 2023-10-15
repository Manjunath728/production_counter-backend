const mqtt = require('mqtt');
const express = require("express");
const db = require('../db/db');
const dotenv = require('dotenv');
const {
  brokerUrl,
  brokerPort,
  username,
  password,
  topic
} = require('../config');
const clientId = 'c11';
console.log(brokerUrl)
const client = mqtt.connect(brokerUrl, {
  clientId,
  username,
  password,brokerPort
});

client.on('connect', () => {
  console.log('Connected to MQTT broker');
  client.subscribe(topic, (err) => {
    if (!err) {
      console.log(`Subscribed to topic: ${topic}`);
    } else {
      console.error(`Error subscribing to topic: ${err}`);
    }
  });
});
client.on('message', async (receivedTopic, message) => {
  try {
    const messageObj = JSON.parse(message);
    const deviceId = messageObj.device_id;
    let counter = await getCounterValue(deviceId);
    console.log(counter);
    counter = counter + 1;
    await update_db(deviceId, counter);
  }
  catch (err) {
    console.log(err);
  }
});

async function getCounterValue(deviceId) {
  try {
    const result = await db.query(`SELECT quantity FROM device_c WHERE deviceId='${deviceId}'`);

    if (result.rows.length > 0) {
      const counterValue = parseInt(result.rows[0].quantity);
      return counterValue;
    } else {
      return 0;
    }
  } catch (err) {
    console.log(err);
    return 0; 
  }
}

async function update_db(deviceid, counter) {
  try {
    const deviceExists = await checkDeviceExistence(deviceid);

    if (deviceExists) {
      // Update the existing device's quantity
      let result = await db.query(`UPDATE device_c SET quantity=${counter} WHERE deviceId='${deviceid}'`);
      console.log("Device updated:");
    } else {
      console.log(deviceid)
      console.log("Device does not exist, inserting a new record...");
      let result = await db.query(`INSERT INTO device_c (deviceId, quantity) VALUES ('${deviceid}', ${counter})`);
      console.log("New device inserted:");
    }
  } catch (error) {
    console.error("Error updating/inserting device:", error);
  }
}

async function checkDeviceExistence(deviceid) {
  try {
    const result = await db.query(`SELECT COUNT(*) AS deviceCount FROM device_c WHERE deviceId='${deviceid}'`);
    const deviceCount = parseInt(result.rows[0].devicecount); 
    return deviceCount > 0;
  } catch (error) {
    console.error("Error checking device existence:", error);
    return false; 
  }
}

client.on('error', (error) => {
  console.error(`MQTT Error: ${error}`);
});
