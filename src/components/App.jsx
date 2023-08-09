import React, { useState, useEffect } from 'react';

function App() {
  const [posts, setPosts] = useState([]);

  // Fetch data from API.
  useEffect(() => {
    fetch('/api/posts')
      .then(response => response.json())
      .then(({ posts }) => setPosts(posts));
  }, []);

  return (
    <div>{}</div>
  );
}

export default App;
