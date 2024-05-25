import './icon-button.css';

type IconButtonType = {
  icon: string,
  clickHandler: React.MouseEventHandler<HTMLButtonElement>
}

const IconButton = ({icon, clickHandler} : IconButtonType) => {
  return (
    <button className='button' onClick={clickHandler}>
      <img src={icon} />
  </button>
  )
}

export default IconButton;