var margin = {top: 60, right: 100, bottom: 20, left: 80},
  width = 850 - margin.left - margin.right,
  height = 370 - margin.top - margin.bottom;

var formatYear = d3.timeFormat("%Y");
var parseYear = d3.timeParse("%Y");

// Set the ranges
var x = d3.scaleTime().domain([parseYear("Year")]).range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// Define the line
var valueLine = d3.line()
    .x(function(d) { return x(d.Year); })
    .y(function(d) { return y(+d.Medal === "Gold"); })
    //.y(function(d) { return y(+d.Medal === "Silver"); })
    //.y(function(d) { return y(+d.Medal === "Bronze"); })

// Create the svg canvas in the "graph" div
var svg = d3.select("#graph")
        .append("svg")
        .style("width", width + margin.left + margin.right + "px")
        .style("height", height + margin.top + margin.bottom + "px")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform","translate(" + margin.left + "," + margin.top + ")")
        .attr("class", "svg");

// Import the CSV data
d3.json("olympicsData.json", function(error, data) {
  if (error) throw error;
  
   // Format the data
  data.forEach(function(d) {
      d.NOC = d.NOC;
      d.Medal = d.Medal;
      d.Year = formatYear(parseYear(+d.Year));
  });

  var nest = d3.nest()
	  .key(function(d){
	    return d.NOC;
	  })
	  .key(function(d){
	  	return d.Year;
	  })
	  .entries(data)

  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.Year; }));
  y.domain([0, d3.max(data, function(d) { return d.Medal === "Gold"; })]);
  //y.domain([0, d3.max(data, function(d) { return d.Medal === "Silver"; })]);
  //y.domain([0, d3.max(data, function(d) { return d.Medal === "Bronze"; })]);
  
  // Set up the x axis
  var xaxis = svg.append("g")
       .attr("transform", "translate(0," + height + ")")
       .attr("class", "x axis")
       .call(d3.axisBottom(x)
          .ticks(d3.timeYear)
          .tickSize(0, 0)
          .tickFormat(d3.timeFormat("%Y"))
          .tickSizeInner(0)
          .tickPadding(10));

  // Add the Y Axis
   var yaxis = svg.append("g")
       .attr("class", "y axis")
       .call(d3.axisLeft(y)
          .ticks(5)
          .tickSizeInner(0)
          .tickPadding(6)
          .tickSize(0, 0));
  
  // Add a label to the y axis
  svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - 60)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Gold Wins")
        .attr("class", "y axis label");

  // Create a dropdown
    var countryMenu = d3.select("#sample-metadata")

    countryMenu
		.append("select")
		.selectAll("option")
        .data(nest)
        .enter()
        .append("option")
        .attr("value", function(d){
            return d.key;
        })
        .text(function(d){
            return d.key;
        })


 
 	// Function to create the initial graph
 	var initialGraph = function(country){

 		// Filter the data to include only fruit of interest
 		var selectCountry = nest.filter(function(d){
                return d.key == NOC;
              })

	    var selectCountryGroups = svg.selectAll(".countryGroups")
		    .data(selectFruit, function(d){
		      return d ? d.key : this.key;
		    })
		    .enter()
		    .append("g")
		    .attr("class", "countryGroups")

		var initialPath = selectCountryGroups.selectAll(".line")
			.data(function(d) { return d.values; })
			.enter()
			.append("path")

		initialPath
			.attr("d", function(d){
				return valueLine(d.values)
			})
			.attr("class", "line")

 	}

 	// Create initial graph
 	initialGraph("USA")


 	// Update the data
 	var updateGraph = function(country){

 		// Filter the data to include only fruit of interest
 		var selectCountry = nest.filter(function(d){
                return d.key == NOC;
              })

 		// Select all of the grouped elements and update the data
	    var selectCountryGroups = svg.selectAll(".countryGroups")
		    .data(selectCountry)

		    // Select all the lines and transition to new positions
            selectCountryGroups.selectAll("path.line")
               .data(function(d){
                  return (d.values);
                })
                .transition()
                  .duration(1000)
                  .attr("d", function(d){
                    return valueLine(d.values)
                  })


 	}


 	// Run update function when dropdown selection changes
 	countryMenu.on('change', function(){

 		// Find which fruit was selected from the dropdown
 		var selectedCountry = d3.select(this)
            .select("select")
            .property("value")

        // Run update function with the selected fruit
        updateGraph(selectedCountry)


    });


  
})