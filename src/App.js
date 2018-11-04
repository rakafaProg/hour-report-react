import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Form from './Components/Form/Form';
import Report from './Components/Report/Report';
import Container from './Components/Sortable/Container';

class App extends Component {
  render() {

    return (
      <Router>
        <div>
          <div className="ui three item menu">
            <Link className="item" to="/">Home</Link>
            <Link className="item" to="/show-report">Show Report</Link>
            <Link className="item" to="/fill-report">Fill Report</Link>
          </div>


          <hr />

          <Route exact path="/" component={Container} />
          <Route path="/show-report" component={Report} />
          <Route path="/fill-report" component={Form} />

        </div>
      </Router>
    );
  }
}

export default App;
