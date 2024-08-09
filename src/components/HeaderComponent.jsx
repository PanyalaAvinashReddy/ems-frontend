import React from 'react';
import logo from '../assets/logo.png';

function HeaderComponent() {
  return (
    <div>
      <header>
        <nav className="navbar sticky-top navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="http://localhost:3000/employees">
              <img src={logo} alt="Logo" width="50" height="34" className="d-inline-block align-text-top" />
              Employee Management System
            </a>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default HeaderComponent;
