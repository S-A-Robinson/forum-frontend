import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostCard from '../../components/PostCard/PostCard';
import './group.css';

type GroupData = {
  id: number,
  group_name: string,
  posts: {
    id: number,
    title: string,
    username: string,
    author_id: number,
    content: string,
    points: number,
    num_of_comments: number,
    created_at: string,
  }[],
};

const Group = () => {
  const { groupId } = useParams();
  const [groupData, setGroupData] = useState({} as GroupData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/group/${groupId}`)
    .then(response => response.json())
    .then(data => {
      //TODO trigger 404 if we get a 404 response for no found group with id
      setGroupData(data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!groupData.group_name) {
      document.title = 'Forum - Group';
      return;
    }

    document.title = 'Forum - ' + groupData.group_name;
  }, [groupData.group_name]);

  if (isLoading) return (
    <h2>...Loading</h2>
  )

  return (
    <div className="group">
      <h1>{groupData.group_name}</h1>
      {!isLoading && groupData.posts.length !== 0
        ? <div className="post-card-container">
            {groupData.posts.map((post, index) => (
              <PostCard
                key={`post-card-${index}`}
                postId={post.id}
                title={post.title}
                author={post.username}
                postedDate={post.created_at}
                commentCount={post.num_of_comments}
                points={post.points}
              />
            ))}
          </div>
        : <h1>No Posts</h1>
      }
    </div>
  )
}

export default Group;