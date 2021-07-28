from flask import Flask, render_template, redirect
from sqlalchemy import inspect

#import our functions
from bar_race import julia_bar_race
from hostsmap import hosts_map
from olydatabar import britt_bar 
from medal_data import pie_chart

#create app
app = Flask(__name__)

#passes db results into html   
@app.route("/")
def index():

    #create an object of our variables to pass to index
    our_info= {
       "julia": julia_bar_race().to_json(orient='table',index=False),
       "kristajoy" : hosts_map().to_json(orient='table',index=False),
        "britt" : britt_bar().to_json(orient='table',index=False),
        "kj": pie_chart().to_json(orient='table',index=False)
    }
   
    return render_template("index.html", the_data=our_info)


if __name__ == "__main__":
    app.run(debug=True)





