import axios from 'axios';
import { useState, useEffect } from 'react';
import Button from '../components/Button/Button';
import FormOverlay from '../components/FormOverlay/FormOverlay';
import Card from '../components/Card/Card';
import { Link } from 'react-router-dom';

export default function PostList() {
    const [showOverlay, setShowOverlay] = useState(false);
    const [drawnPosts, setPosts] = useState();
    const [tags, setTags] = useState([]);
    const BASIC_URI = 'http://localhost:3000/';
    const SERVER_IMG_DIR = 'imgs/posts/';

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

    const handleDelete = (id) => {
        const updatedPosts = drawnPosts.filter((post) => post.id !== id);
        setPosts([...updatedPosts]);

        axios
            .delete(BASIC_URI + 'posts' + `/${id}`)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
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
                    {drawnPosts &&
                        drawnPosts.map((post) => {
                            return (
                                post.published && (
                                    <div key={post.id} className="col-6">
                                        <Link
                                            to={`http://localhost:5173/posts/${post.id}`}
                                        >
                                            <Card
                                                title={post.title}
                                                image={
                                                    post.image
                                                        ? BASIC_URI +
                                                          SERVER_IMG_DIR +
                                                          post.image
                                                        : ''
                                                }
                                                content={post.content}
                                                tags={post.tags}
                                                published={post.published}
                                                callback={() =>
                                                    handleDelete(post.id)
                                                }
                                            ></Card>
                                        </Link>
                                    </div>
                                )
                            );
                        })}
                </div>
            </div>
        </main>
    );
}
