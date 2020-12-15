import { func } from 'assert-plus';

let k, flag;
let tmp;
let s_count = 0;
let dig_index;
let dmin_count;
let dmax_count;
let dt_count;
let start;
let finish = 0;
let sudo_creating = [[], [], [], [], [], [], [], [], []];
let sudo_result = [[], [], [], [], [], [], [], [], []];
let r_count = [];
let t_count = 0;
let score;

function highestOneBit(i) {
  i |= i >> 1;
  i |= i >> 2;
  i |= i >> 4;
  i |= i >> 8;
  i |= i >> 16;
  return i - (i >> 1);
}

function bitCount(n) {
  let count = 0;
  while (n) {
    count++;
    n = n & (n - 1);
  }
  return count;
}

function smallPosition(res, data) {
  let flag = 0;
  let smallCount = 10;
  for (let i = 0; i < 9; i++) {
    if (flag) {
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

    for (let h = Math.floor(i / 3) * 3; h < Math.floor(i / 3) * 3 + 3; h++) {
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
        data[i][j] = 0x1ff; //511
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
  for (let m = 0; m < 9; m++) {
    let s = '';
    for (let n = 0; n < 9; n++) {
      let v = getV9(data[m][n]);
      if (v != -1) {
        s += v + ' ';
      } else {
        s += '_ ';
      }
    }
    console.log(s);
  }
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

  for (let i = Math.floor(m / 3) * 3; i < Math.floor(m / 3) * 3 + 3; i++) {
    for (let j = Math.floor(n / 3) * 3; j < Math.floor(n / 3) * 3 + 3; j++) {
      if (bitCount(data[i][j]) == 1) {
        block += data[i][j];
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
        // 只有一个比特位是1
        if (setMaybe(data, m, n)) {
          changed = true;
          t_count++;
        }
      }
    }
  }
  return changed;
}

function analyse(data) {
  let changed = false;
  changed = reduce(data);
  if (changed) {
    analyse(data);
  }
}
function restoreData(data) {
  let list = [];
  for (let m = 0; m < 9; m++) {
    let child = [];
    for (let n = 0; n < 9; n++) {
      let v = getV9(data[m][n]);
      child.push(v);
    }
    list.push(child);
  }
  return list;
}

function solve(data) {
  analyse(data);

  let result = check(data);

  if (result == 1) {
    let position = [0];
    /*int  *position;
		position = new int[2];*/
    smallPosition(position, data);

    let pv = data[position[0]][position[1]];

    let pvcount = bitCount(pv);
    for (let i = 0; i < pvcount; i++) {
      let testv = 1 << Math.floor(Math.log(highestOneBit(pv)) / Math.log(2));

      pv ^= testv;

      let copy = [[], [], [], [], [], [], [], [], []];
      copyData(copy, data);
      copy[position[0]][position[1]] = testv;

      solve(copy);
      if (k == 2) return;
    }
  } else if (result == 0) {
    finish = Date.now();
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

function create_seed(data) {
  let seed = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  for (let i = 0; i < 9; i++) {
    while (1) {
      let j = 0;
      // std:: random_device rd;
      // std:: mt19937 gen(rd());
      // std:: uniform_int_distribution <> dis(1, 9);
      let tmp = Math.floor(Math.random() * 9) + 1;
      //tmp = rand()%9+1;

      for (; j <= i; j++) {
        if (seed[j] == tmp) {
          break;
        }
      }
      if (j == i + 1) {
        seed[i] = tmp;
        break;
      }
    }
  }

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++)
      // * (* data + i) = seed[* (* data + i) - 1];
      data[i][j] = seed[data[i][j] - 1];
  }
}

function create_sudo(data) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (Math.floor(Math.random() * 81) >= dig_index)
        // * (* data + i) = 0x1ff;
        data[i][j] = 0x1ff;
    }
    // std:: random_device rd;
    // std:: mt19937 gen(rd());
    // std:: uniform_int_distribution <> dis(0, 80);
  }
}

function creating(data) {
  do {
    k = 0;
    t_count = 0;
    r_count[0] = 0;
    r_count[1] = 0;
    create_seed(data);
    copyData(sudo_result, data);
    init(sudo_result);
    create_sudo(sudo_result);
    copyData(sudo_creating, sudo_result);
    s_count++; //查看生成了多少组数独
    solve(sudo_creating);
  } while (!(k == 1 && tmp));
}

flag = 0;
let choice = 1;
let difficulty;
start = Date.now();
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
// std:: cout << "请输入难度：1：新手*******2.初级**********3.中级************4.高级**************5.骨灰级**************" << std:: endl;
// std:: cin >> difficulty;
difficulty = 1;
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
console.log('数量: ', s_count);
print(sudo_result);

console.log('sudo_result', restoreData(sudo_result));
console.log('答案：');
print(sudo_creating);
console.log('sudo_creating', restoreData(sudo_creating));

// std:: cout << "------------------------------用时：---------------------"
// << (double)(finish - start) / CLOCKS_PER_SEC << "second" << std:: endl;
console.log('用时: ', (finish - start) / 1000, 'second');
// std:: cout << "难度等级：" << score << std:: endl;
console.log('难度等级：', score);
