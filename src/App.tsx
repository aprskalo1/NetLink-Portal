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

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/docs" element={<DocsPage/>}>
                    <Route index element={<Navigate to="install" replace/>}/>
                    <Route path="install" element={<Installation/>}/>
                    <Route path="use" element={<Usage/>}/>
                    <Route path="overview" element={<QuickOverview/>}/>
                    <Route path="endusers" element={<EndUserMgmt/>}/>
                    <Route path="sensors" element={<Sensors/>}/>
                    <Route path="profile" element={<ProfilePage/>}/>
                </Route>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
            </Routes>
        </>
    )
}

export default App
