// 9*9 数独求解
var problem = [
  [8, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 3, 6, 0, 0, 0, 0, 0],
  [0, 7, 0, 0, 9, 0, 2, 0, 0],
  [0, 5, 0, 0, 0, 7, 0, 0, 0],
  [0, 0, 0, 0, 4, 5, 7, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 3, 0],
  [0, 0, 1, 0, 0, 0, 0, 6, 8],
  [0, 0, 8, 5, 0, 0, 0, 1, 0],
  [0, 9, 0, 0, 0, 0, 4, 0, 0],
];
var stack = [],
  flag = false;

function findAnswer() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; ) {
      if (problem[i][j] === 0 || flag) {
        flag = false;
        let k = problem[i][j] + 1;
        while (k < 10) {
          problem[i][j] = k;
          if (check20Grid(problem, i, j) == 0) {
            stack.push([i, j++]);
            break;
          }
          k++;
        }
        if (k > 9) {
          problem[i][j] = 0;
          let rt = stack.pop();
          if (!rt) return 0;
          i = rt[0];
          j = rt[1];
          flag = true;
        }
      } else {
        j++;
      }
      // console.log('i:'+i+'---j:'+j)
    }
  }
  return 1;
}

function check20Grid(sudo, i, j) {
  let row = {},
    col = {},
    subSudo = {};
  for (let k = 0; k < 9; k++) {
    let cur1 = sudo[i][k],
      cur2 = sudo[k][j];
    if (row[cur1]) return 1;
    else row[cur1] = cur1;
    if (col[cur2]) return 2;
    else col[cur2] = cur2;
    let key =
      sudo[Math.floor(i / 3) * 3 + Math.floor(k / 3)][
        Math.floor(j / 3) * 3 + Math.floor(k % 3)
      ];
    if (subSudo[key]) return 3;
    else subSudo[key] = key;
  }
  return 0;
}

function checkValid(sudo) {
  let subSudo = {};
  for (let i = 0; i < 9; i++) {
    let row = {},
      col = {};
    for (let j = 0; j < 9; j++) {
      let cur1 = sudo[i][j],
        cur2 = sudo[j][i];
      if (row[cur1]) return 1;
      else row[cur1] = cur1;
      if (col[cur2]) return 2;
      else col[cur2] = cur2;

      let key = Math.floor(i / 3) + '-' + Math.floor(j / 3);
      if (subSudo[key]) {
        if (subSudo[key][cur1]) return 3;
        else subSudo[key][cur1] = cur1;
      } else {
        subSudo[key] = {};
        subSudo[key][cur1] = cur1;
      }
    }
  }
  return 0;
}
console.log('checkValid', checkValid(problem));
console.log(findAnswer());
console.dir(problem);
