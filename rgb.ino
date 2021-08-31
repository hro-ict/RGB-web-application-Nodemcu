

#include <ArduinoWebsockets.h>
#include <ESP8266WiFi.h>

const char* ssid = "tele2"; //Enter SSID
const char* password = "3AE53D90BJK"; //Enter Password
int blue_led= D0;
int green_led= D1;
int red_led=D2;
using namespace websockets;

WebsocketsServer server;
void setup() {
  pinMode(red_led,OUTPUT);
  pinMode(green_led,OUTPUT);
  pinMode(blue_led,OUTPUT);


  digitalWrite(red_led,0);

   digitalWrite(green_led,0);

   digitalWrite(blue_led,0);





  
  Serial.begin(115200);
  // Connect to wifi
  WiFi.begin(ssid, password);

  // Wait some time to connect to wifi
  for(int i = 0; i < 15 && WiFi.status() != WL_CONNECTED; i++) {
      Serial.print(".");
      delay(1000);
  }
  
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());   //You can get IP address assigned to ESP

  server.listen(8010);
  Serial.print("Is server live? ");
  Serial.println(server.available());
}

void loop() {
 


  
  WebsocketsClient client = server.accept();
  if(client.available()) {
    WebsocketsMessage msg = client.readBlocking();

    // log
    Serial.print("Got Message: ");
//    Serial.println(msg.data().indexOf('r'));
    int r= msg.data().indexOf('r');
    int g= msg.data().indexOf('g');
    int b= msg.data().indexOf('b');


    String red = msg.data().substring(0,r);
    String green = msg.data().substring(r+1,g);
    String blue = msg.data().substring(g+1,-2);

    Serial.println(red.toInt());
    Serial.println(green);
    Serial.println(blue);
    RGB_color(red.toInt(),green.toInt(),blue.toInt());
  



    // return echo
    client.send("Echo: " + red + green + blue);

    // close the connection
    client.close();
  }
  
  //delay(1000);
}


void RGB_color(int red_light_value, int green_light_value, int blue_light_value)
 {
  analogWrite(red_led, red_light_value);
  analogWrite(green_led, green_light_value);
  analogWrite(blue_led, blue_light_value);
}
