from flask import Flask, render_template, jsonify, redirect
from flask_pymongo import PyMongo
from pymongo import MongoClient
import scrape_mars



client = MongoClient('localhost', 27017)
mars_db = client["mars_db"]
mars = mars_db["mars"]

mars = client.mars_db.mars
mars_data = scrape_mars.scrape_it()
mars.insert_one(mars_data)
