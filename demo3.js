const event = {
    callBacks :[],
    on(func){
        this.callBacks.push(func);
    },
    emit(para){

        this.callBacks.map(fun=>fun(para));

    },
    remove(func){
        const index = this.callBacks.indexOf(func);
        if(index>-1){
            this.callBacks.splice(index,1);
        }

    }
}
