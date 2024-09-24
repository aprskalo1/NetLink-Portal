import Title from "../Title";
import TextBlock from "../TextBlock";
import SubTitle from "../SubTitle.tsx";

const ClosingRemarks = () => {
    return (
        <div className="w-10/12">
            <Title>Conclusion & Next Steps</Title>

            <TextBlock>
                You've now explored the core features from NetLink, including how to manage sensor data,
                handle real-time updates, and use best practices for error handling. We encourage you to experiment
                further with the library and adapt it to your unique use cases.
            </TextBlock>

            <SubTitle>Next Steps</SubTitle>
            <TextBlock>
                Dive deeper into the API documentation for more advanced use cases.
            </TextBlock>
            <TextBlock>
                Explore the integration of additional sensors or data collection tools.
            </TextBlock>
            <TextBlock>
                Use the real-time features to build interactive dashboards or monitoring systems.
            </TextBlock>

            <SubTitle>Frequently Asked Questions</SubTitle>
            <TextBlock>
                Q: What do I do if my sensor isn’t connecting? {"\n"}
                A: Double-check your sensor's ID and make sure it matches what’s in your system.
                Ensure your device is connected to the correct Wi-Fi network.
            </TextBlock>
            <TextBlock>
                Q: How do I extend the library for custom needs? {"\n"}
                A: The library is designed to be flexible. You can create custom extensions
                by implementing the necessary interfaces.
            </TextBlock>
            <TextBlock>
                Q: Is connecting sensors to my application managed by NetLink? {"\n"}
                A: The actual connection and integration between your sensors and your application is entirely your
                responsibility. NetLink handles the management, recording, and real-time updates of sensor data once
                your device is successfully connected and configured to communicate with the NetLink server.
            </TextBlock>
            <TextBlock>
                Q: What platforms are supported by the NetLink library? {"\n"}
                A: Currently, there is a NuGet package available for .NET Core, which supports dependency injection
                features. Development for libraries in other languages and frameworks is actively in progress and will
                be released soon.
            </TextBlock>

            <SubTitle>Community and Support</SubTitle>
            <TextBlock>
                If you have any questions, feel free to reach out and contact us at support@my-domain.com. We also
                welcome contributions and suggestions on our GitHub repository.
            </TextBlock>
        </div>
    );
};

export default ClosingRemarks;
