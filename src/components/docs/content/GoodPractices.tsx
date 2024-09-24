import Title from "../Title";
import CodeBlock from "../CodeBlock.tsx";
import TextBlock from "../TextBlock";
import SubTitle from "../SubTitle.tsx";

const GoodPractices = () => {
    return (
        <div className="w-10/12">
            <Title>Good Practices for Error Handling in NetLink Library</Title>
            <TextBlock>
                When working with the NetLink library, it’s essential to handle errors and exceptions properly,
                especially
                during network requests and asynchronous operations. In this section, we’ll cover good practices for
                catching errors and ensuring the stability of your application when interacting with the NetLink API.
            </TextBlock>

            <SubTitle>Why Error Handling is Important</SubTitle>
            <TextBlock>
                When interacting with external APIs or making network requests, a lot can go wrong—network failures,
                server-side errors, or invalid requests. Proper error handling ensures that your application can
                gracefully recover from these issues and provide meaningful feedback to users or retry failed
                operations.
            </TextBlock>

            <SubTitle>Basic Error Handling with try-catch</SubTitle>
            <TextBlock>
                Whenever you’re working with asynchronous operations like the ones in the NetLink library, it’s a best
                practice to wrap them in a `try-catch` block. This ensures that any errors during API calls or
                network requests are caught and handled gracefully. Below is an example of handling errors when starting
                a sensor subscription.
            </TextBlock>
            <CodeBlock
                language="csharp"
                code={
                    "public async Task<IActionResult> Index()\n" +
                    "{\n" +
                    "    try\n" +
                    "    {\n" +
                    "        var endUser = new EndUser(\"48a187e5-3a77-4842-949a-49a85ac0a0e1\");\n" +
                    "        await endUserSessionManager.LogInEndUserAsync(endUser);\n\n" +
                    "        var sensors = await endUserManagementService.ListEndUserSensorsAsync(endUser.Id!);\n" +
                    "        var sensor1 = sensors.FirstOrDefault();\n\n" +
                    "        if (sensor1 == null)\n" +
                    "        {\n" +
                    "            throw new Exception(\"No sensors found for the user.\");\n" +
                    "        }\n\n" +
                    "        try\n" +
                    "        {\n" +
                    "            // Starting the sensor subscription (network-related)\n" +
                    "            await sensorSubscriptionService.StartListeningAsync(sensor1.Id);\n" +
                    "        }\n" +
                    "        catch (HttpRequestException ex)\n" +
                    "        {\n" +
                    "            // Handling errors specific to subscription\n" +
                    "            Console.WriteLine($\"Error subscribing to sensor: {ex.Message}\");\n" +
                    "            ViewBag.Error = \"Failed to subscribe to sensor updates.\";\n" +
                    "        }\n\n" +
                    "        var recordedValues = await recordedValueService.GetRecordedValuesAsync(sensor1.Id, false, 10);\n\n" +
                    "        // Set up real-time event handler for receiving recorded values\n" +
                    "        sensorSubscriptionService.OnRecordedValueReceived += (recordedValue) =>\n" +
                    "        {\n" +
                    "            // Handle received real-time sensor values here\n" +
                    "        };\n\n" +
                    "        ViewBag.SensorId = sensor1.Id;\n" +
                    "        return View(recordedValues);\n" +
                    "    }\n" +
                    "    catch (HttpRequestException ex)\n" +
                    "    {\n" +
                    "        // Handle network-related errors like unreachable API or server issues\n" +
                    "        Console.WriteLine($\"HTTP request error: {ex.Message}\");\n" +
                    "        ViewBag.Error = \"Network error occurred while processing your request.\";\n" +
                    "    }\n" +
                    "    catch (Exception ex)\n" +
                    "    {\n" +
                    "        // Handle other types of exceptions\n" +
                    "        Console.WriteLine($\"An error occurred: {ex.Message}\");\n" +
                    "        ViewBag.Error = \"An unexpected error occurred. Please try again later.\";\n" +
                    "    }\n\n" +
                    "    return View(new List<RecordedValue>());  // Return an empty list or error view\n" +
                    "}"
                }
            />

            <SubTitle>Key Takeaways</SubTitle>
            <TextBlock>
                Here are some important points to keep in mind when handling errors in your application:
            </TextBlock>

            <TextBlock>
                Always wrap async calls in try-catch blocks: This ensures that errors are caught, and your app can
                respond gracefully.
            </TextBlock>

            <TextBlock>
                Catch specific exceptions like `HttpRequestException`: This helps you distinguish between network
                errors and general exceptions, allowing for better error messaging and handling.
            </TextBlock>

            <TextBlock>
                Log errors for debugging: Use logging frameworks or `Console.WriteLine` to record details of any
                errors for future investigation.
            </TextBlock>

            <TextBlock>
                Fail gracefully: If an error occurs, return a safe fallback (like an empty list) and display
                user-friendly
                messages rather than crashing the app.
            </TextBlock>
        </div>
    );
};

export default GoodPractices;
