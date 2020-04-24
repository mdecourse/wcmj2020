'''
with open("wcmj_g1_list.txt") as f:
    lineList = f.readlines()
'''
lineList = [line.split(" ") for line in open("wcmj_stud_oneline.txt")]
#print(lineList)

for i in lineList[0]:
	print("https://github.com/"+ i + "/wcmj2020")



