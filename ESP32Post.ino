#include <WiFi.h>
#include <HTTPClient.h> // nos permite hacer peticiones http
#include <ArduinoJson.h>
#include <DHT.h>
#include <DHT_U.h>

#define DHTPIN 27
#define DHTTYPE  DHT22

int sensor_ruido = 4;
int ruido;

int sensor_movimiento = 2;
int movimiento;
bool estado_movimiento = false;

int sensor_temperatura = 15;
float temperatura;
DHT dht (sensor_temperatura, DHT22);

int sensor_gas = 34;
int gas = 0;

bool estado_ruido = false;

// credenciales de la red a la cual nos conectaremos
const char* ssid = "iPhone de Jonathan";
const char* password = "TLNy-QhGN-shM1-Io76";
//const char* ssid = "Tenda_3DE948";
//const char* password = "18264838";
//IPAddress ip(192,168,10,9);     
//IPAddress gateway(192,168,10,1);   
//IPAddress subnet(255,255,255,0);   
//Temperatura


void setup() {
  Serial.begin(115200);
  dht.begin(); 

  // conexión a la red
  // WiFi.mode(WIFI_STA);
  // WiFi.config(ip, gateway, subnet);
  WiFi.begin(ssid, password);
  // IPAddress ip(192,168,10,145);     
  // IPAddress gateway(192,168,10,1);   
  // IPAddress subnet(255,255,255,0);   
  Serial.println("Connecting");
  while(WiFi.status() != WL_CONNECTED) { 
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.print("Conectado a la red con la IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  attachInterrupt(digitalPinToInterrupt(sensor_ruido), interrupcion_ruido, RISING);
  attachInterrupt(digitalPinToInterrupt(sensor_movimiento), interrupcion_movimiento, RISING);
}

void loop() {
  if(WiFi.status()== WL_CONNECTED ){ 
 //se agregan valores al documento
    DinamicJsonDocument doc(2048);

    doc("gas") = analogRead(sensor_gas);
    doc("movimiento") = digitalRead(sensor_movimiento);
    doc("ruido") = digitalRead(sensor_ruido);
    doc("temperatura") = dht.readTemperature();

  //doc["fecha"] = rtc.getDate();

  // documento serializado
  String json;
  serializeJson(doc, json);

  WiFiClient client;  // or WiFiClientSecure for HTTPS
  HTTPClient http;
  // Send request
  http.begin("https://link de la API/insertar");
  //cabeceras JSON
  http.addHeader("Content-Type", "application/json");
  int res = http.POST(json);

  Serial.println(json);
  // respuesta
  Serial.println(http.getString());
  Serial.println(res);
  // desconecta
  http.end();
  delay(60000);
  }
}

void interrupcion_ruido(){
    Serial.println("Hubo un ruido dentro de la habitacion");
    estado_ruido = true;
}

void interrupcion_movimiento(){
    Serial.println("Hubo un movimiento dentro de la habitacion");
    estado_movimiento = true;
}