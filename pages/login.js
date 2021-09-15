import Head from 'next/head';
import Link from 'next/link';
import { useState, useContext, useEffect } from 'react';
import valid from '../utils/valid';
import { DataContext } from '../store/GlobalState'
import { postData } from '../utils/fetchData';
import Cookie from 'js-cookie';
import { useRouter } from 'next/router'


const Login = () => {
  const initialState = { email: '', password: ''}
  const [userData, setUserData] = useState(initialState)
  const { email, password } = userData


  const { state, dispatch } = useContext(DataContext)
  const { auth } = state;

  const router = useRouter()

  const handleChangeInput = e => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value });
    dispatch({ type: 'NOTIFY', payload: {} })
  }

  const handleSubmit = async e => {
    e.preventDefault()
 
    dispatch({ type: 'NOTIFY', payload: {loading:  true} })

    const res = await postData('auth/login', userData)
    
    if(res.err) return dispatch({ type: 'NOTIFY', payload: {error:  res.err} })

    dispatch({ type: 'NOTIFY', payload: {success:  res.msg} })

    dispatch({ type: 'AUTH', payload: {
      token: res.access_token,
      user: res.user
    } })

    Cookie.set('refreshtoken', res.refresh_token, {
      path: 'api/auth/accessToken',
      expires: 7
    })

    localStorage.setItem('firstLogin', true)
   

    console.log(res);

  }

  useEffect(() => {
    if(Object.keys(auth).length !== 0) router.push('/')
  }, [auth])


  return (
    <div>
      <Head>
        <title>Login PAGE</title>
      </Head>

    <div className="form-body">
        <div className="row">
          <div className="form-holder">
            <div className="form-content">
              <div className="form-items">
                <h3>Login</h3>
             
                <form className="requires-validation" noValidate onSubmit={handleSubmit}>

                  <div className="col-md-12">
                    <input className="form-control" type="email" placeholder="E-mail Address" required
                      name="email" value={email} onChange={handleChangeInput}
                    />
                   
                  </div>

                  <div className="col-md-12">
                    <input className="form-control" type="password" placeholder="Password" required
                    name="password" value={password} onChange={handleChangeInput}
                     />
                   
                  </div>

                  <div className="form-button mt-3">
                    <button id="submit" type="submit" className="btn btn-primary">Login</button>
                  </div>
                  
                  <p className="my-2">You don't have account ?<Link href="/register"><a style={{color: '#8b4518'}} > Register</a></Link> </p>
                
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>


       
    </div>
  )
}

export default Login;