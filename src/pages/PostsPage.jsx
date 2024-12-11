import axios from 'axios';
import { useState, useEffect } from 'react';
import Button from '../components/Button/Button';
import FormOverlay from '../components/FormOverlay/FormOverlay';
import PostsList from '../components/PostsList';
import { useContext } from 'react';
import PostsContext from '../contexts/PostsContext';
import { BASIC_URI } from '../config/URI';

export default function PostList() {
    const { drawnPosts, setPosts } = useContext(PostsContext);
    const [showOverlay, setShowOverlay] = useState(false);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        const newTags = [];
        drawnPosts &&
            drawnPosts.forEach((post) => {
                if (post.published) {
                    post.tags.forEach((tag) => {
                        !newTags.includes(tag) && newTags.push(tag);
                    });
                }
            });
        setTags(newTags);
    }, [drawnPosts]);

    useEffect(() => {
        if (showOverlay) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [showOverlay]);

    const handleSubmit = (formData) => {
        const newPost = {
            id: drawnPosts.length + 1,
            ...formData,
        };

        axios
            .post(BASIC_URI + 'posts', newPost)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
        setPosts([...drawnPosts, newPost]);
        setShowOverlay(false);
    };

    const handleOverlay = () => {
        setShowOverlay(true);
    };

    return (
        <main>
            {showOverlay && <FormOverlay handleSubmit={handleSubmit} />}
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1 className="main-title">Il mio blog</h1>
                    </div>
                    <div className="col main-tags-wrap">
                        <div className="tags-container">
                            {tags.map((tag, i) => {
                                return <span key={i}>{tag}</span>;
                            })}
                        </div>
                        <Button
                            value={'Crea Post'}
                            onClick={handleOverlay}
                        ></Button>
                    </div>
                    <PostsList></PostsList>
                </div>
            </div>
        </main>
    );
}
