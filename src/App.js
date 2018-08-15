import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Form from './Components/Form/Form';
import Main from './Components/Main/Main';
import Report from './Components/Report/Report';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/show-report">Show Report</Link>
            </li>
            <li>
              <Link to="/fill-report">Fill Report</Link>
            </li>
          </ul>

          <hr />

          <Route exact path="/" component={Main} />
          <Route path="/show-report" component={Form} />
          <Route path="/fill-report" component={Report} />
        </div>
      </Router>
    );
  }
}

export default App;
