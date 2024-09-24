import Title from "../Title";
import CodeBlock from "../CodeBlock.tsx";
import TextBlock from "../TextBlock";
import SubTitle from "../SubTitle.tsx";

const Sensors = () => {
    return (
        <div className="w-10/12">
            <Title>Sensor Management</Title>
            <TextBlock>
                The `ISensorService` provides methods for managing sensors associated with an end user. Each method can
                optionally accept an `endUserId`, allowing operations to be performed on behalf of a specific end user.
                If no `endUserId` is provided, the logged-in user will be used by default. Below is how you can
                instantiate and use the `ISensorService` to manage sensors for a given end user.
            </TextBlock>

            <SubTitle>Service Injection (New C# Primary Constructor)</SubTitle>
            <CodeBlock
                code={
                    "public class TestClass(\n" +
                    "    ISensorService sensorService,\n" +
                    "    IEndUserSessionManager endUserSessionManager)\n" +
                    "{\n" +
                    "    public async Task TestMethod()\n" +
                    "    {\n" +
                    "        // Example usage of sensorService\n" +
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
                    "    private readonly ISensorService _sensorService;\n" +
                    "    private readonly IEndUserSessionManager _endUserSessionManager;\n\n" +
                    "    public TestClass(ISensorService sensorService, IEndUserSessionManager endUserSessionManager)\n" +
                    "    {\n" +
                    "        _sensorService = sensorService;\n" +
                    "        _endUserSessionManager = endUserSessionManager;\n" +
                    "    }\n\n" +
                    "    public async Task TestMethod()\n" +
                    "    {\n" +
                    "        // Example usage of _sensorService\n" +
                    "    }\n" +
                    "}"
                }
                language="csharp"
            />

            <SubTitle>AddSensorAsync</SubTitle>
            <TextBlock>
                Adds a new sensor to the system. If an `endUserId` is provided, the sensor will be assigned to the
                specified end user. If no `endUserId` is provided, the sensor will be associated with the currently
                logged-in user. Note that the configuration of the sensor device must include the retrieved sensor ID
                for future use and recognition.
            </TextBlock>
            <CodeBlock
                language="csharp"
                code={
                    "var endUser = new EndUser(\"endUserId\");\n" +
                    "var sensor = new Sensor(\"Temperature Sensor\", \"Thermometer\", \"Celsius\");\n" +
                    "// Assigning sensor to a specific end user\n" +
                    "var sensorId = await _sensorService.AddSensorAsync(sensor, endUser.Id);\n\n" +
                    "// Defaulting to the logged-in user if no endUserId is provided\n" +
                    "var sensorIdLoggedUser = await _sensorService.AddSensorAsync(sensor);\n\n" +
                    "// IMPORTANT: Store the retrieved sensorId in the actual device configuration for future use and recognition."

                }
            />

            <SubTitle>GetSensorByNameAsync</SubTitle>
            <TextBlock>
                Retrieves a sensor by its device name. If an `endUserId` is provided, the sensor will be retrieved for
                the specified end user. If no `endUserId` is provided, the sensor associated with the currently
                logged-in user will be retrieved.
            </TextBlock>
            <CodeBlock
                code={
                    "// Retrieve a sensor by name for a specific end user\n" +
                    "var sensor = await _sensorService.GetSensorByNameAsync(\"Temperature Sensor\", endUser.Id);\n\n" +
                    "// Defaulting to the logged-in user if no endUserId is provided\n" +
                    "var sensorLoggedUser = await _sensorService.GetSensorByNameAsync(\"Temperature Sensor\");"
                }
                language="csharp"
            />

            <SubTitle>GetSensorByIdAsync</SubTitle>
            <TextBlock>
                Retrieves a sensor by its ID. If an `endUserId` is provided, the sensor will be retrieved for the
                specified end user. If no `endUserId` is provided, the sensor associated with the currently logged-in
                user will be retrieved.
            </TextBlock>
            <CodeBlock
                code={
                    "// Retrieve a sensor by ID for a specific end user\n" +
                    "var sensor = await _sensorService.GetSensorByIdAsync(new Guid(\"endUserId\"), endUser.Id);\n\n" +
                    "// Defaulting to the logged-in user if no endUserId is provided\n" +
                    "var sensorLoggedUser = await _sensorService.GetSensorByIdAsync(new Guid(\"endUserId\"));"
                }
                language="csharp"
            />

            <SubTitle>UpdateSensorAsync</SubTitle>
            <TextBlock>
                Updates an existing sensor by its ID. If an `endUserId` is provided, the sensor will be updated for the
                specified end user. If no `endUserId` is provided, the sensor associated with the currently logged-in
                user will be updated.
            </TextBlock>
            <CodeBlock
                code={
                    "// Update a sensor for a specific end user\n" +
                    "var updatedSensor = new Sensor(\"Updated Temperature Sensor\", \"Thermometer\", \"Celsius\");\n" +
                    "await _sensorService.UpdateSensorAsync(new Guid(\"endUserId\"), updatedSensor, endUser.Id);\n\n" +
                    "// Defaulting to the logged-in user if no endUserId is provided\n" +
                    "await _sensorService.UpdateSensorAsync(new Guid(\"endUserId\"), updatedSensor);"
                }
                language="csharp"
            />

            <SubTitle>DeleteSensorAsync</SubTitle>
            <TextBlock>
                Deletes a sensor by its ID. If an `endUserId` is provided, the sensor will be deleted for the specified
                end user. If no `endUserId` is provided, the sensor associated with the currently logged-in user will be
                deleted.
            </TextBlock>
            <CodeBlock
                code={
                    "// Delete a sensor for a specific end user\n" +
                    "await _sensorService.DeleteSensorAsync(new Guid(\"endUserId\"), endUser.Id);\n\n" +
                    "// Defaulting to the logged-in user if no endUserId is provided\n" +
                    "await _sensorService.DeleteSensorAsync(new Guid(\"endUserId\"));"
                }
                language="csharp"
            />
        </div>
    );
};

export default Sensors;