import json

sourceFile = open("Tweet.json", "rU")

json_data = json.load(sourceFile)

json_data = json_data.replaceAll("/* .... */", ",");