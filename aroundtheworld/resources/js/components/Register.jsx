// resources/js/components/Register.js

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    Inertia.post('/register', { name, email, password, password_confirmation });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">Register</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
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
                <div className="form-group">
                  <label htmlFor="password_confirmation">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password_confirmation"
                    value={password_confirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
              </form>
              <div className="mt-3">
                <InertiaLink href="/login">Login</InertiaLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

if (document.getElementById('register')) {
  ReactDOM.render(<Register />, document.getElementById('register'));
}
