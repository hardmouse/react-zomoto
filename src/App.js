import logo from './logo.svg';
import './App.css';
import './assets/style/restaurant.css';
import { useState, useEffect } from 'react';
import { cities } from './model/city-list';
import { mocks } from './assets/mockData'
import axios from 'axios';
function App() {
  const searchStr = [
    "https://developers.zomato.com/api/v2.1/search?entity_id=",
    "&entity_type=city&start=0&count=10&q="
  ];
  const searchYelpUrl = "https://api.yelp.com/v3/businesses/search?term=burgers&location=toronto";
  const searchYelpUrl2 = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search"
  const [currentCity, setCurrentCity] = useState(cities[0]);
  const [currentD, setCurrentD] = useState("");
  const [restaurantList, setRestaurantList] = useState([]);
  const [search, setSearch] = useState(searchStr[0] + currentCity.city_id + searchStr[1]);
  const [searchYelp, setSearchYelp] = useState(searchYelpUrl);

  function cityChange(e){
    setCurrentCity(cities[e.target.value]);
    let _tempURL = searchStr[0] + cities[e.target.value].city_id + searchStr[1] + currentD;
    setSearch(_tempURL);
    setSearchYelp(_tempURL);
    console.log(cities[e.target.value]);
  }

  function customSearch(e){
    setCurrentD(e.target.value);
    
    let _tempURL = searchStr[0] + currentCity.city_id + searchStr[1] + e.target.value;
    
    setSearch(_tempURL);
  }

  function showEntity(_obj,_name,_class=""){
    let _reval = _obj ? ( <div className={_class}><i>{_name}</i><b>{_obj}</b> </div>):(" ");
    return _reval;
  }
  useEffect(()=>{
    // fetch(search, {
    //   "method": "GET",
    //   "headers": {
    //       "user-key": process.env.REACT_APP_ZMOTO_KEY,
    //       "content-type": "application/json"
    //     }
    //   })
    // .then((response) => {
    //   response.json().then((data) => {
    //     if(!data.code){
    //       // console.log(data);
    //       setRestaurantList(data.restaurants);
    //     }else{
    //       console.log(mocks);
    //       setRestaurantList(mocks);
    //     }
    //   });
    // })
    // .catch((error) => {
    //   console.log(error);
    // });








    axios.get(searchYelpUrl2, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_YELP_KEY}`
      },
      params: {
        location: 'toronto',
        categories: 'breakfast_brunch',
      }
    })
    .then((res) => {
      console.log(res.data.businesses);
      setRestaurantList(res.data.businesses);
    })
    .catch((err) => {
      console.log ('error')
    })

















  //   fetch(searchYelp, {
  //     "method": "GET",
  //     "header": {
  //       Authorization: `Bearer ${process.env.REACT_APP_YELP_KEY}`,
  //       Origin: 'https://main.pluralsight.com',
  //       withCredentials: true
  //     }
  //   })
  //   .then((response) => {
  //     response.json().then((data) => {
  //       if(!data.code){//Access-Control-Allow-Origin
  //         console.log("YELP NO CODE:",data);
  //         // setRestaurantList(data.restaurants);
  //       }else{
  //         console.log("YELP:",data);
  //         // setRestaurantList(mocks);
  //       }
  //     });
  //   })
  //   .catch((error) => {
  //     console.log(error,mocks);
  //   });


  },[searchYelpUrl2])
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          City:{currentCity.name} | Value: {currentD}
        </h1>
      </header>
      <div className="container-fluid">
        
        <div className="container">

          <div className="row no-gutters" role="search">
            <div className="col-12">
              <div className="card row">
                  <div className="col-12 col-lg-2"><b>Zomoto Search</b></div>
                  <div className="col-12 col-lg-10">

                    <div className="card--content">
                      <label htmlFor="cityselect">City:</label>
                      <select onChange={cityChange} id="cityselect">
                        {cities.map((city,idx) => (
                          <option value={idx} key={idx}>{city.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="card--content">
                      <label htmlFor="keywordsearch">Search:</label>
                      <input type="text" onChange={customSearch} placeholder="keyword search" id="keywordsearch" name="keysearch"  maxlength="20"></input>
                    </div>
                  </div>
              </div>
            </div>
          </div>

          <main className="row no-gutters">
          {!restaurantList.length ? ( <div className='col-12'><div className="card"><div><h2> Sorry, no result found.</h2><p>Please try other city or different key words. :)</p></div></div></div>):("")}
          {restaurantList.map((resta, idx) => (
              <div className="col-12 col-lg-6" key={idx}>
                
                <div className="card">
                  {/* <div className="card--img">
                    <img src={resta.restaurant.thumb?resta.restaurant.thumb:logo} className="card--img--image" alt={ 'The restaurant image of '+resta.restaurant.name} />
                  </div>
                  <div className="card--content">
                    <h2 className="card--content--title">{resta.restaurant.name}</h2>
                    {showEntity(resta.restaurant.location.address,'Address:','card--content--detail')}
                    {showEntity(resta.restaurant.phone_numbers,'Numbers:','card--content--detail')}
                    {showEntity(resta.restaurant.cuisines,'Cuisines:','card--content--detail')}
                  </div> */}

                  <div className="card--img">
                    <img src={resta.image_url?resta.image_url:logo} className="card--img--image" alt={ 'The restaurant image of '+resta.name} />
                  </div>
                  <div className="card--content">
                    <h2 className="card--content--title">{resta.name}</h2>
                    {showEntity(resta.location.address1,'Address:','card--content--detail')}
                    {showEntity(resta.display_phone,'Numbers:','card--content--detail')}
                    {showEntity(resta.rating,'Cuisines:','card--content--detail')}
                  </div>
                </div>
              </div>
            ))
          }
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
