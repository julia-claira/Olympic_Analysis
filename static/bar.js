//var olympicURL = 'data/country_medals2.csv';
    
    

    var filterYears=["pick a year",1896, 1900, 1904, 1908, 1912, 1920, 1924, 1928, 1932, 1936, 1948, 1952, 1956, 1960,
        1964, 1968, 1972, 1976, 1980, 1984, 1988, 1992, 1994, 1996, 1998, 2000, 2002, 2004, 2006, 2008, 2010, 2012, 2014, 2016]
    var years = filterYears.map (x => x.toString());
    
  
    var dropDown= d3.select("#seldDataset");
    dropDown.selectAll("option")
        .data(years)
        .enter()
        .append("option")
        .text(function(d) {
            return `${d}`
        });

    changeDate(2016)
  

    function changeDate(x){
        //d3.csv(olympicURL).then(function(olydata){
        //var olyData = olydata
        //console.log(x)
        var olyData=JSON.parse(medal_bar_db).data;
        //console.log(olyData)
        function findData (f){
        return f.Year == x
       
       

    }
    var d = olyData.filter(findData);
        console.log(d) 
        getData(d);

//});  
    };

    function getData(d){

        var country = d.map(d => d.Country);
        console.log(country)
        var season = d.map(d => d.Season);
        console.log(season)
        var medals = d.map(d => d.Medals_Won)
        console.log(medals)
        var year = d[0].Year
        var fullName = d.map(d => d.Name)
        plots(country,season,medals,year,fullName)

    }

    function plots(country,season,medals,year,fullName){
        winterC = []
        winterMedal = []
        winterName = []
        summerC = []
        summerMedal = []
        summerName = []
        
        for (i=0;i<season.length;i++){
            if (season[i] == "Winter"){
                winterC.push(country[i])
                winterMedal.push(medals[i])
                winterName.push(fullName[i])

            }
            else {
                summerC.push(country[i])
                summerMedal.push(medals[i])
                summerName.push(fullName[i])
            }

        };

        var temp;

        for (var i = 0; i < summerMedal.length; i++) {
            for (var j = i + 1; j < summerMedal.length; j++) {
                if (summerMedal[i] < summerMedal[j]) {
                    temp = summerMedal[i];
                    summerMedal[i] = summerMedal[j];
                    summerMedal[j] = temp;

                    temp = summerC[i];
                    summerC[i] = summerC[j];
                    summerC[j] = temp;
                }
            }
        }


        for (var i = 0; i < winterMedal.length; i++) {
            for (var j = i + 1; j < winterMedal.length; j++) {
                if (winterMedal[i] < winterMedal[j]) {
                    temp = winterMedal[i];
                    winterMedal[i] = winterMedal[j];
                    winterMedal[j] = temp;

                    temp = winterC[i];
                    winterC[i] = winterC[j];
                    winterC[j] = temp;
                }
            }
        }

        var Trace1 = {
            x:summerC,
            y:summerMedal,
            text: summerName,
            name:'Summer Olympics',
            marker: { 
                color: 'green'
            },
            type: 'bar'
        };

        var Trace2 = {
            x:winterC,
            y:winterMedal,
            text: winterName,
            name:'Winter Olympics',
            marker: { 
                color: 'blue'
            },
            type: 'bar'
        };

        var data = [Trace1,Trace2]; 
        var layout = {title:` Medals earned by participating countries in ${year}`,
            showlegend: true,
            barmode: 'stack',
            xaxis: {tickangle: -45}};
        Plotly.newPlot('Bar', data, layout );


    };
