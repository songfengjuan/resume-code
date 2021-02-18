/**
 * initialize your data structure here.
 */
var MinStack = function() {
    this.stacks = [];
    this.min_stacks = [Infinity];
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
    this.stacks.push(x);
    this.min_stacks.push(Math.min( this.min_stacks[this.min_stacks.length-1],x));
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    this.stacks.pop();
    this.min_stacks.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return this.stacks[this.stacks.length-1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    return this.min_stacks[this.min_stacks.length-1];
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */