

d3.csv("data/data.csv")
  .then(function(healthData) {
      console.log(healthData)

// create chart 
healthData.forEach(function(data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
  });

var svgWidth = window.innerWidth;
var svgHeight = window.innerHeight;

var margin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 150
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;
console.log(width)

console.log(height)

// Create  SVG 
var svg = d3.select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);


// Create scale 

  var xLinearScale = d3.scaleLinear().range([0, width]);
  var yLinearScale = d3.scaleLinear().range([height, 0]);

  //  Create axis 
  
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  var xMin;
  var xMax;
  var yMin;
  var yMax;
  
  xMin = d3.min(healthData, function(data) {
      return data.healthcare;
  });
  
  xMax = d3.max(healthData, function(data) {
      return data.healthcare;
  });
  
  yMin = d3.min(healthData, function(data) {
      return data.poverty;
  });
  
  yMax = d3.max(healthData, function(data) {
      return data.poverty;
  });
  
  xLinearScale.domain([xMin, xMax]);
  yLinearScale.domain([yMin, yMax]);
  console.log(xMin);
  console.log(yMax);

  // Append Axes to the chart
 
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  chartGroup.append("g")
    .call(leftAxis);

   // Create Circles
  
  var circlesGroup = chartGroup.selectAll("circle")
  .data(healthData)
  .enter()
  .append("circle")
  .attr("cx", d => xLinearScale(d.healthcare +1.4))
  .attr("cy", d => yLinearScale(d.poverty +0.2))
  .attr("r", "12")
  .attr("fill", "blue")
  .attr("opacity", .5)

  .on("mouseout", function(data, index) {
    toolTip.hide(data);
  });
  //  Initialize tool tip
  
  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
      return (abbr + '%');
      });

  // Create tooltip in the chart
  
  chartGroup.call(toolTip);

  // Create event listeners to display and hide the tooltip
  
  circlesGroup.on("mouseover", function(d) {
    toolTip.show(d, this);
  })
    // Mouseout event
    .on("mouseout", function(d) {
        toolTip.hide(d);
      });

  

  chartGroup.append("text")
  .style("font-size", "12px")
  .selectAll("tspan")
  .data(healthData)
  .enter()
  .append("tspan")
      .attr("x", function(data) {
          return xLinearScale(data.healthcare +1.3);
      })
      .attr("y", function(data) {
          return yLinearScale(data.poverty +.1);
      })
      .text(function(data) {
          return data.abbr
      });

 // Y axis label
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Lacks Healtcare(%)");

 //X axis label
  chartGroup.append("text")
    .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom - 10) + ")")
    .attr("class", "axisText")
    .text("In Poverty (%)");




  })
  .catch(function(error){
     // handle error
     if (error) throw error;   
  })