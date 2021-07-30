# Olympic Games Dashboard
Group project creating a Flask app which shows a breakdown of select Olympics data. Our main datasource contained info from 1896–2016. [Source Data](https://www.kaggle.com/rio2016/olympic-games): Rio 2016 website with data files created by: GitHub user flother.
### Bar Race 
In Python, filtered and cleaned the data down to what was needed for the animated Bar Chart. The goal was to show the country medals won over time, with the ability to filter by sex, sport, and medals. There were a few complications that came up. One being that the Olympics uses their own IOC, three digit country code which made it complicated to merge data between databases. Also had to do some research on how medals are counted for counteries such as Soviet Union/Russia or other countries that have gone through major shifts. Finally realized the chart included the 1906 Intercalated Games which at one point was considered the olympics, but is no longer considered as such (thank you Wikipedia).

Next had to do some research how to funnel this information through flask and into javascript. This was a bit tricky at first, but finally realized that the db has to be jsonized, and then parsed in js.

Using the Amchart JS Library, which contains animation functions, generated a bar chart that adds up all the medals won over time by each country. This animates starting at the earliest date the sport was held, and shows the accumaltive medals won year by year, while also showing where the Olympics was held. However dealing with 140+ countries had to figure out a way to only display the top ten countries at any one point, while still keeping track of the other countries in case they pop up in the top ten at some later date (this was done by running two parallel objects, one holding the information for all countries, and the other only the current top 10). 

Once the bar chart race ends, another plotly line graph pops up showing the GDP for the top ten winners based on the filtered data selected.

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



