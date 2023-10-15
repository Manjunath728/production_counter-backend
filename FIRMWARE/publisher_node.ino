#include <ESP8266WiFi.h>
#include <PubSubClient.h>

// Replace with your Wi-Fi credentials
const char* ssid = "OnePlus 8 Pro";
const char* password = "1234567890";

// MQTT broker settings
const char* mqttServer = "173.212.249.30";
const int mqttPort = 1883;  // MQTT broker port
const char* mqttTopic = "company_name";
const char* mqttClientId = "da"; // MQTT client ID
const char* mqttUsername = "smps"; // MQTT username
const char* mqttPassword = "smps1234"; 

// Create WiFi client and MQTT client instances
WiFiClient wifiClient;
PubSubClient mqttClient(wifiClient);

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }

  Serial.println("Connected to WiFi");

  // Configure MQTT broker and callback function
  mqttClient.setServer(mqttServer, mqttPort);
  
}

void loop() {
  if (!mqttClient.connected()) {
    reconnect();
  }
  
  // Publish a message to the MQTT topic
  String message = "Hello, MQTT from NodeMCU!";
  mqttClient.publish(mqttTopic, message.c_str());

  delay(5000);  // Publish every 5 seconds
}

void reconnect() {
  while (!mqttClient.connected()) {
    Serial.println("Connecting to MQTT Broker...");
    
    if (mqttClient.connect("NodeMCU-Client",mqttUsername,mqttPassword)) {
      Serial.println("Connected to MQTT Broker");
    } else {
      Serial.print("Failed, rc=");
      Serial.print(mqttClient.state());
      Serial.println(" Retrying in 5 seconds...");
      delay(5000);
    }
  }
}