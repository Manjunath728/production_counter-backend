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


