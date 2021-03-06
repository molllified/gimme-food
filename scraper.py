#!/usr/bin/python -tt
# -*- coding: utf-8 -*-

import flickrapi
import re
import json
import codecs
import sys
import pymongo
from pymongo import MongoClient
import random

UTF8Writer = codecs.getwriter('utf8')
sys.stdout = UTF8Writer(sys.stdout)

api_key = '6b30d24a901279dcbabac8e4a438d155'
api_secret = '49dd1aeef48fcece'

# api_key = '47dbc3b01589b715b9c204211bcda208'
# api_secret = '4df9fe589fb912d4'

flickr = flickrapi.FlickrAPI(api_key, api_secret)
photos = flickr.photos_search(text='san francisco food', per_page='500', sort='relevance', has_geo='true', format='json', media='photos', 
	extras='geo, url_o, o_dims')
response_parser = re.compile(r'jsonFlickrApi\((.*?)\)$')
parsed_photos = response_parser.findall(photos)
photos = json.loads(parsed_photos[0])
photos_list = photos['photos']['photo']

try: 
	client = MongoClient()
	db = client.mydb
	posts = db.posts
	db.drop_collection('posts')

	for photo in photos_list:
		if 'height_o' not in photo or int(photo['height_o']) < 1000 or float(photo['height_o'])/float(photo['width_o']) >1.25:
			continue
		if 'url_o' in photo:
			source = photo['url_o']
		else:
			source = "https://farm{0}.staticflickr.com/{1}/{2}_{3}.jpg".format(photo['farm'], photo['server'], photo['id'], photo['secret'])
		toAdd = {}
		toAdd['random'] = random.random()
		toAdd['photo_id'] = photo['id']
		toAdd['title'] = photo['title']
		toAdd['source'] = source
		toAdd['longitude'] = str(photo['longitude'])
		toAdd['latitude'] = str(photo['latitude'])
		posts.insert(toAdd)
	posts.ensure_index("random");
except pymongo.errors.ConnectionFailure, e:
	print "Could not connect to MongoDB: %s" % e  