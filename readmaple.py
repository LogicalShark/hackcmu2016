from urllib.request import Request, urlopen
from firebase import firebase
import json


req = Request('http://maplestory.io/api/fm/world/0/rooms', headers={'User-Agent': 'Mozilla/5.0'})
response = urlopen(req)

#parsing?
string = response.read().decode('utf-8')

json_obj = json.loads(string)
print(json_obj[1]['shops'][0]['items'][0]['isIdentified']) # prints the string with 'source_name' key
print(type(json_obj))