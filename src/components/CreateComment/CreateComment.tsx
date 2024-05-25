import './create-comment.css';
import Button from '../Button/Button';

const CreateComment = ({value, changeHandler, submitHandler}: {value: string, changeHandler: React.ChangeEventHandler<HTMLTextAreaElement>, submitHandler: React.MouseEventHandler<HTMLButtonElement>}) => {
  return (
    <div className="create-comment">
      <textarea className='new-comment-input' onChange={changeHandler}>{value}</textarea>
      <Button label='Submit' clickHandler={submitHandler} />
    </div>
  )
}

export default CreateComment;