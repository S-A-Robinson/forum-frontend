import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { formatDistanceStrict } from 'date-fns';
import Button from '../../components/Button/Button';
import IconButton from '../../components/IconButton/Iconbutton';
import PointsController from '../../components/PointsController/PointsController';
import UserWidget from '../../components/UserWidget/UserWidget';
import Comment from '../../components/Comment/Comment';
import './post.css';

type PostData = {
  id: number,
  title: string,
  username: string,
  author_id: number,
  content: string,
  points: number,
  num_of_comments: number,
  created_at: string,
}

const Post = () => {
  const { postId } = useParams();
  const [postData, setPostData] = useState({} as PostData);

  const [isShowingComments, setIsShowingComments] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/post/${postId}`)
    .then(response => response.json())
    .then(data => setPostData(data[0]));
  }, [postId]);

  useEffect(() => {
    if (!postData.title) {
      document.title = 'Forum - Post';
      return;
    }

    document.title = 'Forum - ' + postData.title;
  }, [postData.title]);

  const toggleComments = () => {
    if (isShowingComments) {
      setIsShowingComments(false);
      return;
    }

    setIsShowingComments(true);
    fetch(`http://localhost:5000/post/${postId}/comments`)
    .then(response => response.json())
    .then(data => setComments(data));
  }

  const getChildComments = parentCommentId => {
    return comments
      .filter(comment => comment.parent_comment_id === parentCommentId)
      .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  }

  const addComment = () => {
    fetch(`http://localhost:5000/post/${postId}/comments/new`, {
      method: 'POST',
      body: JSON.stringify({
        "post_id": postId,
        "parent_comment_id": null,
        "author_id": '1',
        "content": 'some content',
        "created_at": new Date().toISOString(),
        "points": 0,
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => {
      if (response.status === 200) {
//TODO: Add comment to commentState with [...comments, {new comment data}] so we don't have to recall the backend to see the new comment.
// Use the state of the input fields for the new comment.
      }
    })
  }

  if (!postData.title) return <span>Loading</span>

  return (
    <div id='post-container'>
      <div id="main-post">
        <h1 className='post-title'>{postData.title}</h1>
        <div className="post-details">
          <UserWidget username={postData.username} avatarSource='https://thispersondoesnotexist.com/' link='https://google.com' />
          <span>{formatDistanceStrict(new Date(), new Date(postData.created_at))} ago</span>
        </div>
        <p>{postData.content}</p>
        <div id="post-controls">
          <PointsController points={postData.points} voteChange={0} />
          <IconButton icon='/src/assets/comment-bubble.svg' clickHandler={toggleComments} />
        </div>
      </div>
      {
        isShowingComments &&
        <div className="comment-section">
          {comments.map((comment, index) => (
            <div key={`comment-${index}`} className="comment-group">
              <Comment
                postId={comment.post_id}
                commentId={comment.id}
                username={comment.username}
                points={comment.points}
                timeStampDistance={formatDistanceStrict(new Date(), new Date(comment.created_at))}
                content={comment.content}
                isChild={false}
              />
              {getChildComments(comment.id).map((comment, index) => ( 
                <Comment
                  username={comment.username}
                  points={comment.points}
                  timeStampDistance={formatDistanceStrict(new Date(), new Date(comment.created_at))}
                  content={comment.content}
                  isChild={true}
                />
              ))}
            </div>
          ))}
        </div>
      }
      <button onClick={addComment}>Add Comment</button>
    </div>
  );
}


export default Post;