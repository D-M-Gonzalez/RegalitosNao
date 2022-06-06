import queryURL from "./data/queryObject.js";
import { doNextPage, doPrevPage } from "./helpers/paginationHandler.js";
import { search, navigate, navigateOcation } from "./helpers/searchHandler.js";
import { initialLoad, updatePage } from "./helpers/navigationHandler.js";
import pageObject from "./data/pageObject.js";

export const pageUrl = new queryURL();
export const pageHandler = new pageObject();

export const category = document.querySelectorAll(".category")
export const subcategory = document.querySelectorAll(".subcategory")
export const ocation = document.querySelectorAll(".ocation")
export const itemContainer = document.getElementById("itemContainer")
export const handmadelist = document.getElementById("handmadelist")
export const regalartevidalist = document.getElementById("regalartevidalist")
export const naoscakelist = document.getElementById("naoscakelist")
export const searchInput = document.getElementById("searchinput")
export const prevPage = document.getElementById("prevPage")
export const nextPage = document.getElementById("nextPage")
export const pageContainer = document.getElementById("pageContainer")
export const itemsContainer = document.getElementById("items_container")
export const itemDetail = document.getElementById("item_detail")

window.addEventListener("load",initialLoad)
window.addEventListener("hashchange",updatePage)
searchInput.addEventListener("input",search)
prevPage.addEventListener("click", doPrevPage)
nextPage.addEventListener("click", doNextPage)

category.forEach((el)=>{
    el.addEventListener("click",navigate)
})
subcategory.forEach((el)=>{
    el.addEventListener("click",navigate)
})
ocation.forEach((el)=>{
    el.addEventListener("click",navigateOcation)
})