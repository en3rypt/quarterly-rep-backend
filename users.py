# # Path: quarters.py

# import requests

# url = 'https://qreports.psgtech.ac.in/api/quarter'  # Replace with your actual API endpoint
# headers = {
#     'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZzay5hbWNzQHBzZ3RlY2guYWMuaW4iLCJyb2xlIjoiQWRtaW4iLCJkZXBhcnRtZW50IjoiQU1DUyIsIm9yZGVyIjo1LCJpYXQiOjE3MTA5MzY2OTMsImV4cCI6MTcxMTAyMzA5M30.uFJ9nXQNK46fk-MUhzl8SwPBAOx2d_xg4jiF9xbET4g',
#     'Content-Type': 'application/json'
# }

# records = [
#     {'quarter': 3, 'year': 2023, 'startDate': '2023-07-05T00:00:00Z', 'endDate': '2023-09-30T23:59:59Z'},
#     {'quarter': 4, 'year': 2023, 'startDate': '2023-10-05T00:00:00Z', 'endDate': '2023-12-31T23:59:59Z'}
# ]

# for record in records:
#     response = requests.post(url, json=record, headers=headers)
#     print("🚀 ~ response:", response)

#     # Print response
#     print(f"Response for {record['quarter']}/{record['year']}: {response.status_code} - {response.text}")
# # users entries



# import csv

# # Read data from CSV file
# csv_file_path = './qreport-users.csv'

# with open(csv_file_path, 'r') as file:
#     reader = csv.DictReader(file)
#     for row in reader:
#         # Construct payload
#         payload = {
#             'email': row['emailID'],
#             'password': row['passwd'],
#             'role': row['role'],
#             'department': row['representative'],
#             'order': int(row['order']),
#             # Add other fields as needed
#         }

#         # Make POST request
#         url = 'https://qreports.psgtech.ac.in/api/auth/user'
#         headers = {
#             'content-type': 'application/json',
#             'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZzay5hbWNzQHBzZ3RlY2guYWMuaW4iLCJyb2xlIjoiQWRtaW4iLCJkZXBhcnRtZW50IjoiQU1DUyIsIm9yZGVyIjo1LCJpYXQiOjE3MTA5MTc4ODMsImV4cCI6MTcxMTAwNDI4M30.5n2u_IRekSdnqG74zIJlYcdMIbzlRWPXiFMAGOyVRCM'
#         }

#         response = requests.post(url, json=payload, headers=headers)

#         # Print response
#         print(f"Response for {row['emailID']}: {response.status_code} - {response.text}")






# submission entries
import requests
from datetime import datetime
import uuid
url = 'https://qreports.psgtech.ac.in/api/submission'  # Replace with your actual API endpoint
headers = {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZzay5hbWNzQHBzZ3RlY2guYWMuaW4iLCJyb2xlIjoiQWRtaW4iLCJkZXBhcnRtZW50IjoiQU1DUyIsIm9yZGVyIjo1LCJpYXQiOjE3MTA5MzY2OTMsImV4cCI6MTcxMTAyMzA5M30.uFJ9nXQNK46fk-MUhzl8SwPBAOx2d_xg4jiF9xbET4g',
    'Content-Type': 'application/json'
}

users_data = [
    {
        "email": "amcs@psgtech.ac.in",
        "password": "Qreport",
        "department": "admin",
        "role": "admin",
        "order": -1
    },
    {
        "email": "coe@psgtech.ac.in",
        "password": "Qreport",
        "department": "Controller of Examinations",
        "role": "Representative",
        "order": 1
    },
    {
        "email": "acs@psgtech.ac.in",
        "password": "Qreport",
        "department": "Accounts",
        "role": "Representative",
        "order": 7
    },
    {
        "email": "dean.acad@psgtech.ac.in",
        "password": "Qreport",
        "department": "Academic Representative",
        "role": "Representative",
        "order": 6
    },
    {
        "email": "dean.admn@psgtech.ac.in",
        "password": "Qreport",
        "department": "Admin",
        "role": "Representative",
        "order": 8
    },
    {
        "email": "dean.pat@psgtech.ac.in",
        "password": "Qreport",
        "department": "Placement and Training",
        "role": "Representative",
        "order": 4
    },
    {
        "email": "principal@psgtech.ac.in",
        "password": "Qreport",
        "department": "Principal",
        "role": "Admin",
        "order": 0
    },
    {
        "email": "sugunapsg@gmail.com",
        "password": "Qreport",
        "department": "MoU Details",
        "role": "Representative",
        "order": 2
    }
]

quarters_data = [
    {
        "quarter": 3,
        "year": 2023,
        "startDate": "2024-10-01T00:00:00.000Z",
        "endDate": "2024-12-31T23:59:59.000Z"
    },
    {
        "quarter": 4,
        "year": 2023,
        "startDate": "2024-10-01T00:00:00.000Z",
        "endDate": "2024-12-31T23:59:59.000Z"
    },
    {
        "quarter": 1,
        "year": 2024,
        "startDate": "2024-01-01T00:00:00.000Z",
        "endDate": "2024-03-31T23:59:59.000Z"
    },
    {
        "quarter": 3,
        "year": 2024,
        "startDate": "2024-07-01T00:00:00.000Z",
        "endDate": "2024-09-30T23:59:59.000Z"
    },
    {
        "quarter": 2,
        "year": 2024,
        "startDate": "2024-04-01T00:00:00.000Z",
        "endDate": "2024-06-30T23:59:59.000Z"
    },
    {
        "quarter": 4,
        "year": 2024,
        "startDate": "2024-10-01T00:00:00.000Z",
        "endDate": "2024-12-31T23:59:59.000Z"
    },
    
]

c = 0
for quarter in quarters_data:
    for user in users_data:
        if user['role'] == 'Representative':
            submission_payload = {
                'email': user['email'],
                'quarter': quarter['quarter'],
                'year': quarter['year'],
            }

            print(submission_payload,"\n")
            response = requests.post(url, json=submission_payload, headers=headers)

            # Print response
            print(f"Response for {user['email']} - Quarter {quarter['quarter']}/{quarter['year']}: {response.status_code} - {response.text}")  
            c+=1
print(c)
    

# records = [
#     {
#         "email":"acs@psgtech.ac.in",
#         "year":"2023",
#         "quarter":"3"
#     },
#     {
#         "email":"acs@psgtech.ac.in",
#         "year":"2023",
#         "quarter":"4"
#     },
#     {
#         "email": "coe@psgtech.ac.in",
#         "year": "2023",
#         "quarter": "3"
#     },
#     {
#         "email": "coe@psgtech.ac.in",
#         "year": "2023",
#         "quarter": "4"
#     },
#     {
#         "email": "dean.acad@psgtech.ac.in",
#         "year": "2023",
#         "quarter": "3"
#     },
#     {
#         "email": "dean.acad@psgtech.ac.in",
#         "year": "2023",
#         "quarter": "4"
#     },
#     {
#         "email": "dean.admn@psgtech.ac.in",
#         "year": "2023",
#         "quarter": "3"
#     },
#     {
#         "email": "dean.admn@psgtech.ac.in",
#         "year": "2023",
#         "quarter": "4"
#     },
#     {
#         "email": "dean.pat@psgtech.ac.in",
#         "year": "2023",
#         "quarter": "3"
#     },
#     {
#         "email": "dean.pat@psgtech.ac.in",
#         "year": "2023",
#         "quarter": "4"
#     },
#     {
#         "email": "sugunapsg@gmail.com",
#         "year": "2023",
#         "quarter": "3"
#     },
#     {
#         "email": "sugunapsg@gmail.com",
#         "year": "2023",
#         "quarter": "4"
#     },
# ]

# import requests

# url = 'https://qreports.psgtech.ac.in/api/submission'  # Replace with your actual API endpoint
# headers = {
#     'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZzay5hbWNzQHBzZ3RlY2guYWMuaW4iLCJyb2xlIjoiQWRtaW4iLCJkZXBhcnRtZW50IjoiQU1DUyIsIm9yZGVyIjo1LCJpYXQiOjE3MTA5MzkyOTAsImV4cCI6MTcxMTAyNTY5MH0.oUfwUnteBblkU-s58kG1UxHQ204Wi7s_fxwppuEBDnc',
#     'Content-Type': 'application/json'
# }



# for record in records:
#     response = requests.post(url, json=record, headers=headers)
#     # Print response
#     print(f"Response for {record['email']}/{record['year']}/{record['quarter']}: {response.status_code} - {response.text}")
