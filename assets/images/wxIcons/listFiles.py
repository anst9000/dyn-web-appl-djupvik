from os import listdir
from os.path import isfile, join
pngFiles = 'png/'

onlyfiles = [f for f in listdir(pngFiles) if isfile(join(pngFiles, f))]

print(onlyfiles)