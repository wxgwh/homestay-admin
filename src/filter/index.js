let filter={
    formateTime(value){
        let date=new Date(value*1000);
        let time = [date.getFullYear(),date.getMonth()+1,date.getDate()].join('-');
        return time;
    }
}

export default filter