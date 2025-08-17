import React, { useState } from 'react';
import PostList from './components/PostList';
import AddPost from './components/AddPost';
import './App.css';

function App() {
    const [posts, setPosts] = useState([]);

    return (
        <div className="App">
            <header className="App-header">
                <h1>MERN Blog</h1>
            </header>
            <main>
                <AddPost setPosts={setPosts} />
                <PostList posts={posts} setPosts={setPosts} />
            </main>
        </div>
    );
}

export default App;