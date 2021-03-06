import { useD3 } from './hooks/useD3';
import React from 'react';
import * as d3 from 'd3';

function BarChart({ data }) {
  
  const ref = useD3(
    // set up sizing and margins
    (svg) => {
      const height = 500;
      const width = 500;
      const margin = { top: 20, right: 30, bottom: 100, left: 40 };
      // create x-axis values
      const x = d3
        .scaleBand()
        .domain(data.map((d) => d.year))
        .rangeRound([margin.left, width - margin.right])
        .padding(0.1);
      // create y-axis values
      const y1 = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.w)])
        .rangeRound([height - margin.bottom, margin.top]);
      // build x-axis
      const xAxis = (g) =>
        g.attr("transform", `translate(0,${height - margin.bottom})`).call(
          d3
            .axisBottom(x)
            .tickValues(
              d3
                .ticks(...d3.extent(x.domain()), width / 40)
                .filter((v) => x(v) !== undefined)
            )
            .tickSizeOuter(0)
        )
        // add label
        .call((g) => 
          g
          .append("text")
          .attr("x", width/2)
          .attr("y", margin.bottom - 70)
          .attr("fill", "white")
          .attr("text-anchor", "start")
          .text("year")
        )
      // build y-axis
      const y1Axis = (g) =>
        g
          .attr("transform", `translate(${margin.left},0)`)
          .style("color", "white")
          .call(d3.axisLeft(y1).ticks(null, "s"))
          .call((g) => g.select(".domain").remove())
          .call((g) =>
          // add y-axis label
            g
              .append("text")
              .attr("x", -margin.left + 10)
              .attr("y", 10)
              .attr("fill", "white")
              .attr("text-anchor", "start")
              .text("watts")
          );
      // create display for outputting info
      const outputBox = (g) =>
        g
          .append("text")
          .text("Hover over bar to see info")
          .attr("fill", "white")
          .attr("x", width/2-100)
          .attr("y", 460)
          .style("text-anchor", "start")
          .style("font-size", "20px")
      // put x-axis, y-axis, and output display components in place
      svg.select(".x-axis").call(xAxis);
      svg.select(".y-axis").call(y1Axis);
      svg.select(".output").call(outputBox);
      // add bars to graph
      svg
        .select(".plot-area")
        .attr("fill", "lightgrey")
        .selectAll(".bar")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        // return to original aesthetic when hovering is finished
        .on("mouseout", function() {
          d3.select(this)
          .transition()
          .duration(400)
          .attr('width', x.bandwidth())
          .style("fill", "lightgrey")
        })
        // set up sizing of bars
        .attr("x", (d) => x(d.year))
        .attr("width", x.bandwidth())
        .attr("y", (d) => y1(d.w))
        .attr("height", (d) => y1(0) - y1(d.w))
        // change brightness depending on yearly temperature
        .style("filter", (d) => "brightness(" +  ((d.temp - 4)/6) + ")")
        // set up component ids for easy data access
        .attr("id", (d) => "Energy Consumption: " + d.w + "W;    Mean Temperature: " + d.temp + "??C")
        // add animation for mouse hover, and update output display based on which bar is being hovered over
        .on("mouseover", function() {
          var info = this.id
          svg.select(".output").select("text").remove()
          svg.select(".output").append("text").text(info).attr("fill", "white").attr("x", width/2-170)
            .attr("y", 460).style("text-anchor", "start").style("font-size", "14px")
          d3.select(this)
          .transition()
          .duration(400)
          .attr('width', x.bandwidth() + 5)
          .style("fill", "blanchedalmond")
        })
      
    },
    [data.length]
  );

  return (
    <div style={{display: "flex", flexDirection: "row"}}>
      <div>
        <h1 style={{fontSize: 25, marginLeft: 0}}>Yearly Household Average Energy Consumption</h1>
        <h2 style={{fontSize: 12, marginRight: 0}}>London, ON</h2>
        <h3 style={{fontSize: 10, marginTop: 0, fontWeight: 'normal'}}>Lighter column means warmer temperature</h3>
        <svg
          ref={ref}
          style={{
            height: 500,
            width: "100%",
            marginRight: "0px",
            marginLeft: "0px",
          }}
        >
          <g className="output" />
          <g className="plot-area" />
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
    </div>
    
  );
}

export default BarChart;