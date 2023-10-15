# Production Counter IoT Project - Backend
## Overview
The Production Counter Backend is an IoT project designed to monitor and record production data from multiple machines using ESP32 devices. These ESP32 devices detect each item produced, send a unique machine name and a production message when a new item is detected, and publish this information. The backend system then subscribes to these messages, differentiates them based on machine names, and stores the data in a database. Additionally, a server.js file serves as an API to fetch production data.
## Getting Started
To get started with this project, follow these steps:  

1) clone the repo
```bash
git clone https://github.com/Manjunath728/production_counter-backend.git
```
2) Go to directory
```bash
cd production_counter-backend
```
3) Install dependencies
```bash
npm i
```
4)  change config file to your setting
```javascript
const brokerUrl ="mqtt://<ipadress>" // add mqtt broker ip adress 
const brokerPort = 1883 // mqtt brokker port
const username = "" // mqtt username
const password = "" // mqtt password 
const topic = "company_name" 
const serverPort=3000 // backend server running port
const database='devicecounter' // database name : create database if not 
const DbUsername='' // postgres  apllication username 
const DbPassword='' // password
const DbUrl='localhost' // posgres url if it is in localhost then use 'localhost'
const Dbport=5432 // port

module.exports = {
  brokerUrl,
  brokerPort,
  username,
  password,
  topic,
  serverPort,
  DbUsername,
  DbPassword,
  database,
  DbUrl,
  Dbport
};

```
## start the mqtt broker only if you dont have broker remember to change config according to it 
```bash
cd mqtt
node mosca_broker.js  
```
5) create the database and table  also refer database_creation.sql

```sql
create database devicecounter;
use devicecounter ;
create table device_c(DeviceId VARCHAR(100) Primary key,quantity INT DEFAULT 0);
```
6) Now start the Subscriber in new terminal
```bash
cd mqtt
node subscriber.js 
```
7) Now start the server in new terminal
```bash
node server.js
```


## API Endpoints
The server provides the following API endpoints:
```
'GET /api/devices' : Retrieves a list of all machines and their production data.
```


### Note
Now take the esp32 and flash code from FIRMWARE folder then you will see working 

if you are testing application without esp then use esp32.js from mqtt folder
