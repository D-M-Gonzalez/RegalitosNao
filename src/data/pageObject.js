export default class pageObject{
    constructor(){
        this.total = 0
        this.page = 0
        this.size = 0
    }
    setTotal(param){
        this.total = param
    }
    getTotal(){
        return this.total
    }
}