#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include<ArduinoJson.h>



#define sensor_pin D1

int device_id=144;

int laststate=LOW;
int currentstate;

const char* ssid = "";
const char* password = "";

// MQTT broker settings
const char* mqttServer = "40.121.71.22";
const int mqttPort = 1883;  // MQTT broker port
const char* mqttTopic = "company_name";
const char* mqttClientId = "machine"; // MQTT client ID //machine_one
const char* mqttUsername = "smps"; // MQTT username
const char* mqttPassword = "smps1234"; 

WiFiClient wifiClient;
PubSubClient mqttClient(wifiClient);

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  pinMode(sensor_pin,INPUT);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }

  Serial.println("Connected to WiFi");

  
  mqttClient.setServer(mqttServer, mqttPort);

}

void loop() {
  if (!mqttClient.connected()) {
    reconnect();
  }
  DynamicJsonDocument jsonDocument(128); 
  jsonDocument["device_id"] = mqttClientId;
  jsonDocument["message"] = "Device Detected";

  String jsonString;
  serializeJson(jsonDocument, jsonString);
  int currentstate=digitalRead(sensor_pin);
  if(laststate==LOW && currentstate==HIGH){
      Serial.print("Publishing");
      mqttClient.publish(mqttTopic, jsonString.c_str());
      Serial.println("Published");
  }
}

void reconnect() {
  while (!mqttClient.connected()) {
    Serial.println("Connecting to MQTT Broker...");
    
    if (mqttClient.connect(mqttClientId,mqttUsername,mqttPassword)) {
      Serial.println("Connected to MQTT Broker");
    } else {
      Serial.print("Failed, rc=");
      Serial.print(mqttClient.state());
      Serial.println(" Retrying in 5 seconds...");
      delay(5000);
    }
  }
}