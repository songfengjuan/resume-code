//  设计并实现一个算法，找出二叉树中某两个节点的第一个共同祖先。不得将其他的节点存储在另外的数据结构中。注意：这不一定是二叉搜索树。
// 模式识别：树的问题通常可以用递归解决

function lowerCommomAncestor(root,p,q){
    let ans;
    if(root === null) return false;

    const dfs = (root,p,q) => {
        if(root === null) return false;
        const lson = dfs(root.left,p,q);
        const rson = dfs(root.right,p,q);
        if((lson&&rson)||(root.val===p.val||root.val===q.val)&&(lson||rson)){
            ans = root;
        }
        return lson||rson||(root.val===p.val||root.val===q.val)
    }
    dfs(root,p,q);
    return ans;
}