import React from 'react';
import CategoryList from "./CategoryList";

// Create an array of JSX elements.
// Each element consists of each post's data.
const PostElements = ({ posts }) => {
  return posts.map(post => {
    // Destructure post object.
    const { id, title, publishDate, author, summary, categories } = post;
    const { name, avatar } = author;

    // Return JSX element.
    return (
      <li key={id} className='text-[#E6EDF3] mx-14 p-10 border-solid border-[1px] border-[#30363d] rounded-md hover:scale-[1.006] transition'>
        <span className='inline-block w-18'>
          <img src={avatar} alt="Avatar of user" className="rounded-full inline-block mr-5"/>
          <p className="text-2xl inline-block align-middle">{name}</p>
        </span>
        <span className='inline-block w-full'>
          <br/>
          <p className="text-lg font-medium">{title}</p>
          <div className="border-solid border-[1px] border-[#30363d] w-full"/>
          <p>{summary}</p>
          <br/>
          <CategoryList categories={categories}/>
          <br/>
          <p className="text-xs font-thin">{publishDate}</p>
        </span>
      </li>
    )
  })
}

export default PostElements;