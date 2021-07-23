

d3.csv("LBdirtyData.csv").then(function(data) {

    data.forEach(function(d) {
        d.Year = +d.Year;
        d.Gold = +d.Gold;
        d.Silver = +d.Silver;
        d.Bronze = +d.Bronze;
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

    var silverMedalCount = d3.nest()
        .key(function(d) { return d.NOC; })
        .key(function(d) { return d.Bronze; })
        .rollup(function(v) { return d3.sum(v, function(d) { return d.Bronze;});})
        .entries(data);
        console.log(bronzeMedalCount);
});

