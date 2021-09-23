import React, { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { DataContext  } from '../store/GlobalState';
import Cookie from 'js-cookie';
import SearchBar from './SearchBar';

function Navbar() {
    const router = useRouter()

    const { state, dispatch } = useContext(DataContext)
    const { auth, cart } = state;


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
        return router.push('/')
    }

    const adminRouter = () => {
      return (
        <>
          <Link href="/users">
            <a className="dropdown-item">Users</a>
          </Link>
           <Link href="/create">
            <a className="dropdown-item">Products</a>
          </Link>
           <Link href="/categories">
            <a className="dropdown-item">Categories</a>
          </Link>
        </>
      )
    }

    const loggedRouter = () => {
        return (
            <li className="nav-item dropdown" style={{marginRight: '50px'}}>
                <a className="nav-link dropdown-toggle fw-bolder text-dark" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {auth.user.name}
                </a>
                <ul className="dropdown-menu" style={{backgroundColor: '#e7e5e1'}} aria-labelledby="navbarDropdownMenuLink">
                    <li><a className="dropdown-item" href="/settings">Setting</a></li>
                    {
                      auth.user.role === 'admin' && adminRouter()
                    }
                    <div className="dropdown-divider"></div>
                    <li><button className="dropdown-item" href="/" onClick={handleLogout}>Logout</button></li>
                </ul>
            </li>
        )

    }


    return (
      <>
        <nav
          style={{
            backgroundColor: "#e7e5e1",
            height: "4.5rem",
            padding: "20px",
            fontSize: "14px",
            fontFamily: '"AvenirLTStd-Heavy", Arial, Helvetica, sans-serif'
          }}
          className="navbar navbar-expand-lg navbar-light"
        >
          <div style={{ backgroundColor: "#e7e5e1",}} className="container-fluid">
            <a className="navbar-brand" href="/">
              THE JEWELRY
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              style={{ color: "white" }}
              className="collapse navbar-collapse justify-content-end"
              id="navbarNavDropdown"
            >
              <ul className="navbar-nav p-2">
             <SearchBar />

                <li className="nav-item">
                  <Link href="/cart">
                    <a className={"nav-link" + isActive("/cart")}>
                      <i  style={{
                                padding: '4px 6px',
                                background: '#ebeae8',
                                border: '1px solid #7e6023',
                                borderRadius: '20%',
                                right: '5px',
                                color: '#ccac6d',
                                fontSize: '14px'
                              }} className="fas fa-shopping-cart position-relative"> </i>
                        <span className="position-absolute"
                        >
                        {cart.length}
                        </span>
                 
                    </a>
                  </Link>
                </li>

                {Object.keys(auth).length === 0 ? (
                  <>
                    <li className="nav-item">
                      <Link href="/login">
                        <a className={"nav-link" + isActive("/login")}>
                          <i className="fas fa-sign-in-alt"></i> Login
                        </a>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link href="/register">
                        <a className={"nav-link" + isActive("/register")}>
                          | Register
                        </a>
                      </Link>
                    </li>
                  </>
                ) : (
                  loggedRouter()
                )}
              </ul>
            </div>
          </div>
        </nav>

        <div
          style={{
            minHeight: "20px",
            fontSize: "12px",
            paddingLeft: "35px",
            backgroundColor: "black",
            letterSpacing: "4px",
            fontFamily: "arial"
          }}
        >
          <p className="text-white">
            SIMPLY BRILLIANT JEWELLERY DELIVERED NEXT DAY
          </p>
        </div>
      </>
    );
}

export default Navbar
