from fastapi import FastAPI, Response
import datetime
import pymongo
import json
from bson import json_util
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def read_root():
    myclient = pymongo.MongoClient("mongodb://blue:green@15.207.52.171:27017")
    mydb = myclient["models"]
    mycol = mydb["model1"]
    myquery = { "Org_name" : "ABC ltd", "Device_id": "1", }
    #myquery = { "time":{"$lte" :"2020-08-12 16:44:13.342901", "$gt": "2020-08-12 16:40:51.906372"} , "Org_name" : "ABC ltd", "Device_id": "1", }
    agg = [ { '$match': myquery }, {'$group': {'_id': "$Container_id", 'all': { '$avg': { '$cond': [{ '$eq': ['$Intactness', "True"] }, 1, 0] } } } },{'$sort' : {'_id':pymongo.ASCENDING}}]
    try:
        x = mycol.aggregate(agg)
        json_docs = [json.dumps(doc, default=json_util.default) for doc in x]
    finally:
        myclient.close()
    #print(json_docs)
    #cursor = mycol.find(myquery,{"_id":0})
    #print(cursor.count())
    #json_docs = [json.dumps(doc, default=json_util.default) for doc in cursor]
    return_json="["
    for js in json_docs:
        return_json = return_json + js + ","
    if(len(json_docs)!=0):
        return_json= return_json[:len(return_json)-1]
    return_json = return_json + "]"
    return Response(content=return_json,media_type="application/json")

@app.get("/health/")
def get_health():
    myclient = pymongo.MongoClient("mongodb://blue:green@15.207.52.171:27017")
    mydb = myclient["models"]
    mycol = mydb["model2"]
    myquery = { "Org_name" : "ABC ltd", "Device_id": "1", }
    agg = [ { '$match': myquery },
    {'$group': {'_id': "$Container_id", 'ratio': { '$avg': '$ratio' }, 'ContainerConfidence': {'$avg':'$Confidence.container'}, 'ContainerCrack': {'$avg':'$Confidence.crack'}
    , 'ContainerRust': {'$avg':'$Confidence.rust'}, 'ContainerDent': {'$avg':'$Confidence.dent'} } },
    {'$sort' : {'_id':pymongo.ASCENDING}}]
    try:
        x = mycol.aggregate(agg)
        json_docs = [json.dumps(doc, default=json_util.default) for doc in x]
    finally:
        myclient.close()
    return_json="["
    for js in json_docs:
        return_json = return_json + js + ","
    if(len(json_docs)!=0):
        return_json= return_json[:len(return_json)-1]
    return_json = return_json + "]"
    return Response(content=return_json,media_type="application/json")
@app.get("/container_number/")
def get_health():
    myclient = pymongo.MongoClient("mongodb://blue:green@15.207.52.171:27017")
    mydb = myclient["models"]
    mycol = mydb["model3"]
    myquery = { "Org_name" : "ABC ltd", "Device_id": "1", }
    agg = [ { '$match': myquery },
    {'$group': {'_id': "$Container_id", 'timestamp': { '$max': '$time' }, 'number' : {'$max':'$number'} } },
    {'$sort' : {'_id':pymongo.ASCENDING}}]
    try:
        x = mycol.aggregate(agg)
        json_docs = [json.dumps(doc, default=json_util.default) for doc in x]
    finally:
        myclient.close()
    return_json="["
    for js in json_docs:
        return_json = return_json + js + ","
    if(len(json_docs)!=0):
        return_json= return_json[:len(return_json)-1]
    return_json = return_json + "]"
    return Response(content=return_json,media_type="application/json")

@app.get("/number_plate/")
def get_health():
    myclient = pymongo.MongoClient("mongodb://blue:green@15.207.52.171:27017")
    mydb = myclient["models"]
    mycol = mydb["model4"]
    myquery = { "Org_name" : "ABC ltd", "Device_id": "1", }
    agg = [ { '$match': myquery },
    {'$group': {'_id': "$Container_id", 'timestamp': { '$max': '$time' }, 'number' : {'$max':'$number'} } },
    {'$sort' : {'_id':pymongo.ASCENDING}}]
    try:
        x = mycol.aggregate(agg)
        json_docs = [json.dumps(doc, default=json_util.default) for doc in x]
    finally:
        myclient.close()
    return_json="["
    for js in json_docs:
        return_json = return_json + js + ","
    if(len(json_docs)!=0):
        return_json= return_json[:len(return_json)-1]
    return_json = return_json + "]"
    return Response(content=return_json,media_type="application/json")

@app.get("/hazardous_sign/")
def get_health():
    myclient = pymongo.MongoClient("mongodb://blue:green@15.207.52.171:27017")
    mydb = myclient["models"]
    mycol = mydb["model5"]
    myquery = { "Org_name" : "ABC ltd", "Device_id": "1", }
    agg = [ { '$match': myquery },
    {'$group': {'_id': "$Container_id", 'all': { '$avg': { '$cond': ['$detected', 1, 0] } } } },
    {'$sort' : {'_id':pymongo.ASCENDING}}]
    try:
        x = mycol.aggregate(agg)
        json_docs = [json.dumps(doc, default=json_util.default) for doc in x]
    finally:
        myclient.close()
    return_json="["
    for js in json_docs:
        return_json = return_json + js + ","
    if(len(json_docs)!=0):
        return_json= return_json[:len(return_json)-1]
    return_json = return_json + "]"
    return Response(content=return_json,media_type="application/json")

