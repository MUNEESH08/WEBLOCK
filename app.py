import pymongo
import os
from flask import Flask, request, jsonify, render_template

app = Flask(__name__)
mongo_uri = os.getenv('MONGO_URI')
client = pymongo.MongoClient(mongo_uri)
db = client['locationsDB']
locations_collection = db['locations']

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/location', methods=['POST'])
def receive_location():
    data = request.get_json()
    latitude = data.get('latitude')
    longitude = data.get('longitude')
    roll_no = data.get('roll_no')

    if latitude is not None and longitude is not None and roll_no is not None:
        locations_collection.insert_one({'latitude': latitude, 'longitude': longitude, 'roll_no': roll_no})
        return jsonify({"message": "Location and Roll number saved successfully"}), 200
    else:
        return jsonify({"message": "Invalid data"}), 400

if __name__ == '__main__':
    app.run(debug=True)