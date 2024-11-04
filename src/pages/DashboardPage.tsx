import {useState} from "react";
import Navbar from "../components/Navbar.tsx";
import EndUserContainer from "../components/EndUserContainer.tsx";
import SensorContainer from "../components/SensorContainer.tsx";

const DashboardPage = () => {
    const [activeContainer, setActiveContainer] = useState<"endUsers" | "sensors">("endUsers");
    const [selectedEndUserId, setSelectedEndUserId] = useState<string | null>(null);

    const handleViewSensors = (endUserId: string) => {
        setSelectedEndUserId(endUserId);
        setActiveContainer("sensors");
    };

    const handleBackToEndUsers = () => {
        setActiveContainer("endUsers");
        setSelectedEndUserId(null);
    };

    return (
        <>
            <Navbar/>
            {activeContainer === "endUsers" ? (
                <EndUserContainer onViewSensors={handleViewSensors}/>
            ) : (
                <SensorContainer endUserId={selectedEndUserId!} onBack={handleBackToEndUsers}/>
            )}
        </>
    );
};

export default DashboardPage;
