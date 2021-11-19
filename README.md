# Olympics Dashboard

## Description 

This dashboard encourages users to dynamically explore top medal-winning countries for an individual sport or overall, while comparing the respective GDP and populations.



## Table of Contents
* [Run](#Results)
* [Tools](#Tools)
* [Graphs](#Graphs)
* [Data](#Data)
* [Contributions](#Contributions)
* [Contact](#Contact)



## Run

The below link takes you to the app, running on Heroku:

[Olympic Dashboard app](https://olympic-dashboard.herokuapp.com/)



## Tools

JavaScript, Plotly.js, D3, Bootstrap, HTML5, CSS, Flask, Python, SQLite



## Data

We pulled our main Olympic data source from Kaggle. [Source Data](https://www.kaggle.com/rio2016/olympic-games)

This required extensive data cleaning. The Olympics use their own IOC, three digit country code which required modifying to allow for merging with our GDP data set. 

We had to research how medals are counted for counteries such as Soviet Union/Russia, East and West Germany,  and other countries that have gone through major shifts. (Russia claims the medals won as the Soviet Union, but the Olympic committee counts them as different. For our purposes we decided to merge the medal count.)

The chart included the 1906 Intercalated Games which at one point was considered the olympics, but is no longer considered as such (Wikipedia), so we eliminated it from the data set.



## Graphs

### Bar Chart Race 
<img align="right" src="https://github.com/julia-claira/Olympic_Analysis/blob/main/resources/olympic_bar_race.png" style="width: 65%; height: 65%">
Using the Amchart JS Library as a foundation (which had to be heavily modified to work with the data set) shows accumalitive medals won over time. To reflect the competative nature of the Olympics, and to encourage user exploration, I created a race bar chart that shows the top ten countries at any one point. As a new country enters the top ten, it knocks another one out.

Once the bar chart race ends, a line graph pops up showing the GDP for the top ten winners.

### Scatter Chart
Scatter plot further explores correlations between the number of medals won vs a country's population count and GDP.
### Stacked Bar Graph
Allows the user to explore medals won for a particular Olympic year.
### Pie Charts
<img align="left" src="https://github.com/julia-claira/project3_group_springy_olympics/blob/main/resources/pies.png" width="300">
Breaks down medals won for a country by gender.
### Host City Map
Plots the host cities.
<img align="right" src="https://github.com/julia-claira/project3_group_springy_olympics/blob/main/resources/map.png" width="210">


### Contacts




