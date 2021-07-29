var svgWidth = 860;
var svgHeight = 660;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 80
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom);

var chartGroup = svg.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Initial Params
var chosenXAxis = "Population";

// function used for updating x-scale var upon click on axis label
function xScale(data, chosenXAxis) {
  //scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(data, d => d[chosenXAxis]) * 0.5,
    d3.max(data, d => d[chosenXAxis]) * 1.2])
    .range([0, width]);

  return xLinearScale;
};

// function used for updating xAxis var upon click on axis label
function renderAxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

  return xAxis;
};

// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, chosenXAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]));

  return circlesGroup;
};

// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, circlesGroup) {

  var label;

  if (chosenXAxis === "Population") {
    label = "Population:";
  }
  else {
    label = "GDP Per Capita";
  };

  var toolTip = d3.tip()
    .attr("class", "d3-tip")
    .offset([80, -60])
    .html(function (d) {
      return (`${d.NOC}<br>${label} ${d[chosenXAxis]}`)
    });

  circlesGroup.call(toolTip);

  circlesGroup.on("mouseover", function (data) {
    toolTip.show(data);
  })
    // onmouseout event
    .on("mouseout", function (data, index) {
      toolTip.hide(data);
    });

  return circlesGroup;
};

// Retrieve data from the CSV file and execute everything below
d3.csv("assets/data/cleaned.csv").then(function (data, err) {
  if (err) throw err;

  // parse data
  data.forEach(function (data) {
    data.Population = +data.Population;
    data.GDP_per_Capita = +data.GDP_per_Capita;
    data.Medal = +data.Medal;
  });

  // xLinearScale function above csv import
  var xLinearScale = xScale(data, chosenXAxis);

  // Create y scale function
  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.Medal)])
    .range([height, 0]);

  // Create initial axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // append x axis
  var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // append y axis
  chartGroup.append("g")
    .call(leftAxis);

  // append initial circles
  var circlesGroup = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d.Medal))
    .attr("r", 5)
    //.classed("stateCircle", true)
    .attr("class", function(d) {
      return " stateCircle " + d.NOC;
    });
 
  // Create group for two x-axis labels
  var labelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);

  var popLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "Population") // value to grab for event listener
    .classed("active", true)
    .text("Population");

  var gdpLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "GDP_per_Capita") // value to grab for event listener
    .classed("inactive", true)
    .text("GDP per Capita");

  // append y axis
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .classed("axis-text", true)
    .text("Medals Won");

  // updateToolTip function above csv import
  var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

  // x axis labels event listener
  labelsGroup.selectAll("text")
    .on("click", function () {
      // get value of selection
      var value = d3.select(this).attr("value");

      if (value !== chosenXAxis) {
        // replaces chosenXAxis with value
        chosenXAxis = value;

        // updates x scale for new data
        xLinearScale = xScale(data, chosenXAxis);

        // updates x axis with transition
        xAxis = renderAxes(xLinearScale, xAxis);

        // updates circles with new x values
        circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis)

        // updates tooltips with new info
        circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

        //circlesGroup.append("text").text(function(d){return d.abbr}).classed("stateText", true);

        // changes classes to change bold text
        if (chosenXAxis === "Population") {
          popLabel
            .classed("active", true)
            .classed("inactive", false);
          gdpLabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else {
          popLabel
            .classed("active", false)
            .classed("inactive", true);
          gdpLabel
            .classed("active", true)
            .classed("inactive", false);
        }
      }
    });
}).catch(function (error) {
  console.log(error);
});
