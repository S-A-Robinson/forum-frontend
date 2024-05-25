import './user-widget.css';

const UserWidget = ({username, avatarSource, accountUrl}: {username: string, avatarSource: string, accountUrl:string}) => {
  return (
    <div className="user-widget">
      <img className='user-avatar' src={avatarSource}/>
      <span className='username'>{username}</span>
    </div>
  )
}

export default UserWidget;