from scrape_mars import *
from flask import Flask, render_template, jsonify, redirect
from flask_pymongo import PyMongo

app = Flask(__name__)


app.config["MONGO_URI"] = 'mongodb://localhost:27017/mars'

mongo = PyMongo(app)

mars = mongo.db.mars
mars_data = scrape()
mars.insert_one({}, mars_data)


print(mars_data['mars_hemis'][0]['img_url'])