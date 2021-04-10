
import './App.scss';
import './assets/style/webfonts.scss'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import D3test from './components/d3';
import GMap from './components/gmap';
import Yelp from './pages/yelp';
import Scene from './pages/threeJS'
function App() {
  
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState('redux');

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `http://hn.algolia.com/api/v1/search?query=${query}`,
      );
 
      console.log(result.data);
      setData(result.data);
      console.log("triggered",query);
    };
 
    fetchData();
  },[query]);
  return (
    <Router>
      <header className="App-header">
        <Link to="/"><i className="webfonts icon-home"></i>Home</Link>
        <Link to="/yelp"><i className="webfonts icon-th-large"></i>Yelp API</Link>
        <Link to="/D3test"><i className="webfonts icon-chart-bar"></i>D3.js</Link>
        <Link to="/threejs"><i className="webfonts icon-globe"></i>ThreeJS</Link>
        <Link to="/gmap"><i className="webfonts icon-map"></i>G Map</Link>
      </header>
      <div className="container-fluid">
        <div className="container">
          <div className="rows">
            <div className="col-12">
              <div className="card">
                <Switch>
                  <Route exact path="/">
                    <input
                      type="text"
                      value={query}
                      onChange={event => setQuery(event.target.value)}
                    />
                    <ul>
                      {data.hits.map(item => (
                        <li key={item.objectID}>
                          <a href={item.url}>{item.title}</a>
                        </li>
                      ))}
                    </ul>
                  </Route>
                  <Route path="/yelp">
                    <Yelp />
                  </Route>
                  <Route path="/D3test" >
                    <D3test parentGroup={query}/>
                  </Route>
                  <Route path="/threejs">
                    <div id="threeBox">
                      <Scene />
                    </div>
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
