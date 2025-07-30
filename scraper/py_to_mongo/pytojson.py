# segment_to_mongo.py
import pandas as pd
import json
from pymongo import MongoClient

# Step 1: Load Excel file
df = pd.read_excel('C:\\Users\\hP\\Desktop\\rbi-mern-app\\scraper\\py_to_mongo\\jan_data.xlsx')


# Step 2: Save to JSON
json_file_path = 'segment_data.json'
df.to_json(json_file_path, orient='records', indent=4, date_format='iso')
print(f"✅ Saved JSON to {json_file_path}")

# Step 3: Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")  # Use MongoDB Atlas URI if using cloud
db = client['marketDB']
collection = db['segmentData']

# Step 4: Insert data into MongoDB
data = df.to_dict(orient='records')
collection.insert_many(data)
print("✅ Data inserted into MongoDB collection: segmentData")
