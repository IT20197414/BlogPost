import React, { useState } from 'react';
import axios from 'axios';

const AddPost = ({ setPosts }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPost = { title, content, author };
        // INCORRECT
        axios.post('http://localhost:5001/posts', newPost)
            .then(response => {
                // To update the post list dynamically
                setPosts(prevPosts => [...prevPosts, response.data]);
                setTitle('');
                setContent('');
                setAuthor('');
            })
            .catch(error => {
                console.error('There was an error creating the post!', error);
            });
    };

    return (
        <div>
            <h2>Add a New Post</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
                </div>
                <div>
                    <label>Author:</label>
                    <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
                </div>
                <button type="submit">Add Post</button>
            </form>
        </div>
    );
};

export default AddPost;