#include <WiFi.h>
#include <PubSubClient.h>

const char* ssid = "Estudiantes";
const char* password = "UV-2021$";
const char* mqtt_server = "34.141.155.221";
const int mqtt_port = 1883;
const char* mqtt_user = "kevin";
const char* mqtt_password = "kevin";
const char* topic = "Led";

WiFiClient espClient;
PubSubClient client(espClient);
int ledPin = 21;

void setup() {
  pinMode(ledPin, OUTPUT);
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectando a WiFi...");
  }
  Serial.println("Conexión WiFi exitosa");
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);
  
  connectToMQTT();
}

void loop() {
  if (!client.connected()) {
    connectToMQTT();
  }
  client.loop();

  // Ejemplo de publicación de mensaje
  publishMessage("Hola, mundo!");
  delay(5000); // Esperar 5 segundos antes de publicar otro mensaje
}

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Mensaje recibido en el tema: ");
  Serial.println(topic);
  if (payload[0] == '1') {
    digitalWrite(ledPin, HIGH);
  } else if (payload[0] == '0') {
    digitalWrite(ledPin, LOW);
  }
}

void connectToMQTT() {
  while (!client.connected()) {
    Serial.println("Conectando a MQTT...");
    if (client.connect("esp32-client", mqtt_user, mqtt_password)) {
      Serial.println("Conexión exitosa");
      client.subscribe(topic);
    } else {
      Serial.print("Error al conectarse al servidor MQTT: ");
      Serial.println(client.state());
      delay(2000);
    }
  }
}

void publishMessage(const char* message) {
  if (client.connected()) {
    client.publish(topic, message);
    Serial.println("Mensaje publicado: " + String(message));
  } else {
    Serial.println("Error: no se puede publicar el mensaje. No se encuentra conectado al servidor MQTT.");
  }
}
