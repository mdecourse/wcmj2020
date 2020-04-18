var tipuesearch = {"pages": [{'title': '有關本網站', 'text': '這門課程在教導學員如何利用網際環境管理與工程應用相關的內容管理. \n 總共使用兩套網際內容管理系統: \n https://github.com/mdecourse/cmsimde \n https://www.blogger.com/   \n Please use your student number to  register a github account . \n 請利用學號註冊一個 Github 帳號 \n Repository (倉儲):  https://github.com/mdecourse/wcmj2020 \xa0 \n Project (專案):  https://github.com/mdecourse/wcmj2020/projects/1 \xa0 \n Gitter (討論區):  https://gitter.im/mdecourse/wcmj2020 \xa0 \n Web site (網站):\xa0 https://mde.tw/wcmj2020 \xa0 \n Blog (網誌):  https://mde.tw/wcmj2020/blog \xa0 \n Presentation (簡報):  https://mde.tw/wcmj2020/reveal \xa0 \n 電腦輔助設計室與協同設計室行事曆 \n 全頁檢視 \n \n 請登入 gm 電子郵箱後, 填寫下列表單: \n 選課學員基本資料 \n 課程回饋表單 \n 網際內容管理自評與互評表單 \n', 'tags': '', 'url': '有關本網站.html'}, {'title': 'CMSiMDE', 'text': 'https://github.com/mdecourse/cmsimde.git  是一套利用 Python 解譯程式語言所編寫的網際內容管理系統, 使用者可以用來建立動態網站, 靜態網站, 網誌與網際簡報系統. \n 程式語言就其執行的方式, 可以分為編譯式與解譯式等兩種. \n 編譯式語言例如: C 程式語言 \n 解譯式語言例如: Python 程式語言 \n 編寫程式語言是工程師與電腦溝通的途徑之一, 工程師編寫計算機程式在電腦上執行, 可以透過電腦強大與重複的運算能力來解決問題. \n CMSiMDE 就是工程師希望將各種與產品開發的過程資料, 存放在網站上, 除了可用於工程師之間的溝通外, 還能夠將產品開發的細節, 或者特定工具的使用詳細記錄, 以作為往後的參考. \n 如何使用 CMSiMDE \n (1) 以子模組的方式使用 CMSiMDE \n 將 Github 倉儲 git clone 到近端工作區之後, 可以利用 git submodule add 指令將遠端倉儲中的 CMSiMDE 程式碼納為倉儲中的 cmsimde 子目錄, 並且保持與遠端原始碼的版次關聯 (也就是能夠指定採用遠端特定版本的 CMSiMDE 程式碼). \n 好處: 子模組可以與遠端官方的倉儲保持關聯, 一旦 CMSiMDE 更新版本, 使用者可以利用 git pull 直接拉下遠端 CMSiMDE 的最新程式碼. \n 壞處: 使用者若要 git clone 遠端的倉儲至近端, 需要加上 --recurse-submodules 選項 \n (2) 不以子模組的方式使用 CMSiMDE \n 假如不需要保持與遠端 CMSiMDE 倉儲特定版次的關聯性, 可以直接將 CMSiMDE 倉儲中的檔案, 直接放入 cmsimde 目錄, 並將其中 up_dir 的內容複製到希望建立網頁的倉儲主目錄中即可. \n 好處: 使用者可以直接使用 git clone 指令, 拉下遠端倉儲的所有資料. \n 壞處: 失去與遠端 CMSiMDE 倉儲的關聯, 假如要使用最新改版後的 CMSiMDE 原始碼, 必須另外 git clone 然後再取代倉儲中 cmsimde 的所有檔案. \n \n', 'tags': '', 'url': 'CMSiMDE.html'}, {'title': '可攜程式環境', 'text': '為了讓工程師可以在不同的 Windows 10 64 位元電腦上管理 CMSiMDE 網際內容管理系統, 因此需要 Python 解譯環境以及一個文字檔案的編輯器. \n 這裡所安裝的 Python 解譯器選擇由 C 所編寫的 CPython, 可以從  https://www.python.org/ \xa0 下載安裝. 但是在此我們要將 Python 解譯系統配置在 USB 隨身碟上, 使用者可以隨身攜帶, 一旦配置完成後, 可以在任何一台 Windows 10 64 位元的筆電或電腦上執行 Python 或 C 程式. \n 可攜 Python 程式環境的建立步驟: \n 安裝 Python 套件時, 不要安裝 pip, 之後將 Python38 目錄複製到 data 目錄中, 然後建立 start.bat 指定使用可攜系統中的 Python, 之後再利用 g et-pip.py,  以命令列中的 python get-pip.py 安裝 pip. \n 可攜 Tiny C 程式環境的建立步驟: \n 從  https://bellard.org/tcc/  下載 Tiny C, 將 tcc 解開壓縮後放到 data 目錄中. 然後修改 wscite 目錄中的 cpp.properties, 使用 Tiny C 類解譯 .c 程式. \n 選用的文字編輯器:  https://www.scintilla.org/SciTE.html \n 建立完成的可攜程式環境: \n 下載  wcm2020_w2.7z (舊資料) \n 請重新下載  wcmj2020_tool.7z , 檔案大小為 435 MB, 解開壓縮後為 1.8 GB (其中包括 Mypaint, Dia 與 OBS 等) \n 將 wcmj2020_tool.7z 解壓縮到隨身碟或電腦硬碟中, 將 home 與 home_ipv6 目錄中的 .gitconfig user.name 與 user.email 改為自己的 Github 帳號與 email 後, 利用 start.bat 啟動可攜系統, 利用 stop.bat 關閉可攜系統.', 'tags': '', 'url': '可攜程式環境.html'}, {'title': '簡單的 C 程式', 'text': '前面所打造的可攜 Python 程式環境, 包括 SciTE 文字編輯器, 只要再加上  https://bellard.org/tcc/ , 可將此一可攜環境設置成能夠編譯與類解譯 ANSI C 程式的環境 \n C 程式語言教材: \n Programming-in-ANSI-C.pdf \n gnu_c_programming_tutorial.pdf \n helloworld.c \n #include <stdio.h>\n\nint main() {\n\tprintf("hello world\\n");\n\treturn \'c\';\n} \n max.c \n #include <stdio.h>\n#include <stdlib.h>\n\nint max(int,int);\nint min(int,int);\n\nint main() {\n\n    int i,numbers_len;\n\n    printf("How many numbers? ");\n    scanf("%d",&numbers_len);\n\n    //int numbers[numbers_len]; //in this context this two lines are equivalent\n    int *numbers = (int*)malloc(numbers_len*sizeof(int));\n\n    for (i=0;i<numbers_len;i++) {\n        printf("N[%d] = ",i);\n        scanf("%d",numbers+i);\n        /* scanf("%d",&numbers[i]); */\n    }\n\n    int big = *numbers;\n    int small = numbers[0];\n    for (i=1;i<numbers_len;i++) {\n        big = max(big,*(numbers+i));\n        small = min(small,numbers[i]);\n    }\n\n    printf("The small number is %d\\n",small);\n    printf("The big number is %d\\n",big);\n}\n\nint max(int n1, int n2) {\n    // return the biggest number between n1 and n2\n    return n1>n2?n1:n2;\n}\n\nint min(int n1, int n2) {\n    // return the smallest number between n1 and n2\n    return n1<n2?n1:n2;\n} \n', 'tags': '', 'url': '簡單的 C 程式.html'}, {'title': '簡單的 Python 程式', 'text': 'for.py \n for i in range(10):\n\tprint("使用 Python") \n square_root.py \n # Python Program to calculate the square root\n\n# Note: change this value for a different result\nnum = 8 \n\n# To take the input from the user\n#num = float(input(\'Enter a number: \'))\n\nnum_sqrt = num ** 0.5\nprint(\'The square root of %0.3f is %0.3f\'%(num ,num_sqrt)) \n', 'tags': '', 'url': '簡單的 Python 程式.html'}, {'title': '電腦與網路', 'text': '由於電腦輔助設計室中的電腦若採 IPv4 協定上網, 必須透過 NAT (Network Address Translation) 才能連結到外部網際網路. 此舉將限制各電腦能夠聯外的網路頻寬, 因此平常上課將會直接將網路以 IPv6 對外連線, 可以直接使用 Google 的各種服務. \n 若需要連接至目前只支援 IPv4 協定連線的網站或服務, 則必須透過雙網路協定支援的代理主機, 才能完成連線, 其中包括 http, https, git, pip, sftp 等網路服務. \n Introduction_ to_computers.pdf \n intro_to_computers.pdf \n introduction_Computer_Networking.pdf \n An Introduction to computer networks.pdf \n data_communication_computer_network_tutorial.pdf', 'tags': '', 'url': '電腦與網路.html'}, {'title': '分組', 'text': '亂數分組: \n https://mde.tw/wcmj2020/downloads/2020spring_wcmj_1a_list.txt \xa0was taken from\xa0 https://osa.nfu.edu.tw/ \xa0on Feb. 19, 2020. \n The most updated list:\xa0 http://s1.mde.nfu.edu.tw:8000/?semester=1082&courseno=2418 \xa0 \n semester: 1082 \n courseno: 2418 \n Under https protocol use port 7443, for http use port 8000. \n 學員名單 URL:      \n \n Dart source code for random grouping \n evenGrouping.dart: \n import \'dart:html\';\n \n  InputElement studListUrl = querySelector("#studListUrl");\n  String studUrl;\n  // 將 Label 改為 Textarea, 避免產生過程結果嵌入所在頁面\n  TextAreaElement output = querySelector("#output");\n \nmain() {\n  querySelector("#submit").onClick.listen((e) => grouping());\n}\n \ngrouping() {\n  output.innerHtml = "";\n \n  if (studListUrl.value != "") {\n    studUrl = studListUrl.value;\n  } else {\n    studUrl = \'https://mde.tw/group/downloads/2019fall_cp_1a_list.txt\';\n  }\n \n  // 組序由 1 開始\n  int gth = 1;\n  // 迴圈序號變數\n  int i;\n  int j;\n  int total;\n  int inc;\n  // 每組學員暫存數列\n  var gpList = [];\n  // 全班分組數列\n  var group = [];\n  // 各組人數數列\n  var numList = [];\n  var courseTitle = \'wcmj2020\';\n \n  HttpRequest.getString(studUrl).then((String resp) {\n    // 利用 trim() 去除字串最後的跳行符號, 之後再利用 split() 根據 \\n 轉為數列\n    var studList = resp.trim().split("\\n");\n    // 數列利用 shuffle() 方法以隨機方法弄亂順序\n    studList.shuffle();\n    total = studList.length;\n    output.text += "全班總計" + total.toString() + " 人\\n";\n    numList = getNumList(studList.length);\n    inc = 0;\n    for (i in numList){\n      // 列印區隔符號\n      output.text += \'=\' * 20 + "\\n";\n      output.text += "group $gth 有 " + i.toString() + " 人: \\n";\n      gpList = [];\n      for (j = 0; j < i; j++){\n        output.text += studList[j+inc] + "\\n";\n        // 在各分組數列中加入將對應的學員學號\n        gpList.add(studList[j+inc]);\n      }\n      gth = gth + 1;\n      inc = inc + j;\n        //output.text += studList[j] + "\\n";\n        // 逐步將各組暫存的分組數列加入全班分組數列中\n      gpList.sort();\n      group.add(gpList);\n    }\n    // 列出全班分組數列\n    output.text += group.toString() + "\\n";\n    // 列出已經排序後的分組名單\n    output.text += \'=\' * 25 + "\\n";\n    output.text += \'以下為排序後的各組成員名單: \\n\';\n    gth = 1;\n    /*\n    404231\n    s4052\n    4062\n    s4072\n    4082\n    5072\n    5083\n    */\n    // 先列出純文字以 \\n 跳行組員資料\n    for (i=0; i < group.length; i++){\n      // 列印區隔符號\n      output.text += \'=\' * 20 + "\\n";\n      output.text += "group $gth \\n";\n      gpList = [];\n      for (j=0; j < group[i].length; j++){\n        output.text += group[i][j] + "\\n";\n      }\n      gth = gth + 1;\n    }\n    \n    gth = 1;\n    // 最後列出超文件以 <br\\> 跳行組員資料, 包含倉儲與網站\n    for (i=0; i < group.length; i++){\n      // 列印區隔符號\n      output.text += \'\\n\' + \'=\' * 30 + "<br \\>";\n      output.text += "group $gth <br \\>";\n      gpList = [];\n      for (j=0; j < group[i].length; j++){\n          if (group[i][j].startsWith(\'4052\') || group[i][j].startsWith(\'4072\')) {\n              output.text += "Repository: <a href=\'https://github.com/s" + \n                                      group[i][j] + "/" + courseTitle + "\'>" + group[i][j] + \n                                      "</a>" + " | Site: <a href=\'https://s" + group[i][j] + \n                                      ".github.io/" + courseTitle + "\'>" + group[i][j] + \n                                      "</a><br \\>";\n          }\n          else {\n              output.text += "Repository: <a href=\'https://github.com/" + \n                                      group[i][j] + "/" + courseTitle +"\'>" + group[i][j] + \n                                      "</a>" + " | Site: <a href=\'https://" + group[i][j] + \n                                      ".github.io/" + courseTitle + "\'>" + group[i][j] + \n                                      "</a><br \\>";\n          }\n      }\n      gth = gth + 1;\n    }\n  });\n}\n \nList getNumList(int total){\n  // total student number\n  // int total = 65;\n  // initial each group expect to be "eachGrp" number of people\n  int eachGrp = 10;\n  // may divide into "grpNum" number of group\n  int grpNum = total ~/ eachGrp;\n  // vacant list\n  var splits = [];\n  // find remainder when total number divid into "grpNum" number of group\n  int remainder = total % grpNum;\n  // number of people in one group by calculation\n  int calGrp = total ~/ grpNum;\n \n  for (int i = 0; i < grpNum; i++) {\n    splits.add(calGrp);\n  }\n  //print(splits);\n \n  for (int i = 0; i < remainder; i++) {\n    splits[i] += 1;\n  }\n  //print(splits);\n  return splits;\n } \n index.html: \n <h1>亂數分組:</h1>\n學員名單 URL: <input type="text" id="studListUrl" size="50" value="https://mde.tw/wcm2020/downloads/2020spring_wcm_1a_list.txt"><br />\n<input type="submit" value="開始分組" id="submit"><br />\n<textarea id="output" cols="80" rows="10"></textarea> \n style.css: \n body {\n  color: white;\n  font-size: 20px;\n}\n\ninput, select, textarea {\nfont-size: 100%;\n} \n get_student.py \n from flask import Flask, request \nfrom flask_cors import CORS\n\nimport requests\nimport bs4\nimport ssl\n\n\'\'\'\nhttps://s1.mde.nfu.edu.tw:7443/?semester=1082&courseno=0767\ncd\n2a 1082/0767\n2b 1082/0780\n\n2a 1072/0777\n2b 1072/0790\n2a 1062/0788\n2a 1062/0802\n\nwcm\n1082/0744\n\n1072/0754\n1062/0765\n\nwcmj\n1082/2418\n\'\'\'\n\napp = Flask(__name__)\nCORS(app)\n\n@app.route(\'/studlist\')\n@app.route(\'/\')\ndef studlist():\n    semester = request.args.get(\'semester\')\n    courseno = request.args.get(\'courseno\')\n    if semester == None:\n        semester = \'1082\'\n    if courseno == None:\n        courseno = \'0744\'\n    \n    url = \'https://osa.nfu.edu.tw/query/studlist_ajax.php\'\n    post_var = {\'pselyr\': semester, \'pseqno\': courseno}\n\n    result = requests.post(url, data = post_var)\n\n    soup = bs4.BeautifulSoup(result.content, \'lxml\')\n    table = soup.find(\'table\', {\'class\': \'tbcls\'})\n    data = []\n    rows = table.find_all(\'tr\')\n    for row in rows:\n        cols = row.find_all(\'td\')\n        cols = [ele.text.strip() for ele in cols]\n        data.append([ele for ele in cols if ele]) # Get rid of empty values\n    output = ""\n    for i in data[2:]:\n        #print(i[0])\n        output +=i[0] + "\\n"\n    return output\n    #return  str(pselyr) + " + " +str(pseqno)\n\n# 即使在近端仍希望以 https 模式下執行\ncontext = ssl.SSLContext(ssl.PROTOCOL_TLSv1_2)\ncontext.load_cert_chain(\'localhost.crt\', \'localhost.key\')\n\n# 取 flaskapp.py 中的 uwsgi 變數設定\nuwsgi = False\nif uwsgi:\n    # 表示程式在雲端執行\n    application = app\nelse:\n    # 表示在近端執行, 以 python3 wsgi.py 執行\n    app.run(host=\'127.0.0.1\', port=5443, debug=True, ssl_context=context)\n \n nginx sites-available/default settings: \n server {\n    listen 8000;\n    server_name s1.mde.nfu.edu.tw;\n    charset utf-8;\n    \n    listen 7443 ssl;\n \n    location /static {\n        alias /home/kmol2019/course_studlist/static/;\n    }\n \n    location / {\n        include uwsgi_params;\n        uwsgi_pass  127.0.0.1:8087;\n    }\n    \n    ssl_certificate /etc/stunnel/localhost.crt;\n    ssl_certificate_key /etc/stunnel/localhost.key;\n    ssl_session_timeout 5m;\n    ssl_protocols SSLv3 TLSv1 TLSv1.1 TLSv1.2;\n    ssl_ciphers "HIGH:!aNULL:!MD5 or HIGH:!aNULL:!MD5:!3DES";\n    ssl_prefer_server_ciphers on;\n    try_files $uri $uri/ =404;\n} \n uwsgi7.ini \n [uwsgi]\nsocket = 127.0.0.1:8087\nuid = kmol2019\ngid = kmol2019\nplugins-dir = /usr/lib/uwsgi/plugins/\nplugin = python3\nmaster = true\nlogto = /var/log/uwsgi/emperor.log\nlogfile-chown = kmol2019:kmol2019\nprocesses = 4\nthreads = 2\nchdir = /home/kmol2019/course_studlist\nwsgi-file = /home/kmol2019/course_studlist/get_student.py \n /etc/systemd/system/cmsimfly.service \n [Unit]\nDescription=uWSGI to serve CMSimfly\nAfter=network.target\n\n[Service]\nUser=kmol2019\nGroup=kmol2019\nWorkingDirectory=/home/kmol2019/uwsgi_ini\nExecStart=/usr/local/bin/uwsgi --emperor /home/kmol2019/uwsgi_ini\n\n[Install]\nWantedBy=multi-user.target', 'tags': '', 'url': '分組.html'}, {'title': '分組結果', 'text': '各分組學員可以就以下常見的網際內容, 以組員分工的方式深入研究特定主題, 然後再將結果納入 CMSiMDE 網站, 網誌, 簡報 與 Blogger 網誌內容. \n 常見的網際內容包含: \n 文字 (網誌與網站文字說明, 簡報文字敘述) \n 數學方程式 ( mathjax ) \n 圖檔 (png, jpg, gif,  svg) \n 動畫 (gif)  \n 音樂 (mp3 or  midi ) \n 影片 (embedded mp4) \n 程式 \n HTML5 Canvas  (2d) \n Three.js  (3D) \n Brython \n fengari-web  (Lua) \n Dart -> Javascript \n ============================== group 1  Repository:  50833110  | Site:  50833110 Repository:  50833112  | Site:  50833112 Repository:  50833115  | Site:  50833115 Repository:  50833123  | Site:  50833123 Repository:  50833127  | Site:  50833127 Repository:  50833128  | Site:  50833128 Repository:  50833129  | Site:  50833129 Repository:  50833131  | Site:  50833131 Repository:  50833133  | Site:  50833133 Repository:  50833138  | Site:  50833138  ============================== group 2  Repository:  50833101  | Site:  50833101 Repository:  50833107  | Site:  50833107 Repository:  50833108  | Site:  50833108 Repository:  50833111  | Site:  50833111 Repository:  50833117  | Site:  50833117 Repository:  50833119  | Site:  50833119 Repository:  50833122  | Site:  50833122 Repository:  50833126  | Site:  50833126 Repository:  50833130  | Site:  50833130 Repository:  50833134  | Site:  50833134  ============================== group 3  Repository:  50833104  | Site:  50833104 Repository:  50833106  | Site:  50833106 Repository:  50833113  | Site:  50833113 Repository:  50833114  | Site:  50833114 Repository:  50833116  | Site:  50833116 Repository:  50833118  | Site:  50833118 Repository:  50833120  | Site:  50833120 Repository:  50833125  | Site:  50833125 Repository:  50833140  | Site:  50833140 Repository:  50833141  | Site:  50833141  ============================== group 4  Repository:  50833102  | Site:  50833102 Repository:  50833103  | Site:  50833103 Repository:  50833105  | Site:  50833105 Repository:  50833109  | Site:  50833109 Repository:  50833121  | Site:  50833121 Repository:  50833124  | Site:  50833124 Repository:  50833135  | Site:  50833135 Repository:  50833136  | Site:  50833136 Repository:  50833137  | Site:  50833137 Repository:  50833139  | Site:  50833139', 'tags': '', 'url': '分組結果.html'}, {'title': '實習項目', 'text': '第八週 \n 請重新下載  wcmj2020_tool.7z , 檔案大小為 435 MB, 解開壓縮後為 1.8 GB (其中包括 Mypaint, Dia 與 OBS 等) \n 分別利用 ShareX 與 OBS 錄製電腦畫面操作, 說明如何在個人的網站上新增一個標題為"第八週實習"的 H1 頁面, 然後將兩段影片上傳至個人的 youtube 帳號下, 並 embedded 至該頁面中. \n 第九週 \n 請從電腦與網路頁面中, 擷取資料中的圖文資料, 在標題為"第九週實習“的 H1 頁面下, 分別製作兩個 H2 頁面: \n 電腦軟硬體簡介 \n 與 \n 網路架構與設定簡介 \n 課堂上將利用  Ethercalc  擷取各學員的期中自評成績. \n', 'tags': '', 'url': '實習項目.html'}, {'title': '主題', 'text': 'Google Blogger \n Login to your gm email account and download  2010_BeginningGoogleBlogger.pdf \n WCM \n Login to your gm email account and download \xa0 2020wcm_topic_1.pdf . \n What is a content management system? \n Analyzing your information life cycle. \n Overview of enterprise content management. \n Git \n Login to your gm email account and download \xa0 IntroductionToVersionControlAndGit.pdf . \n What is version control? \n Git installation and setup. \n Git getting started. \n Commits and remote git. \n Github \n Login to your gm email account and download \xa0 GithubPrimer.pdf \n Login to your gm email account and download \xa0 ConflictsGUIToolAdvGit.pdf', 'tags': '', 'url': '主題.html'}, {'title': '倉儲與網站', 'text': '\n 請重新下載  wcmj2020_tool.7z , 檔案大小為 435 MB, 解開壓縮後為 1.8 GB (其中包括 Mypaint, Dia 與 OBS 等). \n 登入 github.com 建立 Github 倉儲, 直接新增 README.md 檔案. \n 將所建立的倉儲 git clone 到近端. \n git submodule add  https://github.com/mdecourse/cmsimde.git \xa0cmsimde \n 在近端維護動態網站, 轉為靜態後 git add commit push \n \n 以下請各學員分別利用 ShareX 與 OBS 拍攝建立與維護個人倉儲與網站的影片, 完成後將影片 embed 入個人網站的 W8 頁面中.', 'tags': '', 'url': '倉儲與網站.html'}, {'title': '繪圖', 'text': 'https://github.com/mypaint/mypaint \n https://github.com/mypaint/mypaint/wiki/v1.2-User-Manual \n Mypaint筆刷說明.pdf \n \n \n', 'tags': '', 'url': '繪圖.html'}, {'title': 'W6', 'text': 'Online education \n 線上直播: Youtube + Portable OBS \n 線上開會:  https://meet.google.com \xa0 \n \n 讓手機可以利用電腦熱點上網 \n 採用\xa0 https://www.tp-link.com/us/home-networking/usb-adapter/tl-wn725n/ \n 將此一 USB Wifi adapter 連接電腦後, 若網路為 IPv4 協定時, 可以透過"設定 -> 網路和網際網路 -> 行動熱點", 選擇開啟並編輯"網路名稱與網路密碼"後, 讓至多 8 台手機透過熱點連線上網. \n 但是因為目前 Windows 10 並 未提供 IPv6 網路協定下的網路熱點功能 , 因此在純 IPv6 網路協定下無法使用"行動熱點"服務. \n \n 利用手機鏡頭當作 webcam: \n Android:  https://www.digitalcitizen.life/turn-android-smartphone-webcam-windows \xa0 iPhone:  https://www.makeuseof.com/tag/use-your-iphone-as-a-webcam-heres-how-ios/ \xa0 \n \n 需要 clone 個人倉儲時: \n git clone --recurse-submodules 倉儲_url.git \n 例如:\xa0git clone --recurse-submodules https://github.com/mdecourse/wcmj2020.git \n \n', 'tags': '', 'url': 'W6.html'}, {'title': 'W7', 'text': '下載可攜程式系統 \n \n 利用 git 指令建立 cmsimde 網站 \n \n', 'tags': '', 'url': 'W7.html'}, {'title': 'W8', 'text': '請重新下載  wcmj2020_tool.7z , 檔案大小為 435 MB, 解開壓縮後為 1.8 GB (其中包括 Mypaint, Dia 與 OBS 等). \n 學會利用 ShareX 與 OBS 拍攝螢幕操作影片, 並將個人維護倉儲與網站的過程影片放入個人網站中. \n \n', 'tags': '', 'url': 'W8.html'}]};