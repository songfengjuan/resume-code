let k, flag;
let tmp = false; //暂存数独是否符合条件
let s_count = 0; //产生题目数量
let dig_index = 0; //确定挖洞数量
let dmin_count; //确定难度等级下限
let dmax_count; //确定难度等级上限
let dt_count;
let start;
let finish;
let sudo_creating;
let sudo_result; //结果数独
let r_count = [0, 0]; //隐性推导
let t_count; //显性推导
let score;

let chess; //棋盘所有棋子的状态
let chessStack = []; //缓存点
sudo_creating = initEmptySudo(9);
sudo_result = initEmptySudo(9);
function initEmptySudo(n) {
  let list = [];
  for (var i = 0; i < n; i++) {
    list[i] = [];
    for (var j = 0; j < n; j++) {
      list[i][j] = null;
    }
  }
  return list;
}
/*
 * params: n
 * return the max number less than n and equal to 2^n n is integer
 */
function highestOneBit(i) {
  // 例如1000
  i |= i >> 1; // 使前2位变为1，相当于i = i | (i >> 1); i = 1000 | 0100 = 1100
  i |= i >> 2; // 使前4位变为1，由于上一步确保了前两位都是1，所以这一次移动两位，1111
  i |= i >> 4; // 使前8位变为1，1111
  i |= i >> 8; // 使前16位变为1，1111
  i |= i >> 16; // 使前32位变为1，1111
  return i - (i >> 1); // i >>> 1 无符号右移，使最高位为0，其余位为1，相减即得出结果，1111 - 0111 = 1000
}

function bitCount(n) {
  let count = 0;
  while (n) {
    count++; //只要n不为0则其至少有一个1
    n = n & (n - 1);
  }
  return count;
}

function smallPosition(res, data) {
  //res[2] = { 0 };
  let flag = 0;
  let smallCount = 10;
  for (let i = 0; i < 9; i++) {
    if (flag == 1) {
      break;
    }
    for (let j = 0; j < 9; j++) {
      let bitcount = bitCount(data[i][j]);

      if (bitcount == 2) {
        r_count[0]++;
        res[0] = i;
        res[1] = j;
        flag = 1;
        break;
      } else if (bitcount != 1) {
        if (smallCount > bitcount) {
          smallCount = bitcount;
          if (bitcount > 4) r_count[1]++;
          else r_count[0]++;
          res[0] = i;
          res[1] = j;
        }
      }
    }
  }
}

function copyData(copy, data) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      copy[i][j] = data[i][j];
    }
  }
}

function check(data) {
  for (let i = 0; i < 9; i++) {
    let row = 0;
    let col = 0;
    let block = 0;
    for (let j = 0; j < 9; j++) {
      if (bitCount(data[i][j]) > 1) {
        return 1;
      }
      row |= data[i][j];
      col |= data[j][i];
    }

    for (let h = (i / 3) * 3; h < (i / 3) * 3 + 3; h++) {
      for (let l = (i % 3) * 3; l < (i % 3) * 3 + 3; l++) {
        block |= data[h][l];
      }
    }
    if (row != 0x1ff || col != 0x1ff || block != 0x1ff) {
      return -1;
    }
  }
  return 0;
}

function tryReduce(data, m, n, v) {
  let old = data[m][n];
  data[m][n] = old & v;
  return data[m][n] != old;
}

function init(data) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (data[i][j] != 0) {
        data[i][j] = 1 << (data[i][j] - 1);
      } else {
        data[i][j] = 0x1ff;
      }
    }
  }
}

function getV9(v) {
  // 使用switch与使用Math.log时间效率差不多
  switch (v) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 3;
    case 8:
      return 4;
    case 16:
      return 5;
    case 32:
      return 6;
    case 64:
      return 7;
    case 128:
      return 8;
    case 256:
      return 9;
    default:
      break;
  }
  return -1;
}

function print(data) {
  var say = '';
  for (let m = 0; m < 9; m++) {
    for (let n = 0; n < 9; n++) {
      let v = getV9(data[m][n]);
      if (v != -1) {
        say += v;
        // console.log(v);
        // std::cout << v << " ";
      } else {
        console.log('_');
        // (std::cout << '_') << ' ';
      }
    }
    say += '\n';
    // console.log('\n');
    // std::cout << std::endl;
  }
  console.log(say);
}

function setMaybe(data, m, n) {
  if (bitCount(data[m][n]) == 1) {
    return false;
  }
  let row = 0; // 行已确定值集合
  let col = 0; // 列已确定值集合
  let block = 0; // 宫格已确定值集合

  for (let i = 0; i < 9; i++) {
    if (bitCount(data[m][i]) == 1) {
      row += data[m][i];
    }
    if (bitCount(data[i][n]) == 1) {
      col += data[i][n];
    }
  }
  var cell_r = parseInt(m / 3);
  var cell_c = parseInt(n / 3);
  for (let i = cell_r * 3; i < (cell_r + 1) * 3; i++) {
    for (let j = cell_c * 3; j < (cell_c + 1) * 3; j++) {
      if (data[i] && data[i].length && typeof data[i][j] == 'number') {
        if (bitCount(data[i][j]) == 1) {
          block += data[i][j];
        }
      } else {
        debugger;
        console.log('ssssss');
        console.log(data, i, j);
      }
    }
  }

  let have = row | col | block; // 不可能的值
  let left = 0x1ff ^ have; // 候选数

  return tryReduce(data, m, n, left);
}

function reduce(data) {
  let changed = false;
  for (let m = 0; m < 9; m++) {
    for (let n = 0; n < 9; n++) {
      if (bitCount(data[m][n]) != 1) {
        if (setMaybe(data, m, n)) {
          changed = true;
          t_count++;
        }
      }
    }
  }
  return changed;
}

// 候选值删选
function analyse(data) {
  let changed = false;
  changed = reduce(data);
  if (changed) {
    analyse(data);
  }
}

function solve(data) {
  analyse(data);

  let result = check(data);

  if (result == 1) {
    let position = [0, 0];
    smallPosition(position, data);

    let pv = data[position[0]][position[1]];

    let pvcount = bitCount(pv);
    for (let i = 0; i < pvcount; i++) {
      // int testv = 1 << ((int)(log(highestOneBit(pv)) / log(2)));
      let testv = 1 << Math.floor(Math.log(highestOneBit(pv)) / Math.log(2));

      pv ^= testv;

      let copy = initEmptySudo(9);
      copyData(copy, data);
      copy[position[0]][position[1]] = testv;

      solve(copy);
      if (k == 2) return;
    }
  } else if (result == 0) {
    // finish = clock();
    flag = 1;
    k++; //判断是否多解
    if (k == 2) return;

    tmp =
      (r_count[0] * 1.1 + r_count[1] * 2.5 > dmin_count &&
        r_count[0] * 1.1 + r_count[1] * 2.5 < dmax_count) ||
      (t_count > dt_count && r_count[0] * 1.1 + r_count[1] * 2.5 < dmax_count);
    //std::cout << r_count[0] << std::endl << r_count[1] << std::endl << t_count << std::endl;
    score = t_count * 0.1 + r_count[0] * 1.5 + r_count[1] * 2;
    //print(data);
  }
}

function create_sudo(data) {
  var TOTAL_COUNT = 81;
  var poses = [];
  var holes = [];
  for (var i = 0; i < 9; i++) {
    holes.push([1, 1, 1, 1, 1, 1, 1, 1, 1]);
  }

  for (var i = 0; i < TOTAL_COUNT; i++) {
    poses.push(i);
  }

  for (var i = 0; i < TOTAL_COUNT * 2; i++) {
    var p1 = parseInt(Math.random() * TOTAL_COUNT);
    var p2 = parseInt(Math.random() * TOTAL_COUNT);
    var tmp = poses[p1];
    poses[p1] = poses[p2];
    poses[p2] = tmp;
  }
  var cnt = 0;
  do {
    var pos = poses[cnt];
    var i = parseInt(pos / 9);
    var j = pos % 9;
    //console.log(pos + ": " + i + ", " + j);
    holes[i][j] = 0;
  } while (++cnt < dig_index);
  for (let i = 0; i < 9; i++) {
    for (let k = 0; k < 9; k++) {
      if (holes[i][j] == 0) {
        data[i][j] = 0x1ff;
      }
    }
  }
}

function creating(data) {
  do {
    k = 0;
    t_count = 0;
    r_count[0] = 0;
    r_count[1] = 0;
    // create_seed(data);
    copyData(sudo_result, data);
    init(sudo_result);
    create_sudo(sudo_result);
    copyData(sudo_creating, sudo_result);
    s_count++; //查看生成了多少组数独
    solve(sudo_creating);
  } while (!(k == 1 && tmp));
}

function main(difficulty) {
  flag = 0;
  let choice = 1;
  // start = clock();
  let data = [
    [8, 1, 2, 7, 5, 3, 6, 4, 9],
    [6, 7, 5, 4, 9, 1, 2, 8, 3],
    [9, 4, 3, 6, 8, 2, 1, 7, 5],
    [1, 5, 4, 2, 3, 7, 8, 9, 6],
    [3, 6, 9, 8, 4, 5, 7, 2, 1],
    [2, 8, 7, 1, 6, 9, 5, 3, 4],
    [5, 2, 1, 9, 7, 4, 3, 6, 8],
    [4, 3, 8, 5, 2, 6, 9, 1, 7],
    [7, 9, 6, 3, 1, 8, 4, 5, 2],
  ];
  //int data[9][9] = { { 8 }, { 0, 7, 0, 0, 9, 0, 2 }, { 0, 0, 3, 6 }, { 0, 5, 0, 0, 0, 7 }, { 0, 0, 0, 0, 4, 5, 7 }, { 0, 0, 0, 1, 0, 0, 0, 3 }, { 0, 0, 1, 0, 0, 0, 0, 6, 8 }, { 0, 0, 8, 5, 0, 0, 0, 1, 0 }, { 0, 9, 0, 0, 0, 0, 4 } };
  // (std::cout <<
  //   '请输入难度：1：新手*******2.初级**********3.中级************4.高级**************5.骨灰级**************') <<
  //   std::endl;
  // std::cin >> difficulty;
  switch (difficulty) {
    case 1:
      dig_index = 50;
      dmin_count = -1;
      dmax_count = 1;
      break;
    case 2:
      dig_index = 45;
      dmin_count = -1;
      dmax_count = 1;
      break;
    case 3:
      dig_index = 40;
      dmin_count = 0;
      dmax_count = 4;
      dt_count = 100;
      break;
    case 4:
      dig_index = 40;
      dmin_count = 3;
      dmax_count = 15;
      dt_count = 200;
      break;
    case 5:
      dig_index = 35;
      dmin_count = 15;
      dmax_count = 1000;
      dt_count = 800;
      break;
  }
  creating(data);
  // printf('%d\n', s_count);
  print(sudo_result);
  // (((std::cout <<
  //   '------------------------------用时：---------------------') <<
  //   (double(finish - start) / CLOCKS_PER_SEC)) <<
  //   'second') <<
  //   std::endl;

  // ((std::cout << '难度等级：') << score) << std::endl;
  // system('pause');

  /*finish = clock();
	std::cout << "------------------------------------总用时：---------------------"
	<< (double)(finish - start) / CLOCKS_PER_SEC << "second" << std::endl;*/

  /*for (int i = 0; i < a; i++){
		std::random_device rd;
		std::mt19937  gen(rd());
		std::uniform_int_distribution<> dis(0, 80);
		switch (choice){
		case 1:
			sudo_result[dis(gen) / 9][dis(gen) % 9] = 0x1ff;
			break;
		case 2:
			sudo_result[dis(gen) / 9][dis(gen) % 9] = 0x1ff;
		}
		
    }
	*/
}
main(1);
