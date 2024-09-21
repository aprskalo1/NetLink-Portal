import Title from "../Title";
import CodeBlock from "../CodeBlock.tsx";
import TextBlock from "../TextBlock";
import SubTitle from "../SubTitle.tsx";
import {Link} from "react-router-dom";

const Installation = () => {
    return (
        <div className="w-10/12">
            <Title>Usage</Title>

            <TextBlock>
                To begin using our library, you'll first need to initialize user secrets in your .NET project and store
                your DevToken.
                The DevToken can be found in the <Link to={"/docs/profile"}><strong>Profile</strong></Link> section of
                your account
                settings.
            </TextBlock>

            <SubTitle>Step 1: Initialize User Secrets</SubTitle>
            <TextBlock>
                Run the following command in your project directory to initialize user secrets:
            </TextBlock>

            <CodeBlock
                code={"dotnet user-secrets init"}
            />

            <TextBlock>
                After initializing, store your DevToken securely using the following command:
            </TextBlock>

            <CodeBlock
                code={'dotnet user-secrets set "NetLink:DevToken" "your-dev-token-here"'}
            />

            <SubTitle>Step 2: Register Services</SubTitle>
            <TextBlock>
                Once the DevToken is stored, add the required services by modifying your `Program.cs` or `Startup.cs`
                file.
                Use the following code to authenticate with your DevToken and register the necessary services in your DI
                container.
            </TextBlock>

            <CodeBlock
                code={
                    "builder.Services\n" +
                    "    .AuthenticateWithDevToken(builder.Configuration[\"NetLink:DevToken\"]!)\n" +
                    "    .AddEndUsers()\n" +
                    "    .AddStatisticsServices()\n" +
                    "    .AddSensorServices();\n"
                }
                language="csharp"
            />

            <SubTitle>Alternative: Hardcoding the DevToken (Not Recommended)</SubTitle>
            <TextBlock>
                If you prefer, you can hardcode the DevToken directly in your code, but this is not recommended as it
                exposes your token.
                For example:
            </TextBlock>

            <CodeBlock
                code={
                    "builder.Services\n" +
                    "    .AuthenticateWithDevToken(\"your-hardcoded-dev-token\")\n" +
                    "    .AddEndUsers()\n" +
                    "    .AddStatisticsServices()\n" +
                    "    .AddSensorServices();\n"
                }
                language="csharp"
            />
        </div>
    );
};

export default Installation;
