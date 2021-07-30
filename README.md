# Olympic Games Dashboard
Group project creating a Flask app which shows a breakdown of select Olympics data. Our main datasource contained info from 1896–2016. [Source Data](https://www.kaggle.com/rio2016/olympic-games): Rio 2016 website with data files created by: GitHub user flother.
### Bar Race 
tk
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
tk
