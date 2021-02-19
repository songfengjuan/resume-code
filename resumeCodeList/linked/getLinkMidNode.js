/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function middleNode(head){
    let cur = head;
    let num =0;
    while(cur){
        num++;
        cur = cur.next;
    }
    const mid = Math.floor(num/2);
    num=0;
    cur = head;
    while(num<mid){
        cur = cur.next;
    }
    return cur;
}