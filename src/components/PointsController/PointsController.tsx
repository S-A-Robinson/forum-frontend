import './points-controller.css';

type PointsControllerType = {
  points: number,
  voteChange: number,
}

const PointsController = ({points, voteChange}: PointsControllerType) => {
  return (
  <div className="points-controller">
    <button className="add-point-button">
      <img src='/src/assets/arrow-up.svg' />
    </button>
    <span className='points'>{points}</span>
    <button className="remove-point-button">
      <img src='/src/assets/arrow-down.svg' />
    </button>
  </div>
  )
}

export default PointsController;