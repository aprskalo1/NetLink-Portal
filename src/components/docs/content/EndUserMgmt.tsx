import Title from "../Title";
import CodeBlock from "../CodeBlock.tsx";
import TextBlock from "../TextBlock";
import SubTitle from "../SubTitle.tsx";

const EndUserMgmt = () => {
    return (
        <div className="w-10/12">

            <Title>End User Session & Management</Title>

            <TextBlock>
                The `IEndUserSessionManager` and `IEndUserManagementService` provide methods for managing the session of
                an end user and handling end user operations, such as registration, validation, and sensor management.
                Below are the service instantiation examples and method usages.
            </TextBlock>

            <SubTitle>Service Injection (New C# Primary Constructor)</SubTitle>
            <CodeBlock
                code={
                    "public class TestClass(\n" +
                    "    IEndUserSessionManager endUserSessionManager,\n" +
                    "    IEndUserManagementService endUserManagementService)\n" +
                    "{\n" +
                    "    public async Task TestMethod()\n" +
                    "    {\n" +
                    "        // Example usage of endUserSessionManager and endUserManagementService\n" +
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
                    "    private readonly IEndUserSessionManager _endUserSessionManager;\n" +
                    "    private readonly IEndUserManagementService _endUserManagementService;\n\n" +
                    "    public TestClass(IEndUserSessionManager endUserSessionManager, IEndUserManagementService endUserManagementService)\n" +
                    "    {\n" +
                    "        _endUserSessionManager = endUserSessionManager;\n" +
                    "        _endUserManagementService = endUserManagementService;\n" +
                    "    }\n\n" +
                    "    public async Task TestMethod()\n" +
                    "    {\n" +
                    "        // Example usage of services\n" +
                    "    }\n" +
                    "}"
                }
                language="csharp"
            />

            <Title>End User Session Manager</Title>
            <TextBlock>
                The `IEndUserSessionManager` is responsible for managing the session of an `EndUser`. It includes
                methods for logging in, logging out, and retrieving the logged-in user's ID.
            </TextBlock>

            <SubTitle>LogInEndUserAsync</SubTitle>
            <TextBlock>
                Logs in an end user. The ID passed to the `EndUser` constructor is sourced from an external
                authentication provider or custom login system.
            </TextBlock>
            <CodeBlock
                code={
                    "// Initialize and log in an end user with their details\n" +
                    "var endUser = new EndUser(\"48a187e5-3a77-4842-949a-49a85ac0a0e1\")\n" +
                    "{\n" +
                    "    LastName = \"Doe\",\n" +
                    "    FirstName = \"John\",\n" +
                    "    Username = \"jdoe\",\n" +
                    "    Email = \"jdoe@example.com\"\n" +
                    "};\n" +
                    "await endUserSessionManager.LogInEndUserAsync(endUser);"
                }
                language="csharp"
            />

            <SubTitle>LogOutEndUser</SubTitle>
            <TextBlock>
                Logs out the current end user from the session.
            </TextBlock>
            <CodeBlock
                code={
                    "// Log out the current end user\n" +
                    "endUserSessionManager.LogOutEndUser();"
                }
                language="csharp"
            />

            <SubTitle>GetLoggedEndUserId</SubTitle>
            <TextBlock>
                Retrieves the ID of the currently logged-in end user. This method throws an exception if no user is
                logged in.
            </TextBlock>
            <CodeBlock
                code={
                    "// Retrieve the ID of the currently logged-in end user\n" +
                    "var loggedInUserId = endUserSessionManager.GetLoggedEndUserId();"
                }
                language="csharp"
            />

            <Title>End User Management Service</Title>
            <TextBlock>
                The `IEndUserManagementService` provides methods for managing end users, including registration,
                fetching, validating, deactivating, reactivating, and managing sensors.
            </TextBlock>

            <SubTitle>RegisterEndUserAsync</SubTitle>
            <TextBlock>
                Registers a new end user in the system. The ID passed to the `EndUser` constructor is sourced from an
                external authentication provider or custom login system.
            </TextBlock>
            <CodeBlock
                code={
                    "// Register a new end user\n" +
                    "var endUser = new EndUser(\"48a187e5-3a77-4842-949a-49a85ac0a0e1\")\n" +
                    "{\n" +
                    "    LastName = \"Doe\",\n" +
                    "    FirstName = \"John\",\n" +
                    "    Username = \"jdoe\",\n" +
                    "    Email = \"jdoe@example.com\"\n" +
                    "};\n" +
                    "var result = await endUserManagementService.RegisterEndUserAsync(endUser);"
                }
                language="csharp"
            />

            <SubTitle>GetEndUserByIdAsync</SubTitle>
            <TextBlock>
                Fetches an end user by their ID.
            </TextBlock>
            <CodeBlock
                code={
                    "// Fetch an end user by ID\n" +
                    "var endUser = await endUserManagementService.GetEndUserByIdAsync(\"endUserId\");"
                }
                language="csharp"
            />

            <SubTitle>ValidateEndUserAsync</SubTitle>
            <TextBlock>
                Validates the status of an end user in the system based on their ID.
            </TextBlock>
            <CodeBlock
                code={
                    "// Validate an end user by ID\n" +
                    "await endUserManagementService.ValidateEndUserAsync(endUser.Id);"
                }
                language="csharp"
            />

            <SubTitle>ListDevelopersEndUsersAsync</SubTitle>
            <TextBlock>
                Retrieves a list of all end users associated with the developer’s account.
            </TextBlock>
            <CodeBlock
                code={
                    "// Retrieve a list of all end users associated with the developer's account\n" +
                    "var endUsers = await endUserManagementService.ListDevelopersEndUsersAsync();"
                }
                language="csharp"
            />

            <SubTitle>DeactivateEndUserAsync</SubTitle>
            <TextBlock>
                Deactivates an end user by their ID, marking them as inactive in the system.
            </TextBlock>
            <CodeBlock
                code={
                    "// Deactivate an end user by their ID\n" +
                    "await endUserManagementService.DeactivateEndUserAsync(endUser.Id);"
                }
                language="csharp"
            />

            <SubTitle>ReactivateEndUserAsync</SubTitle>
            <TextBlock>
                Reactivates a previously deactivated end user.
            </TextBlock>
            <CodeBlock
                code={
                    "// Reactivate an end user by their ID\n" +
                    "await endUserManagementService.ReactivateEndUserAsync(endUser.Id);"
                }
                language="csharp"
            />

            <SubTitle>SoftDeleteEndUserAsync</SubTitle>
            <TextBlock>
                Soft deletes an end user, meaning their data remains in the system, but they are flagged as deleted.
            </TextBlock>
            <CodeBlock
                code={
                    "// Soft delete an end user by their ID\n" +
                    "await endUserManagementService.SoftDeleteEndUserAsync(endUser.Id);"
                }
                language="csharp"
            />

            <SubTitle>RestoreEndUserAsync</SubTitle>
            <TextBlock>
                Restores an end user that was previously soft deleted.
            </TextBlock>
            <CodeBlock
                code={
                    "// Restore an end user that was previously soft deleted\n" +
                    "await endUserManagementService.RestoreEndUserAsync(endUser.Id);"
                }
                language="csharp"
            />

            <SubTitle>AssignSensorsToEndUserAsync</SubTitle>
            <TextBlock>
                Assigns multiple sensors to a specific end user by their ID.
            </TextBlock>
            <CodeBlock
                code={
                    "// Assign multiple sensors to an end user\n" +
                    "var sensorIds = new List<Guid>\n" +
                    "{\n" +
                    "    new Guid(\"sensorId1\"),\n" +
                    "    new Guid(\"sensorId2\")\n" +
                    "};\n\n" +
                    "await endUserManagementService.AssignSensorsToEndUserAsync(sensorIds, endUser.Id);"
                }
                language="csharp"
            />

            <SubTitle>ListEndUserSensorsAsync</SubTitle>
            <TextBlock>
                Retrieves a list of sensors assigned to a specific end user by their ID.
            </TextBlock>
            <CodeBlock
                code={
                    "// Retrieve a list of sensors assigned to a specific end user\n" +
                    "var sensors = await endUserManagementService.ListEndUserSensorsAsync(endUser.Id);"
                }
                language="csharp"
            />
        </div>
    );
};

export default EndUserMgmt;