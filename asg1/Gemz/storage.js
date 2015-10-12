function searchGem() {
    for (i = 0; i <= size; i++) {
        for (j = 0; j <= size; j++) {
            if (gem[i][j] == 1) {
                var topX = i;
                var bottomX = i + 1;
                var leftY = j;
                var rightY = j + 1;
                var verticalCount = 0;
                var horizontalCount = 0;
                getPosition(i, j);
                var name = $("." + position).attr("name");
                var curName;
                if (bottomX > size) {
                    bottomX = size;
                    verticalCount -= 1;
                }
                if (rightY > size) {
                    rightY = size;
                    horizontalCount -= 1;
                }

                getPosition(topX, j);
                curName = $("." + position).attr("name");
                while ((topX >= 0) && (curName == name)) {
                    verticalCount += 1;
                    topX--;
                    if (topX >= 0) {
                        getPosition(topX, j);
                        curName = $("." + position).attr("name");
                    }
                    else {
                        break;
                    }
                }
                topX += 1;

                getPosition(bottomX, j);
                curName = $("." + position).attr("name");
                while ((bottomX <= size) && (curName == name)) {
                    verticalCount += 1;
                    bottomX++;
                    if (bottomX <= size) {
                        getPosition(topX, j);
                        curName = $("." + position).attr("name");
                    }
                    else {
                        break;
                    }
                }
                bottomX -= 1;

                getPosition(i, leftY);
                curName = $("." + position).attr("name");
                while ((leftY >= 0) && (curName == name)) {
                    horizontalCount += 1;
                    leftY--;
                    if (leftY >= 0) {
                        getPosition(i, leftY);
                        curName = $("." + position).attr("name");
                    }
                    else {
                        break;
                    }
                }
                leftY += 1;

                getPosition(i, rightY);
                curName = $("." + position).attr("name");
                while ((rightY <= size) && (curName == name)) {
                    horizontalCount += 1;
                    rightY++;
                    if (rightY <= size) {
                        getPosition(i, rightY);
                        curName = $("." + position).attr("name");
                    }
                    else {
                        break;
                    }
                }
                rightY -= 1;

                if (verticalCount >= 3) {
                    for (k = topX; k <= bottomX; k++) {
                        getPosition(k, j)
                        $("." + position).removeAttr("name");
                        $("." + position).removeAttr("src");
                        gem[k][j] = 0;
                    }
                }
                
                if (horizontalCount >= 3) {
                    for (l = leftY; l <= rightY; l++) {
                        getPosition(i, l)
                        $("." + position).removeAttr("name");
                        $("." + position).removeAttr("src");
                        gem[i][l] = 0;
                    }
                }
            }
            
        }
    }
    //从row0 col0开始，左搜三，右搜三，上搜三，下搜三，只要三个name一样
    //移除name，移除src；
}