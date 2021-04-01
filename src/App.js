
import './App.scss';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import D3test from './components/d3';
import GMap from './components/gmap';
import Yelp from './pages/yelp';

function App() {

  return (
    <Router>
      <header className="App-header">
        <Link to="/">Home</Link>
        <Link to="/yelp">Yelp API</Link>
        <Link to="/D3test">D3 test</Link>
        <Link to="/gmap">G Map</Link>
      </header>
      <div className="container-fluid">
        <div className="container">
          <div className="rows">
            <div className="col-12">
              <div className="card">
                <Switch>
                  <Route exact path="/">
                    home
                  </Route>
                  <Route path="/yelp">
                    <Yelp />
                  </Route>
                  <Route path="/D3test">
                    <D3test />
                  </Route>
                  <Route path="/gmap">
                    <div className="gcard">
                      <GMap />
                    </div>
                  </Route>
                </Switch>
              </div> 
            </div>
          </div>
        </div>
      </div>
      <footer className="App-footer">
        Footer
      </footer>
    </Router>
  );
}

export default App;
