import sys

if len(sys.argv) != 3:
    print("USAGE: python parser.py [imgFolder] [textFile]")
else:
    newFile = open(sys.argv[2] + "-output.txt", "w")

    imgFolder = int(sys.argv[1])
    imgPath = "../img/" + str(imgFolder) + "/"
    imgExtension = ".png"

    with open('./' + sys.argv[2] + '.txt', encoding='utf8') as f:
        lines = f.readlines()
        olActive = False
        ulActive = False
        rfActive = False
        pClass = ""
        pad = ""
        for x in lines:
            # handle lists
            if rfActive:
                pad = '\t'
            else:
                pad = ''
            if len(x) > 1 and x[-2] == '^':
                if x.split('^')[1] == 'ol':
                    olActive = True
                    newFile.write(pad + '<ol>\n')
                elif x.split('^')[1] == 'ul':
                    ulActive = True
                    newFile.write(pad + '<ul>\n')
                elif x.split('^')[1] == '!ol':
                    olActive = False
                    newFile.write(pad + '</ol>\n')
                elif x.split('^')[1] == '!ul':
                    ulActive = False
                    newFile.write(pad + '</ul>\n')
                elif x.split('^')[1] == 'rf':
                    rfActive = True
                    newFile.write('<br><br>\n')
                    newFile.write('<hr>\n')
                    newFile.write('<br><br>\n')
                    newFile.write('<div id=\'referencias\'>\n')
                elif x.split('^')[1] == '!rf':
                    rfActive = False
                    newFile.write('</div>\n')
                continue

            # handle images
            if len(x) > 1 and x[-2] == '-':
                if x.split('-')[1] == 'iFull':
                    newFile.write('<div class=\'imgFull\'>\n')
                    newFile.write('\t<img src=\'' + imgPath + x.split('-')[2] + imgExtension + '\'>\n')
                    newFile.write('</div>\n<br>\n')
                elif x.split('-')[1] == 'iText':
                    imgWidth = int(x.split('-')[3])
                    textWidth = 90 - imgWidth
                    newFile.write('<div class=\'imgWithText\'>\n')
                    newFile.write('\t<img src=\'' + imgPath + x.split('-')[2] + imgExtension + '\' style=\'width: ' + str(imgWidth) + '%\'>\n')
                    newFile.write('\t<div class=\'textImg\' style=\'' + 'width: ' + str(textWidth) + '%' + '\'>\n')
                    newFile.write('\t\t' + x.split('-')[4] + '\n')
                    newFile.write('\t</div>\n')
                    newFile.write('</div>\n<br>\n')
                elif x.split('-')[1] == 'iRow':
                    numImages = int(x.split('-')[2])
                    imgWidth = int(100 / numImages)
                    sources = x.split('-')[3].split('.')
                    newFile.write('<div class=\'imgRowWrapper\'>\n')
                    newFile.write('\t<div class=\'imgRow\'>\n')
                    for src in sources:
                        newFile.write('\t\t<img src=\'' + imgPath + src + imgExtension + '\' style=\'width: ' + str(imgWidth) + '%\'>\n')
                    newFile.write('\t</div>\n')
                    newFile.write('</div>\n<br>\n')
                continue

            # handle paragraphs
            if x != '\n':
                # Add newline if not found
                if x[-1] != '\n':
                    x = x + '\n'
                # Decide formatting
                if olActive or ulActive:
                    padding = '\t'
                    if rfActive:
                        padding = '\t\t'
                    newFile.write(padding + '<li>\n')
                    newFile.write(padding + '\t' + x)
                    newFile.write(padding + '</li>\n')
                else:
                    if len(x.split('->')) == 2:
                        newFile.write('<p class=\'' + x.split('->')[0] + '\'>\n')
                        newFile.write('\t' + x.split('->')[1])
                        newFile.write('</p>\n<br>\n')
                    else:
                        newFile.write('<p>\n')
                        newFile.write('\t' + x)
                        newFile.write('</p>\n<br>\n')

    newFile.close()
