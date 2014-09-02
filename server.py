#!/usr/bin/python
from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
from SimpleHTTPServer import SimpleHTTPRequestHandler
import random
from random import randint
import json

data = []
	
class myHandler(BaseHTTPRequestHandler):
	
	#Handler for the GET requests
	def do_GET(self):
		self.send_response(200)
		self.send_header('Content-type','text/html')
		self.end_headers()
		if len(data) > 0:
			index = random.randint(0,len(data)-1)
			toSend = data[index]['source']
			# del files[index]
			print toSend
			self.wfile.write(toSend)
		else:
			self.wfile.write('None')
		return

def load_data():
	json_data=open('temp.txt')
	global data
	data = json.load(json_data)
	json_data.close()

def main():
	try:
		server = HTTPServer(('', 8080), myHandler)
		load_data()
		server.serve_forever()
	except KeyboardInterrupt:
		print '^C recieved'
		server.socket.close()

if __name__ == '__main__':
	main()