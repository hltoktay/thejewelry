import Head from 'next/head';
import Link from 'next/link';
import { useState, useContext, useEffect } from 'react';
import valid from '../utils/valid';
import { DataContext } from '../store/GlobalState'
import { postData } from '../utils/fetchData';
import { useRouter } from 'next/router'


const Register = () => {
  const initialState = { name: '', email: '', password: '', cf_password: '', address: '', city: '', postcode: '' }
  const [userData, setUserData] = useState(initialState)
  const { name, email, password, cf_password, address, city, postcode } = userData


  const { state, dispatch } = useContext(DataContext)

   const { auth } = state;

  const router = useRouter()

  const handleChangeInput = e => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
    dispatch({ type: 'NOTIFY', payload: {} })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const errMsg = valid(name, email, password, cf_password, address, city, postcode)
    if(errMsg) return dispatch({ type: 'NOTIFY', payload: {error:  errMsg} })

    dispatch({ type: 'NOTIFY', payload: {loading:  true} })

    const res = await postData('auth/register', userData)
    
    if(res.err) return dispatch({ type: 'NOTIFY', payload: {error:  res.err} })

    return dispatch({ type: 'NOTIFY', payload: {success:  res.msg} })
 

    console.log(res);
  }

  useEffect(() => {
    if(Object.keys(auth).length !== 0) router.push('/login')
  }, [auth])



  return (
    <div className="container">
      <Head>
        <title>Register PAGE</title>
        <link href="../styles/register.css" />
      </Head>

      <div className="row mt-5">
        <div className="col-sm-5 col-md-5 col-lg-6">
          <h1>Activate</h1>

          <p>To activate your user account, please fill out the form below.
         <br/> <br/> Please note, the customer account details which are stored with us at TJW must include your email address.</p>

        </div>

        <div className="col-sm-5 col-md-5 col-lg-6">
          <div className="form-body ">
            <div className="row">
              <div className="form-holder">
                <div className="form-content">
                  <div className="form-items">
                    <form className="requires-validation" noValidate onSubmit={handleSubmit}>
                      <div className="col-md-12">
                        <input
                          className="form-control text-uppercase"
                          type="text"
                          name="name"
                          value={name}
                          onChange={handleChangeInput}
                          placeholder="Company Name"
                          required
                        />

                      </div>

                      <div className="col-md-12">
                        <input
                          className="form-control"
                          type="email"
                          name="email"
                          value={email}
                          onChange={handleChangeInput}
                          placeholder="E-mail Address"
                          required
                        />

                      </div>

                      <div className="col-md-12">
                        <input
                          className="form-control text-uppercase"
                          type="text"
                          name="address"
                          value={address}
                          onChange={handleChangeInput}
                          placeholder="Address"
                          required
                        />

                      </div>

                      <div className="row inline-block">
                        <div className="col-md-6 inline">
                          <input
                            className="form-control text-uppercase"
                            type="text"
                            name="city"
                            value={city}
                            onChange={handleChangeInput}
                            placeholder="City"
                            required
                          />

                        </div>

                        <div className="col-md-6">
                          <input
                            className="form-control text-uppercase"
                            type="text"
                            name="postcode"
                            value={postcode}
                            onChange={handleChangeInput}
                            placeholder="Postcode"
                            required
                          />

                        </div>
                      </div>

                      <div className="col-md-12">
                        <input
                          className="form-control text-uppercase"
                          type="password"
                          name="password"
                          value={password}
                          onChange={handleChangeInput}
                          placeholder="Password"
                          required
                        />

                      </div>

                      <div className="col-md-12">
                        <input
                          className="form-control text-uppercase"
                          type="password"
                          name="cf_password"
                          value={cf_password}
                          onChange={handleChangeInput}
                          placeholder="Confirm Password"
                          required
                        />

                      </div>

                      <div className="form-button mt-3">
                        <button
                          id="submit"
                          type="submit"
                          className="btn btn-primary"
                        >
                          BECOME A CUSTOMER
                    </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>


    </div>
  );
}

export default Register;