// Load in the JSON data
var medalsData = JSON.parse(medals_db).data;

countryNames = [];

for (var i = 0; i < medalsData.length; i++) {
  if (countryNames.includes(medalsData[i].country_name)) {
    
  }
  else {
    countryNames.push(medalsData[i].country_name)
  }
};

// DROP DOWN MENU
var dropdownMenu = d3.select("#selCountry");
  
// assign all the id's to the menu options
countryNames.forEach(country => {
  var row = dropdownMenu.append("option");
     row.text(country);
});

d3.select('#selCountry').property('value', 'United States');


// Create a function to add medal data together
function sumMedals(data){
  var medalCount= {"Gold":null,"Silver":null, "Bronze":null};
 
  for (var i = 0; i < data.length; i++) {
    if (data[i].Medal == "Gold"){
      medalCount.Gold += 1;
    }
    else if (data[i].Medal == "Silver"){
      medalCount.Silver += 1;
    }
    else {
     medalCount.Bronze += 1
    } 
  };
  return medalCount
}

// Create a function to add gender data together
function sumGender(data){
  var genderCount= {"Male":null,"Female":null};
 
  for (var i = 0; i < data.length; i++) {
    if (data[i].Sex == "M"){
      genderCount.Male += 1;
    }
    else {
      genderCount.Female += 1;
    }
  };
  return genderCount
}

// Create Total Medals Pie Chart

function createPie(data) {

  // set the dimensions and margins of the graph
  var width = 450
      height = 450
      margin = 40

  // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
  var radius = Math.min(width, height) / 2 - margin

  // append the svg object to the div called 'my_dataviz'
  var svg = d3.select("#pie1")
    .append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  // set the color scale
  var color = d3.scaleOrdinal()
    .domain(data)
    .range(["#d6af36", "#a7a7ad", "#a77044"])

  // Compute the position of each group on the pie:
  var pie = d3.pie()
    .value(function(d) {return d.value; })
    
  var data_ready = pie(d3.entries(data))
  var arcGenerator = d3.arc()
    .innerRadius(75)
    .outerRadius(radius)
    .cornerRadius(9)

  // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
  svg
    .selectAll('slices')
    .data(data_ready)
    .enter()
    .append('path')
    .attr('d', arcGenerator)
    .attr('fill', function(d){return(color(d.data.key))})
    .attr("stroke", "white")
    .style("stroke-width", "3px");
  
  svg
    .selectAll('slices')
    .data(data_ready)
    .enter()
    .append('text')
    .each(function(d) {
      var centroid = arcGenerator.centroid(d);
      d3.select(this)
        .attr('x', centroid[0])
        .attr('y', centroid[1])
        .attr('dy', '0.33em')
        .text(d.data.value)
        .style("font-size", 19)
        .attr("fill", "white")
    });
  
}

// Create by Gender Pie Chart

function createPie2(data) {

  // set the dimensions and margins of the graph
  var width = 450
      height = 450
      margin = 40

  var radius = Math.min(width, height) / 2 - margin

  // append the svg object to the div 
  var svg = d3.select("#pie2")
    .append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
  
  // set the color scale
  var color = d3.scaleOrdinal()
    .domain(data)
    .range(["#4880c4", "#cd364e"])

  // Compute the position of each group on the pie:
  var pie = d3.pie()
    .value(function(d) {return d.value; })
    
  var data_ready = pie(d3.entries(data))
  var arcGenerator = d3.arc()
    .innerRadius(75)
    .outerRadius(radius)
    .cornerRadius(9)

  // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
  svg
    .selectAll('slices')
    .data(data_ready)
    .enter()
    .append('path')
    .attr('d', arcGenerator)
    .attr('fill', function(d,){return(color(d.data.key))})
    .attr("stroke", "white")
    .style("stroke-width", "3px");
  
  svg
    .selectAll('slices')
    .data(data_ready)
    .enter()
    .append('text')
    .each(function(d) {
      var centroid = arcGenerator.centroid(d);
      d3.select(this)
        .attr('x', centroid[0])
        .attr('y', centroid[1])
        .attr('dy', '0.33em')
        .text(d.data.value)
        .style("font-size", 19)
        .attr("fill", "white")
    });
           
}



// Create a function for the change event
    
function optionChanged() {
  var dropdownMenu = d3.select("#selCountry").node();
  // Assign the dropdown menu option to a variable
  var selectedOption = dropdownMenu.value;
  //console.log(selectedOption);
  var country1 = medalsData.filter(obj => obj.country_name === selectedOption);
  var data1 = sumMedals(country1);
  var data2 = sumGender(country1);
  d3.select("#pie1").html("")
  d3.select("#pie2").html("")
  return createPie(data1), createPie2(data2);
}

// INIT function for charts on load

function init() {
  var idOnLoad = "United States";
  
  var country1 = medalsData.filter(obj => obj.country_name === idOnLoad);
  var data1 = sumMedals(country1);
  var data2 = sumGender(country1);
  return createPie(data1), createPie2(data2) ;


}


init();
