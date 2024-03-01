import pandas as pd
import json

# Read the CSV file
df = pd.read_csv('./qreport-users.csv')

# Your authorization token
token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFtY3NAcHNndGVjaC5hYy5pbiIsInJvbGUiOiJhZG1pbiIsImRlcGFydG1lbnQiOiJhZG1pbiIsIm9yZGVyIjotMSwiaWF0IjoxNzA5MjEzNTU4LCJleHAiOjE3MDkyOTk5NTh9._7o2UFlx-wuvsFnDhDMfOBgundcI8RreYnznGgvOmKE'

# Relevant columns for payload generation
keys = ['emailID', 'passwd', 'role', 'representative', 'order'] 

def generate_payload(row):
    """Generates a payload dictionary from a DataFrame row."""
    payload = {}
    for key in keys:
        payload[key] = row[key]
    return payload

# Generate payloads and make POST requests with requests library
import requests 
url = 'http://localhost:3000/user'
headers = {
    'Content-Type': 'application/json',
    'Authorization': f'Bearer {token}'
}

for index, row in df.iterrows():
    payload = generate_payload(row)
    console.log(payload)
    json_data = json.dumps(payload)

    response = requests.post(url, data=json_data, headers=headers)
    print(response)
