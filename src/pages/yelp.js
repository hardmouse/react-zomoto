import logo from "./../assets/logo.svg";
import "./../assets/style/restaurant.scss";
import { useState, useEffect } from "react";
import { cities } from "./../model/city-list";
// import { zomotoMocks, netflixMocks } from './assets/mocks/mockData';
// import { coinlistMocks } from './assets/mocks/coins/coinlist';
// import { currencyMocks } from './assets/mocks/coins/currencymocks';
import axios from "axios";
let _tem = [];
function Yelp() {
  const searchYelpUrl =
    "https://api.yelp.com/v3/businesses/search";
  const searchYelpUrl2 =
    "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search";
  const [currentCity, setCurrentCity] = useState(cities[0]);
  const [currentQuery, setCurrentQuery] = useState("");
  const [restaurantList, setRestaurantList] = useState([]);
  const [searchYelp, setSearchYelp] = useState(searchYelpUrl);

  function updateLocalStorage(_name = "", _data = []) {
    localStorage.setItem(_name, JSON.stringify(_data));
  }

  // function cityChange(e) {
  //   setCurrentCity(cities[e.target.value]);
  //   console.log(currentCity);
  //   setSearchYelp();
  //   // loadLiveData();
  //   // console.log(cities[e.target.value]);
  // }

  function customSearch(e) {
    setCurrentQuery(e.target.value);
    setSearchYelp();
  }

  function showEntity(_obj, _name, _class = "", _extra = "") {
    let _extraData = _extra ? <span>, {_extra}</span> : "";
    let _reval = _obj ? (
      <div className={_class}>
        <i>{_name}</i>
        <b>
          {_obj}
          {_extraData}
        </b>{" "}
      </div>
    ) : (
      " "
    );
    return _reval;
  }

  // function viewDetail(_i) {
  //   restaurantList[_i].detailView = !restaurantList[_i].detailView;
  //   var _t = restaurantList;
  //   setRestaurantList(_t);
  //   console.log("i", restaurantList[_i].detailView, "AFTER: ", _t[_i].detailView);
  // }

  // function loadLiveData(){
  // }

  useEffect(() => {
    console.log("Loadin City:",currentCity.name);
    console.log("currentQuery.current:",currentQuery);
    console.log("searchYelp.current:",searchYelp);
    const fetchData = async () => {
      const result = await axios.get(searchYelpUrl2, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_YELP_KEY}`,
        },
        params: {
          location: currentCity.name,
          term: currentQuery,
        },
      })
      
      // .then((res) => {
      //   res.data.businesses.forEach((item) => {
      //     item["detailView"] = true;
      //   });
      //   console.log(res.data.businesses);
      //   setRestaurantList(res.data.businesses);
      //   updateLocalStorage("yelpData",res.data.businesses);
      // })
      // .catch((err) => {
      //   console.log("error");
      // });
      // return result;
      console.log(result.data);
      result.data.businesses.forEach((item) => {
        item["detailView"] = false;
        _tem.push(false);
      });
      console.log(result.data.businesses);
      setRestaurantList(result.data.businesses);
      updateLocalStorage('yelpData_'+currentCity.name+'_'+currentQuery,result.data.businesses);
    }


    if(localStorage.getItem('yelpData_'+currentCity.name+'_'+currentQuery)){
      // fetchData();
      // let _t = JSON.parse(localStorage.getItem('yelpData'));
      // _t.forEach(() => _tem.push(false));
      // setViewDet(_tem);
      // console.log('LOCAL:',restaurantList);
      setRestaurantList(JSON.parse(localStorage.getItem('yelpData_'+currentCity.name+'_'+currentQuery)));
    }else{
      console.log('Fetch remote')
      fetchData();
    }


    // fetchData();
    // if(localStorage.getItem('yelpData')){
    //   setRestaurantList(JSON.parse(localStorage.getItem('yelpData')));
    // }else{
    //   loadLiveData();
    // }//currentQuery, currentCity, searchYelp
  }, [currentQuery,currentCity,searchYelp]);

  return (
    <div className="row no-gutters" role="search">
      <div className="col-12">
        <div className="yelp-card row">
          <h3>
            City:{currentCity.name} | Value: {currentQuery} |
          </h3>
        </div>
      </div>
      <div className="col-12 col-lg-2">
        <b>Zomoto Search</b>
      </div>
        <div className="col-12 col-lg-10">
          <div className="yelp-card--content">
            <label htmlFor="cityselect">City:</label>
            <select onChange={(_e) => {
              setCurrentCity(cities[_e.target.value]);
              console.log(cities[_e.target.value])
            }} id="cityselect">
              {cities.map((city, idx) => (
                <option value={idx} key={idx}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
          <div className="yelp-card--content">
            <label htmlFor="keywordsearch">Search:</label>
            <input
              type="text"
              onChange={customSearch}
              placeholder="keyword search"
              id="keywordsearch"
              name="keysearch"
              maxLength="20"
            ></input>
          </div>

          <main className="row no-gutters">
            {!restaurantList.length ? (
              <div className="col-12">
                <div className="yelp-card">
                  <div>
                    <h2> Sorry, no result found.</h2>
                    <p>Please try other city or different key words. :)</p>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            {restaurantList.map((resta, idx) => (
              <div className="col-12 col-lg-6" key={idx}>
                <div className="yelp-card">
                  <div className="row align-self-start">
                    <div className="yelp-card--img col-12 col-md-4 align-self-start">
                      <img
                        src={resta.image_url ? resta.image_url : logo}
                        className="yelp-card--img--image"
                        alt={"The restaurant image of " + resta.name}
                      />
                    </div>
                    <div className="yelp-card--content col-12 col-md-8 align-self-start">
                      {/* <h4>
                        {restaurantList[idx].detailView.toString()}
                      </h4> */}
                      <h2 className="yelp-card--content--title">{resta.name}</h2>
                      {showEntity(
                        resta.location.address1,
                        "Address:",
                        "yelp-card--content--detail",
                        resta.location.city
                      )}
                      {showEntity(
                        resta.display_phone,
                        "Numbers:",
                        "yelp-card--content--detail"
                      )}
                      {showEntity(
                        resta.rating,
                        "Rating:",
                        "yelp-card--content--detail"
                      )}
                    </div>
                  
                    {
                        <div className="yelp-card--content--detail col-12 align-self-start">
                          <button onClick={() => {
                            restaurantList[idx].detailView = !restaurantList[idx].detailView
                            // resta.detailView = !resta.detailView;
                            setRestaurantList(restaurantList.slice());

                          }}>
                            {resta.detailView ? 'Hide Detail':'View Detail'}
                          </button>
                          <p
                            className={
                              !resta.detailView
                                ? "yelp-card--content--detail--hide"
                                : ""
                            } 
                          >
                            {JSON.stringify(resta, null, 2)}
                          </p>
                        </div>
                      }
                  </div>
                </div>
              </div>
            ))}
          </main>
        </div>
      </div>
  );
}

export default Yelp;
