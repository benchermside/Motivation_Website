#This files creates the imageFilePaths
import os
fileList = []

directory = os.fsencode(".\\moodcharacters")
for file in os.listdir(directory):
    filename = os.fsdecode(file)
    fileList.append(filename)

stringToWright = "const filePaths = ["
for filePath in fileList:
    stringToWright = stringToWright + "'moodcharacters/" + filePath + "', "
stringToWright = stringToWright + "];"

with open("filePaths.js", "w") as f:
    f.write(stringToWright)
