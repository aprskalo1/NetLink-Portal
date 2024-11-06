import {Routes, Route, Navigate} from 'react-router-dom';
import DocsPage from "./pages/DocsPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import Installation from "./components/docs/content/Installation.tsx";
import Usage from "./components/docs/content/Usage.tsx";
import QuickOverview from "./components/docs/content/QuickOverview.tsx";
import EndUserMgmt from "./components/docs/content/EndUserMgmt.tsx";
import Sensors from "./components/docs/content/Sensors.tsx";
import Grouping from "./components/docs/content/Grouping.tsx";
import RecordedValues from "./components/docs/content/RecordedValues.tsx";
import RealTimeData from "./components/docs/content/RealTimeData.tsx";
import Statistics from "./components/docs/content/Statistics.tsx";
import HTTPRemoteValueRec from "./components/docs/content/HTTPRemoteValueRec.tsx";
import MQTTRemoteValueRec from "./components/docs/content/MQTTRemoteValueRec.tsx";
import GoodPractices from "./components/docs/content/GoodPractices.tsx";
import ClosingRemarks from "./components/docs/content/ClosingRemarks.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import LoginProtectedRoute from "./components/auth/LoginProtectedRoute.tsx";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";

function App() {
    return (
        <>
            <ToastContainer position="bottom-right" autoClose={3000}/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/docs" element={<DocsPage/>}>
                    <Route index element={<Navigate to="install" replace/>}/>
                    <Route path="install" element={<Installation/>}/>
                    <Route path="use" element={<Usage/>}/>
                    <Route path="overview" element={<QuickOverview/>}/>
                    <Route path="endusers" element={<EndUserMgmt/>}/>
                    <Route path="sensors" element={<Sensors/>}/>
                    <Route path="groups" element={<Grouping/>}/>
                    <Route path="recordingvalues" element={<RecordedValues/>}/>
                    <Route path="realtimedata" element={<RealTimeData/>}/>
                    <Route path="statistics" element={<Statistics/>}/>
                    <Route path="httpvaluerecording" element={<HTTPRemoteValueRec/>}/>
                    <Route path="mqttvaluerecording" element={<MQTTRemoteValueRec/>}/>
                    <Route path="goodpractices" element={<GoodPractices/>}/>
                    <Route path="wrapup" element={<ClosingRemarks/>}/>
                    <Route
                        path="profile"
                        element={
                            <LoginProtectedRoute>
                                <ProfilePage/>
                            </LoginProtectedRoute>
                        }
                    />
                </Route>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>

                <Route path="/dashboard" element={<DashboardPage/>}/>

                <Route
                    path="/dashboard"
                    element={
                        <LoginProtectedRoute>
                            <DashboardPage/>
                        </LoginProtectedRoute>
                    }
                />
            </Routes>
        </>
    )
}

export default App
