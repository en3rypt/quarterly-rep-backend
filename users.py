# # Path: quarters.py

import requests

url = 'http://localhost:3000/quarter'  # Replace with your actual API endpoint
headers = {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZzay5hbWNzQHBzZ3RlY2guYWMuaW4iLCJyb2xlIjoiQWRtaW4iLCJkZXBhcnRtZW50IjoiQU1DUyIsIm9yZGVyIjo1LCJpYXQiOjE3MDkyMjQ3OTcsImV4cCI6MTcwOTMxMTE5N30.17lYXcmJ-I3Mu47HtQFSMSKsWPTSFgez72go2evL9QY',
    'Content-Type': 'application/json'
}

records = [
    {'quarter': 1, 'year': 2024, 'startDate': '2024-01-01T00:00:00Z', 'endDate': '2024-03-31T23:59:59Z'},
    {'quarter': 2, 'year': 2024, 'startDate': '2024-04-01T00:00:00Z', 'endDate': '2024-06-30T23:59:59Z'},
    {'quarter': 3, 'year': 2024, 'startDate': '2024-07-01T00:00:00Z', 'endDate': '2024-09-30T23:59:59Z'},
    {'quarter': 4, 'year': 2024, 'startDate': '2024-10-01T00:00:00Z', 'endDate': '2024-12-31T23:59:59Z'}
]

for record in records:
    response = requests.post(url, json=record, headers=headers)
    print("🚀 ~ response:", response)

    # Print response
    print(f"Response for {record['quarter']}/{record['year']}: {response.status_code} - {response.text}")
# # users entries



import csv

# Read data from CSV file
csv_file_path = './qreport-users.csv'

with open(csv_file_path, 'r') as file:
    reader = csv.DictReader(file)
    for row in reader:
        # Construct payload
        payload = {
            'email': row['emailID'],
            'password': row['passwd'],
            'role': row['role'],
            'department': row['representative'],
            'order': int(row['order']),
            # Add other fields as needed
        }

        # Make POST request
        url = 'http://localhost:3000/user'
        headers = {
            'content-type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFtY3NAcHNndGVjaC5hYy5pbiIsInJvbGUiOiJhZG1pbiIsImRlcGFydG1lbnQiOiJhZG1pbiIsIm9yZGVyIjotMSwiaWF0IjoxNzA5MjEzNTU4LCJleHAiOjE3MDkyOTk5NTh9._7o2UFlx-wuvsFnDhDMfOBgundcI8RreYnznGgvOmKE'
        }

        response = requests.post(url, json=payload, headers=headers)

        # Print response
        print(f"Response for {row['emailID']}: {response.status_code} - {response.text}")






# submission entries
# import requests
# from datetime import datetime
# import uuid
# url = 'http://localhost:3000/submission'  # Replace with your actual API endpoint
# headers = {
#     'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZzay5hbWNzQHBzZ3RlY2guYWMuaW4iLCJyb2xlIjoiQWRtaW4iLCJkZXBhcnRtZW50IjoiQU1DUyIsIm9yZGVyIjo1LCJpYXQiOjE3MDkyMjQ3OTcsImV4cCI6MTcwOTMxMTE5N30.17lYXcmJ-I3Mu47HtQFSMSKsWPTSFgez72go2evL9QY',
#     'Content-Type': 'application/json'
# }

# users_data = [
#     {
#         "email": "amcs@psgtech.ac.in",
#         "password": "Qreport",
#         "department": "admin",
#         "role": "admin",
#         "order": -1
#     },
#     {
#         "email": "coe@psgtech.ac.in",
#         "password": "Qreport",
#         "department": "Controller of Examinations",
#         "role": "Representative",
#         "order": 1
#     },
#     {
#         "email": "acs@psgtech.ac.in",
#         "password": "Qreport",
#         "department": "Accounts",
#         "role": "Representative",
#         "order": 7
#     },
#     {
#         "email": "dean.acad@psgtech.ac.in",
#         "password": "Qreport",
#         "department": "Academic Representative",
#         "role": "Representative",
#         "order": 6
#     },
#     {
#         "email": "dean.admn@psgtech.ac.in",
#         "password": "Qreport",
#         "department": "Admin",
#         "role": "Representative",
#         "order": 8
#     },
#     {
#         "email": "dean.pat@psgtech.ac.in",
#         "password": "Qreport",
#         "department": "Placement and Training",
#         "role": "Representative",
#         "order": 4
#     },
#     {
#         "email": "principal@psgtech.ac.in",
#         "password": "Qreport",
#         "department": "Principal",
#         "role": "Admin",
#         "order": 0
#     },
#     {
#         "email": "sugunapsg@gmail.com",
#         "password": "Qreport",
#         "department": "MoU Details",
#         "role": "Representative",
#         "order": 2
#     }
# ]

# quarters_data = [
#     {
#         "quarter": 1,
#         "year": 2024,
#         "startDate": "2024-01-01T00:00:00.000Z",
#         "endDate": "2024-03-31T23:59:59.000Z"
#     },
#     {
#         "quarter": 3,
#         "year": 2024,
#         "startDate": "2024-07-01T00:00:00.000Z",
#         "endDate": "2024-09-30T23:59:59.000Z"
#     },
#     {
#         "quarter": 2,
#         "year": 2024,
#         "startDate": "2024-04-01T00:00:00.000Z",
#         "endDate": "2024-06-30T23:59:59.000Z"
#     },
#     {
#         "quarter": 4,
#         "year": 2024,
#         "startDate": "2024-10-01T00:00:00.000Z",
#         "endDate": "2024-12-31T23:59:59.000Z"
#     }
# ]

# c = 0
# for quarter in quarters_data:
#     for user in users_data:
#         if user['role'] == 'Representative':
#             submission_payload = {
#                 'email': user['email'],
#                 'quarter': quarter['quarter'],
#                 'year': quarter['year'],
#             }

#             print(submission_payload,"\n")
#             response = requests.post(url, json=submission_payload, headers=headers)

#             # Print response
#             print(f"Response for {user['email']} - Quarter {quarter['quarter']}/{quarter['year']}: {response.status_code} - {response.text}")  
#             c+=1
# print(c)