import PointsController from '../PointsController/PointsController';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import './post-card.css';

type PostCardType = { 
  postId: number,
  title: string,
  author: string,
  postedDate: string,
  commentCount: number,
  points: number
}

const PostCard = ({postId, title, author, postedDate, commentCount, points}: PostCardType) => {
  return (
    <div className='post-card'>
      <Link to={`/post/${postId}`}>
        <h1 className='post-card-title'>{title}</h1>
        <div className="post-card-data">
          <h2 className='post-card-date'>{`submitted by ${author} on ${new Date(postedDate).toLocaleDateString('en-GB')}`}</h2>
        </div>
      </Link>
      <div className="post-card-controls">
        <PointsController points={points} voteChange={0}/>
        <Button label={`${commentCount} comments`} clickHandler={() => console.log('click')}/>
      </div>
    </div>
  )
}

export default PostCard;