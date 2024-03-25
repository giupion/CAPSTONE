// resources/js/components/Login.js

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    Inertia.post('/login', { email, password });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">Login</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
              </form>
              <div className="mt-3">
                <InertiaLink href="/register">Register</InertiaLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

if (document.getElementById('login')) {
  ReactDOM.render(<Login />, document.getElementById('login'));
}
