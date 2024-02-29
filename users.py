import pandas as pd
import json
import requests

df = pd.read_csv('C:/Users/S.MOUNIKA/Downloads/qreport-users.csv')

keys = ['email', 'password', 'role', 'department', 'order']
# for i in range(len(df)):
#     temp = {}
#     for j in range(len(keys)):
#         temp[keys[j]] = df.iloc[i,j]
#     print(temp)
#     url = 'http://localhost:3000/user'
#     headers = {'content-type': 'application/json','Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFtY3NAcHNndGVjaC5hYy5pbiIsInJvbGUiOiJhZG1pbiIsImRlcGFydG1lbnQiOiJhZG1pbiIsIm9yZGVyIjotMSwiaWF0IjoxNzA5MTgwNDY0LCJleHAiOjE3MDkyNjY4NjR9.VRDy7jWId8RwzdLXec1300w9qvzN131OkGj7BNW0VUY'}
#     response = requests.post(url, data=temp, headers=headers)
url = 'http://localhost:3000/user'
headers = {'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFtY3NAcHNndGVjaC5hYy5pbiIsInJvbGUiOiJhZG1pbiIsImRlcGFydG1lbnQiOiJhZG1pbiIsIm9yZGVyIjotMSwiaWF0IjoxNzA5MTgyMjIwLCJleHAiOjE3MDkyNjg2MjB9.fF_AMCxBxgE0XR6l9JA7f6I7J51bPXl_3b9VFNLt4Xo'}
response = requests.get(url,headers=headers) 
print(response.content)   