#!/usr/bin/python -tt
# -*- coding: utf-8 -*-

import flickrapi
import re
import json
import codecs
import sys

UTF8Writer = codecs.getwriter('utf8')
sys.stdout = UTF8Writer(sys.stdout)

# api_key = '6b30d24a901279dcbabac8e4a438d155'
api_secret = '49dd1aeef48fcece'

api_key = '47dbc3b01589b715b9c204211bcda208'
api_secret = '4df9fe589fb912d4'

flickr = flickrapi.FlickrAPI(api_key, api_secret)
photos = flickr.photos_search(text='San Francisco Food', in_gallery='true', per_page='50', format="json")
response_parser = re.compile(r'jsonFlickrApi\((.*?)\)$')
parsed_photos = response_parser.findall(photos)
photos = json.loads(parsed_photos[0])
photos_list = photos['photos']['photo']
final_photos_list = []
# print len(photos_list)

print '['
for photo in photos_list:
	currId = photo['id']
	currTitle = photo['title']
	currphoto= flickr.photos_getSizes(photo_id=currId, format="json")
	response_parser = re.compile(r'jsonFlickrApi\((.*?)\)$')
	parsedPhoto = response_parser.findall(currphoto)
	currphoto = json.loads(parsedPhoto[0])
	currphoto_sizes = currphoto['sizes']['size']
	
	for size in currphoto_sizes:
		if size['label'] == "Large":
			print '{"id":"' + currId + '", "title":"' + currTitle + '", "source":"' + size['source']+'"},'
print ']'