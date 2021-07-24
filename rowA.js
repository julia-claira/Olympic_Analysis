var margin = { top: 60, right: 100, bottom: 20, left: 80 },
  width = 850 - margin.left - margin.right,
  height = 370 - margin.top - margin.bottom;


d3.csv("LBdirtyData.csv").then(function(data) {

    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    data.forEach(function(d) {
        d.Year = +d.Year;
        d.Gold = +d.Gold;
        d.Silver = +d.Silver;
        d.Bronze = +d.Bronze;
        d.NOC = d.NOC;
    });
    console.log(data[0]);

    var countriesGrouped = d3.nest()
        .key(function(d) { 
            return d.NOC; })
        .entries(data);

    console.log(countriesGrouped);

    var goldMedalCount = d3.nest()
        .key(function(d) { return d.NOC; })
        .key(function(d) { return d.Gold; })
        .rollup(function(v) { return d3.sum(v, function(d) { return d.Gold;});})
        .entries(data);
        console.log(goldMedalCount);

    var silverMedalCount = d3.nest()
        .key(function(d) { return d.NOC; })
        .key(function(d) { return d.Silver; })
        .rollup(function(v) { return d3.sum(v, function(d) { return d.Silver;});})
        .entries(data);
        console.log(silverMedalCount);

    var bronzeMedalCount = d3.nest()
        .key(function(d) { return d.NOC; })
        .key(function(d) { return d.Bronze; })
        .rollup(function(v) { return d3.sum(v, function(d) { return d.Bronze;});})
        .entries(data);
        console.log(bronzeMedalCount);

    y.domain([
        d3.min([0,d3.min({goldMedalCount })]),
        d3.max([0,d3.max(data,function (d) { return d.goldMedalCount })])
    ]);
    x.domain([1920, 2016])

    var valueLine = d3.line()
        .x(function(d) {return x(d.Year);})
        .y(function(d) {return y(d.goldMedalCount)})


    var svg = d3.select("#graph")
        .append("svg")
        .style("width", width + margin.left + margin.right + "px")
        .style("height", height + margin.top + margin.bottom + "px")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("class", "svg");
   
    var nest = d3.groups(data, d => d.Year, d => d.NOC)

    var xAxis = d3.axisBottom()
        .scale(x)
    
    var yAxis = d3.axisLeft()
        .scale(y)

    var countryMenu = d3.select("selDataset")

    countryMenu
        .append("select")
        .selectAll("option")
        .data(nest)
        .enter()
        .append("option")
        .attr("value", ([key, ]) => key)
        .text(([key, ]) => key)

    var initialGraph = function(country){
        var selectCountry = nest.filter(([key, ]) => key == country)

        var selectCountryGroups = svg.selectAll(".countryGroups")
            .data(selectCountry, function(d) {
                return d ? d.key : this.key;
            })
            .enter()
            .append("g")
            .attr("class", "countryGroups")

        var initialPath = selectCountryGroups.selectAll(".line")
        .data(([, values]) => values)
        .enter()
        .append("path")

        initialPath
            .attr('d', (d) => valueLine(Array.from(d.values())[1]))
            .attr("class", "line")
    }

    initialGraph("USA")

    var updateGraph = function(country) {
        var selectCountry = nest.filter(([key, ]) => key == country)
        var selectCountryGroups = svg.selectAll(".countryGroups")
        .data(selectCountry)

        selectCountryGroups.selectAll("path.line")
            .data(([, values]) => values)
            .transition()
            .duration(1000)
            .attr('d', (d) => valueLine(Array.from(d.values())[1]))
    }

    countryMenu.on('change', function() {
        var selectedCountry = d3.select(this)
        .select("select")
        .property("value")

        updateGraph(selectedCountry)
    });

  // X-axis
  svg.append('g')
      .attr('class','axis')
      .attr('id','xAxis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis)
    .append('text') // X-axis Label
      .attr('id','xAxisLabel')
      .attr('fill','black')
      .attr('y',-10)
      .attr('x',width)
      .attr('dy','.71em')
      .style('text-anchor','end')
      .text('Year')
  // Y-axis
  svg.append('g')
      .attr('class','axis')
      .attr('id','yAxis')
      .call(yAxis)
    .append('text') // y-axis Label
      .attr('id', 'yAxisLabel')
      .attr('fill', 'black')
      .attr('transform','rotate(-90)')
      .attr('x',0)
      .attr('y',5)
      .attr('dy','.71em')
      .style('text-anchor','end')
      .text('Gold Medals')
});