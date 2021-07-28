
//Julia's Code Start-------------------------------------------------------------------------




//Pulls db from flask
var flaskRace_db=JSON.parse(bar_race_db).data;
var reset=false;//resets if at end of graph

console.log(flaskRace_db);

/*var summerYears=[1896, 1900, 1904, 1908, 1912, 1920, 1924, 1928, 1932, 1936, 1948, 1952, 1956, 1960,
  1964, 1968, 1972, 1976, 1980, 1984, 1988, 1992, 1996, 2000, 2004, 2008, 2012, 2016];
var winterYears=[1924, 1928, 1932, 1936, 1948, 1952, 1956, 1960, 1964, 1968, 1972, 1976, 1980,
  1984, 1988, 1992, 1994, 1998, 2002, 2006, 2010, 2014];
var filterYears=[1892,1896, 1900, 1904, 1908, 1912, 1920, 1924, 1928, 1932, 1936, 1948, 1952, 1956, 1960,
    1964, 1968, 1972, 1976, 1980, 1984, 1988, 1992, 1994, 1996, 1998, 2000, 2002, 2004, 2006, 2008, 2010, 2012, 2014, 2016];
 */ 
//runs through and stores all the unique countries in the list
var theCountries=[];
for (i=0;i<flaskRace_db.length;i++){
   if (theCountries.includes(flaskRace_db[i].Name)){}
   else {theCountries.push(flaskRace_db[i].Name)};        
};

/*
//this allows me to check individual information to verify country medals
var tempCount=0
var lastCount=0;
for(i=0;i<flaskRace_db.length;i++){
  if(flaskRace_db[i].Name==='France' && flaskRace_db[i].Season==='Summer'){
    tempCount=tempCount+flaskRace_db[i].Medals_Won;
    //console.log(flaskRace_db[i]);
  }
};
  console.log(tempCount);
  console.log(lastCount);

*///!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
var winterSports=[];
var winterSportsMen=[];
var winterSportsWomen=[];
var summerSports=[];
var summerSportsMen=[];
var summerSportsWomen=[];
for (i=0;i<flaskRace_db.length;i++){
    if (winterSports.includes(flaskRace_db[i].Sport)){}
    else {
      if( flaskRace_db[i].Season=='Winter'){
        winterSports.push(flaskRace_db[i].Sport)
      }
    }
    if (summerSports.includes(flaskRace_db[i].Sport)){}
    else {
      if( flaskRace_db[i].Season=='Summer'){
        summerSports.push(flaskRace_db[i].Sport)
      }  
    };        
};

for (i=0;i<flaskRace_db.length;i++){

  //Winter Both
  if (winterSports.includes(flaskRace_db[i].Sport)){}
  else {
    if( flaskRace_db[i].Season=='Winter'){
      winterSports.push(flaskRace_db[i].Sport)
    }
  }

  //Winter Men
  if (winterSportsMen.includes(flaskRace_db[i].Sport)){}
  else {
    if(flaskRace_db[i].Season=='Winter' && flaskRace_db[i].Sex=='M'){
      winterSportsMen.push(flaskRace_db[i].Sport)
    }
  }

  //Winter Women
  if (winterSportsWomen.includes(flaskRace_db[i].Sport)){}
  else {
    if(flaskRace_db[i].Season=='Winter' && flaskRace_db[i].Sex=='F'){
      winterSportsWomen.push(flaskRace_db[i].Sport)
    }
  }

  //Summer Both
  if (summerSports.includes(flaskRace_db[i].Sport)){}
  else {
    if( flaskRace_db[i].Season=='Summer'){
      summerSports.push(flaskRace_db[i].Sport)
    }  
  };
  
  //Summer Men
  if (summerSportsMen.includes(flaskRace_db[i].Sport)){}
  else {
    if(flaskRace_db[i].Season=='Summer' && flaskRace_db[i].Sex=='M'){
      summerSportsMen.push(flaskRace_db[i].Sport)
    }
  }

  //Winter Women
  if (summerSportsWomen.includes(flaskRace_db[i].Sport)){}
  else {
    if(flaskRace_db[i].Season=='Summer' && flaskRace_db[i].Sex=='F'){
      summerSportsWomen.push(flaskRace_db[i].Sport)
    }
  }


  
};

//alphabetize dropdown lists
winterSportsWomen=winterSportsWomen.sort();
winterSportsMen=winterSportsMen.sort();
winterSports=winterSports.sort();
summerSportsWomen=summerSportsWomen.sort();
summerSportsMen=summerSportsMen.sort();
summerSports=summerSports.sort();

am4core.ready(function() {



function addDropValues(){
  var sexFilter=d3.select('input[name="Sex"]:checked');

  idField.html("");
  idField.append("option").text('all sports').attr('value','all sports');
  
  //add summer and/or winter if both sexes are selected
  if (summerBox.property('checked') && sexFilter.attr("value")==="Both"){
    summerSports.forEach(sport => {
      idField.append("option").text(sport).attr('value',sport);
    });
  }
  if (winterBox.property('checked') && sexFilter.attr("value")==="Both"){
    winterSports.forEach(sport => {
      idField.append("option").text(sport).attr('value',sport);
    });
  }

  //add summer and/or winter if both only men are selected
  if (summerBox.property('checked') && sexFilter.attr("value")==="Men"){
    summerSportsMen.forEach(sport => {
      idField.append("option").text(sport).attr('value',sport);
    });
  }
  if (winterBox.property('checked') && sexFilter.attr("value")==="Men"){
    winterSportsMen.forEach(sport => {
      idField.append("option").text(sport).attr('value',sport);
    });
  }

  //add summer and/or winter if both only women are selected
  if (summerBox.property('checked') && sexFilter.attr("value")==="Women"){
    summerSportsWomen.forEach(sport => {
      idField.append("option").text(sport).attr('value',sport);
    });
  }
  if (winterBox.property('checked') && sexFilter.attr("value")==="Women"){
    winterSportsWomen.forEach(sport => {
      idField.append("option").text(sport).attr('value',sport);
    });
  }


};

//changes sports in the dropdown field when winter or summer is checked
var idField= d3.select("#selDataset");
var summerBox= d3.select("#Summer");
var winterBox= d3.select("#Winter");
var sexFilter=d3.selectAll('#sex');

summerBox.on("change", addDropValues);
winterBox.on("change", addDropValues);
sexFilter.on("change", addDropValues);






//function to filter through the db based on user input 
function filterBars(){

  d3.select("#race").text("Start New Race");



  var allData={};//filter through db and store here
  var myYear=1892;//current year - setting with initial junk year

  //build the first starter data row
  allData[myYear]=[];

  theCountries.forEach(country =>{
   allData[myYear].push({"country": country,"MEDALS":0})
  });

  //filter variables
  var summerFilter=d3.select("#Summer");
  var winterFilter=d3.select("#Winter");
  var sexFilter=d3.select('input[name="Sex"]:checked');
  var goldFilter=d3.select("#Gold");
  var silverFilter=d3.select("#Silver");
  var bronzeFilter=d3.select("#Bronze");
  var sportFilter=d3.select("#selDataset");

  //filter status - checked or not
  var filters= {
    'summer':summerFilter.property('checked'),
    'winter':winterFilter.property('checked'),
    'sex': sexFilter.attr('value'),
    'gold': goldFilter.property('checked'),
    'silver': silverFilter.property('checked'),
    'bronze':bronzeFilter.property('checked'),
    'sport':sportFilter.property("value")
  };


  var totalrows=0;
  var addedrows=0;
  


  flaskRace_db.forEach(row=>{
    var count=false;//if row meets all the filter conditions returns true and adds row
    totalrows ++;
     // make sure the current row matches criteria
    if(row.Season==='Summer' && filters['summer']){count=true};
    if (row.Season==='Winter' && filters['winter']){count=true};
    if (filters['summer']===false & filters['winter']===false){count=true};

    if (count===true){
      if (row.Sex==="M"){
        if(filters['sex']==='Both' || filters['sex']==='Men')count=true;
        else {count=false};
      }
      else if (row.Sex==="F"){
        if(filters['sex']==='Both' || filters['sex']==='Women')count=true;
        else {count=false};
      }
    }

  


    if (count===true){
      if (row.Medal==="Gold" && filters['gold'])count=true;
      else if (row.Medal==="Silver" && filters['silver'])count=true;
      else if (row.Medal==="Bronze" && filters['bronze'])count=true;
      else if (filters['gold']===false && filters['silver']===false && filters['bronze']===false){
        count=true;
      }
      else {count=false};
    }
 
  
    if (filters['sport']=='all sports'){}
    else if (row.Sport != filters['sport']){
      count=false;}
    
   //if the current row matches criteria (count == true) then add the row
    if (count===true){

      addedrows++;
      //fills in the data by adding the data for the current year
      //even if a country has 0 medals, it has to keep the same index throughout
      if(row.Year===myYear){
        index = allData[myYear].findIndex(x => x.country ===row.Name);

        allData[myYear][index].MEDALS=allData[myYear][index].MEDALS+parseInt(row.Medals_Won);
      }
      
      //initiate next year by copying the previous year
      else{
        var previousYear=myYear;
        myYear=row.Year;
        allData[myYear]=[];
        allData[previousYear].forEach(row =>{
          allData[myYear].push({"country":row.country,"MEDALS":row.MEDALS})
        });
      };
    }

  });


  startAgain(allData);

}

//function to find corresponding city for the olympic year


function cityOlympics(year){
  var s=d3.select("#Summer").property('checked')
  var w=d3.select("#Winter").property('checked')
  if(s && w===false){
    var a;
    for (i=0;i<flaskRace_db.length;i++){
      if (flaskRace_db[i].Year===year){
        a= flaskRace_db[i].City;
      break;
      }
    }
  }
  else if (w && s===false){
    var a;
    for (i=0;i<flaskRace_db.length;i++){
      if (flaskRace_db[i].Year===year){
        a= flaskRace_db[i].City;
      break;
      }
    }
  }
  else {
    var a="";
    for (i=0;i<flaskRace_db.length;i++){
      if (flaskRace_db[i].Year===year && flaskRace_db[i].Season==='Summer'){
        a= flaskRace_db[i].City;
      break;
      }
    }

    for (i=0;i<flaskRace_db.length;i++){
      if (flaskRace_db[i].Year===year && flaskRace_db[i].Season==='Winter'){
        if  (parseInt(year)<1994){
          a=a+" & "+ flaskRace_db[i].City;
        }
        else{a=flaskRace_db[i].City};
      break;
      }
    }


  }
  return a;
}


addDropValues(); //initiate the drop value


      
//var allData=filterBars();    

var resetButton=d3.select("#race");
resetButton.on("click", function(){filterBars()})

//------------------------------------------
    




// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

//function to create award ceremony
function awardCeremony(allData){
  
  myKeys=Object.keys(allData)
  var newData = allData[[myKeys[myKeys.length-1]]];
  var tempData=newData.slice(0).sort((a, b) => (a.MEDALS > b.MEDALS) ? -1 : 1);//sorts data by number of medals

  number1=tempData[0].country;
  number2=tempData[1].country;
  number3=tempData[2].country;


  svgA=110;
  var newShape=d3.select("#simpleShapes");
  var square=newShape.append("svg").attr("width","100%").attr("height",300);
  //square.html("");

  square.append("rect").attr("id","firstS").attr("width", 170).attr("height", 120).attr("x", 225+svgA).attr("y", 320).style("stroke", "purple").style("fill","#4880C4");
  square.append("rect").attr("id","secondS").attr("width", 170).attr("height", 120).attr("x", 125+svgA).attr("y", 395).style("stroke", "purple").style("fill","#5DA557");
  square.append("rect").attr("id","thirdS").attr("width", 170).attr("height", 120).attr("x", 325+svgA).attr("y", 420).style("stroke", "purple").style("fill","#E9B040");

  box1=d3.select("#firstS").transition();
  box1.attr("transform", "translate(0,-205)").duration(2500);
  box2=d3.select("#secondS").transition();
  box2.attr("transform", "translate(0,-205)").duration(2500);
  box3=d3.select("#thirdS").transition();
  box3.attr("transform", "translate(0,-205)").duration(2500);
  



  square.append("text").attr("id","first").text(number1).attr("x", 225+svgA).attr("y", -105).attr("font-size", "28px").attr("font-weight","bold");;
  square.append("text").attr("id","second").text(number2).attr("x", 100+svgA).attr("y", -125).attr("font-size", "28px").attr("font-weight","bold");;
  square.append("text").attr("id","third").text(number3).attr("x", 405+svgA).attr("y", -100).attr("font-size", "28px").attr("font-weight","bold");;

  square.append("text").attr("id","firstA").text('1').attr("x", 290+svgA).attr("y", 395).attr("fill", "#fff").attr("font-size", "70px").attr("font-weight","bold");
  square.append("text").attr("id","secondB").text('2').attr("x", 185+svgA).attr("y", 475).attr("fill", "#fff").attr("font-size", "70px").attr("font-weight","bold");
  square.append("text").attr("id","thirdC").text('3').attr("x", 390+svgA).attr("y", 495).attr("fill", "#fff").attr("font-size", "70px").attr("font-weight","bold");

  /*
  square.append("text").attr("id","fourth1").text("4th China").attr("x", 950).attr("y", 150);
  square.append("text").attr("id","fourth2").text("5th China").attr("x", 550).attr("y", 170);
  square.append("text").attr("id","fourth3").text("6th China").attr("x", 550).attr("y", 190);
  square.append("text").attr("id","fourth4").text("7th China").attr("x", 550).attr("y", 210);
  square.append("text").attr("id","fourth5").text("8th China").attr("x", 550).attr("y", 230);
  square.append("text").attr("id","fourth6").text("9th China").attr("x", 550).attr("y", 250);
  square.append("text").attr("id","fourth7").text("10th China").attr("x", 550).attr("y", 270);*/

  text1=d3.select("#first").transition();
  text1.attr("transform", "translate(0,200)").duration(2500);

  text2=d3.select("#second").transition();
  text2.attr("transform", "translate(0,300)").duration(2500);

  text3=d3.select("#third").transition();
  text3.attr("transform", "translate(0,300)").duration(2500);

  text1A=d3.select("#firstA").transition();
  text1A.attr("transform", "translate(0,-205)").duration(2500);

  text2B=d3.select("#secondB").transition();
  text2B.attr("transform", "translate(0,-205)").duration(2500);

  text3C=d3.select("#thirdC").transition();
  text3C.attr("transform", "translate(0,-205)").duration(2500);


}


function startAgain(allData){
console.log(allData);
  //reset div and values
  reset=false;
  d3.select("#simpleShapes").html("");
  


  var filterYears=Object.keys(allData);

    //set subheader for graph
    //filter variables
    var summerFilter=d3.select("#Summer");
    var winterFilter=d3.select("#Winter");
    var sexFilter=d3.select('input[name="Sex"]:checked');
    var goldFilter=d3.select("#Gold");
    var silverFilter=d3.select("#Silver");
    var bronzeFilter=d3.select("#Bronze");
    var sportFilter=d3.select("#selDataset");
  
    //filter status - checked or not
    var filters= {
      'summer':summerFilter.property('checked'),
      'winter':winterFilter.property('checked'),
      'sex': sexFilter.attr('value'),
      'gold': goldFilter.property('checked'),
      'silver': silverFilter.property('checked'),
      'bronze':bronzeFilter.property('checked'),
      'sport':sportFilter.property("value")
    };

    if(filters['summer'] && filters['winter'] && filters['sport']==="all sports"){
      var partA="Summer and Winter Games";
    }
    else if (filters['sport']!="all sports") var partA=filters['sport'];
    else if (filters['summer'] && filters['winter']===false)var partA="Summer Games";
    else if (filters['summer']===false && filters['winter']===false){
      var partA="Summer and Winter Games";
    }
    else {var partA="Winter Games"};

    if(filters['sex']==='Men')var partB="Men's ";
    else if (filters['sex']==='Women')var partB="Women's ";
    else var partB="Men's & Women's ";

    var partC=` ${filterYears[1]}-${filterYears[filterYears.length-1]}`;

    var partD=" ("
    if (filters['gold'])var partD=partD+" gold ";
    if (filters['silver'])var partD=partD+" silver ";
    if (filters['bronze'])var partD=partD+" bronze ";
    if(filters['bronze']===false && filters['silver']===false && filters['gold']===false){
      var partD=[' (gold silver bronze'];
    };
    partD=partD+")";

    


  d3.select("#graph_sub").html(partB+partA+partC+partD);



var chart = am4core.create("chartdiv", am4charts.XYChart);
chart.padding(10, 10, 50, 10);

chart.numberFormatter.bigNumberPrefixes = [
  { "number": 1e+4, "suffix": "K" },
  { "number": 1e+6, "suffix": "M" },
  { "number": 1e+9, "suffix": "B" }
];

chart.numberFormatter.smallNumberPrefixes = [
  { "number": 1, "suffix": "" },

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
    play(allData);
  }
  else {
    stop();
  }
})
//sets speed of graph and allows to slow down or speed up
var speed=d3.select('input[name="speed"]:checked');

var stepDuration = 1500*(1/parseInt(speed.attr("value")));
var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.dataFields.category = "country";
categoryAxis.renderer.minGridDistance = 1;
categoryAxis.renderer.inversed = true;
categoryAxis.renderer.grid.template.disabled = true;

var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());//can maybe change x axis here
valueAxis.min = 0.1;
valueAxis.rangeChangeEasing = am4core.ease.linear;
valueAxis.rangeChangeDuration = stepDuration;
valueAxis.extraMax = 0.1;

var series = chart.series.push(new am4charts.ColumnSeries());
series.dataFields.categoryY = "country";
series.dataFields.valueX = "MEDALS";
series.tooltipText = "{valueX.value}"
series.columns.template.strokeOpacity = 0;
series.columns.template.column.cornerRadiusBottomRight = 5;
series.columns.template.column.cornerRadiusTopRight = 5;
series.interpolationDuration = stepDuration;
series.interpolationEasing = am4core.ease.linear;

var labelBullet = series.bullets.push(new am4charts.LabelBullet())
labelBullet.label.horizontalCenter = "right";

labelBullet.label.text = "{values.valueX.workingValue.formatNumber('#,###.as')}";
labelBullet.label.textAlign = "end";
labelBullet.label.dx = -10;

chart.zoomOutButton.disabled = true;

// as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
series.columns.template.adapter.add("fill", function(fill, target){
  return chart.colors.getIndex(target.dataItem.index);
});

var year = 1892;
var yearIndex=0;
label.text = `Go!`;
label.align="center";
label.y=200;
label.x=95;

var interval;

function play(allData) {

  if (reset===true){
    chart.dispose();
    awardCeremony(allData);
    reset=false;
    year = 1892;
    yearIndex=0;
    return
  }
  interval = setInterval(function(){
    nextYear();
  }, stepDuration)
  nextYear();
}

//@$%$#@$%@##########^^$^^$^$#^#$^$%#$@$!$$@@$#@!%%#$@%@%#%#%#%#%#%#%@!@%#@%%%@##@%!%%@#@#%@!
function stop() {
  if (interval) {
    clearInterval(interval);
    if (reset===true){
      var label2 = chart.plotContainer.createChild(am4core.Label);
      label2.x = am4core.percent(97);
      label2.y = am4core.percent(95);
      label2.horizontalCenter = "right";
      label2.verticalCenter = "middle";
      label2.dx = -15;
      label2.fontSize = 25;
      label2.text="Award Ceremony";
      playButton.isActive = false;


    }
  }
}

function nextYear() {

  //
  yearIndex++;
  year=parseInt(filterYears[yearIndex]);

  //if (filterYears.includes(year)){
    
//@$%$#@$%@##########^^$^^$^$#^#$^$%#$@$!$$@@$#@!%%#$@%@%#%#%#%#%#%#%@!@%#@%%%@##@%!%%@#@#%@!
    if (year==1916)year=1920;//dates where there are no olympics
    if (year==1940)year=1948;//dates where there are no olympics
   
    if (yearIndex>=filterYears.length-1) {//change this to adjust year for my dataset

      reset=true;
      stop();

    }
    if (yearIndex<=filterYears.length-1){
    //Julia's Code -- so here I added code to temporarily set any country not in the top ten to 0 medals for that year
    var newData = allData[year];
    var tempData=newData.slice(0).sort((a, b) => (a.MEDALS > b.MEDALS) ? 1 : -1);//sorts data by number of medals
    var topTen=[];
      for (i=0;i<tempData.length-10; i++){
          topTen.push(tempData[i]['country']);
      };
    topTen.forEach(row=>{  
      index = newData.findIndex(x => x.country ===row);
      newData[index].MEDALS=0;
    });


    //---------------------------------------------------------- 
    //var newData = allData[year];
    var itemsWithNonZero = 0;
    stepDuration=stepDuration;
    for (var i = 0; i < chart.data.length; i++) {
      chart.data[i].MEDALS = newData[i].MEDALS;
      if (chart.data[i].MEDALS > 0) {//here I can set the chart to only show those above 0
        itemsWithNonZero++;
      }
    }
  //}
    if (year == 1892) {
      yearIndex==0;//resets
      series.interpolationDuration = stepDuration / 2;
      valueAxis.rangeChangeDuration = stepDuration / 2;
    }
    else {
      series.interpolationDuration = stepDuration;
      valueAxis.rangeChangeDuration = stepDuration;
    }

    chart.invalidateRawData();
    label.text = `${cityOlympics(year)} ${year.toString()}`;
    label.align="center";
    label.y = 450;
    label.fontSize=40;
    //d3.select("#graph_name").html(`${cityOlympics(year)} ${year.toString()}`)

    categoryAxis.zoom({ start: 0, end: itemsWithNonZero / categoryAxis.dataItems.length });
  }
  }


  categoryAxis.sortBySeries = series;


  chart.data = JSON.parse(JSON.stringify(allData[year]));
  categoryAxis.zoom({ start: 0, end: 1 / chart.data.length });

  series.events.on("inited", function() {
    setTimeout(function() {
      playButton.isActive = true; // this starts interval
    }, 1500)
  })
//} 

};



}); // end am4core.ready()




