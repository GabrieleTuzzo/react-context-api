import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DefaultLayout from './Layout/DefaultLayout';
import HomePage from './pages/HomePage/HomePage';
import ChiSiamo from './pages/ChiSiamo';
import PostList from './pages/PostsPage';
import DettaglioPost from './pages/DettaglioPost/DettaglioPost';
import PostsContext from './contexts/PostsContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASIC_URI } from './config/URI';

function App() {
    const [drawnPosts, setPosts] = useState();

    useEffect(() => {
        axios
            .get(BASIC_URI + 'posts')
            .then((response) => {
                setPosts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <PostsContext.Provider value={{ drawnPosts, setPosts }}>
            <BrowserRouter>
                <Routes>
                    <Route element={<DefaultLayout />}>
                        <Route index element={<HomePage />} />
                        <Route path="/chi-siamo" element={<ChiSiamo />} />
                        <Route path="/posts">
                            <Route index element={<PostList />}></Route>
                            <Route
                                path=":id"
                                element={<DettaglioPost />}
                            ></Route>
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </PostsContext.Provider>
    );
}

export default App;
