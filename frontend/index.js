import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {FooterLink, Container, LoginButton} from './login/Login';
import {Page} from './landing/Landing';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Page/>

    <Router>

      <Routes>
        <Route exact path="/" component={withRouter(<Page/>)} />
        <Route path="/login" component={withRouter(<Container/>)} />
      </Routes>


    </Router>
    
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
