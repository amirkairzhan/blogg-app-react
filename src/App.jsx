import {
  useState,
  useEffect
} from 'react';
import {
  getPosts,
  deletePost,
  createPost,
 } from './api/api';
import Post from './components/Post';
import { getNormalizedPosts } from './utils/get-normalized-posts';
import { v4 as uuidv4 } from 'uuid';
import './App.css'
import './reset.css'

function App() {
  const [postsIds, setPostsIds] = useState(null);
  const [postsById, setPostsById] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [inLimitTitle, setLimitTitle] = useState(true);
  const [inLimitBody, setLimitBody] = useState(true);

  useEffect(() => {
    setError(false);
    setLoading(true);

    getPosts()
      .then(posts => {
        const [ids, byIds] = getNormalizedPosts(posts);

        setLoading(false);
        setPostsIds(ids);
        setPostsById(byIds)
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  function handleInputTitle(title) {
    const value = title.target.value

    if (value.length <= 100) {
      setPostTitle(value);
      setLimitTitle(true);
    } else {
      setPostTitle(value);
      setLimitTitle(false);
    }
  }

  function handleInputBody(body) {
    const value = body.target.value

    if (value.length <= 200) {
      setPostBody(value);
      setLimitBody(true);
    } else {
      setPostBody(value);
      setLimitBody(false);
    }
  }

  function handleAddBtn() {
    const id = uuidv4();
    const post = {
      id,
      time: new Date().toLocaleString(),
      title: postTitle,
      body: postBody,
    };

    if (!postTitle) {
      return;
    }
    if (!postBody) {
      return;
    }

    if (inLimitTitle && inLimitBody) {
      setPostsById({
        ...postsById,
        [post.id]: post
      })
  
      setPostsIds([post.id, ...postsIds])
  
      createPost(post)
    }    
  }

  function handleDeleteBtn(id) {
    setPostsIds(postsIds.filter(postId => postId !== id));
    deletePost(id);
  }


  return (
    <div className='container'>
      <div className='create__section'>
        <h1 className='head__title'>Новый пост</h1>
        <input
          className='input__title'
          type="text"
          value={postTitle}
          onChange={(title) => handleInputTitle(title)}
          placeholder='Заголовок' />

        <textarea
          className='input__body'
          rows="5"
          value={postBody}
          onChange={(body) => handleInputBody(body)}
          placeholder='Напиши пост' >
        </textarea>

        <button
          className='create__btn'
          onClick={handleAddBtn}>
            Опубликовать
        </button>

        { inLimitTitle ? '' : 
          <p className='error__message'>Длина заголовка не должна превышать 100 символов.
            Количество символов: {postTitle.length}</p> }

        { inLimitBody ? '' : 
          <p className='error__message'>Длина поста не должна превышать 200 символов.
            Количество символов: {postBody.length}</p> }
      </div>

      <div className='posts__section'>
        <h1 className='head__title'>Лента</h1>

        { isLoading && <p className='error__message'>Загрузка</p> }

        { isError && <p className='error__message'>Ошибка</p> }

        <ul className='posts__list'>
          { postsIds ? postsIds.map(id => (
            <Post
              key={id}
              post={postsById[id]}
              deleteBtn={() => handleDeleteBtn(id)}
               />
            )) : '' }
        </ul>
      </div>
    </div>
  )
}

export default App