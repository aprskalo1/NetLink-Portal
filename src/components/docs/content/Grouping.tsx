import Title from "../Title";
import CodeBlock from "../CodeBlock.tsx";
import TextBlock from "../TextBlock";
import SubTitle from "../SubTitle.tsx";

const Grouping = () => {
    return (
        <div className="w-10/12">
            <Title>Grouping and Group Management</Title>
            <TextBlock>
                The `IGroupingService` provides methods for creating and managing groups of sensors associated with an
                end user. Each method can optionally accept an `endUserId`, allowing operations to be performed on
                behalf of a specific end user. If no `endUserId` is provided, the logged-in user will be used by
                default.
                Below is how you can instantiate and use the `IGroupingService` to manage groups for a given end user.
            </TextBlock>

            <SubTitle>Service Injection (New C# Primary Constructor)</SubTitle>
            <CodeBlock
                code={
                    "public class TestClass(\n" +
                    "    IGroupingService groupingService,\n" +
                    "    IEndUserSessionManager endUserSessionManager)\n" +
                    "{\n" +
                    "    public async Task TestMethod()\n" +
                    "    {\n" +
                    "        // Example usage of groupingService\n" +
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
                    "    private readonly IGroupingService _groupingService;\n" +
                    "    private readonly IEndUserSessionManager _endUserSessionManager;\n\n" +
                    "    public TestClass(IGroupingService groupingService, IEndUserSessionManager endUserSessionManager)\n" +
                    "    {\n" +
                    "        _groupingService = groupingService;\n" +
                    "        _endUserSessionManager = endUserSessionManager;\n" +
                    "    }\n\n" +
                    "    public async Task TestMethod()\n" +
                    "    {\n" +
                    "        // Example usage of _groupingService\n" +
                    "    }\n" +
                    "}"
                }
                language="csharp"
            />

            <SubTitle>CreateGroupAsync</SubTitle>
            <TextBlock>
                Creates a new group for an end user. If an `endUserId` is provided, the group will be created for the
                specified end user. If no `endUserId` is provided, the group will be associated with the currently
                logged-in user.
            </TextBlock>
            <CodeBlock
                language="csharp"
                code={
                    "var endUser = new EndUser(\"endUserId\");\n" +
                    "var group = new Group(\"Sensor Group Name\");\n" +
                    "// Creating a group for a specific end user\n" +
                    "var groupId = await _groupingService.CreateGroupAsync(group, endUser.Id);\n\n" +
                    "// Defaulting to the logged-in user if no endUserId is provided\n" +
                    "var groupIdLoggedUser = await _groupingService.CreateGroupAsync(group);"
                }
            />

            <SubTitle>AddSensorToGroupAsync</SubTitle>
            <TextBlock>
                Adds a sensor to a group. If an `endUserId` is provided, the sensor will be added to the group for the
                specified end user. If no `endUserId` is provided, the sensor will be added to the group associated with
                the currently logged-in user.
            </TextBlock>
            <CodeBlock
                code={
                    "// Adding a sensor to a group for a specific end user\n" +
                    "await _groupingService.AddSensorToGroupAsync(groupId, sensorId, endUser.Id);\n\n" +
                    "// Defaulting to the logged-in user if no endUserId is provided\n" +
                    "await _groupingService.AddSensorToGroupAsync(groupId, sensorId);"
                }
                language="csharp"
            />

            <SubTitle>RemoveSensorFromGroupAsync</SubTitle>
            <TextBlock>
                Removes a sensor from a group. If an `endUserId` is provided, the sensor will be removed from the group
                for the specified end user. If no `endUserId` is provided, the sensor will be removed from the group
                associated with the currently logged-in user.
            </TextBlock>
            <CodeBlock
                code={
                    "// Removing a sensor from a group for a specific end user\n" +
                    "await _groupingService.RemoveSensorFromGroupAsync(groupId, sensorId, endUser.Id);\n\n" +
                    "// Defaulting to the logged-in user if no endUserId is provided\n" +
                    "await _groupingService.RemoveSensorFromGroupAsync(groupId, sensorId);"
                }
                language="csharp"
            />

            <SubTitle>DeleteGroupAsync</SubTitle>
            <TextBlock>
                Deletes a group by its ID. If an `endUserId` is provided, the group will be deleted for the specified
                end user. If no `endUserId` is provided, the group associated with the currently logged-in user will be
                deleted.
            </TextBlock>
            <CodeBlock
                code={
                    "// Deleting a group for a specific end user\n" +
                    "await _groupingService.DeleteGroupAsync(groupId, endUser.Id);\n\n" +
                    "// Defaulting to the logged-in user if no endUserId is provided\n" +
                    "await _groupingService.DeleteGroupAsync(groupId);"
                }
                language="csharp"
            />

            <SubTitle>GetEndUserGroupsAsync</SubTitle>
            <TextBlock>
                Retrieves a list of all groups for a specific end user. If no `endUserId` is provided, the groups
                associated
                with the currently logged-in user will be retrieved.
            </TextBlock>
            <CodeBlock
                code={
                    "// Retrieving all groups for a specific end user\n" +
                    "var groups = await _groupingService.GetEndUserGroupsAsync(endUser.Id);\n\n" +
                    "// Defaulting to the logged-in user if no endUserId is provided\n" +
                    "var groupsLoggedUser = await _groupingService.GetEndUserGroupsAsync();"
                }
                language="csharp"
            />

            <SubTitle>GetGroupByIdAsync</SubTitle>
            <TextBlock>
                Retrieves a group by its ID. If an `endUserId` is provided, the group will be retrieved for the
                specified end user. If no `endUserId` is provided, the group associated with the currently logged-in
                user will be retrieved.
            </TextBlock>
            <CodeBlock
                code={
                    "// Retrieving a group by ID for a specific end user\n" +
                    "var group = await _groupingService.GetGroupByIdAsync(groupId, endUser.Id);\n\n" +
                    "// Defaulting to the logged-in user if no endUserId is provided\n" +
                    "var groupLoggedUser = await _groupingService.GetGroupByIdAsync(groupId);"
                }
                language="csharp"
            />

            <SubTitle>UpdateGroupAsync</SubTitle>
            <TextBlock>
                Updates an existing group by its ID. If an `endUserId` is provided, the group will be updated for the
                specified end user. If no `endUserId` is provided, the group associated with the currently logged-in
                user will be updated.
            </TextBlock>
            <CodeBlock
                code={
                    "// Updating a group for a specific end user\n" +
                    "var updatedGroup = new Group(\"Updated Group Name\");\n" +
                    "await _groupingService.UpdateGroupAsync(updatedGroup, groupId, endUser.Id);\n\n" +
                    "// Defaulting to the logged-in user if no endUserId is provided\n" +
                    "await _groupingService.UpdateGroupAsync(updatedGroup, groupId);"
                }
                language="csharp"
            />
        </div>
    );
};

export default Grouping;
