import CodeBlock from "../CodeBlock";
import Title from "../Title";
import SubTitle from "../SubTitle";
import TextBlock from "../TextBlock";

const InstallationDocs = () => {
    return (
        <div className="w-10/12">
            <Title>Installation</Title>

            <TextBlock>
                The <strong>NetLink</strong> library is currently supported for .NET Core. You can install it from the
                NuGet package manager or use the .NET CLI as described below.
            </TextBlock>

            <SubTitle>Option 1: Install via PowerShell (NuGet Package Manager)</SubTitle>
            <TextBlock>
                To install the library using the NuGet package manager in PowerShell, use the following command:
            </TextBlock>

            <CodeBlock code="Install-Package NetLink"/>

            <SubTitle>Option 2: Install via .NET CLI</SubTitle>
            <TextBlock>
                Alternatively, you can use the .NET CLI to install the package:
            </TextBlock>

            <CodeBlock code="dotnet add package NetLink"/>

            <TextBlock>
                Once installed, you can start using the library in your project by importing it as follows:
            </TextBlock>

            <CodeBlock code="using NetLink;"/>
        </div>
    );
};

export default InstallationDocs;
