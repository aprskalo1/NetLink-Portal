import CodeBlock from "./CodeBlock";

const InstallationDocs = () => {
    return (
        <div className="w-10/12">
            <p className="text-4xl font-bold mb-5">Installation</p>

            <p className="mb-4">
                The <strong>NetLink</strong> library is currently supported for .NET Core. You can install it from the
                NuGet package manager or use the .NET CLI as described below.
            </p>

            <h3 className="text-2xl font-semibold mt-6 mb-2">Option 1: Install via PowerShell (NuGet Package
                Manager)</h3>
            <p className="mb-4">To install the library using the NuGet package manager in PowerShell, use the following
                command:</p>

            <CodeBlock code="Install-Package NetLink"/>

            <h3 className="text-2xl font-semibold mt-6 mb-2">Option 2: Install via .NET CLI</h3>
            <p className="mb-4">Alternatively, you can use the .NET CLI to install the package:</p>

            <CodeBlock code="dotnet add package NetLink"/>

            <p className="mt-6">
                Once installed, you can start using the library in your project by importing it as follows:
            </p>

            <CodeBlock code="using NetLink;"/>
        </div>
    );
};

export default InstallationDocs;
