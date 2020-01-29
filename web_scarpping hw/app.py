# import necessary libraries
from flask import Flask, render_template, jsonify, redirect
from flask_pymongo import PyMongo
from pymongo import MongoClient
import scrape_mars



# create instance of Flask app
app = Flask(__name__)

#set up pyMongo
client = MongoClient('localhost', 27017)
mars_db = client["mars_db"]
mars = mars_db["mars"]



#  create route that renders index.html template
@app.route("/")
def index():
    mars = mars_db.mars.find_one()
    return render_template("index.html", mars = mars)

#  after buttom is clicked run scrape_it to get new data, delete old document from collection then save new one to mongo DB "mars_db.mars"
@app.route("/scrape")
def scrape():
    client.mars_db.mars.remove({},True)
    mars = client.mars_db.mars
    mars_data = scrape_mars.scrape_it()
    mars.insert_one(mars_data)
    
    return redirect("http://localhost:5000/", code=302)


if __name__ == "__main__":
    app.run(debug=True)