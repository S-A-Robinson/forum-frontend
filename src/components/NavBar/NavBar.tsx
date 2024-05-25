import { Link, Outlet } from 'react-router-dom';
import './navbar.css';

const NavBar = () => {
  return (
    <>
      <div className="navbar">
        <Link to='/'>Home</Link>
        <Link to='/'>Home</Link>
        <Link to='/'>Home</Link>
        <Link to='/'>Home</Link>
        <Link to='/'>Home</Link>
      </div>
      <Outlet/>
    </>
  )
}

export default NavBar;