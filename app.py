from flask import Flask, render_template, redirect

#import our functions
from bar_race import julia_bar_race

#create app
app = Flask(__name__)

#passes db results into html   
@app.route("/")
def index():

    #create an object of our variables to pass to index
    our_info= {
       "julia": julia_bar_race().to_json(orient='table',index=False)
    }
   
    return render_template("index.html", the_data=our_info)


if __name__ == "__main__":
    app.run(debug=True)





