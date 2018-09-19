import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Form from './Components/Form/Form';
import Main from './Components/Main/Main';
import Report from './Components/Report/Report';
import Chess from './Components/Chess/Chess';
import Knight from './Components/Chess/Knight';
import Square from './Components/Chess/Square';

class App extends Component {
  render() {

    //return (<Chess />);

    return (
      <Router>
        <div>
          <div className="ui three item menu">
            <Link className="item" to="/">Home</Link>
            <Link className="item" to="/show-report">Show Report</Link>
            <Link className="item" to="/fill-report">Fill Report</Link>
          </div>


          <hr />

          <Route exact path="/" component={Main} />
          <Route path="/show-report" component={Report} />
          <Route path="/fill-report" component={Form} />

        </div>
      </Router>
    );
  }
}

export default App;
