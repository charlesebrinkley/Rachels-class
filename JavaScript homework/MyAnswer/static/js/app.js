// from data.js
var tableData = data;
var tbody = d3.select("tbody");
console.log(data);

var ufoSight = data;
var button = d3.select("#button");


// YOUR CODE HERE!
// // Use d3 to update each cell's text with
// // ufo report values (datetime, city, state, country, shape, durationMinutes, comments)
data.forEach((ufoReport) => {
    var row = tbody.append("tr");
    Object.entries(ufoReport).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.text(value);
    });
  });


  button.on("click", function() {

    // Select the input element and get the raw HTML node
    var inputElement = d3.select("#datetime");
  
    // Get the value property of the input element
    var inputValue = inputElement.property("datetime");
  
    console.log(inputValue);
    console.log(ufoSight);
  
    var filteredData = ufoSight.filter(ufo => ufo.datetime === inputValue);
  
    console.log(filteredData);
  
  });