import DocsPage from "./pages/DocsPage.tsx";
import {Routes, Route} from 'react-router-dom'
import './App.css'

function App() {
    return (
        <>
            <Routes>
                <Route path="/docs" element={<DocsPage/>}/>
            </Routes>
        </>
    )
}

export default App
