import { pageUrl } from "../index.js"

export function search(event){
    pageUrl.setQueryParams({search:event.target.value})
    pageUrl.useQueryParams()
    updatePage()
}

export function navigate(event){
    event.preventDefault()
    const categories = event.target.id.split("&")
    let category = "ALL";
    let subcategory = "ALL";
    pageUrl.hashURL = "#"
    if(categories[0] == 'handmade' && categories[1] == 'ALL'){
        category = changeCategory(handmadelist,regalartevidalist,naoscakelist,categories[0])
    } else if (categories[0] == 'regalartevida' && categories[1] == 'ALL'){
        category = changeCategory(regalartevidalist,handmadelist,naoscakelist,categories[0])
    } else if (categories[0] == 'naoscake' && categories[1] == 'ALL'){
        category = changeCategory(naoscakelist,handmadelist,regalartevidalist,categories[0])
    }
     else {
        category = categories[0]
        subcategory = categories[1]
    }

    pageUrl.setQueryParams({page:1,size:10,category:category,subcategory:subcategory,search:""})
    pageUrl.useQueryParams()
}

export function navigateOcation(event){
    event.preventDefault()
    pageUrl.setQueryParams({search:event.target.id})
    pageUrl.useQueryParams()
}

export function changeCategory(clickedElement,notClicked1,notClicked2,category){
    let value = 'ALL'
    if (clickedElement.className && clickedElement.className == 'visible'){
        clickedElement.setAttribute("class","hidden")
        value = 'ALL'
    } else {
        clickedElement.setAttribute("class","visible")
        notClicked1.setAttribute("class","hidden")
        notClicked2.setAttribute("class","hidden")
        value = category
    }
    return value
}