import { useState } from 'react';
import UserWidget from '../UserWidget/UserWidget';
import PointsController from '../PointsController/PointsController';
import Button from '../Button/Button';
import CreateComment from '../CreateComment/CreateComment';
import './comment.css';

type CommentType = {
  postId: number,
  commentId: number,
  username: string,
  points: number,
  timeStampDistance: string,
  content: string,
  isChild: boolean,
}

const Comment = ({postId, commentId, username, points, timeStampDistance, content, isChild}: CommentType) => {
  const [isReplying, setIsReplying] = useState(false);
  const [reply, setReply] = useState('');

  const submitReply = () => {
    fetch(`http://localhost:5000/comment`, {
      method: 'POST',
      body: JSON.stringify({
        "post_id": postId,
        "parent_comment_id": commentId,
        "author_id": '1',
        "content": reply,
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

  return (
    <>
      <div className={`comment ${isChild ? 'child-comment' : 'root-comment'}`}>
        <div className="main-container">
          <div className="details-container">
            <UserWidget username={username} avatarSource='https://thispersondoesnotexist.com/' link='https://google.com' />
            <span>{timeStampDistance} ago</span>
          </div>
          <p>{content}</p>
        </div>
        <div className="comment-controls">
          <PointsController points={points} voteChange={0}/>
          <Button label={isReplying ? 'Cancel' : 'Reply'} clickHandler={() => setIsReplying(!isReplying)} />
        </div>
      </div>
      {isReplying &&
        <CreateComment changeHandler={(event) => setReply(event.target.value)} submitHandler={submitReply}/>
      }
    </>
  );
}

export default Comment;