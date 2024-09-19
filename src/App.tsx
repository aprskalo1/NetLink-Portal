import {Routes, Route, Navigate} from 'react-router-dom';
import DocsPage from "./pages/DocsPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import Installation from "./components/docs/content/Installation.tsx";
import Usage from "./components/docs/content/Usage.tsx";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/docs" element={<DocsPage/>}>
                    <Route index element={<Navigate to="install" replace/>}/>
                    <Route index element={<Navigate to="use" replace/>}/>
                    <Route path="install" element={<Installation/>}/>
                    <Route path="use" element={<Usage/>}/>
                    <Route path="profile" element={<ProfilePage/>}/>
                </Route>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
            </Routes>
        </>
    )
}

export default App
