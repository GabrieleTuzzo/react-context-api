import axios from 'axios';
import { useEffect, useState } from 'react';
import { redirect, useNavigate, useParams } from 'react-router-dom';
import style from './DettaglioPost.module.css';
import { BASIC_URI } from '../../config/URI';
import { useContext } from 'react';
import PostsContext from '../../contexts/PostsContext';

export default function DettaglioPost() {
    const params = useParams();
    const { handleDelete } = useContext(PostsContext);
    const navigate = useNavigate();

    const [post, setPost] = useState(null);
    useEffect(() => {
        axios
            .get(`${BASIC_URI}posts/${params.id}`)
            .then((res) => {
                console.log(res.data);
                setPost(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [params.id]);

    return (
        <main>
            {post ? (
                <div className={`container ${style.Wrapper}`}>
                    <h1>{post.title}</h1>
                    <div className={style.ImgWrapper}>
                        <img
                            src={`${BASIC_URI}imgs/posts/${post.image}`}
                            alt="card image"
                        ></img>
                    </div>
                    <div className={style.TagsWrapper}>
                        {post.tags.map((tag, i) => (
                            <span className={style.Tag} key={i}>
                                {tag}
                            </span>
                        ))}
                    </div>
                    <p>{post.content}</p>
                    <div>
                        <button
                            onClick={() => {
                                handleDelete(params.id);
                                navigate(-1);
                            }}
                        >
                            Elimina post
                        </button>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </main>
    );
}
