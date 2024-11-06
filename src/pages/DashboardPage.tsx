import {useDispatch, useSelector} from "react-redux";
import Navbar from "../components/Navbar.tsx";
import EndUserContainer from "../components/EndUserContainer.tsx";
import SensorContainer from "../components/SensorContainer.tsx";
import {RootState} from "../store/store.ts";
import {setActiveContainer, setSelectedEndUserId} from "../store/dashboardSlice";

const DashboardPage = () => {
    const dispatch = useDispatch();
    const activeContainer = useSelector((state: RootState) => state.dashboard.activeContainer);
    const selectedEndUserId = useSelector((state: RootState) => state.dashboard.selectedEndUserId);

    const handleViewSensors = (endUserId: string) => {
        dispatch(setSelectedEndUserId(endUserId));
        dispatch(setActiveContainer("sensors"));
    };

    const handleBackToEndUsers = () => {
        dispatch(setActiveContainer("endUsers"));
        dispatch(setSelectedEndUserId(null));
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
