// 9*9 数独求解，看起来太繁琐
var Sudoku = {
  init: function(str) {
    this.blank = [];
    this.fixed = [];
    this.cell = [];
    this.trials = [];
    for (i = 0; i < 81; i++) {
      var chr = str.charCodeAt(i);
      if (chr == 48) {
        this.cell[i] = 511;
        this.blank.push(i);
      } else {
        this.cell[i] = 1 << (chr - 49);
        this.fixed.push(i);
      }
    }
  },
  showBoard: function() {
    var board = '';
    for (var i = 0; i < 81; i++) {
      if (i % 9 == 0) {
        board = board.concat('\n');
      }
      board = board.concat('[');
      for (var j = 0; j < 9; j++) {
        if (((this.cell[i] >> j) & 1) == 1) {
          board = board.concat(String.fromCharCode(j + 49));
        }
      }
      board = board.concat(']');
    }
    return board;
  },
  check: function() {
    var checkpoint = [0, 12, 24, 28, 40, 52, 56, 68, 80];
    for (var i in checkpoint) {
      var r, b, c;
      r = b = c = this.cell[checkpoint[i]];
      for (j = 0; j < 8; j++) {
        c ^= this.cell[this.getX(checkpoint[i])[j]];
        b ^= this.cell[this.getX(checkpoint[i])[8 + j]];
        r ^= this.cell[this.getX(checkpoint[i])[16 + j]];
      }
      if ((r & b & c) != 0x1ff) {
        return false;
      }
    }
    return true;
  },
  bitCount: function(i) {
    var n = 0;
    for (var j = 0; j < 9; j++) {
      if (((i >> j) & 1) == 1) n++;
    }
    return n;
  },
  numberOfTrailingZeros: function(i) {
    var n = 0;
    for (var j = 0; j < 9; j++) {
      if (((i >> j) & 1) == 0) n++;
      else {
        break;
      }
    }
    return n;
  },
  updateCandidates: function() {
    for (var i in this.fixed) {
      var opt = 0x1ff ^ this.cell[this.fixed[i]];
      for (var j = 0; j < 24; j++) {
        this.cell[this.getX(this.fixed[i])[j]] &= opt;
        //!notice
        if (this.cell[this.getX(this.fixed[i])[j]] == 0) {
          //console.log("Error-0 candidate:"+x[this.fixed[i]][j]);
          return false;
        }
      }
    }
    return true;
  },
  seekUniqueCandidate: function() {
    for (var bidx in this.blank) {
      var row = 0,
        col = 0,
        box = 0;
      for (i = 0; i < 8; i++) {
        row |= this.cell[this.getX(this.blank[bidx])[i]];
        box |= this.cell[this.getX(this.blank[bidx])[8 + i]];
        col |= this.cell[this.getX(this.blank[bidx])[16 + i]];
      }
      if (this.bitCount(this.cell[this.blank[bidx]] & ~row) == 1) {
        this.cell[this.blank[bidx]] &= ~row;
        continue;
      }
      if (this.bitCount(this.cell[this.blank[bidx]] & ~col) == 1) {
        this.cell[this.blank[bidx]] &= ~col;
        continue;
      }
      if (this.bitCount(this.cell[this.blank[bidx]] & ~box) == 1) {
        this.cell[this.blank[bidx]] &= ~box;
      }
    }
  },
  seekFilledable: function() {
    this.fixed = [];
    var _del = [];
    for (var i in this.blank) {
      if (this.bitCount(this.cell[this.blank[i]]) == 1) {
        this.fixed.push(this.blank[i]);
        //console.log("fixed:"+this.blank[i]+"=>"+this.cell[this.blank[i]]);
        //this.blank.splice(i, 1);//to delete it in the loop would cause bug
        _del.push(i);
      }
    }
    while (_del.length > 0) {
      this.blank.splice(_del.pop(), 1);
    }
  },
  seekMutexCell: function() {
    var two = [];
    for (var n in this.blank) {
      if (this.bitCount(this.cell[this.blank[n]]) == 2) {
        two.push(this.blank[n]);
      }
    }
    for (var i = 0; i < two.length; i++) {
      for (var j = i + 1; j < two.length; j++) {
        if (this.cell[two[i]] == this.cell[two[j]]) {
          var opt = ~this.cell[two[i]];
          if (parseInt(two[i] / 9) == parseInt(two[j] / 9)) {
            for (n = 0; n < 8; n++) {
              this.cell[this.getX(two[i])[n]] &= opt;
            }
          }
          if ((two[i] - two[j]) % 9 == 0) {
            for (n = 8; n < 16; n++) {
              this.cell[this.getX(two[i])[n]] &= opt;
            }
          }
          if (
            parseInt(two[i] / 27) * 3 + parseInt((two[i] % 9) / 3) ==
            parseInt(two[j] / 27) * 3 + parseInt((two[j] % 9) / 3)
          ) {
            for (n = 16; n < 24; n++) {
              this.cell[this.getX(two[i])[n]] &= opt;
            }
          }
          this.cell[two[j]] = ~opt;
        }
      }
    }
  },
  basicSolve: function() {
    do {
      if (!this.updateCandidates(this.fixed)) {
        this.backForward();
      }
      this.seekUniqueCandidate();
      this.seekMutexCell();
      this.seekFilledable();
    } while (this.fixed.length != 0);
    return this.blank.length == 0;
  },
  setTrialCell: function() {
    for (var i in this.blank) {
      if (this.bitCount(this.cell[this.blank[i]]) == 2) {
        var trialValue =
          1 << this.numberOfTrailingZeros(this.cell[this.blank[i]]);
        var waitingValue = this.cell[this.blank[i]] ^ trialValue;
        //console.log("try:[" + this.blank[i] + "]->" + (this.numberOfTrailingZeros(trialValue) + 1) + "#" + (this.numberOfTrailingZeros(waitingValue) + 1));
        this.cell[this.blank[i]] = trialValue;
        this.trials.push(
          this.createTrialPoint(this.blank[i], waitingValue, this.cell)
        );
        return true;
      }
    }
    return false;
  },
  backForward: function() {
    if (this.trials.length == 0) {
      console.log('Maybe no solution!');
      return;
    }
    var back = this.trials.pop();
    this.reset(back.data);
    this.cell[back.idx] = back.val;
    this.fixed.push(back.idx);
    //console.log("back:[" + back.idx + "]->" + (this.numberOfTrailingZeros(back.val) + 1));
  },
  reset: function(data) {
    this.blank = [];
    this.fixed = [];
    this.cell = data.concat();
    for (var i = 0; i < 81; i++) {
      if (this.bitCount(this.cell[i]) != 1) {
        this.blank.push(i);
      } else {
        this.fixed.push(i);
      }
    }
  },
  trialSolve: function() {
    while (this.blank.length != 0) {
      if (this.setTrialCell()) {
        this.basicSolve();
      } else {
        if (this.trials.length == 0) {
          //console.log("Can't go backforward! Maybe no solution!");
          break;
        } else {
          this.backForward();
          this.basicSolve();
        }
      }
    }
  },
  play: function() {
    console.log(this.showBoard());
    var start = new Date().getMilliseconds();
    if (!this.basicSolve()) {
      this.trialSolve();
    }
    var end = new Date().getMilliseconds();
    console.log(this.showBoard());
    if (this.check()) {
      console.log('[' + (end - start) + 'ms OK!]');
    } else {
      console.log('[' + (end - start) + 'ms, cannot solve it?');
    }
    //return this.showBoard();
  },
  getX: function(idx) {
    var neighbors = new Array(24);
    var box = new Array(0, 1, 2, 9, 10, 11, 18, 19, 20);
    var r = parseInt(idx / 9);
    var c = idx % 9;
    var xs = parseInt(idx / 27) * 27 + parseInt((idx % 9) / 3) * 3;
    var i = 0;
    for (var n = 0; n < 9; n++) {
      if (n == c) continue;
      neighbors[i++] = r * 9 + n;
    }
    for (var n = 0; n < 9; n++) {
      if (n == r) continue;
      neighbors[i++] = c + n * 9;
    }
    for (var n = 0; n < 9; n++) {
      var t = xs + box[n];
      if (t == idx) continue;
      neighbors[i++] = t;
    }
    return neighbors;
  },
  createTrialPoint: function(idx, val, board) {
    var tp = {};
    tp.idx = idx;
    tp.val = val;
    tp.data = board.concat();
    return tp;
  },
};
//Sudoku.init("000000500000008300600100000080093000000000020700000000058000000000200017090000060");
//Sudoku.init("530070000600195000098000060800060003400803001700020006060000280000419005000080079");
Sudoku.init(
  '800000000003600000070090200050007000000045700000100030001000068008500010090000400'
);
Sudoku.play();
