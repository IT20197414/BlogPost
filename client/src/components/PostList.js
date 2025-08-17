import React, { useEffect } from 'react';
import axios from 'axios';

const PostList = ({ posts, setPosts }) => {
    useEffect(() => {
        axios.get('http://localhost:5001/posts')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the posts!', error);
            });
    }, [setPosts]);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5001/posts/${id}`)
            .then(() => {
                setPosts(posts.filter(post => post._id !== id));
            })
            .catch(error => {
                console.error('There was an error deleting the post!', error);
            });
    };

    return (
        <div>
            <h2>All Posts</h2>
            {posts.map(post => (
                <div key={post._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                    <p><strong>Author:</strong> {post.author}</p>
                    <button onClick={() => handleDelete(post._id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default PostList;