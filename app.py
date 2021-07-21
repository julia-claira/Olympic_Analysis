from flask import Flask, redner_template, redirect

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html",myData=my_data_base)



if __name__ -- "__main__":
    app.run(debug=True)