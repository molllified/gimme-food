#!/usr/bin/python
from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
from SimpleHTTPServer import SimpleHTTPRequestHandler
import random
from random import randint
import json
import pymongo
from pymongo import MongoClient

class myHandler(BaseHTTPRequestHandler):
	
	#Handler for the GET requests
	def do_GET(self):
		self.send_response(200)
		self.send_header('Content-type','text/html')
		self.end_headers()
		toSendList = []
		posts = []
		try:
			client = MongoClient()
			db = client.mydb
			posts = db.posts.find().limit(10)
		except pymongo.errors.ConnectionFailure, e:
			print "Could not connect to MongoDB: %s" % e
			  
		for doc in posts: 
			source = doc['source']
			title = doc['title']
			toSendList.append(source + " "+ title)
		print toSendList
		self.wfile.write(','.join(toSendList))
		return

def main():
	try:
		server = HTTPServer(('', 8080), myHandler)
		server.serve_forever()
	except pymongo.errors.ConnectionFailure, e:
		print "Could not connect to MongoDB: %s" % e  
	except KeyboardInterrupt:
		print '^C recieved'
		server.socket.close()
	print client

if __name__ == '__main__':
	main()