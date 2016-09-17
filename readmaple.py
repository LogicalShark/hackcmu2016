from urllib.request import Request, urlopen

req = Request('http://maplestory.io/api/fm/world/0/rooms', headers={'User-Agent': 'Mozilla/5.0'})
webpage = urlopen(req).read()

print(webpage)