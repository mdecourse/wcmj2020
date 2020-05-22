import random
import requests

# 隨機抽出幾名學員
num = 5
target_url = "http://mde.tw/wcmj2020/downloads/2020spring_wcmj_1a_list.txt"
# 利用 requests 讀取 url 中的資料
f = requests.get(target_url)
# get student list from target_url
# 利用 splitlines() 將資料放入數列 studList
studList = f.text.splitlines()
# 利用 random 模組中的 shuffle() 方法弄亂 studList 數列
random.shuffle(studList)
#print(studList)

# 取出所抽到的 num 名學員
for i in range(num):
    print(studList[i])

    
