// Set margins and dimensions 
const margin = { top: 50, right: 50, bottom: 50, left: 200 };
const width = 900; //- margin.left - margin.right;
const height = 650; //- margin.top - margin.bottom;

// Append svg object to the body of the page to house Scatterplot1
const svg1 = d3.select("#vis-holder")
  .append("svg")
  .attr("width", width - margin.left - margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

// Initialize brush for Scatterplot1 and points. We will need these to be global. 
let brush1;
let myCircles1;

const svg2 = d3.select("#scatterplot-2")
  // const svg2 = d3.select("#visholder")
  .append("svg")
  .attr("width", width - margin.left - margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

let brush2;
let myCircles2;

const svg3 = d3.select("#barchart")
  // const svg3 = d3.select("#visholder")
  .append("svg")
  .attr("width", width - margin.left - margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

let bars;

// Define color scale
const color = d3.scaleOrdinal()
  .domain(["setosa", "versicolor", "virginica"])
  .range(["#FF7F50", "#21908dff", "#fde725ff"]);

// Plotting 
d3.csv("data/iris.csv").then((data) => {

  // We will need scales for all of the following charts to be global
  let x1, y1, x2, y2, x3, y3;

  // We will need keys to be global
  let xKey1, yKey1, xKey2, yKey2, xKey3, yKey3;

  // Scatterplot1
  {
    let xKey1 = "Sepal_Length";
    let yKey1 = "Petal_Length";

    // Find max x
    let maxX1 = d3.max(data, (d) => { return d[xKey1]; });

    // Create X scale
    x1 = d3.scaleLinear()
      .domain([0, maxX1])
      .range([margin.left, width - margin.right]);

    // Add x axis 
    svg1.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x1))
      .attr("font-size", '20px')
      .call((g) => g.append("text")
        .attr("x", width - margin.right)
        .attr("y", margin.bottom - 4)
        .attr("fill", "black")
        .attr("text-anchor", "end")
        .text(xKey1)
      );

    // Find max y 
    let maxY1 = d3.max(data, (d) => { return d[yKey1]; });

    // Create Y scale
    y1 = d3.scaleLinear()
      .domain([0, maxY1])
      .range([height - margin.bottom, margin.top]);

    // Add y axis 
    svg1.append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y1))
      .attr("font-size", '20px')
      .call((g) => g.append("text")
        .attr("x", 0)
        .attr("y", margin.top)
        .attr("fill", "black")
        .attr("text-anchor", "end")
        .text(yKey1)
      );

    // Add points
    myCircles1 = svg1.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("id", (d) => d.id)
      .attr("cx", (d) => x1(d[xKey1]))
      .attr("cy", (d) => y1(d[yKey1]))
      .attr("r", 8)
      .style("fill", (d) => color(d.Species))
      .style("opacity", 0.5);

    brush1 = d3.brush()
      .extent([[0, 0], [width, height]])
      .on("start", clear)
      .on("brush", updateChart1)
    svg1.call(brush1);
  }

  {
    let xKey2 = "Sepal_Width";
    let yKey2 = "Petal_Width";

    // Find max x
    let maxX2 = d3.max(data, (d) => { return d[xKey2]; });

    // Create X scale
    x2 = d3.scaleLinear()
      .domain([0, maxX2])
      .range([margin.left, width - margin.right]);

    // Add x axis 
    svg2.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x2))
      .attr("font-size", '20px')
      .call((g) => g.append("text")
        .attr("x", width - margin.right)
        .attr("y", margin.bottom - 4)
        .attr("fill", "black")
        .attr("text-anchor", "end")
        .text(xKey2)
      );

    // Finx max y 
    let maxY2 = d3.max(data, (d) => { return d[yKey2]; });

    // Create Y scale
    y2 = d3.scaleLinear()
      .domain([0, maxY2])
      .range([height - margin.bottom, margin.top]);

    // Add y axis 
    svg2.append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y2))
      .attr("font-size", '20px')
      .call((g) => g.append("text")
        .attr("x", 0)
        .attr("y", margin.top)
        .attr("fill", "black")
        .attr("text-anchor", "end")
        .text(yKey2)
      );

    // Add points
    myCircles2 = svg2.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("id", (d) => d.id)
      .attr("cx", (d) => x2(d[xKey2]))
      .attr("cy", (d) => y2(d[yKey2]))
      .attr("r", 8)
      .style("fill", (d) => color(d.Species))
      .style("opacity", 0.5);

    brush2 = d3.brush()
      .extent([[0, 0], [width, height]])
      .on("start", clear)
      .on("brush", updateChart2);
    svg2.call(brush2);
  }

  {

    let barData = [
      { species: 'setosa', count: 50 },
      { species: 'versicolor', count: 50 },
      { species: 'virginica', count: 50 }
    ];

    let xKey3 = "species";
    let yKey3 = "count";

    // Find max x
    let maxX3 = d3.max(barData, (d) => { return d.length; });

    x3 = d3.scaleBand()
      .domain(d3.range(barData.length))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    // Add x axis 
    bars = svg3.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x3)
        .tickFormat(i => barData[i][xKey3]))
      .attr("font-size", '20px')
      .call((g) => g.append("text")
        .attr("x", width - margin.right)
        .attr("y", margin.bottom - 4)
        .attr("fill", "black")
        .attr("text-anchor", "end")
        .text(xKey3)
      );

    // Finx max y 
    let maxY3 = d3.max(barData, (d) => { return d[yKey3]; });

    // Create Y scale
    y3 = d3.scaleLinear()
      .domain([0, maxY3])
      .range([height - margin.bottom, margin.top]);

    // Add y axis 
    bars = svg3.append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y3))
      .attr("font-size", '20px')
      .call((g) => g.append("text")
        .attr("x", 0)
        .attr("y", margin.top)
        .attr("fill", "black")
        .attr("text-anchor", "end")
        .text(yKey3)
      );

    bars = svg3.selectAll(".bar")
      .data(barData)
      .enter()  // give data to the bars
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d, i) => x3(i))
      .attr("y", (d) => y3(d[yKey3]))
      .attr("height", (d) => (height - margin.bottom) - y3(d[yKey3]))
      .attr("width", x3.bandwidth()) //^^^ add attributes to each bar
      .style("fill", (d) => color(d[xKey3]))
      .style("opacity", 0.5);
  }

  //Brushing Code---------------------------------------------------------------------------------------------

  // Call to removes existing brushes 
  function clear() {
    brush1.move(svg1, null);
    brush2.move(svg2, null);
  }

  // Call when Scatterplot1 is brushed 
  function updateChart1(brushEvent) {

    extent = brushEvent.selection;

    myCircles2.classed("selected", function (d) { return isBrushed(extent, x1(d.Sepal_Length), y1(d.Petal_Length)) })

  }

  // Call when Scatterplot2 is brushed 
  function updateChart2(brushEvent) {

    extent = brushEvent.selection;

    const species = [];

    myCircles1.classed("selected", function (d) {
      if (isBrushed(extent, x1(d.Sepal_Length), y1(d.Petal_Length))) {
        if (!species.includes(d.Species)) {
          species.push(d.Species);
        }
        return true;
      }
    });

    bars.classed("selected", function (d) { return species.includes(d.species) });

  }

  //Finds dots within the brushed region
  function isBrushed(brush_coords, cx, cy) {
    if (brush_coords === null) return;

    var x0 = brush_coords[0][0],
      x1 = brush_coords[1][0],
      y0 = brush_coords[0][1],
      y1 = brush_coords[1][1];
    return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1; // This return TRUE or FALSE depending on if the points is in the selected area
  }
});
