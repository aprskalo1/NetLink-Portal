import Title from "../Title.tsx";
import TextBlock from "../TextBlock.tsx";
import CodeBlock from "../CodeBlock.tsx";
import SubTitle from "../SubTitle.tsx";

const QuickOverview = () => {
    return (
        <div className="w-10/12">
            <Title>Services and Features Overview</Title>
            <TextBlock>
                The following examples demonstrate how multiple service groups are registered in your application. Each
                group of services brings together various functionalities that enable the core features of the system.
                These services work together to manage users, sensors, and statistics across the system.
            </TextBlock>

            <SubTitle>EndUser Services</SubTitle>
            <TextBlock>
                The EndUser Services handle user account management, user profiles, and user-specific data. These
                services also facilitate end user session management, allowing the system to authenticate and track user
                activity.
            </TextBlock>
            <CodeBlock code=".AddEndUsers()"/>

            <SubTitle>Sensor Services</SubTitle>
            <TextBlock>
                Sensor Services integrate with hardware or virtual sensors, providing functionalities for data
                collection, sensor grouping, and overall sensor management. These services enable seamless interaction
                with sensors in the system.
            </TextBlock>
            <CodeBlock code=".AddSensorServices()"/>

            <SubTitle>Statistics Services</SubTitle>
            <TextBlock>
                The Statistics Services provide mathematical, statistical, and analytical tools. These services enable
                easier development of data analysis and visualization features.
            </TextBlock>
            <CodeBlock code=".AddStatisticsServices()"/>

            <Title>Models</Title>
            <TextBlock>
                In addition to services, the system uses several models to represent entities like users, groups,
                sensors, and recorded data. Below are examples of how to instantiate these models.
            </TextBlock>

            <SubTitle>EndUser Model</SubTitle>
            <TextBlock>
                The `EndUser` model represents a user in the system. Below is an example of how to instantiate the
                `EndUser` model:
            </TextBlock>
            <CodeBlock
                code={"var endUser = new EndUser(\"user-id\");"}
                language="csharp"
            />

            <SubTitle>Group Model</SubTitle>
            <TextBlock>
                The `Group` model represents a collection of sensor devices grouped together. Below is an example of
                how to instantiate the `Group` model:
            </TextBlock>
            <CodeBlock
                code={"var group = new Group(\"group-name\");"}
                language="csharp"
            />

            <SubTitle>Sensor Model</SubTitle>
            <TextBlock>
                The `Sensor` model represents a sensor device within the system. Below is an example of how to
                instantiate the `Sensor` model:
            </TextBlock>
            <CodeBlock
                code={
                    "var sensor = new Sensor(\n" +
                    "    \"device-name\",\n" +
                    "    \"device-type\",\n" +
                    "    \"measurement-unit\",\n" +
                    "    \"device-location\",\n" +
                    "    \"device-description\"\n" +
                    ");"
                }
                language="csharp"
            />

            <SubTitle>RecordedValue Model</SubTitle>
            <TextBlock>
                The `RecordedValue` model is used to represent data recorded by a sensor. Below is an example of how to
                instantiate the `RecordedValue` model:
            </TextBlock>
            <CodeBlock
                code={"var recordedValue = new RecordedValue(100.0);"}
                language="csharp"
            />
        </div>
    );
}

export default QuickOverview;
