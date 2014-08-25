import flickrapi
import re
import json

# api_key = '6b30d24a901279dcbabac8e4a438d155'
api_secret = '49dd1aeef48fcece'

api_key = '47dbc3b01589b715b9c204211bcda208'
api_secret = '4df9fe589fb912d4'

flickr = flickrapi.FlickrAPI(api_key, api_secret)
photos = flickr.photos_search(text='San Francisco Food', per_page='100', format="json")
response_parser = re.compile(r'jsonFlickrApi\((.*?)\)$')
parsed_photos = response_parser.findall(photos)
photos = json.loads(parsed_photos[0])
photos_list = photos['photos']['photo']
final_photos_list = []
# print len(photos_list)

for photo in photos_list:
	currId = photo['id']
	currTitle = photo['title']
	currphoto= flickr.photos_getSizes(photo_id=currId, format="json")
	response_parser = re.compile(r'jsonFlickrApi\((.*?)\)$')
	parsedPhoto = response_parser.findall(currphoto)
	currphoto = json.loads(parsedPhoto[0])
	# import pdb; pdb.set_trace()
	currphoto_sizes = currphoto['sizes']['size']
	# print currphoto
	for size in currphoto_sizes:
		if size['label'] == "Large":
			final_photos_list.append((currId, currTitle, size['source']))
			# print size['source']

print final_photos_list