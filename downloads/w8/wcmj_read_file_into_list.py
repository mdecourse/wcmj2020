'''
with open("wcmj_g1_list.txt") as f:
    lineList = f.readlines()
'''
lineList = [line.rstrip('\n') for line in open("wcmj_g1_list.txt")]
#print(lineList)
for i in lineList:
	print(i + "@gm.nfu.edu.tw")
