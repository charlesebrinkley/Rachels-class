from scrape_mars import *
from flask import Flask, render_template, jsonify, redirect
from flask_pymongo import PyMongo


mars_data = scrape()

app.config["MONGO_URI"] = 'mongodb://localhost:27017/mars'

mongo = PyMongo(app)

mars = mongo.db.mars
mars_data = scrape_mars.scrape()
mars.update({}, mars_data, upsert=True)


print(mars_data['mars_hemis'][0]['img_url'])