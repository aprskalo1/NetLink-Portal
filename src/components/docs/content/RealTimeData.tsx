import Title from "../Title";
import CodeBlock from "../CodeBlock.tsx";
import TextBlock from "../TextBlock";
import SubTitle from "../SubTitle.tsx";

const RealTimeData = () => {
    return (
        <div className="w-10/12">
            <Title>Real-Time Data Monitoring</Title>
            <TextBlock>
                The `ISensorSubscriptionService` allows developers to subscribe to real-time updates from sensors using
                SignalR WebSockets.
                When a new value is recorded by the sensor, the `OnRecordedValueReceived` event is triggered,
                allowing the developer to handle the value in their application. This service also supports
                starting and stopping subscriptions to individual sensors.
            </TextBlock>

            <SubTitle>Service Injection (New C# Primary Constructor)</SubTitle>
            <CodeBlock
                code={
                    "public class TestClass(\n" +
                    "    ISensorSubscriptionService sensorSubscriptionService)\n" +
                    "{\n" +
                    "    public async Task TestMethod()\n" +
                    "    {\n" +
                    "        // Example usage of sensorSubscriptionService\n" +
                    "    }\n" +
                    "}"
                }
                language="csharp"
            />

            <SubTitle>Service Injection (Older Constructor Method)</SubTitle>
            <CodeBlock
                code={
                    "public class TestClass\n" +
                    "{\n" +
                    "    private readonly ISensorSubscriptionService _sensorSubscriptionService;\n\n" +
                    "    public TestClass(ISensorSubscriptionService sensorSubscriptionService)\n" +
                    "    {\n" +
                    "        _sensorSubscriptionService = sensorSubscriptionService;\n" +
                    "    }\n\n" +
                    "    public async Task TestMethod()\n" +
                    "    {\n" +
                    "        // Example usage of _sensorSubscriptionService\n" +
                    "    }\n" +
                    "}"
                }
                language="csharp"
            />

            <SubTitle>Subscribing to Sensor Updates</SubTitle>
            <TextBlock>
                To start listening for real-time sensor updates, use the `StartListeningAsync` method. This method takes
                a sensor ID
                and subscribes to updates from that sensor. When a new value is recorded, the `OnRecordedValueReceived`
                event is triggered,
                providing you with the latest `RecordedValue`.
            </TextBlock>
            <CodeBlock
                language="csharp"
                code={
                    "// Subscribe to a sensor's updates\n" +
                    "var sensorId = new Guid(\"sensorId\");\n" +
                    "_sensorSubscriptionService.OnRecordedValueReceived += (recordedValue) =>\n" +
                    "{\n" +
                    "    Console.WriteLine($\"New value recorded: {recordedValue.Value}\");\n" +
                    "};\n" +
                    "await _sensorSubscriptionService.StartListeningAsync(sensorId);"
                }
            />

            <SubTitle>Unsubscribing from Sensor Updates</SubTitle>
            <TextBlock>
                To stop receiving real-time updates from a sensor, use the `StopListeningAsync` method. This method
                takes a sensor ID
                and unsubscribes from updates for that sensor.
            </TextBlock>
            <CodeBlock
                language="csharp"
                code={
                    "// Unsubscribe from a sensor's updates\n" +
                    "var sensorId = new Guid(\"sensorId\");\n" +
                    "await _sensorSubscriptionService.StopListeningAsync(sensorId);"
                }
            />

            <SubTitle>Using Custom SignalR Code for Real-Time Updates</SubTitle>
            <TextBlock>
                In addition to using the `ISensorSubscriptionService`, developers can also directly integrate with the
                SignalR WebSocket
                using custom code in other languages like JavaScript. The WebSocket listens on the URL
                `https://netlink-solution.com/sensorHub`. Below is an example of how you can use JavaScript to subscribe to
                sensor updates and dynamically update a webpage with new sensor values.
            </TextBlock>
            <CodeBlock
                language="html"
                code={
                    "<!-- SignalR Script for handling real-time updates -->\n" +
                    "<script src=\"https://cdnjs.cloudflare.com/ajax/libs/microsoft-signalr/5.0.0/signalr.min.js\"></script>\n" +
                    "<script type=\"text/javascript\">\n" +
                    "    // Set up SignalR connection to the hub\n" +
                    "    const connection = new signalR.HubConnectionBuilder()\n" +
                    "        .withUrl(\"https://netlink-solution.com/sensorHub\")\n" +
                    "        .build();\n\n" +
                    "    // Start the connection and subscribe to the sensor\n" +
                    "    connection.start()\n" +
                    "        .then(() => {\n" +
                    "            console.log(\"Connected to SignalR hub.\");\n" +
                    "            connection.invoke(\"Subscribe\", \"sensorId\");\n" +
                    "        })\n" +
                    "        .catch((err) => console.error(err.toString()));\n\n" +
                    "    // Listen for incoming recorded value updates\n" +
                    "    connection.on(\"ReceiveRecordedValue\", function (recordedValue) {\n" +
                    "        addNewValueToTable(recordedValue);\n" +
                    "    });\n\n" +
                    "    // Function to add a new row to the table dynamically\n" +
                    "    function addNewValueToTable(recordedValue) {\n" +
                    "        const tableBody = document.querySelector(\"#recordedValuesTable tbody\");\n" +
                    "        const newRow = document.createElement(\"tr\");\n" +
                    "        const formattedTimestamp = new Date(recordedValue.recordedAt).toLocaleString();\n\n" +
                    "        newRow.innerHTML = `\n" +
                    "            <td>${formattedTimestamp}</td>\n" +
                    "            <td>${recordedValue.value}</td>\n" +
                    "        `;\n" +
                    "        tableBody.prepend(newRow);\n" +
                    "    }\n" +
                    "</script>"
                }
            />

            <SubTitle>Custom Backend Integration</SubTitle>
            <TextBlock>
                If you have a custom backend or use other protocols for device communication, you can still leverage
                this WebSocket to subscribe to sensor updates in real-time. This flexibility allows you to implement
                your own communication systems while still benefiting from real-time sensor data updates.
            </TextBlock>
        </div>
    );
};

export default RealTimeData;