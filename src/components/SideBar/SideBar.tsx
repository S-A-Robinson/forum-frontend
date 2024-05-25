import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';

type GroupType = {
  id: number,
  group_name: string,
};

const SideBar = () => {

  const [groups, setGroups] = useState([] as GroupType[]);

  useEffect(() => {
    fetch('http://localhost:5000/groups')
    .then(response => response.json())
    .then(data => setGroups(data));
  }, []);

  return (
    <div className="side-bar">
      {
        groups.map((group, index) => (
          <Link key={`side-bar-link-${index}`} className='side-bar-link' to={`/group/${group.id}`}>
            <div className="side-bar-link-inner">
              <img src='https://thispersondoesnotexist.com/'/>
              <span>{group.group_name}</span>
            </div>
          </Link>
        ))
      }
      <Link to='/post/new'>
        <button>New Post</button>
      </Link>
    </div>
  );
}

export default SideBar;