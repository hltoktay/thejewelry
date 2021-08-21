import React, { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { DataContext  } from '../store/GlobalState';
import Cookie from 'js-cookie';

function Navbar() {
    const router = useRouter()

    const [ state, dispatch ] = useContext(DataContext)
    const { auth } = state;


    const isActive = (r) => {
        if(r === router.pathname) {
            return " active"
        } else {
            return "" 
        }
    }

    const handleLogout = () => {
        Cookie.remove('refreshtoken', {path: 'api/auth/accessToken'})
        localStorage.removeItem('firstLogin')
        dispatch({ type: 'AUTH', payload: {} })
        dispatch({ type: 'NOTIFY', payload: {success: 'Logged out!'} })
    }

    const loggedRouter = () => {
        return (
            <li className="nav-item dropdown" style={{marginRight: '50px'}}>
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    My Account
                </a>
                <ul className="dropdown-menu" style={{backgroundColor: '#e7e5e1'}} aria-labelledby="navbarDropdownMenuLink">
                    <li><a className="dropdown-item" href="/settings">Setting</a></li>
                    <li><button className="dropdown-item" href="/" onClick={handleLogout}>Logout</button></li>
                </ul>
            </li>
        )

    }


    return (
        <nav style={{backgroundColor: '#e7e5e1', height: '4.5rem', padding: '20px', fontSize: '14px', fontFamily: '"AvenirLTStd-Heavy", Arial, Helvetica, sans-serif'}} className="navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">THE JEWELRY</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div style={{color: 'white'}} className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <form class="d-flex">
                            <input style={{border: "1px solid #e7e5e1", borderRadius: "5px", paddingRight: "25px"}} class="form-control btn-sm input-sm" type="search" placeholder="Search" aria-label="Search"/>
                                <button style={{border: "1px solid black", borderRadius: "50%", backgroundColor: "grey", color: "white", fontSize: "14px", marginLeft: "10px" }} class="btn btn-sm" type="submit">Go</button>
                        </form>

                        <li className="nav-item">
                            <Link href="/cart">
                                <a className={"nav-link" + isActive('/cart')}>
                                    <i className="fas fa-shopping-cart"></i>Cart
                                </a>
                            </Link>
                        </li>
                
                        {
                            Object.keys(auth).length === 0 
                             ?      <><li className="nav-item">
                            <Link href="/login">
                                <a className={"nav-link" + isActive('/login')}>
                                <i className="fas fa-sign-in-alt"></i>   Login  
                                </a>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link href="/register">
                                <a className={"nav-link" + isActive('/register')}>
                               |  Register
                                </a>
                            </Link>
                        </li>
                                </>  
                        : loggedRouter()
                        }
     
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
