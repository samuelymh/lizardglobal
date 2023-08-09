// Create an array of JSX elements.
// Each element consists of each post's data.
const PostElements = ({ posts }) => {
  return posts.map(post => {
    // Destructure post object.
    const { id, title, publishDate, author, summary, categories } = post;
    const { name, avatar } = author;
    const categoryList = categories.map(category => {
      return <li key={category.id}>{category.name}</li>
    })

    // Return JSX element.
    return (
      <li key={id}>
        <p>Title: {title}</p>
        <p>Publish Date: {publishDate}</p>
        <p>Name: {name}</p>
        <p>Avatar: {avatar}</p>
        <p>Summary: {summary}</p>
        <ul>{categoryList}</ul>
      </li>
    )
  })
}

export default PostElements;