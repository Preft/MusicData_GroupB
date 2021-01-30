from flask import Flask, render_template, jsonify
from flask_pymongo import PyMongo
import json
from bson.json_util import dumps
from config import password
from functions import get_api_data, get_js_data

app = Flask(__name__,
            static_folder='static',
            template_folder='templates')
app.config['MONGO_URI'] = f"mongodb+srv://kcomalley14:{password}@spotify.hw708.mongodb.net/Spotify?retryWrites=true&w=majority"
mongo = PyMongo(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/graph1')
def graph1():
    return render_template('graph1.html')

@app.route('/graph2')
def graph2():
    return render_template('graph2.html')

@app.route('/graph3')
def graph3():
    return render_template('graph3.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/data')
def stuff():
    return render_template('data.html')

@app.route('/api_data')
def api_data():
    mylist = get_api_data()
    return mylist

@app.route('/api_instructions')
def api_inst():
    return render_template('api_inst.html')

@app.route('/grabdata')
def grabdata():
    get_js_data()
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
    
