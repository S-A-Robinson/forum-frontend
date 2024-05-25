import { useState, useEffect } from 'react';
import './new-post.css';
import { useNavigate } from 'react-router-dom';

const NewPost = () => {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  let navigate = useNavigate();
  const routeChange = () => {
    let path = '/';
    navigate(path);
  }

  const handleSubmit = () => {
    fetch('http://localhost:5000/post/new', {
      method: 'POST',
      body: JSON.stringify({
        "author_id": 2,
        "title": title,
        "content": content,
        "creation_date_time": new Date().toISOString(),
        "points": 0,
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => {
      if (response.status === 200) {
        routeChange();
      }
    })
  }

  useEffect(() => {
    var form = document.getElementById("new-post-form");
    function handleForm(event) { event.preventDefault(); } 
    form.addEventListener('submit', handleForm);
  }, []);


  return (
    <form id='new-post-form' className='new-post-form' onSubmit={handleSubmit}>
      <label for='title'>Title</label>
      <input id='title' type='text' name='title' value={title} onChange={event => setTitle(event.target.value)} />
      <label for='content'>Content</label>
      <textarea id='content' name='content' rows={20} value={content} onChange={event => setContent(event.target.value)} />
      <input type='submit' value='Submit' />
    </form>
  )
}

export default NewPost;