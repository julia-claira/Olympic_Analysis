# Olympics Dashboard

## Description 

This dashboard encourages users to dynamically explore top medal-winning countries for an individual sport or overall Olympic, while comparing the respective GDPs and populations.



## Table of Contents
* [Run](#Results)
* [Tools](#Tools)
* [Graphs](#Graphs)
* [Data](#Data)
* [Contributors](#Contributors)




## Run

The below link takes you to the app, running on Heroku:

[Olympic Dashboard app](https://olympic-dashboard.herokuapp.com/)



## Tools

JavaScript, Plotly.js, D3, Bootstrap, HTML5, CSS, Flask, Python, SQLite


## Graphs

![Sample Graph](resources/olympic_bar_race.png)

Using the Amchart JS Library as a foundation (which had to be heavily modified to work with the data set) shows accumalitive medals won over time. To reflect the competative nature of the Olympics, and to encourage user exploration, I created a race bar chart that shows the top ten countries at any one point. As a new country enters the top ten, it knocks another one out.

Once the bar chart race ends, a line graph pops up showing the GDP for the top ten winners.

![Sample Graph](resources/gdp_graph1.png)

The user can further explore by year and see breakdowns by medal-type, gender, population, and host city.

![Sample Graph](resources/pies.png)



## Data

We pulled our main Olympic data source from Kaggle. [Source Data](https://www.kaggle.com/rio2016/olympic-games)

This required extensive data cleaning. The Olympics use their own IOC, three digit country code which required modifying to allow for merging with our GDP data set. 

We had to research how medals are counted for counteries such as Soviet Union/Russia, East and West Germany,  and other countries that have gone through major shifts. (Russia claims the medals won as the Soviet Union, but the Olympic committee counts them as different. For our purposes we decided to merge the medal count.)

The chart included the 1906 Intercalated Games which at one point was considered the olympics, but is no longer considered as such (Wikipedia), so we eliminated it from the data set.


## Contributors
The contributors to this project are:
* [@bvmann](https://github.com/bvmann)
* [@KDrummerGirlLB](https://github.com/DrummerGirlLB)
* [@Claira](https://github.com/julia-claira)
* [@KristaJoy](https://github.com/KristaJoy)




