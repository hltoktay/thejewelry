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


  const [ state, dispatch ] = useContext(DataContext)

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
    if(Object.keys(auth).length !== 0) router.push('/')
  }, [auth])



  return (
    <div>
      <Head>
        <title>Register PAGE</title>
        <link href="../styles/register.css" />
      </Head>

      <div className="form-body mx-auto">
        <div className="row">
          <div className="form-holder">
            <div className="form-content">
              <div className="form-items">
                <h3>Register Today</h3>
                <p>Fill in the data below.</p>
                <form className="requires-validation" noValidate onSubmit={handleSubmit}>
                  <div className="col-md-12">
                    <input
                      className="form-control"
                      type="text"
                      name="name"
                      value={name}
                      onChange={handleChangeInput}
                      placeholder="Full Name"
                      required
                    />
                    <div className="valid-feedback">
                      Username field is valid!
                    </div>
                    <div className="invalid-feedback">
                      Username field cannot be blank!
                    </div>
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
                    <div className="valid-feedback">Email field is valid!</div>
                    <div className="invalid-feedback">
                      Email field cannot be blank!
                    </div>
                  </div>

                  <div className="col-md-12">
                    <input
                      className="form-control"
                      type="text"
                      name="address"
                      value={address}
                      onChange={handleChangeInput}
                      placeholder="Address"
                      required
                    />
                    <div className="valid-feedback">
                      Address field is valid!
                    </div>
                    <div className="invalid-feedback">
                      Address field cannot be blank!
                    </div>
                  </div>

                  <div className="row inline-block">
                    <div className="col-md-6 inline">
                      <input
                        className="form-control"
                        type="text"
                        name="city"
                        value={city}
                        onChange={handleChangeInput}
                        placeholder="City"
                        required
                      />
                      <div className="valid-feedback">City field is valid!</div>
                      <div className="invalid-feedback">
                        City field cannot be blank!
                      </div>
                    </div>

                    <div className="col-md-6">
                      <input
                        className="form-control"
                        type="text"
                        name="postcode"
                        value={postcode}
                        onChange={handleChangeInput}
                        placeholder="Postcode"
                        required
                      />
                      <div className="valid-feedback">
                        Postcode field is valid!
                      </div>
                      <div className="invalid-feedback">
                        Postcode field cannot be blank!
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <input
                      className="form-control"
                      type="password"
                      name="password"
                      value={password}
                      onChange={handleChangeInput}
                      placeholder="Password"
                      required
                    />
                    <div className="valid-feedback">
                      Password field is valid!
                    </div>
                    <div className="invalid-feedback">
                      Password field cannot be blank!
                    </div>
                  </div>

                  <div className="col-md-12">
                    <input
                      className="form-control"
                      type="password"
                      name="cf_password"
                      value={cf_password}
                      onChange={handleChangeInput}
                      placeholder="Confirm Password"
                      required
                    />
                    <div className="valid-feedback">
                      Password field is valid!
                    </div>
                    <div className="invalid-feedback">
                      Password field cannot be blank!
                    </div>
                  </div>

                  <div className="form-check mt-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="invalidCheck"
                      required
                    />
                    <label className="form-check-label">
                      I confirm that all data are correct
                    </label>
                    <div className="invalid-feedback">
                      Please confirm that the entered data are all correct!
                    </div>
                  </div>

                  <div className="form-button mt-3">
                    <button
                      id="submit"
                      type="submit"
                      className="btn btn-primary"
                    >
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;