import React from "react";

import './ds.css';
import axios from "axios";
import * as d3 from "d3";
class D3test extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.dataset = [100, 200, 300, 400, 500];
    this.ran = this.ran.bind(this);
  }

  componentDidMount() {
    this.loadData(this.addChart);
    // this.addChart();
  }
  loadData() {
    var self = this;
    var fromDate = new Date(new Date().setDate(new Date().getDate() - 16))/1000;//new Date(2020, 9, 30) / 1000;
    var toDate   = new Date() / 1000;
    console.log(fromDate,toDate);
    console.log(new Date(fromDate * 1000),new Date(toDate * 1000));
    const options = {
      method: "GET",
      url: "https://coingecko.p.rapidapi.com/coins/bitcoin/market_chart/range",
      params: { from: fromDate, vs_currency: "cad", to: toDate },
      headers: {
        "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY,
        "x-rapidapi-host": "coingecko.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        var newData = [];
        response.data.prices.forEach((x) => {
          var date = new Date(x[0]);
          newData.push(Math.round(x[1]/500));
          // console.log(date.toLocaleString(),"==>",x[1]);
        });
        self.dataset = newData;
        self.addChart();
      })
      .catch(function (error) {
        console.error(error);
      });

    //   this.addChart();
  }
  removePreviousChart() {
    while (this.myRef.current.hasChildNodes()) {
      this.myRef.current.removeChild(this.myRef.current.lastChild);
    }
  }

  addChart() {
    this.removePreviousChart();
    console.log(this.myRef);
    
    
    // let size = 200;
    // let svg = d3
    //   .select(this.myRef.current)
    //   .append("svg")
    //   .attr("viewBox", `0 0 ${size*2} ${size}`)

    // const strokeWidth = 1.5;
    // const margin = { top: 0, bottom: 20, left: 30, right: 20 };
    // const chart = svg.append("g").attr("transform", `translate(${margin.left},0)`);
    // const width = 300 - margin.left - margin.right - (strokeWidth * 2);
    // const height = 150 - margin.top - margin.bottom;
    // const grp = chart
    //   .append("g")
    //   .attr("transform", `translate(-${margin.left - strokeWidth},-${margin.top})`);
    
    // // Create scales
    // const yScale = d3
    //   .scaleLinear()
    //   .range([height, 0])
    //   .domain([0, d3.max(this.dataset, dataPoint => dataPoint)]);
    // const xScale = d3
    //   .scaleLinear()
    //   .range([0, width])
    //   .domain(d3.extent(this.dataset, dataPoint => dataPoint));
    
    // const area = d3
    //   .area()
    //   .x(dataPoint => console.log(dataPoint))
    //   .y0(height)
    //   .y1(dataPoint => yScale(dataPoint.popularity));
    
    // // Add area
    // grp
    //   .append("path")
    //   .attr("transform", `translate(${margin.left},0)`)
    //   .datum(this.dataset)
    //   .style("fill", "lightblue")
    //   .attr("stroke", "steelblue")
    //   .attr("stroke-linejoin", "round")
    //   .attr("stroke-linecap", "round")
    //   .attr("stroke-width", strokeWidth)
    //   .attr("d", area);
    
    // // Add the X Axis
    // chart
    //   .append("g")
    //   .attr("transform", `translate(0,${height})`)
    //   .call(d3.axisBottom(xScale).ticks(this.dataset.length));
    
    // // Add the Y Axis
    // chart
    //   .append("g")
    //   .attr("transform", `translate(0, 0)`)
    //   .call(d3.axisLeft(yScale));










    let size = 200;
    let svg = d3
      .select(this.myRef.current)
      .append("svg")
      .attr("viewBox", `0 0 ${size*2} ${size}`)
    let rect_width = .5;
    svg
      .selectAll("rect")
      .data(this.dataset)
      .enter()
      .append("rect")
      .attr("x", (d, i) => 5 + i * (rect_width + .5))
      .attr("y", (d) => size - d)
      .attr("width", rect_width)
      .attr("height", (d) => d)
      .attr("fill", "lime");
  }

  componentDidUpdate() {
    console.log("Update:");
  }

  ran(e) {
    console.log(this.dataset);
    var max = 500;
    this.dataset = [
      Math.floor(Math.random() * max),
      Math.floor(Math.random() * max),
      Math.floor(Math.random() * max),
      Math.floor(Math.random() * max),
      Math.floor(Math.random() * max),
    ];
    this.loadData(this.addChart);
  }

  render() {
    return (
      <div>
        <div ref={this.myRef} className="d3-canvas"></div>
        <button onClick={this.ran}>click</button>
      </div>
    );
  }
}
export default D3test;
