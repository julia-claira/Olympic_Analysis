# Olympics Dashboard

## Description 

This dashboard encourages users to dynamically explore top medal-winning countries for an individual sport or overall, while comparing the respective GDP and populations.



## Table of Contents
* [Run](#Results)
* [Tools](#Tools)
* [Data](#Data)
* [Graphs](#Graphs)
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

<img align="right" src="https://github.com/julia-claira/Olympic_Analysis/blob/main/resources/olympic_bar_race.png" style="width: 50%; height: 50%">


Using the Amchart JS Library as a foundation (which had to be heavily modified to work with the data set) shows accumalitive medals won over time. To reflect the competative nature of the Olympics, and to encourage user exploration, I created a race bar chart that shows the top ten countries at any one point. As a new country enters the top ten, it knocks another one out.

Once the bar chart race ends, a line graph pops up showing the GDP for the top ten winners.

(There is also an optional award cermony created with SVG animation. We wanted to keep this dashboard light and fun.)

Finally, created a fun (which is subjective of course) little award ceremony for the top three country of the current race. This was created with svg transitions.
### Scatter Chart
Using Jupyter Notebook and Pandas to combine and clean 2 CSV files containing medals won, poulation, and GDP per capita. Created scatter plot with switchable Y axis to see correlations between the number of medals won vs a countries population count or their gdp per capita.
### Stacked Bar Graph
Using our SQLite database I used Jupyter Notebook and Pandas to then produce a function that returns a dataframe that holds the data that I want to show. Parsing that dataframe as JSON data I then create arrays for each year the user selects from a dropdown. Then a stacked bargraph is plotted using plotly showing how many medals were won by each country in the summer or winter Olympics for that year. 
### Pie Charts
<img align="left" src="https://github.com/julia-claira/project3_group_springy_olympics/blob/main/resources/pies.png" width="300">
Wanted to look at each country's medal counts and by which gender. Created two pie charts that populate by choosing a country from the dropdown menu. Used d3 to create the dropdown menu, and also create a change event on the menu and used the country's name as a value to feed the functions I created in javascript. First two functions that add the gold, silver, and bronze amounts and another to add by gender to create two dicitonaries that are then fed into the functions that then draw the svg pie charts.

### Host City Map
Set out to create a map of all the Olympic host cities. Started out by opening a Jupyter Notebook and scraping a [Wikipedia page](https://en.wikipedia.org/wiki/List_of_Olympic_Games_host_cities) that listed the information I wanted. Cleaned up the data using Pandas dataframes. Then I connected to a Google API to grab the Lat and Lng of all the host cities and wrote those directly into my dataframe. I then connected to my Sqlite db and wrote my data to it. 

<img align="right" src="https://github.com/julia-claira/project3_group_springy_olympics/blob/main/resources/map.png" width="210">
Next, I imported the Sqlite as JSON into my javascript file (using a flask app and a python file function) where I utized Leaflet to build my map. I went into Mapbox Studio and modified a custom map style to match the colors of the Olympic rings and make that my base map. I did a loop of the data to create two marker layers—one for summer games and one for winter games—and used the custom markers I designed for each using Adobe Illustrator and Photoshop. I also bound popups in the loop writing html for the logo to display, as well as the data for the host city the opening and closing ceremonies. Lastly, utilized CSS and a Bootstrap container to style and hold my map. 

### Analysis

This dashboard can be used dynamically to research multiple different years of Olympic data along with GDP and population data. Here are a few findings we came up with. 

South Korea leads in earning gold medals over the lifetime of the sport being in the Olympics (1992-2016), however China holds the largest share of medals (bronze, silver, and gold), over taking South Korea in 2004 at the Athens games. 

The share of Olympic medals goes towards the United States, Germany, and Russia.

Just by viewing medals won by GDP per Capita, it seems there are more factors that go into whether a country holds a larger number of medals, once a country passes a certain threshold in GDP per Capita (around 10,000).  

The United States is an outlier in this case, and if a correlation test were performed the USA could possibly be left out of the equation. The USA however does have the world’s highest GDP with the highest share of medals. 

Nearly all summer Olympics have been held in the Northern hemisphere, except for the Sydney games in Australia. All winter Olympics have been held in the Northern Hemisphere. The most northern summer Olympics were held in Helsinki, Finland in 1952.



