let filteredAge = ageBreakdown.map(function(person){
    return person.age;
});
console.log(filteredAge);

// create 10 bins 
//create a trace for the bar graph
// var trace = {
//   x: titles,
//   y: ratings,
//   type: "bar"
// };

// // 6. Create the data array for our plot
// var data = [trace];

// // 7. Define our plot layout
// var layout = {
//   title: "The highest critically acclaimed movies",
//   xaxis: { title: "Title" },
//   yaxis: { title: "Metascore (Critic) Rating"}
// };

// // 8. Plot the chart to a div tag with id "bar-plot"
// Plotly.newPlot("bar-plot", data, layout);

//https://www.d3-graph-gallery.com/graph/histogram_binSize.html




// function filterAge(data) {
//     return data.age;
// }

// let filteredAge = ageBreakdown.filter(filterAge);
// console.log("filtered");

// console.log(filteredAge); 