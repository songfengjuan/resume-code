function dealParse(str,radix){
    const sign = str[0] === '-'?'-':'';
    str = str.replace(/^(\-|\+)/,'');
    let numList = [];
    let result = 0;
    for(let i=0;i<str.length;i++){
        let num;
        const charCode = str[i].charCodeAt(0);
        if(radix>=11&&radix<=36){
            if(charCode>=65&&charCode<=90){
                num = charCode-55;
            }else{
                num = charCode-48;
            }
        }else{
            num = charCode-48;
        }
        if(num<radix){
            numList.push(num);
        }else{
            if(numList.length){
                break;
            }else{
                return NaN;
            }

        }
        
    }
    numList.map((item,index)=>{
        result += item*Math.pow(radix,numList.length-index-1);
    })
    return result;

}
function dealRadix(str,radix){
    str = String(str);
    str = str.trim().toUpperCase();
    const reg10 = /^(\-|\+)?[0-9]+/;
    const reg16 =  /^(\-|\+)?(0X)?[0-9A-F]+/;
    const regOther = /^(\-|\+)?[0-9A-F]+/;
    let res,newStr;
    switch(radix){
        case 0:
        case 10:   
            res = str.match(reg10);
        break;
        case 16:   
            res = str.match(reg16);
        break;
        default :   
            res = str.match(regOther);
        break;
    }
    radix = radix===0?10:radix;
    if(res){
        newStr = res[0];
        if(radix === 16){
            newStr.replace(/^0X/,'');
        }
    }else{
        return NaN;
    }
    return dealParse(newStr,radix);

}
function myParseInt(str,radix){
    if(typeof str!== 'string'&& typeof str!== 'number') return false;

    if(typeof radix === 'number' && Number.isInteger(radix)&&(radix===0||(radix>=2&&radix<=36))){
        return dealRadix(str,radix);
    }else if(typeof radix === 'undefined' ){
        return dealRadix(str,10);
    }else{
        return NaN;
    }
}