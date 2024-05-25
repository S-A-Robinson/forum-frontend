import { useState, useEffect } from 'react';
import './App.css';
import PostCard from './components/PostCard/PostCard';
import SideBar from './components/SideBar/SideBar';

function App() {
  const [posts, setPosts] = useState([] as any[]);

  useEffect(() => {
    document.title = 'Forum - Home';
    fetch('http://localhost:5000/post')
    .then(response => response.json())
    .then(data => setPosts(data));
  }, []);

  return (
    <div id='root' className="app">
      <div id="main-container">
        <SideBar />
        <div className="post-card-container">
          {posts.map((post, index) => (
            <PostCard
              key={`post-card-${index}`}
              postId={post.id}
              title={post.title}
              author={post.username}
              postedDate={post.created_at}
              commentCount={post.num_of_comments}
              points={post.points}
            />
          ))}
        </div>
      </div>
      </div>
  )
}

export default App;
