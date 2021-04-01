import logo from "./../assets/logo.svg";
import "./../assets/style/restaurant.scss";
import { useState, useEffect, useRef } from "react";
import { cities } from "./../model/city-list";
// import { zomotoMocks, netflixMocks } from './assets/mocks/mockData';
// import { coinlistMocks } from './assets/mocks/coins/coinlist';
// import { currencyMocks } from './assets/mocks/coins/currencymocks';
import axios from "axios";

function Yelp() {
  const searchStr = [
    "https://developers.zomato.com/api/v2.1/search?entity_id=",
    "&entity_type=city&start=0&count=10&q=",
  ];
  const searchYelpUrl =
    "https://api.yelp.com/v3/businesses/search?term=burgers&location=toronto";
  const searchYelpUrl2 =
    "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search";
  const [currentCity, setCurrentCity] = useState(cities[0]);
  const [currentD, setCurrentD] = useState("");
  const [restaurantList, setRestaurantList] = useState([]);
  // const [search, setSearch] = useState(searchStr[0] + currentCity.city_id + searchStr[1]);
  const [searchYelp, setSearchYelp] = useState(searchYelpUrl);
  // let tempList = [];

  function updateLocalStorage(_name = "", _data = []) {
    localStorage.setItem(_name, JSON.stringify(_data));
  }

  function cityChange(e) {
    setCurrentCity(cities[e.target.value]);
    setSearchYelp();
    console.log(cities[e.target.value]);
  }

  function customSearch(e) {
    setCurrentD(e.target.value);
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

  function viewDetail(_i) {
    restaurantList[_i].viewDetail = !restaurantList[_i].viewDetail;
    setRestaurantList(restaurantList);
    console.log("i", restaurantList[_i].viewDetail);
  }

  useEffect(() => {

    axios
      .get(searchYelpUrl2, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_YELP_KEY}`,
        },
        params: {
          location: currentCity.name,
          categories: currentD,
        },
      })
      .then((res) => {
        res.data.businesses.forEach((item) => {
          item["detailView"] = true;
        });
        console.log(res.data.businesses);
        setRestaurantList(res.data.businesses);
      })
      .catch((err) => {
        console.log("error");
      });
  }, [currentD, currentCity, searchYelp]);

  return (
    <div className="row no-gutters" role="search">
      <div className="col-12">
        <div className="yelp-card row">
          <h3>
            City:{currentCity.name} | Value: {currentD}
          </h3>
        </div>
      </div>
      <div className="col-12 col-lg-2">
        <b>Zomoto Search</b>
      </div>
        <div className="col-12 col-lg-10">
          <div className="yelp-card--content">
            <label htmlFor="cityselect">City:</label>
            <select onChange={cityChange} id="cityselect">
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

                  <div className="yelp-card--img">
                    <img
                      src={resta.image_url ? resta.image_url : logo}
                      className="yelp-card--img--image"
                      alt={"The restaurant image of " + resta.name}
                    />
                  </div>
                  <div className="yelp-card--content">
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
                    {
                      <div className="yelp-card--content--detail">
                        <button onClick={() => viewDetail(idx)}>
                          VIEW {resta.viewDetail}
                        </button>
                        <p
                          className={
                            !resta.viewDetail
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
