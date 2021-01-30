from flask import Flask, render_template, jsonify
from flask_pymongo import PyMongo
import json
from bson.json_util import dumps
from config import password
from json import dumps
import random

app = Flask(__name__,
            static_folder='static',
            template_folder='templates')
app.config['MONGO_URI'] = f"mongodb+srv://besergent:{password}@spotify.hw708.mongodb.net/Spotify?retryWrites=true&w=majority"
mongo = PyMongo(app)

def get_api_data():
    apidata = mongo.db.randomized_data.find().limit(300)
    ApiTempList = []
    for item in apidata:
        item['_id'] = str(item['_id'])
        ApiTempList.append(item)
    return json.dumps(ApiTempList)

def get_js_data():
    jsdata = mongo.db.randomized_data.find().limit(300)
    JsTempList = []
    with open('static/json/jsonData.json', 'w') as outputfile:
        outputfile.truncate(0)
        for item in jsdata:
            item['_id'] = str(item['_id'])
            JsTempList.append(item)
        json.dump(JsTempList, outputfile)
