var chess; //棋盘所有棋子的状态
var chessStack = []; //缓存点
//创建棋盘
function creatChess() {
  chess = [];
  for (var i = 0; i < 4; i++) {
    chess[i] = [];
    for (var j = 0; j < 4; j++) {
      chess[i][j] = { num: 0, fixed: false, temp: [1, 2, 3, 4] };
    }
  }
}

//打印棋盘
function printChess() {
  var say = '';
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      say += chess[i][j].num;
    }
    say += '\n';
  }
  console.log(say);
}

//预先设置互不影响的九宫格位置数字
function setArea(a, b) {
  var temp = [1, 2, 3, 4]; //每个小九宫格包含的九个数字
  for (var i = a; i < b; i++) {
    for (var j = a; j < b; j++) {
      var len = temp.length; //temp剩下的长度
      var index = getRandom(len); //随机抽取一个
      chess[i][j].num = temp[index]; //赋值
      chess[i][j].fixed = true; //赋值
      temp.splice(index, 1); //删除已赋值的
    }
  }
}

//设定数字 可以求解
function setPre(r, c, v) {
  chess[r][c] = { num: v, fixed: true, temp: [] };
}

//获取一个随机数字下标
function getRandom(a) {
  return Math.floor(Math.random() * a);
}

//初始化棋盘
function chessInit() {
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; ) {
      //当数字确定了 则下一个 不然随机取一个
      if (!chess[i][j].fixed) {
        var len = chess[i][j].temp.length; //temp剩下的长度
        //当还有可选数字
        if (len > 0) {
          var index = getRandom(len); //随机抽取一个
          chess[i][j].num = chess[i][j].temp[index]; //赋值
          chess[i][j].temp.splice(index, 1); //删除已赋值的
          chessStack.push([i, j, JSON.parse(JSON.stringify(chess))]); //存储
          chess[i][j].fixed = true; //变为确定
          if (!checkTempNum(i, j)) {
            var cs = chessStack.pop(); //退格
            i = cs[0];
            j = cs[1];
            chess = cs[2]; //取出棋盘存储点
          }
        } else {
          // 当没有可选数字了
          var cs = chessStack.pop(); //退格
          i = cs[0];
          j = cs[1];
          chess = cs[2]; //取出棋盘存储点
        }
      } else {
        j++; //进一个
      }
    }
  }
}

//删除特定元素
function removeByValue(r, c, v) {
  if (chess[r][c].num == v) {
    return false; //冲突了
  }
  if (chess[r][c].fixed) {
    return true; //已经确定了 则无需删除了
  }
  var len = chess[r][c].temp.length;
  for (var i = 0; i < len; i++) {
    if (chess[r][c].temp[i] == v) {
      chess[r][c].temp.splice(i, 1); //删除备选数字
      break; //退出
    }
  }
  return chess[r][c].temp.length == 0 ? false : true; //没有确定而且没有备选元素了 那么返回错误
}

//移除相关7格备选列表某数字
function checkTempNum(r, c) {
  var i, j;
  var num = chess[r][c].num; //要移除的数字
  //检查列
  for (i = 0; i < 4; i++) {
    if (i != r && !removeByValue(i, c, num)) return false; //移除备选数字和判定数字合法性
  }
  //检查行
  for (j = 0; j < 4; j++) {
    if (j != c && !removeByValue(r, j, num)) return false; //移除备选数字和判定数字合法性
  }
  //检查小九宫
  var left = Math.floor(r / 2) * 2; //得出小九宫的左上角坐标
  var top = Math.floor(c / 2) * 2; //得出小九宫的左上角坐标
  for (i = left; i < left + 2; i++) {
    for (j = top; j < top + 2; j++) {
      if (i == r && j == c) {
        continue; //同一个格子跳过
      }
      if (!removeByValue(i, j, num)) return false; //移除备选数字和判定数字合法性
    }
  }
  return true;
}

//初始化
function chess() {
  creatChess(); //创建棋盘
  // setArea(0,3);//随机设置左上角九宫格数字
  // setArea(3,6);//随机设置中间九宫格数字
  // setArea(6,4);//随机设置右下角九宫格数字
  chessInit(); //初始化棋盘
  printChess(); //打印棋盘
}

chess();
