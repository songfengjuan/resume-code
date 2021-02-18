 /**
  *  翻转链表
  */
 function reverseLink(head){
     let prev = null;
     let cur = head;
     while(cur){
         const next = cur.next;
         cur.next = prev;
         prev = cur;
         cur = next;
     }
     return prev;
 }