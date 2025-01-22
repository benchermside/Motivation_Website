#This files creates the imageFilePaths
import os
fileList = []

directory = os.fsencode(".\\moodcharacters")
for file in os.listdir(directory):
    filename = os.fsdecode(file)
    fileList.append(filename)

count= 0
stringToWright = "const filePaths = ["
for filePath in fileList:
    stringToWright = stringToWright + "'moodcharacters/" + filePath + "', "
    count = count + 1
    if count%4 == 0:
        stringToWright = stringToWright + "'moodcharacters/try again.png',"
stringToWright = stringToWright + "];"

with open("filePaths.js", "w") as f:
    f.write(stringToWright)
