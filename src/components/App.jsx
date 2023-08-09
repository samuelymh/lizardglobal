import React, { useState, useEffect } from 'react';
import PostElements from './PostElements/PostElements';

function App() {
  const [posts, setPosts] = useState([]);

  // Fetch data from API.
  useEffect(() => {
    fetch('/api/posts')
      .then(response => response.json())
      .then(({ posts }) => setPosts(posts));
  }, []);

  return (
    <ul className="list-disc space-y-8 p-12 border-2">
      <PostElements posts={posts}/>
    </ul>
  );
}

export default App;
