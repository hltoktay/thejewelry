import Head from 'next/head';
import { useState, useContext, useEffect } from 'react';
import { DataContext } from '../store/GlobalState';

import valid from '../utils/valid'
import { patchData } from '../utils/fetchData'

const Profile = () => {
    const initialState = {
        name: '',
        password: '',
        cf_password: '',
        address: '',
        city: '',
        postcode: ''
    }

    const [data, setData] = useState(initialState)
    const { name, address, city, postcode, password, cf_password } = data


    const [ state, dispatch ] = useContext(DataContext);
    const { auth, notify } = state


    useEffect(() => {
       if(auth.user) setData({...data, name: auth.user.name, address:auth.user.address, city:auth.user.city, postcode:auth.user.postcode })
    }, [auth.user])


    const handleChange = (e) => {
      const { name, value, address, city, postcode } = e.target
      setData({...data, [name]:value, [address]:value, [city]: value, [postcode]: value })
      dispatch({type: 'NOTIFY', payload: {}})
    }

    const handleUpdateProfile = e => {
      e.preventDefault()
      if(password){
        const errMsg = valid(name, auth.user.email, password, cf_password)
        console.log(errMsg)
        if(errMsg) return dispatch({ type: 'NOTIFY', payload: {error: errMsg} })
        updatePassword()
      }


      if(name !== auth.user.name) updateInfor();

    }

    const updatePassword = () => {
        dispatch({ type: "NOTIFY", payload: {loading: true} })
        patchData('user/resetPassword', {password}, auth.token)
        .then( res => {
          if(res.err) return dispatch({ type: "NOTIFY", payload: {error: res.err} })
          return dispatch({ type: "NOTIFY", payload: {success: res.msg} })
        })
        
    }

    const updateInfor = () => {
  
      dispatch({ type: 'NOTIFY', payload: { loading: true }})

      patchData('user', {
        name, 
      }, auth.token).then(res => {
        if(res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err }})

        dispatch({ type: 'AUTH', payload: {
          token: auth.token,
          user: res.user
        }})
        return dispatch({ type: 'NOTIFY', payload: { success: res.msg }})
      })
    }

 
    if(!auth.user) return null;


    return (
      <div className="profile_page container">
        <Head>
          <title>Profile</title>
        </Head>

        <main>
          <div className="py-4 text-center">
            <h2 className="text-uppercase">User Profile</h2>
            {auth.user.role === "user" ? "User Profile" : "Admin Profile"}
          </div>

          <div className="row g-5">
            <div className="col-md-6 col-lg-5 order-md-last">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span>Order Details</span>
                <span style={{backgroundColor: '#c59c49'}} className="badge rounded-pill">
                  Total Order = 3
                </span>
              </h4>
              <ul className="list-group mb-3">
                <li className="list-group-item d-flex justify-content-between lh-sm">
                  <div>
                    <h6 className="my-0">Product code</h6>
                    <small className="text-muted">Brief description</small>
                  </div>
                  <span className="text-muted">$12</span>
                </li>
                <li className="list-group-item d-flex justify-content-between lh-sm">
                  <div>
                    <h6 className="my-0">Second product</h6>
                    <small className="text-muted">Brief description</small>
                  </div>
                  <span className="text-muted">$8</span>
                </li>
                <li className="list-group-item d-flex justify-content-between lh-sm">
                  <div>
                    <h6 className="my-0">Third item</h6>
                    <small className="text-muted">Brief description</small>
                  </div>
                  <span className="text-muted">$5</span>
                </li>
              </ul>
            </div>
            <div className="col-md-6 col-lg-6">
              <h4 className="mb-3">Profile Details</h4>
              <section className="needs-validation">
                <div className="row g-3">
                  <div className="col-sm-6">
                    <label htmlFor="firstName" className="form-label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      className="form-control"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-6">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="text"
                      name="email"
                      defaultValue={auth.user.email}
                      className="form-control"
                      disabled={true}
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="password" className="form-label">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={password}
                      className="form-control"
                      placeholder="Your new password"
                      onChange={handleChange}
                    />
                  </div>

                    <div className="col-md-6">
                    <label htmlFor="cf_password" className="form-label">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="cf_password"
                      value={cf_password}
                      className="form-control"
                      placeholder="Confirm new password"
                      onChange={handleChange}
                    />
                  </div>

                  <h5>Billing Address</h5>

                  <div className="col-12">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      value={address}
                      onChange={handleChange}
                    />
                    <div class="invalid-feedback">
                      Please enter your shipping address.
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="city" className="form-label">
                      City
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="city"
                      value={city}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="postcode" className="form-label">
                      Postcode
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="postcode"
                      value={postcode} 
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <button className="btn btn-danger mt-3 col-3"><a style={{textDecoration: 'none', color: 'inherit'}} href="/">Cancel</a></button>

                <button
                  style={{backgroundColor: '#c59c49'}}
                  className="btn text-white mt-3 mx-3 col-3"
                  disabled={notify.loading}
                  onClick={handleUpdateProfile}
                >
                  Update
                </button>
              </section>
            </div>
          </div>
        </main>

      </div>
    );
}

export default Profile;