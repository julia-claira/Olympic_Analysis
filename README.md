# Olympic Games Dashboard
Group project creating a Flask app which shows a breakdown of select Olympics data. Our main datasource contained info from 1896–2016.
### Bar Race 
tk
### Pie Chart
tk
### Bubble Chart
tk
### Host City Map
Set out to create a map of all the Olympic host cities. Started out by opening a Jupyter Notebook and scraping a Wikipedia page that listed the information I wanted. Cleaned up the data using Pandas dataframes. Then I connected to a Google API to grab the Lat and Lng of all the host cities and wrote those directly into my dataframe. I then connected to my sqlite db and pushed that data to it. 

Next I imported that data into my javascript file where I utized leaflet to build my map. I went into Mapbox Studio and modified a custom map to match the colors of the Olympic rings and brought that in. I did a loop of the data to create two marker layers—one for summer and one for winter—and used the custom markers I designed using Adobe Illustrator and Photoshop. 

Lastly, connected my javascript file to our Flask app, utilizing CSS and a Bootstrap container to hold my map. 
