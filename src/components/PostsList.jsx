import Card from './Card/Card';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import PostsContext from '../contexts/PostsContext';
import { BASIC_URI, SERVER_IMG_DIR } from '../config/URI';

export default function PostsList() {
    const { drawnPosts } = useContext(PostsContext);

    return (
        drawnPosts &&
        drawnPosts.map((post) => {
            return (
                post.published && (
                    <div key={post.id} className="col-6">
                        <Link to={`/posts/${post.id}`}>
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
                            ></Card>
                        </Link>
                    </div>
                )
            );
        })
    );
}
