import Title from "../Title";
import CodeBlock from "../CodeBlock.tsx";
import TextBlock from "../TextBlock";
import SubTitle from "../SubTitle.tsx";

const Statistics = () => {
    return (
        <div className="w-10/12">
            <Title>Statistics Service</Title>
            <TextBlock>
                The `IStatisticsService` provides various methods to perform statistical calculations on a list of
                recorded sensor values. These methods allow you to compute key metrics like the average, median,
                standard deviation, variance, and more from the `RecordedValue` data.
            </TextBlock>

            <SubTitle>Service Injection (New C# Primary Constructor)</SubTitle>
            <CodeBlock
                code={
                    "public class TestClass(\n" +
                    "    IStatisticsService statisticsService,\n" +
                    "    IRecordedValueService recordedValueService)\n" +
                    "{\n" +
                    "    public async Task TestMethod()\n" +
                    "    {\n" +
                    "        // Example usage of statisticsService and recordedValueService\n" +
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
                    "    private readonly IStatisticsService _statisticsService;\n" +
                    "    private readonly IRecordedValueService _recordedValueService;\n\n" +
                    "    public TestClass(IStatisticsService statisticsService, IRecordedValueService recordedValueService)\n" +
                    "    {\n" +
                    "        _statisticsService = statisticsService;\n" +
                    "        _recordedValueService = recordedValueService;\n" +
                    "    }\n\n" +
                    "    public async Task TestMethod()\n" +
                    "    {\n" +
                    "        // Example usage of services\n" +
                    "    }\n" +
                    "}"
                }
                language="csharp"
            />

            <SubTitle>Retrieving Recorded Values</SubTitle>
            <TextBlock>
                Before performing any statistical calculations, you need to retrieve the recorded values from a sensor.
                Below is an example of how to retrieve recorded values using `IRecordedValueService`.
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

            <SubTitle>GetAverageValue</SubTitle>
            <TextBlock>
                Computes the average value from the list of `RecordedValue` objects retrieved from the sensor.
            </TextBlock>
            <CodeBlock
                code={
                    "// Calculate the average value of recorded sensor values\n" +
                    "var averageValue = _statisticsService.GetAverageValue(recordedValues);"
                }
                language="csharp"
            />

            <SubTitle>GetMedianValue</SubTitle>
            <TextBlock>
                Calculates the median value from the list of `RecordedValue` objects retrieved from the sensor.
            </TextBlock>
            <CodeBlock
                code={
                    "// Calculate the median value of recorded sensor values\n" +
                    "var medianValue = _statisticsService.GetMedianValue(recordedValues);"
                }
                language="csharp"
            />

            <SubTitle>GetStandardDeviation</SubTitle>
            <TextBlock>
                Computes the standard deviation from the list of `RecordedValue` objects retrieved from the sensor,
                measuring how spread out the values are from the average.
            </TextBlock>
            <CodeBlock
                code={
                    "// Calculate the standard deviation of recorded sensor values\n" +
                    "var standardDeviation = _statisticsService.GetStandardDeviation(recordedValues);"
                }
                language="csharp"
            />

            <SubTitle>GetVariance</SubTitle>
            <TextBlock>
                Computes the variance from the list of `RecordedValue` objects retrieved from the sensor,
                representing the degree of variation in the values.
            </TextBlock>
            <CodeBlock
                code={
                    "// Calculate the variance of recorded sensor values\n" +
                    "var variance = _statisticsService.GetVariance(recordedValues);"
                }
                language="csharp"
            />

            <SubTitle>GetMaxValue</SubTitle>
            <TextBlock>
                Retrieves the maximum value from the list of `RecordedValue` objects retrieved from the sensor.
            </TextBlock>
            <CodeBlock
                code={
                    "// Retrieve the maximum recorded value\n" +
                    "var maxValue = _statisticsService.GetMaxValue(recordedValues);"
                }
                language="csharp"
            />

            <SubTitle>GetMinValue</SubTitle>
            <TextBlock>
                Retrieves the minimum value from the list of `RecordedValue` objects retrieved from the sensor.
            </TextBlock>
            <CodeBlock
                code={
                    "// Retrieve the minimum recorded value\n" +
                    "var minValue = _statisticsService.GetMinValue(recordedValues);"
                }
                language="csharp"
            />
        </div>
    );
};

export default Statistics;
