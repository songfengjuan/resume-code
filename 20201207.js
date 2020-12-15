/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

const { get } = require("core-js/fn/dict");

/**
 * @param {TreeNode} root
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */
var isCousins = function (root, x, y) {
  if (!root) return false;
  let nodesList = []
  if (node.left) {
    nodesList.push({
      node: node.left,
      parent: node.val
    })
  }
  if (node.right) {
    nodesList.push({
      node: node.right,
      parent: node.val
    })
  }
  function getChild(nodesList, x, y) {
    let hasObj = {};
    let count = 0;
    let newNodesList = []
    nodesList.forEach((item) => {
      if(count ===2 ) return;
      const { node, parent } = item;
      if (node) {
        if (node.val === x) {
          hasObj.x = item
          count++;
        }
        if (node.val === y) {
          hasObj.y = item;
          count++;
        }
        if(node.left){
          newNodesList.push(
            {
              node: node.left,
              parent:parent.val
            }
          )
        }
        if(node.right){
          newNodesList.push(
            {
              node: node.right,
              parent:parent.val
            }
          )
        }
      }
    })
    if(count<2){
      getChild(newNodesList,x,y);
    }
  }
};