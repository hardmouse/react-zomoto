import React, { Component } from "react";
import GoogleMapReact from 'google-map-react';
import './gmap.scss';
const AnyReactComponent = ({ text }) => <div className="gmap--marker"><i className="webfonts icon-home"></i>{text}</div>;
 
class GMap extends Component {
  static defaultProps = {
    center: {
      lat: 43.9066093,
      lng: -79.3014838
    },
    zoom: 12
  };
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
          <AnyReactComponent
            lat={43.90}
            lng={-79.28}
            text="My Marker 2"
          />
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default GMap;
