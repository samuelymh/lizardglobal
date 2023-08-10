import React from 'react';

const CategoryList = ({ categories }) => {
  const categoryList = categories.map(category => {
    return <li key={category.id}>{category.name}</li>
  })

  return (
    <ul>{categoryList}</ul>
  )
}

export default CategoryList;