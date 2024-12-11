import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import style from './DettaglioPost.module.css';

export default function DettaglioPost() {
    const BASIC_URI = 'http://localhost:3000/';
    const params = useParams();
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
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </main>
    );
}
