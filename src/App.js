
import './App.scss';
import './assets/style/webfonts.scss'
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
console.log(process.env);
function App() {

  return (
    <Router>
      <header className="App-header">
        <Link to="/"><i className="webfonts icon-home"></i>Home</Link>
        <Link to="/yelp"><i className="webfonts icon-th-large"></i>Yelp API</Link>
        <Link to="/D3test"><i className="webfonts icon-chart-bar"></i>D3.js</Link>
        <Link to="/gmap"><i className="webfonts icon-map"></i>G Map</Link>
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
