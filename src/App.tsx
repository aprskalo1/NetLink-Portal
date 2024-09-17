import {Routes, Route} from 'react-router-dom';
import DocsPage from "./pages/DocsPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import './App.css';
import LoginPage from "./pages/LoginPage.tsx";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/docs" element={<DocsPage/>}>
                    <Route path="profile" element={<ProfilePage/>}/>
                </Route>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
            </Routes>
        </>
    )
}

export default App
