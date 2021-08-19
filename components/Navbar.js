import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

function Navbar() {
    const router = useRouter()
    const isActive = (r) => {
        if(r === router.pathname) {
            return " active"
        } else {
            return "" 
        }
    }


    return (
        <nav style={{backgroundColor: '#e7e5e1'}} className="navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">THE JEWELRY</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <form class="d-flex">
                            <input style={{border: "1px solid #e7e5e1", borderRadius: "5px", paddingRight: "15px"}} class="form-control btn-sm input-sm" type="search" placeholder="Search" aria-label="Search"/>
                                <button style={{border: "1px solid black", borderRadius: "50%", backgroundColor: "grey", color: "white", fontSize: "14px", marginLeft: "5px" }} class="btn btn-sm" type="submit">Go</button>
                        </form>

                        <li className="nav-item">
                            <Link href="/cart">
                                <a className={"nav-link" + isActive('/cart')}>
                                    <i className="fas fa-shopping-cart"></i>Cart
                                </a>
                            </Link>
                        </li>

                         <li className="nav-item">
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

                        {/* <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                User Name
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li><a className="dropdown-item" href="#">Profile</a></li>
                                <li><a className="dropdown-item" href="#">Logout</a></li>
                            </ul>
                        </li> */}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
