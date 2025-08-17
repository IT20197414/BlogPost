import React, { useEffect, useState } from 'react'; // NEW: imported useState
import axios from 'axios';

const PostList = ({ posts, setPosts }) => {
    // NEW: State to track which post is being edited
    const [editState, setEditState] = useState({ id: null, title: '', content: '', author: '' });

    // This useEffect hook fetches all posts when the component loads. It's unchanged.
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

    // NEW: Function to handle when a user clicks the "Edit" button
    const handleEdit = (post) => {
        setEditState({
            id: post._id,
            title: post.title,
            content: post.content,
            author: post.author
        });
    };

    // NEW: Function to handle changes in the input fields during an edit
    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setEditState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // NEW: Function to handle submitting the updated post
    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        const { id, title, content, author } = editState;
        const updatedPost = { title, content, author };

        axios.patch(`http://localhost:5001/posts/${id}`, updatedPost)
            .then(response => {
                // Update the posts array with the new data
                setPosts(posts.map(post => (post._id === id ? response.data : post)));
                // Reset the edit state to close the form
                setEditState({ id: null, title: '', content: '', author: '' });
            })
            .catch(error => {
                console.error('There was an error updating the post!', error);
            });
    };

    return (
        <div>
            <h2>All Posts</h2>
            {posts.map(post => (
                <div key={post._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                    {/* NEW: Conditional rendering. If this post is being edited, show a form. Otherwise, show the post details. */}
                    {editState.id === post._id ? (
                        <form onSubmit={handleUpdateSubmit}>
                            <input
                                type="text"
                                name="title"
                                value={editState.title}
                                onChange={handleUpdateChange}
                            />
                            <textarea
                                name="content"
                                value={editState.content}
                                onChange={handleUpdateChange}
                            />
                            <input
                                type="text"
                                name="author"
                                value={editState.author}
                                onChange={handleUpdateChange}
                            />
                            <button type="submit">Save</button>
                            {/* NEW: A button to cancel the edit */}
                            <button type="button" onClick={() => setEditState({ id: null })}>Cancel</button>
                        </form>
                    ) : (
                        <div>
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                            <p><strong>Author:</strong> {post.author}</p>
                            {/* NEW: Edit Button */}
                            <button onClick={() => handleEdit(post)}>Edit</button>
                            <button onClick={() => handleDelete(post._id)}>Delete</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default PostList;