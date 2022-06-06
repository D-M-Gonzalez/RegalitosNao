export default class queryURL{
    constructor(){
        this.URL = undefined;
        this.baseURL = undefined;
        this.hashURL = undefined;
        this.queryURL = undefined;
        this.params = undefined;
        this.initialSetup();
    }
    initialSetup(){
        const hashCheck = window.location.href.split("#")
        const queryCheck = hashCheck[1] && hashCheck[1].split("?")
        if(queryCheck && queryCheck[1]){
            this.queryURL = "?" + queryCheck[1]
            this.getQueryParams()
            this.useQueryParams()
        } else if(hashCheck[1]){
            this.useHashParams(hashCheck[1])
        } else {
            this.setQueryParams({page:1,size:10,category:"ALL",subcategory:"ALL",search:""})
            this.useQueryParams()
        }
    }
    update(){
        let tempArray = window.location.hash.split(/[?]/);
        this.URL = window.location.href;
        this.hashURL = tempArray[0];
        this.baseURL = window.location.origin + window.location.pathname + this.hashURL;
    }
    getQueryParams(){
        this.update();
        let tempParams = this.URL.replace(/(#\w+)/g,"")
        let tempArray = tempParams.split(/[?]/)
        if(tempArray[1]){
            let params = tempArray[1].split(/&/)
            params.forEach((el)=>{
                const paramArray = el.split(/=/)
                paramArray.length == 2 && (this.params = {...this.params,[paramArray[0]]:paramArray[1]})
            })
        }
        return this.params
    }
    setQueryParams(props){
        this.update();
        this.params = {...this.params,...props};
        let string = Object.entries(this.params);
        let newString = string.map((el)=>{
            return el.join("=")
        })
        let finalString = newString.join("&");
        finalString = finalString.replace(/&undefined=/,"");
        this.queryURL = "?" + finalString.replaceAll(/,/g,"");
        this.URL = this.baseURL + this.queryURL;
    }
    useQueryParams(){
        location.hash = this.hashURL + (this.queryURL ? this.queryURL : "");
    }
    useHashParams(param){
        this.hashURL = "" + param
        location.hash = this.hashURL 
    }
}