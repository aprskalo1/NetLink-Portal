import Title from "../Title";
import CodeBlock from "../CodeBlock.tsx";
import TextBlock from "../TextBlock";
import SubTitle from "../SubTitle.tsx";

const MQTTRemoteValueRec = () => {
    return (
        <div className="w-10/12">
            <Title>Recording Sensor Values via MQTT to NetLink</Title>
            <TextBlock>
                MQTT (Message Queuing Telemetry Transport) is a lightweight messaging protocol that is often used in IoT
                applications because of its efficiency. Compared to HTTP, MQTT offers several advantages:
            </TextBlock>

            <TextBlock>
                Efficiency: MQTT uses less bandwidth and resources, which is useful when devices need to send frequent
                or
                real-time updates.
            </TextBlock>

            <TextBlock>
                Low Power: MQTT allows devices to keep persistent connections, which makes it more energy-efficient
                for
                continuous data transmission.
            </TextBlock>

            <TextBlock>
                Scalability: MQTT is designed to handle many connections, making it ideal for environments with
                multiple
                devices.
            </TextBlock>

            <TextBlock>
                Real-Time Communication: MQTT is built for real-time communication, providing low-latency data
                transmission
                between devices.
            </TextBlock>

            <SubTitle>MQTT Data Flow</SubTitle>
            <TextBlock>
                NetLink supports both HTTP and MQTT for recording sensor values. When using MQTT, devices publish sensor
                data to specific topics that correspond to their sensor ID. NetLink processes this data and makes it
                available through real-time updates.
            </TextBlock>

            <SubTitle>MQTT Topic Structure</SubTitle>
            <TextBlock>
                To record sensor values remotely via MQTT, devices should publish their data to the following topic
                format:
            </TextBlock>
            <CodeBlock
                language="plaintext"
                code={"/sensors/<sensor-id>/recordedvalue"}
            />
            <TextBlock>
                The payload must be sent as JSON, containing the sensor value in the following format:
            </TextBlock>
            <CodeBlock
                language="json"
                code={
                    "{\n" +
                    "  \"value\": <sensor-value>\n" +
                    "}"
                }
            />

            <SubTitle>ESP8266 MQTT Example</SubTitle>
            <TextBlock>
                Below is an example of how to use the ESP8266 microcontroller to send sensor values via MQTT to the
                NetLink
                server.
            </TextBlock>
            <CodeBlock
                language="clike"
                code={
                    "#include <ESP8266WiFi.h>\n" +
                    "#include <PubSubClient.h>\n\n" +
                    "// Wi-Fi and MQTT credentials\n" +
                    "const char* ssid = \"Your-WiFi-SSID\";\n" +
                    "const char* password = \"Your-WiFi-Password\";\n" +
                    "const char* mqtt_server = \"my-domain.com\";\n" +
                    "const int mqtt_port = 1883;\n" +
                    "const char* mqtt_topic = \"/sensors/Your-Sensor-ID/recordedvalue\";\n\n" +
                    "WiFiClient espClient;\n" +
                    "PubSubClient client(espClient);\n\n" +
                    "void setup_wifi() {\n" +
                    "  delay(10);\n" +
                    "  Serial.println();\n" +
                    "  Serial.print(\"Connecting to \");\n" +
                    "  Serial.println(ssid);\n\n" +
                    "  WiFi.begin(ssid, password);\n\n" +
                    "  while (WiFi.status() != WL_CONNECTED) {\n" +
                    "    delay(500);\n" +
                    "    Serial.print(\".\");\n" +
                    "  }\n\n" +
                    "  Serial.println(\"\");\n" +
                    "  Serial.println(\"WiFi connected\");\n" +
                    "}\n\n" +
                    "void reconnect() {\n" +
                    "  while (!client.connected()) {\n" +
                    "    Serial.print(\"Attempting MQTT connection...\");\n" +
                    "    if (client.connect(\"ESP8266Client\")) {\n" +
                    "      Serial.println(\"connected\");\n" +
                    "    } else {\n" +
                    "      Serial.print(\"Failed, rc=\");\n" +
                    "      Serial.print(client.state());\n" +
                    "      Serial.println(\" try again in 5 seconds\");\n" +
                    "      delay(5000);\n" +
                    "    }\n" +
                    "  }\n" +
                    "}\n\n" +
                    "void sendRecordedValue(float value) {\n" +
                    "  String payload = \"{\\\"Value\\\": \" + String(value) + \"}\";\n" +
                    "  client.publish(mqtt_topic, payload.c_str());\n" +
                    "}\n\n" +
                    "void setup() {\n" +
                    "  Serial.begin(115200);\n" +
                    "  setup_wifi();\n" +
                    "  client.setServer(mqtt_server, mqtt_port);\n" +
                    "}\n\n" +
                    "void loop() {\n" +
                    "  if (!client.connected()) {\n" +
                    "    reconnect();\n" +
                    "  }\n\n" +
                    "  client.loop();\n\n" +
                    "  float sensorValue = random(10, 100) / 1.0;\n" +
                    "  sendRecordedValue(sensorValue);\n" +
                    "  delay(10000);\n" +
                    "}"
                }
            />

            <SubTitle>Key Takeaways</SubTitle>
            <TextBlock>
                MQTT offers a more efficient and scalable method for transmitting sensor data to NetLink in real
                time.
            </TextBlock>

            <TextBlock>
                Devices can publish sensor values to MQTT topics in JSON format, which are processed and stored by the
                NetLink platform.
            </TextBlock>
            <TextBlock>
                MQTT is especially useful for devices that need continuous or real-time updates due to its low
                overhead.
            </TextBlock>
            <TextBlock>
                Just like HTTP, MQTT supports real-time data updates on NetLink.
            </TextBlock>
        </div>
    );
};

export default MQTTRemoteValueRec;