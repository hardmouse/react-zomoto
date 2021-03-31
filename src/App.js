import logo from './logo.svg';
import './App.css';
import './assets/style/restaurant.css';
import { useState, useEffect } from 'react';
import { cities } from './model/city-list';
// import { zomotoMocks, netflixMocks } from './assets/mocks/mockData';
// import { coinlistMocks } from './assets/mocks/coins/coinlist';
// import { currencyMocks } from './assets/mocks/coins/currencymocks';
import axios from 'axios';

function App() {
  const data = [4, 8, 15, 16, 23, 42];
  const divD3 = document.createElement("div");
  divD3.innerHTML = "Hello, world!";









  
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
  // let tempList = [];

  function updateLocalStorage(_name="", _data=[]){
      localStorage.setItem(_name, JSON.stringify(_data));
  }



  function cityChange(e){
    setCurrentCity(cities[e.target.value]);
    let _tempURL = searchStr[0] + cities[e.target.value].city_id + searchStr[1] + currentD;
    setSearch(_tempURL);
    // setSearchYelp();
    console.log(cities[e.target.value]);
  }

  function customSearch(e){
    setCurrentD(e.target.value);
    
    let _tempURL = searchStr[0] + currentCity.city_id + searchStr[1] + e.target.value;
    
    setSearch(_tempURL);
    
    // setSearchYelp();
  }

  function showEntity(_obj,_name,_class="",_extra=""){
    let _extraData = _extra ? (<span>, {_extra}</span>):("");
    let _reval = _obj ? ( <div className={_class}><i>{_name}</i><b>{_obj}{_extraData}</b> </div>):(" ");
    return _reval;
  }

  function viewDetail(_i){
    restaurantList[_i].viewDetail = !restaurantList[_i].viewDetail;
    setRestaurantList(restaurantList);
    console.log("i",restaurantList[_i].viewDetail);
  }
//process.env.REACT_APP_RAPIDAPI_KEY,
  useEffect(()=>{
    const options = {
      method: 'GET',
      url: 'https://coingecko.p.rapidapi.com/coins/bitcoin/history',
      params: {date: '30-03-2021'},
      headers: {
        'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
        'x-rapidapi-host': 'coingecko.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });

    // const options = {
    //   method: 'GET',
    //   url: 'https://coingecko.p.rapidapi.com/simple/price',
    //   params: {ids: coinlistMocks[810].id, vs_currencies: currencyMocks[19]},
    //   headers: {
    //     'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
    //     'x-rapidapi-host': 'coingecko.p.rapidapi.com'
    //   }
    // };
    
    // axios.request(options).then(function (response) {
    //   console.log(response.data);
    // }).catch(function (error) {
    //   console.error(error);
    // });





    // const options = {
    //   method: 'GET',
    //   url: 'https://unogsng.p.rapidapi.com/genres',
    //   headers: {
    //     'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
    //     'x-rapidapi-host': 'unogsng.p.rapidapi.com'
    //   }
    // };
    
    // axios.request(options).then(function (response) {
    //   console.log(response.data);
    // }).catch(function (error) {
    //   console.error(error);
    // });







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
          
    //       // updateLocalStorage("Zomoto",data.restaurants);
    //     }else{
    //       console.log(mocks);
    //       setRestaurantList(mocks);
    //       // updateLocalStorage("Zomoto",mocks);
    //     }
    //   });
    // })
    // .catch((error) => {
    //   console.log(error);
    // });








    // axios.get(searchYelpUrl2, {
    //   headers: {
    //     Authorization: `Bearer ${process.env.REACT_APP_YELP_KEY}`
    //   },
    //   params: {
    //     location: currentCity.name,
    //     categories: currentD,
    //   }
    // })
    // .then((res) => {
    //   res.data.businesses.forEach(item=>{
    //     item["detailView"] = true;
    //     // console.log(item);
    //   })
    //   console.log(res.data.businesses);
    //   setRestaurantList(res.data.businesses);
    // })
    // .catch((err) => {
    //   console.log ('error')
    // })



















  },[currentD, currentCity, search])
  
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
                      <input type="text" onChange={customSearch} placeholder="keyword search" id="keywordsearch" name="keysearch"  maxLength="20"></input>
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


                  {/* <div className="card--img">
                    <img src={resta.image_url?resta.image_url:logo} className="card--img--image" alt={ 'The restaurant image of '+resta.name} />
                  </div>
                  <div className="card--content">
                    <h2 className="card--content--title">{resta.name}</h2>
                    {showEntity(resta.location.address1,'Address:','card--content--detail',resta.location.city)}
                    {showEntity(resta.display_phone,'Numbers:','card--content--detail')}
                    {showEntity(resta.rating,'Rating:','card--content--detail')}
                    {<div className="card--content--detail">
                      <button onClick={() => viewDetail(idx)}>VIEW {resta.viewDetail}</button>
                      <p className={!resta.viewDetail?'card--content--detail--hide':''}>{JSON.stringify(resta, null, 2) }</p>
                      </div>}
                  </div> */}



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
