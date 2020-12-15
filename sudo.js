// 参考 https://www.cnblogs.com/godehi/p/8423103.html
// https://blog.csdn.net/liusaint1992/article/details/51147149
// https://www.jianshu.com/p/4b0d08e19e93
// https://blog.csdn.net/Xcodingman/article/details/80639788
// https://segmentfault.com/a/1190000004641936

// 数独求解参考 c++ https://www.jianshu.com/p/e96583bab799
// 生成数独及求解参考 c++ https://www.jianshu.com/p/4b0d08e19e93
// ****** 是否是数独，数独求解 js  https://gitee.com/zhoutk/test/blob/master/sudoku.js
//*****  是否是数独，数独求解 js  https://segmentfault.com/a/1190000004995017

// ******* 数独生成到挖空的整个流程   https://blog.csdn.net/Xcodingman/article/details/80639788

/*
对上述挖好空的数独用之前的解数独算法进行解，如果有多解则放弃该数独，重新产生新的数独。若有唯一解，则继续查看该数独的难度，难度有三个影响因素：

1.解数独时的显性推导，即通过侯选数删选以后发现只有一个侯选数。

2.解数独时的隐性推导，即该位置有多个侯选数，只能通过猜测来填该位置。

通过三个因素的不同权重大小（显性推导权重较小，隐性推导权重较大），计算中一个难度值，不同难度选择对应不同的难度值。
*/

// https://forum.cocos.org/t/topic/51150/7
// https://github.com/pocketjoso/sudokuJS/blob/master/sudokuJS.js
// https://forum.cocos.org/t/topic/71488/4

/*

https://github.com/Xcodingman/sudo.git
1.数独解题与出题算法

一、基于递归回溯法的数独解题算法

思路：众所周知，数独一般的解法需要用到很多次的推导，对各行各列各个九宫格进行排查，删选候选数后挑选候选数最少的去填。仿照这样的思想，我们用C++模拟这样的思路去解一个数独。流程图如下：

具体实现：

1.预处理

考虑到更好的表示数独中1到9九个数字，我们采用一个9*9的二维数组去表示一个数独，它的每一个元素用一个9位的二进制数表示，每一位的1表示这个位置序号在侯选数组里面，具体如下表格所示。预处理函数（代码中的init函数）的作用是把输入的数独矩阵进行转换，如果是0，则换成0x1FF,表示所有数字均有可能，如果有确定值的，则按确定值的大小转换为二进制中只有一位1的16进制数。

16进制 2进制 侯选数

0x1 000000001 确定值1

0x2 000000010 确定值2

0x77 001110111 侯选值123567

0x1FF 111111111 侯选值123456789

2.递归回溯

第一步：遍历预处理过的矩阵的每一个元素，通过对行，列以及周围格子的检查，得出该位置所有可能的侯选数值。

第二步：通过一个check函数去检查更新过的数独的结果，有三种情况。

1.数独已经被全部填完并正确。

2.数独还有空未填。

3.该数独不满足规则。

第三步：根据上述check的情况，分别对应三种情况：

1.先把此次答案打印出来，然后返回上一次递归继续解题，查看是否有多解。

2.选取未填的格子里面侯选数最少的一个格子选填一个侯选值，执行第二步。

3.退出当前的尝试，返回上一次递归并换下一个可能的侯选值。

3.  结束

所有的尝试结束后，递归程序退出，并显示用时。

二、出题算法

1.该题只有一个解

2.每一次的题目都不一样

3.难度可选

思路：数独的出题很难用正向思维去出，所以本程序采用了反向思维去出题，本程序先产生一个数独题，然后去上述的解数独算法去解，若满足条件则程序结束，若不满足则继续尝试下一个数独题目。流程图如下：

1.产生完整数独

   考虑到数独数量的巨大，据统计大约有6.671*10^21数量级的数独，本程序采用对数独矩阵的简单变换来产生大约数量级在10^6左右。

   首先程序内置一个已经解好的数独，创建一个一维数组，里面存放1-9的九个数字，用这个数组的下标号加一对应数独里面的数字，并把该下标的元素与对应数独的元素进行转换，例如，一维数组为{9,8,7,6,5,4,3,2,1},则把数独里面的9全部换成1，8全部换成2……以此类推，这样，根据产生的一维数组里面九个数字的顺序不同，可能变换得到9！=3628800个不同的完整数独。

2.挖空

对产生的完整数独进行挖空，挖空算法根据随机数随机挖空，不同难度对应不同的随机挖空概率。

3.检查是否满足要求

对上述挖好空的数独用之前的解数独算法进行解，如果有多解则放弃该数独，重新产生新的数独。若有唯一解，则继续查看该数独的难度，难度有三个影响因素：

1.解数独时的显性推导，即通过侯选数删选以后发现只有一个侯选数。

2.解数独时的隐性推导，即该位置有多个侯选数，只能通过猜测来填该位置。

通过三个因素的不同权重大小（显性推导权重较小，隐性推导权重较大），计算中一个难度值，不同难度选择对应不同的难度值。
*/
var chess; //棋盘所有棋子的状态
var chessStack = []; //缓存点
//创建棋盘
function creatChess() {
  chess = [];
  for (var i = 0; i < 9; i++) {
    chess[i] = [];
    for (var j = 0; j < 9; j++) {
      chess[i][j] = { num: 0, fixed: false, temp: [1, 2, 3, 4, 5, 6, 7, 8, 9] };
    }
  }
}

//打印棋盘
function printChess() {
  var say = '';
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      say += chess[i][j].num;
    }
    say += '\n';
  }
  console.log(say);
}

//预先设置互不影响的九宫格位置数字
function setArea(a, b) {
  var temp = [1, 2, 3, 4, 5, 6, 7, 8, 9]; //每个小九宫格包含的九个数字
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
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; ) {
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

//移除相关20格备选列表某数字
function checkTempNum(r, c) {
  var i, j;
  var num = chess[r][c].num; //要移除的数字
  //检查列
  for (i = 0; i < 9; i++) {
    if (i != r && !removeByValue(i, c, num)) return false; //移除备选数字和判定数字合法性
  }
  //检查行
  for (j = 0; j < 9; j++) {
    if (j != c && !removeByValue(r, j, num)) return false; //移除备选数字和判定数字合法性
  }
  //检查小九宫
  var left = Math.floor(r / 3) * 3; //得出小九宫的左上角坐标
  var top = Math.floor(c / 3) * 3; //得出小九宫的左上角坐标
  for (i = left; i < left + 3; i++) {
    for (j = top; j < top + 3; j++) {
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
  // setArea(6,9);//随机设置右下角九宫格数字
  setPre(0, 2, 5);
  setPre(0, 3, 3);
  setPre(1, 0, 8);
  setPre(1, 7, 2);
  setPre(2, 1, 7);
  setPre(2, 4, 1);
  setPre(2, 6, 5);
  setPre(3, 0, 4);
  setPre(3, 5, 5);
  setPre(3, 6, 3);
  setPre(4, 1, 1);
  setPre(4, 4, 7);
  setPre(4, 8, 6);
  setPre(5, 2, 3);
  setPre(5, 3, 2);
  setPre(5, 7, 8);
  setPre(6, 1, 6);
  setPre(6, 3, 5);
  setPre(6, 8, 9);
  setPre(7, 2, 4);
  setPre(7, 7, 3);
  setPre(8, 5, 9);
  setPre(8, 6, 7);
  chessInit(); //初始化棋盘
  printChess(); //打印棋盘
}

chess();
