import Title from "../Title";
import CodeBlock from "../CodeBlock.tsx";
import TextBlock from "../TextBlock";
import SubTitle from "../SubTitle.tsx";

const RecordedValueServiceDocs = () => {
    return (
        <div className="w-10/12">
            <Title>Recording Values</Title>
            <TextBlock>
                The `IRecordedValueService` allows users to record sensor values either by sensor name or by sensor ID.
                This service provides an option to log data from sensors that are managed by this library.
            </TextBlock>

            <SubTitle>Note on Custom Backend Integration</SubTitle>
            <TextBlock>
                Important: The value recording methods in this service offer flexibility for users who have their
                own backend or device communication protocols. If your devices are not directly connected to this
                library’s services but use your own backend, you can still use the `RecordValue` methods to log values,
                while leveraging other library features like retrieving recorded values or managing sensors.
            </TextBlock>

            <SubTitle>Service Injection (New C# Primary Constructor)</SubTitle>
            <CodeBlock
                code={
                    "public class TestClass(\n" +
                    "    IRecordedValueService recordedValueService,\n" +
                    "    IEndUserSessionManager endUserSessionManager)\n" +
                    "{\n" +
                    "    public async Task TestMethod()\n" +
                    "    {\n" +
                    "        // Example usage of recordedValueService\n" +
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
                    "    private readonly IRecordedValueService _recordedValueService;\n" +
                    "    private readonly IEndUserSessionManager _endUserSessionManager;\n\n" +
                    "    public TestClass(IRecordedValueService recordedValueService, IEndUserSessionManager endUserSessionManager)\n" +
                    "    {\n" +
                    "        _recordedValueService = recordedValueService;\n" +
                    "        _endUserSessionManager = endUserSessionManager;\n" +
                    "    }\n\n" +
                    "    public async Task TestMethod()\n" +
                    "    {\n" +
                    "        // Example usage of _recordedValueService\n" +
                    "    }\n" +
                    "}"
                }
                language="csharp"
            />

            <SubTitle>RecordValueBySensorNameAsync</SubTitle>
            <TextBlock>
                Records a value for a sensor using its device name. If an `endUserId` is provided, the value will be
                recorded
                for the specified end user. If no `endUserId` is provided, the logged-in user will be used by default.
            </TextBlock>
            <TextBlock>
                Note: This method is particularly useful if your devices communicate with your own backend
                using custom protocols. You can still use this method to log values to the library while managing your
                device communication separately.
            </TextBlock>
            <CodeBlock
                language="csharp"
                code={
                    "// Record a value by sensor name for a specific end user\n" +
                    "var recordedValue = new RecordedValue(23.5);\n" +
                    "await _recordedValueService.RecordValueBySensorNameAsync(recordedValue, \"Temperature Sensor\", endUser.Id);\n\n" +
                    "// Defaulting to the logged-in user if no endUserId is provided\n" +
                    "await _recordedValueService.RecordValueBySensorNameAsync(recordedValue, \"Temperature Sensor\");"
                }
            />

            <SubTitle>RecordValueBySensorIdAsync</SubTitle>
            <TextBlock>
                Records a value for a sensor using its unique sensor ID. This method is useful when you have direct
                access
                to the sensor's ID and want to log values. Devices can communicate with a separate backend, and
                this method can still be used for logging purposes.
            </TextBlock>
            <CodeBlock
                language="csharp"
                code={
                    "// Record a value by sensor ID\n" +
                    "var recordedValue = new RecordedValue(23.5);\n" +
                    "await _recordedValueService.RecordValueBySensorIdAsync(recordedValue, new Guid(\"sensorId\"));"
                }
            />

            <SubTitle>GetRecordedValuesAsync</SubTitle>
            <TextBlock>
                Retrieves a list of recorded values for a sensor by its ID. This method allows you to specify optional
                filters like sorting (ascending or descending), quantity, and a date range.
            </TextBlock>
            <CodeBlock
                language="csharp"
                code={
                    "// Retrieve recorded values for a sensor\n" +
                    "var recordedValues = await _recordedValueService.GetRecordedValuesAsync(\n" +
                    "    new Guid(\"sensorId\"),\n" +
                    "    true, // ascending\n" +
                    "    10, // retrieve the last 10 values\n" +
                    "    DateTime.Now.AddDays(-7), // start date\n" +
                    "    DateTime.Now // end date\n" +
                    ");"
                }
            />
        </div>
    );
};

export default RecordedValueServiceDocs;