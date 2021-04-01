import React, { Component } from "react";
import GoogleMapReact from 'google-map-react';
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class GMap extends Component {
  static defaultProps = {
    center: {
      lat: 43.9066093,
      lng: -79.3014838
    },
    zoom: 12
  };
  // renderMarkers(map, maps) {
  //   let marker = new maps.Marker({
  //     position: this.defaultProps,
  //     map,
  //     title: 'Hello World!'
  //   });
  // }
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ minHeight: '50vh', width: '100%'}}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GMAP_KEY }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          // onGoogleApiLoaded={({map, maps}) => this.renderMarkers(map, maps)}
          // yesIWantToUseGoogleMapApiInternals={true}
        >
          <AnyReactComponent
            lat={43.9066093}
            lng={-79.3014838}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default GMap;
