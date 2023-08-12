import React, { useState, useEffect } from 'react';

// Components
import PostElements from './PostElements/PostElements';
import { Checkbox, Modal, Pagination, ConfigProvider } from 'antd';
import filter from '../assets/filter.png';

function App() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [checkedList, setCheckedList] = useState([]);
  const [startPost, setStartPost] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 10;

  // Shows modal when user clicks filter icon.
  const showModal = () => {
    setIsModalOpen(true);
  };

  // Handles filtering posts by category if user clicks ok.
  const handleOk = () => {
    console.log('ok');
    const filteredPosts = posts.filter(post => {
      return post.categories.some(category => checkedList.includes(category.name));
    });
    // If checkedList is empty, show all posts.
    if (checkedList.length === 0)
      setFilteredPosts(posts);
    else
      setFilteredPosts(filteredPosts);
    // Reset pagination to first page after filtering.
    setCurrentPage(1);
    setStartPost(0);
    setIsModalOpen(false);
  };

  // Handles closing modal if user clicks cancel, clicks outside modal or presses ESC.
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Saves checked categories to checkedList.
  const onChange = (checkedValues => {
    setCheckedList(checkedValues);
  });

  const paginationOnChange = (page, pageSize) => {
    const startPost = (page - 1) * pageSize;
    setCurrentPage(page);
    setStartPost(startPost);
  };


  // Find all unique categories from posts.
  // Arrays used instead of sets because number of categories is small.
  // Categories of this type are not scalable.
  // Arrays used for simplicity; can be sorted, filtered, etc.
  const findCategories = (posts) => {
    const categories = [];
    posts.forEach(post => {
      post.categories.forEach(({ name }) => {
        if (!categories.includes(name))
          categories.push(name);
      });
      categories.sort();
    });
    return categories;
  };

  // Fetch data from API.
  // Set posts and categories.
  // Catch errors at the end and log them.
  useEffect(() => {
    fetch('/api/posts')
      .then(response => response.json())
      .then(({ posts }) => {
        setPosts(posts);
        setFilteredPosts(posts); // Set filtered posts to all posts initially.
        return posts;
      })
      .then(posts => setCategories(findCategories(posts)))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className='bg-[#0d1117]'>
      <div className='flex justify-center'>
        <img src={filter} alt="Filter icon" className='hover:scale-[1.2] transition p-4 cursor-pointer' onClick={showModal}/>
      </div>
      <Modal title="Filter by category" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Checkbox.Group className='text-[#E6EDF3] grid grid-cols-2 max-[497px]:grid-cols-1' onChange={onChange} options={categories}/>
      </Modal>
      <div className='flex justify-center'>
        <ConfigProvider
          theme={{
            token: {
              colorText: '#fff',
              colorTextDisabled: '#8c8c8c',
              fontSize: '1.25rem',
            },               
          }}
        >
          <Pagination
            current={currentPage}
            defaultCurrent={1}
            total={filteredPosts.length}
            pageSize={PAGE_SIZE} 
            onChange={paginationOnChange}
            className='text-lg'
          />
        </ConfigProvider>
      </div>
      <ul className="space-y-8 p-8">
        <PostElements posts={filteredPosts.slice(startPost, startPost + PAGE_SIZE)}/>
      </ul>
    </div>
  );
}

export default App;