// from data.js
var tableData = data;
var tbody = d3.select("tbody");
//console.log(data);


// // Use d3 to update each cell's text with
// // ufo report values (datetime, city, state, country, shape, durationMinutes, comments)
tableData.forEach((ufoReport) => {
    var row = tbody.append("tr");
    Object.entries(ufoReport).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.text(value);
    });
  });

//code for querry based on date entered

var ufoSight = data;
var button = d3.select("button");

button.on("click", function() {
  var table = document.getElementById("ufo-table");
  for(var i = table.rows.length - 1; i > 0; i--)
  {
      table.deleteRow(i);
  }
  
  // Select the input element and get the raw HTML node
  var inputElement = d3.select("#datetime");

  // Get the value property of the input element
  var inputValue = inputElement.property("value");
  

  console.log(inputValue);
  console.log(ufoSight);
  
  var filteredData = ufoSight.filter(ufo => ufo.datetime === inputValue);
  
  console.log(filteredData);


 filteredData.forEach((ufoFilter) => {
  var row = tbody.append("tr");
  Object.entries(ufoFilter).forEach(([key, value]) => {
    var cell = row.append("td");
    cell.text(value);
    });

  });


});