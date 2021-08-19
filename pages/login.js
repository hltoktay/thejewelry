import Head from 'next/head';
import Link from 'next/link';

const Login = () => {
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
             
                <form className="requires-validation" novalidate>

                  <div className="col-md-12">
                    <input className="form-control" type="email" name="email" placeholder="E-mail Address" required />
                    <div className="valid-feedback">Email field is valid!</div>
                    <div className="invalid-feedback">Email field cannot be blank!</div>
                  </div>

                  <div className="col-md-12">
                    <input className="form-control" type="password" name="password" placeholder="Password" required />
                    <div className="valid-feedback">Password field is valid!</div>
                    <div className="invalid-feedback">Password field cannot be blank!</div>
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