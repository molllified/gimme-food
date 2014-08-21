#!/usr/bin/python
from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
from SimpleHTTPServer import SimpleHTTPRequestHandler
import random
from random import randint

files = ["http://tastethestyle.files.wordpress.com/2013/08/lobster.jpg", "http://foodforfel.com/wp-content/gallery/sushiyasaka.5.12.12/IMG_6651.jpg",
	"http://cantabriaenboca.files.wordpress.com/2013/03/nigiri.jpg", "http://4.bp.blogspot.com/-6kDkkvq0JrA/UNyn3WZle-I/AAAAAAAABJg/m362Mg2I-m4/s1600/dumplings2.JPG",
	"http://valeryscafe.com/sites/default/files/imagecache/product_full/Banana-Pancakes.jpg", "http://www.dirtylaundrykitchen.com/wp-content/uploads/2014/03/challah-french-toast-with-berries.jpg",
	"http://static2.www.tcsworldtravel.com/sites/default/files/styles/grid_hero_desktop_1x/public/imce/Blog-Editorial_Only/ximg_5947ed.jpg,qitok=-nOmPgY1.pagespeed.ic.lc-A8JotSZ.jpg",
	"http://blog.centralrestaurant.com/wp-content/uploads/WW-SantaCruzGarlicFries-Up.jpg", "http://outoftheordinaryfood.files.wordpress.com/2012/04/pizza-dumplings1.jpg",
	"http://cynthesizingfood.files.wordpress.com/2012/08/dsc_0116.jpg", "http://makingsundaysauce.files.wordpress.com/2011/10/mg_0959.jpg",
	"http://24.media.tumblr.com/62a90d23a554d12e39bdd91b374d9cfb/tumblr_mxv2lsnOKK1rcvl68o2_1280.jpg",
	"http://1.bp.blogspot.com/-rvNqkZBZ6D8/UhvHX4o09xI/AAAAAAAAJhU/2ELNVDQ-98g/s1600/P8263537.JPG", "http://4.bp.blogspot.com/-97dGsPlCi5M/TWMmcFVxShI/AAAAAAAAAJc/8UZuIdAfjuQ/s1600/chocolate_purple_macaron.jpg",
	"http://seonkyounglongest.com/wp-content/uploads/2013/05/IMG_1199.jpg", "http://thevegetarianginger.files.wordpress.com/2012/11/dsc0566.jpg"]
	
class myHandler(BaseHTTPRequestHandler):
	
	#Handler for the GET requests
	def do_GET(self):
		self.send_response(200)
		self.send_header('Content-type','text/html')
		self.end_headers()
		if len(files) > 0:
			index = random.randint(0,len(files)-1)
			toSend = files[index]
			del files[index]
			print toSend
			self.wfile.write(toSend)
		else:
			self.wfile.write('None')
		return


def main():
	try:
		server = HTTPServer(('', 8080), myHandler)
		server.serve_forever()
	except KeyboardInterrupt:
		print '^C recieved'
		server.socket.close()

if __name__ == '__main__':
	main()