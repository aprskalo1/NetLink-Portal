import DocsPage from "./pages/DocsPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import {Routes, Route} from 'react-router-dom';
import './App.css';

function App() {
    return (
        <>
            <Routes>
                <Route path="/docs" element={<DocsPage/>}/>
                <Route path="/" element={<HomePage/>}></Route>
            </Routes>
        </>
    )
}

export default App
