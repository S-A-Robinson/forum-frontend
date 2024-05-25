import './button.css';

type ButtonType = {
  label: string,
  clickHandler: React.MouseEventHandler<HTMLButtonElement>
}

const Button = ({label, clickHandler}: ButtonType) => {
  return (
    <button className='button' onClick={clickHandler}>
      {label}
    </button>
  )
}

export default Button;