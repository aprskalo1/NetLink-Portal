import Title from "../Title";
import CodeBlock from "../CodeBlock.tsx";
import TextBlock from "../TextBlock";
import SubTitle from "../SubTitle.tsx";

const HTTPRemoteValueRec = () => {
    return (
        <div className="w-10/12">
            <Title>Recording Sensor Values via HTTP POST to NetLink</Title>
            <TextBlock>
                The following section explains how to record sensor values remotely by sending HTTP POST requests to the
                NetLink API. This can be done using any device that supports HTTP requests, such as an IoT device,
                microcontroller, or a regular computer. In this example, we will use an ESP8266 device as a
                demonstration, but the core principles apply to any device that can connect to the internet and send
                HTTP POST requests.
            </TextBlock>

            <SubTitle>HTTP POST Structure</SubTitle>
            <TextBlock>
                To record sensor values remotely, the device needs to send an HTTP POST request to the following NetLink
                endpoint:
            </TextBlock>
            <CodeBlock
                language="plaintext"
                code={"POST https://netlink.com/api/RecordedValues/RecordValueRemotely?sensorId=<sensor-id>"}
            />
            <TextBlock>
                The request must include the sensor ID as a query parameter and the sensor value as a JSON payload in
                the body of the request. The structure of the JSON payload looks like this:
            </TextBlock>
            <CodeBlock
                language="json"
                code={
                    "{\n" +
                    "  \"value\": \"<sensor-value>\"\n" +
                    "}"
                }
            />

            <TextBlock>
                Any device that supports making HTTP POST requests can use this structure to send recorded values to the
                NetLink server. Below, we provide an example using the ESP8266, which is a common Wi-Fi module used in
                IoT projects.
            </TextBlock>

            <SubTitle>ESP8266 Example</SubTitle>
            <TextBlock>
                In this example, we demonstrate how an ESP8266 can be used to send sensor values via HTTP POST requests.
                The ESP8266 connects to a Wi-Fi network, constructs an HTTP POST request, and sends the sensor value to
                the NetLink API endpoint. NetLink will recognize the device and associate the sensor value with the
                correct device.
            </TextBlock>

            <CodeBlock
                language="clike"
                code={
                    "#include <ESP8266WiFi.h>\n" +
                    "#include <ESP8266HTTPClient.h>\n\n" +
                    "// Wi-Fi credentials\n" +
                    "const char* ssid = \"Your-WiFi-SSID\";\n" +
                    "const char* password = \"Your-WiFi-Password\";\n\n" +
                    "// NetLink API endpoint\n" +
                    "const String apiEndpoint = \"https://netlink.com/api/RecordedValues/RecordValueRemotely\";\n" +
                    "const String sensorId = \"Your-Sensor-ID\";\n\n" +
                    "void setup() {\n" +
                    "  Serial.begin(115200);\n" +
                    "  WiFi.begin(ssid, password);\n\n" +
                    "  // Wait for Wi-Fi connection\n" +
                    "  while (WiFi.status() != WL_CONNECTED) {\n" +
                    "    delay(1000);\n" +
                    "    Serial.println(\"Connecting to WiFi...\");\n" +
                    "  }\n\n" +
                    "  Serial.println(\"Connected to WiFi\");\n" +
                    "}\n\n" +
                    "void loop() {\n" +
                    "  if (WiFi.status() == WL_CONNECTED) {\n" +
                    "    WiFiClientSecure wifiClient;\n" +
                    "    HTTPClient http;\n\n" +
                    "    String urlWithQueryParam = apiEndpoint + \"?sensorId=\" + sensorId;\n" +
                    "    http.begin(wifiClient, urlWithQueryParam);\n" +
                    "    http.addHeader(\"Content-Type\", \"application/json\");\n\n" +
                    "    // Generate random sensor value for testing\n" +
                    "    String randomValue = String(random(0, 100));\n" +
                    "    String jsonPayload = \"{\\\"value\\\":\\\"\" + randomValue + \"\\\"}\";\n\n" +
                    "    int httpResponseCode = http.POST(jsonPayload);\n\n" +
                    "    if (httpResponseCode > 0) {\n" +
                    "      String response = http.getString();\n" +
                    "      Serial.println(\"HTTP Response code: \" + String(httpResponseCode));\n" +
                    "      Serial.println(\"Response: \" + response);\n" +
                    "    } else {\n" +
                    "      Serial.println(\"Error in POST request: \" + http.errorToString(httpResponseCode));\n" +
                    "    }\n\n" +
                    "    http.end();\n" +
                    "  } else {\n" +
                    "    Serial.println(\"WiFi Disconnected\");\n" +
                    "  }\n\n" +
                    "  delay(15000); // Wait for 15 seconds before sending the next value\n" +
                    "}"
                }
            />

            <SubTitle>Key Takeaways</SubTitle>
            <TextBlock>
                The ESP8266 example demonstrates how to connect to a Wi-Fi network and send a POST request with
                the sensor data to NetLink.
            </TextBlock>

            <TextBlock>
                The important part is the HTTP POST request structure, which can be replicated on any device capable of
                making HTTP requests.
            </TextBlock>

            <TextBlock>
                The request should send sensor data as a JSON payload in the format: {"{"} "value":
                "&lt;sensor-value&gt;" {"}"}. This data is then recognized and processed by the NetLink server.
            </TextBlock>

            <TextBlock>
                This API also supports real-time data updates for sensors, which was previously mentioned.
            </TextBlock>
        </div>
    );
};

export default HTTPRemoteValueRec;