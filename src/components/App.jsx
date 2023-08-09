import React, { useState, useEffect } from 'react';
import PostElements from './PostElements';

function App() {
  const [posts, setPosts] = useState([]);

  // Fetch data from API.
  useEffect(() => {
    fetch('/api/posts')
      .then(response => response.json())
      .then(({ posts }) => setPosts(posts));
  }, []);

  return (
    <ul className="">
      <PostElements posts={posts}/>
    </ul>
  );
}

export default App;
