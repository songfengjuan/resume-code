/*
需再所拷贝的表格区域添加calss = needtbody
*/

// var tbodyList = document.getElementsByTagName('tbody');
var tbodyList = document.getElementsByClassName("needtbody");
// console.log('tbodyList', tbodyList);
var list = {};
for (var i = 0; i < tbodyList.length; i++) {
  let tbodyChild = tbodyList[i].children;
  //   console.log('tbodyChild', tbodyChild);
  for (var j = 1; j < tbodyChild.length; j++) {
    var obj = {};
    var tdList = tbodyChild[j].getElementsByTagName("td");
    var td0 = tdList[2];
    var td3 = tdList[3];
    var td0Attr = td0.getAttribute("data-slatenode");
    var td0Obj = JSON.parse(td0Attr);
    var td0Val =
      td0Obj.nodes[0].text ||
      (td0Obj.nodes[0].nodes && td0Obj.nodes[0].nodes[0].text);
    if (td0Val) {
      if (td3) {
        var td3Attr = td3.getAttribute("data-slatenode");
        var td3Obj = JSON.parse(td3Attr);
        var td3Val = td3Obj.nodes[0].nodes[1].data.href;
        obj[td0Val] = td3Val;
        list = { ...list, ...obj };
      }
    }
  }
}
function getPics2(picList, minCount, index) {
  let list = picList.slice(index, index + 1)[0];
  let newList = [];
  list.forEach((item) => {
    let res = randomSort(item).slice(0, minCount)[0];
    newList.push(res);
  });
  return newList;
}

function selectAssetList({ assetList }) {
  if (!assetList) {
    return {};
  }
  const {
    picList1,
    picList2,
    picList3,
    numPicList1,
    numPicList2,
    numPicList3,
  } = assetList;
  const nScope1 = getArrFromCollect([0, endN1 - 1]);
  const nScope2 = getArrFromCollect([0, endN2 - 1]);
  const n1 = randomSort(nScope1)[0];
  const n2 = randomSort(nScope2)[0];
  debugger;
  const changePics = getPics(picList1, MIN_ITEM_COUNT);
  const changePics2 = getPics2(picList2, MIN_ITEM_COUNT, n2);
  const changePics3 = getPics2(picList3, MIN_ITEM_COUNT, n2);
  const numPics1 = getPics2(numPicList1, MIN_ITEM_COUNT, n1);
  const numPics2 = getPics2(numPicList2, MIN_ITEM_COUNT, n2);
  const numPics3 = getPics2(numPicList3, MIN_ITEM_COUNT, n2);
  console.log(
    "changePics: ",
    changePics,
    changePics2,
    changePics3,
    numPics1,
    numPics2,
    numPics3
  );

  return {
    changePics,
    changePics2,
    changePics3,
    numPics1,
    numPics2,
    numPics3,
  };
}
