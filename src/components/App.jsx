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
    <div className='bg-[#0d1117] !m-0'>
      <ul className="space-y-8 p-8">
        <PostElements posts={posts}/>
      </ul>
    </div>
  );
}

export default App;