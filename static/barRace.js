
//Julia's Code Start-------------------------------------------------------------------------
    
//pull db from flask
var flaskRace_db=JSON.parse(bar_race_db).data;
console.log(flaskRace_db[0]);


var olympicURL = "static/summer_country_medals.csv"; 
    var countryURL = "static/countries.csv";
    d3.csv(olympicURL).then((importedData)=>{
      var data = importedData;
      d3.csv(countryURL).then((importedData2)=>{
        var dataC = importedData2;
        console.log(data[0]);
        
        
    
        var myYear='1800';//set initial year to before data set
    
        var allData={};
    
        allData[myYear]=[];
    
        dataC.forEach(row =>{
          allData[myYear].push({"network":row.Country,"MAU":0})
        });
    
    
        myYear=data[0].Year;
        allData[myYear]=[];
        dataC.forEach(row =>{
          allData[myYear].push({"network":row.Country,"MAU":0})
        });
    
        data.forEach(row => {
          if(row.Year===myYear){
            index = allData[myYear].findIndex(x => x.network ===row.Country);
            allData[myYear][index].MAU=allData[myYear][index].MAU+parseInt(row.Medal)
          }
          else{
            var previousYear=myYear;
            myYear=row.Year;
            allData[myYear]=[];
            allData[previousYear].forEach(row =>{
              allData[myYear].push({"network":row.network,"MAU":row.MAU})
            });
          }
      })
    
      //function to find corresponding city for the olympic year
      function cityOlympics(year){
        var a;
        for (i=0;i<data.length;i++){
          if (parseInt(data[i].Year)===year){
            a= data[i].City;
            break;
          }
        }
        return a;
      }
    
    
    //Julia's Code End-------------------------------------------------------------------------
    
    am4core.ready(function() {
    
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    
    
    var chart = am4core.create("chartdiv", am4charts.XYChart);
    chart.padding(40, 40, 40, 40);
    
    chart.numberFormatter.bigNumberPrefixes = [
      { "number": 1e+3, "suffix": "K" },
      { "number": 1e+6, "suffix": "M" },
      { "number": 1e+9, "suffix": "B" }
    ];
    
    var label = chart.plotContainer.createChild(am4core.Label);
    label.x = am4core.percent(97);
    label.y = am4core.percent(95);
    label.horizontalCenter = "right";
    label.verticalCenter = "middle";
    label.dx = -15;
    label.fontSize = 50;
    
    var playButton = chart.plotContainer.createChild(am4core.PlayButton);
    playButton.x = am4core.percent(97);
    playButton.y = am4core.percent(95);
    playButton.dy = -2;
    playButton.verticalCenter = "middle";
    playButton.events.on("toggled", function(event) {
      if (event.target.isActive) {
        play();
      }
      else {
        stop();
      }
    })
    
    var stepDuration = 4000;
    
    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "network";
    categoryAxis.renderer.minGridDistance = 1;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.disabled = true;
    
    var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());//can maybe change x axis here
    valueAxis.min = 0.1;
    valueAxis.rangeChangeEasing = am4core.ease.linear;
    valueAxis.rangeChangeDuration = stepDuration;
    valueAxis.extraMax = 0.1;
    
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryY = "network";
    series.dataFields.valueX = "MAU";
    series.tooltipText = "{valueX.value}"
    series.columns.template.strokeOpacity = 0;
    series.columns.template.column.cornerRadiusBottomRight = 5;
    series.columns.template.column.cornerRadiusTopRight = 5;
    series.interpolationDuration = stepDuration;
    series.interpolationEasing = am4core.ease.linear;
    
    var labelBullet = series.bullets.push(new am4charts.LabelBullet())
    labelBullet.label.horizontalCenter = "right";
    labelBullet.label.text = "{values.valueX.workingValue.formatNumber('#.0as')}";
    labelBullet.label.textAlign = "end";
    labelBullet.label.dx = -10;
    
    chart.zoomOutButton.disabled = true;
    
    // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
    series.columns.template.adapter.add("fill", function(fill, target){
      return chart.colors.getIndex(target.dataItem.index);
    });
    
    var year = 1896;
    label.text = `${cityOlympics(year)} ${year.toString()}`;
    
    var interval;
    
    function play() {
      interval = setInterval(function(){
        nextYear();
      }, stepDuration)
      nextYear();
    }
    
    function stop() {
      if (interval) {
        clearInterval(interval);
      }
    }
    
    function nextYear() {
      year=year+4;
    
      if (year==1916)year=1920;//dates where there are no olympics
      if (year==1940)year=1948;//dates where there are no olympics
    
      if (year > 2012) {//change this to adjust year for my dataset
       year = 1896;
      }
    
      //Julia's Code -- so here I added code to temporarily set any country not in the top ten to 0 medals for that year
      var newData = allData[year];
      var tempData=newData.slice(0).sort((a, b) => (a.MAU > b.MAU) ? 1 : -1);//sorts data by number of medals
      var topTen=[];
        for (i=0;i<tempData.length-10; i++){
            topTen.push(tempData[i]['network']);
        };
      topTen.forEach(row=>{  
        index = newData.findIndex(x => x.network ===row);
        newData[index].MAU=0;
      });
    
    
     //---------------------------------------------------------- 
      //var newData = allData[year];
      var itemsWithNonZero = 0;
    
      for (var i = 0; i < chart.data.length; i++) {
        chart.data[i].MAU = newData[i].MAU;
        if (chart.data[i].MAU > 0) {//here I can set the chart to only show those above 0
          itemsWithNonZero++;
        }
      }
    
      if (year == 1896) {
      
        series.interpolationDuration = stepDuration / 4;
        valueAxis.rangeChangeDuration = stepDuration / 4;
      }
      else {
        series.interpolationDuration = stepDuration;
        valueAxis.rangeChangeDuration = stepDuration;
      }
    
      chart.invalidateRawData();
      label.text = `${cityOlympics(year)} ${year.toString()}`;
    
      categoryAxis.zoom({ start: 0, end: itemsWithNonZero / categoryAxis.dataItems.length });
    }
    
    
    categoryAxis.sortBySeries = series;
    
    
    chart.data = JSON.parse(JSON.stringify(allData[year]));
    categoryAxis.zoom({ start: 0, end: 1 / chart.data.length });
    
    series.events.on("inited", function() {
      setTimeout(function() {
        playButton.isActive = true; // this starts interval
      }, 2000)
    })
    
    }); // end am4core.ready()
    
    });
    });//end promise