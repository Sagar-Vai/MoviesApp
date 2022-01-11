import React,{useContext} from 'react'
import './Nav.css'
import { AuthContext } from './Context/AuthProvider'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
function Nav() {
    const history = useHistory();
    const {logout} = useContext(AuthContext);
    const handleLogout = async()=>{
        await logout();
            console.log("Called")
        history.push('/login');
      }
    return (
        <nav className='navbar'>
            <Link to = '/movies'>
            <h1>MoviesApp</h1>
            </Link>
            <ul className='list'>
                    <li onClick={handleLogout}>Log Out</li>              
                    <Link to = '/about'>
                    <li>About</li>
                    </Link>
                    <Link to = '/movies'>
                    <li>Movies</li>
                </Link>
            </ul>
        </nav>
    )
}

export default Nav
