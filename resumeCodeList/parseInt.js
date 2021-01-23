function filterInt(val) {
    const reg = /^(\-|\+)?([0-9]+|Infinity)$/;
    const isNum = reg.test(val);
    if (isNum) {
        return val;
    } else {
        return NaN;
    }
}
function dealParse(str, radix) {
    const sign = str[0] === '-' ? '-' : '';
    str = str.replace(/^(\-|\+)/, '');
    console.log('dealParse',str);
    let numList = [];
    let result=0;
    for(let i=0;i<str.length;i++){
        let num;
        const charCode = str[i].toUpperCase().charCodeAt(0);
        if(radix>=11&&radix<=36){
            if(charCode>=65&&charCode<=90){
                num = charCode -55
            }else{
                num = charCode -48
            }
        }else{
            num = charCode -48
        }
        if(num<radix){
            numList.push(num);
        }else{
            if(!numList.length){
                return NaN;
            }else{
                break
            }
          
        }
    }
    numList.forEach((item,index)=>{
        result +=item*Math.pow(radix,numList.length-index-1);
    })
    if(sign === '-') result = -result;
    console.log('result',result)
    return result;

}
function dealRadix(str,radix){
    const reg10 = /^(\-|\+)?[0-9]+/;
    const reg16 = /^(\-|\+)?(0X)?[0-9A-F]+/;
    const regOther = /^(\-|\+)?[0-9A-F]+/;
    let res;
    let newRadix;
    switch(radix){
        case 10:
        case 0:
            res = str.match(reg10);
            newRadix=10;
            break;
        case 16:  
            res = str.match(reg16);
            newRadix=radix;
            break;
        default:
            res = str.match(regOther);
            newRadix=radix; 
            break;
    }
    if (res) {
        str = res[0];
        if(radix === 16){
            str = str.replace('0X', '');
        }
        return dealParse(str, newRadix);
    } else {
        return NaN;
    }
}
function myParseInt(str, radix) {
    if (typeof str !== 'string' && typeof str !== 'number') return NaN;
    str = String(str);
    str = str.trim();
    str = str.toUpperCase();
    if (typeof radix === 'number' && Number.isInteger(radix) && (radix === 0 || (radix >= 2 && radix <= 36))) {
       return dealRadix(str,radix)
    } else if (typeof radix === 'undefined') {
        return  dealRadix(str,10)
    } else {
        return NaN;
    }
}