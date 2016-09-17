from flask import Flask, url_for

from urllib.request import Request, urlopen
import json

from firebase import firebase

from time import localtime, clock
from copy import deepcopy

NUM_WORLDS=6

app = Flask(__name__)
firebase = firebase.FirebaseApplication('https://maple-6845a.firebaseio.com/', None)

# for i in range(NUM_WORLDS):
# 	firebase.put('/worldID',str(i)+'transactions', [-1])

@app.route('/')
def index():
	#firebase.delete('/time',None) #kill the database
	return 'Hello, World'

@app.route('/data')
def data():
	temp=clock()
	updateAll()
	return(str(clock()-temp)+' seconds')

def updateAll():
	for i in range(NUM_WORLDS):
		updateData(i)
	return True

def updateData(worldID):
	maplelist = pull_data(worldID)
	current=firebase.get('/worldID',str(worldID))
	result=transactions(current,maplelist,worldID)
	if len(result)!=0:
		put_data(maplelist,worldID)

def indexSameShop(shopname, thelist):
	for x in range(len(thelist)):
		if thelist[x]['shopName'] == shopname:
			return x
	return -1

def indexSameRoomChannel(roomname, channel, thelist):
	for y in range(len(thelist)):
		if thelist[y]['room'] == roomname and thelist[y]['channel']==channel:
			return y
	return -1

def indexSameRoom(roomname, thelist):
	for y in range(len(thelist)):
		if thelist[y]['room'] == roomname:
			return y
	return -1

def transactions(old, new, worldID):
	assert len(old)==len(new)
	print("entering transactions")
	result=[]#firebase.get('/worldID',str(worldID)+'transactions')
	#THE LOOP TO END ALL LOOPS
	for i in range(len(old)):

		#y=indexSameRoom(old[i]['room'], new)
		y=indexSameRoomChannel(old[i]['room'],old[i]['channel'],new)
		if(y==-1):
			continue
		
		#assert old[i]['channel']==new[i]['channel'], "not same channel"
		#assert old[i]['room']==new[i]['room'], "not same room"

		#NEW SHOPS
		#CLOSED SHOPS
		#CHANGED NAME SHOPS

		if 'shops' in old[i].keys():
			for j in range(len(old[i]['shops'])):
				
				#IF NAME OF SHOP WAS CHANGED
				x = indexSameShop(old[i]['shops'][j]['shopName'], new[y]['shops'])
				if(x==-1):
					continue
				
				if 'items' in old[i]['shops'][j].keys():
					for item in	old[i]['shops'][j]['items']:

						if 'items' in new[y]['shops'][x].keys():
							for thing in new[y]['shops'][x]['items']:

								if item['name']==thing['name'] and item['numberOfEnhancements']==thing['numberOfEnhancements'] and item['quantity']>thing['quantity']:
									result.append(deepcopy(item))
									result[-1]['quantity']=item['quantity']-thing['quantity']
									result[-1]['time']=localtime()
									
	#create database ID
	print("createing database ID")
	time=localtime()
	formid=str(time[0])
	for n in range(1,3):
		formid=formid+'-'+str(time[n])
	formid=formid+':'
	for n in range(3,len(time)-3):
		formid=formid+':'+str(time[n])

	print("putting transaction data")
	firebase.put('/worldID/'+str(worldID)+'transactions',formid, result)


	return result

def put_data(maplelist, worldID):
	return firebase.put('/worldID',str(worldID), maplelist)

def pull_data(worldID):
	#pull request
	path='http://maplestory.io/api/fm/world/'+str(worldID)+'/rooms'
	req = Request(path, headers={'User-Agent': 'Mozilla/5.0'})
	response = urlopen(req)

	#parsing
	string = response.read().decode('utf-8')
	maplelist = json.loads(string)
	#print(maplelist[1]['shops'][0]['items'][0]) # prints the string with 'source_name' key

	return maplelist