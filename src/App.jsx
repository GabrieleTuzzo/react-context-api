import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DefaultLayout from './Layout/DefaultLayout';
import HomePage from './pages/HomePage/HomePage';
import ChiSiamo from './pages/ChiSiamo';
import PostList from './pages/PostList';
import DettaglioPost from './pages/DettaglioPost/DettaglioPost';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<DefaultLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="/chisiamo" element={<ChiSiamo />} />
                    <Route path="/posts">
                        <Route index element={<PostList />}></Route>
                        <Route path=":id" element={<DettaglioPost />}></Route>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
