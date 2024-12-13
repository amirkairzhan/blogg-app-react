function Post({
    post,
    deleteBtn
}) {
    return (
      <li className="post">
        <p className="post__time">{post.time}</p>
        <p className="post__title">{post.title}</p>
        <p className="post__body">{post.body}</p>
        <button
          className="delete__btn"
          onClick={deleteBtn}>
            Удалить пост
        </button>
      </li>
    )
  }
  
  export default Post