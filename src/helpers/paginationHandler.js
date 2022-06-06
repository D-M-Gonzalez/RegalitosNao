import { pageUrl } from "../index.js";
import { pageHandler } from "../index.js";

export function crearPagination(page,size){
    clearPagination()
    const totalPages = Math.trunc(Number(pageHandler.total)/Number(size))+1
    let pageNumber = Number(page)
    let minPage = pageNumber - 2
    if ( minPage < 1){
        minPage = 1;
    }
    let maxPage = minPage + 4;
    if ( maxPage > totalPages ){
        maxPage = totalPages
    }
    for (let i = minPage; i<=maxPage; i++){
        let pageDiv = document.createElement("li")
        pageDiv.setAttribute("class","pageitem")
        pageDiv.innerHTML = `
                            <a class="page-link border-0" id="page_${i}">${i}</a>
        `
        pageDiv.addEventListener("click",handlePageClick)
        pageContainer.appendChild(pageDiv)
    }

    const selectedPage = document.getElementById(`page_${pageNumber}`)
    selectedPage.style.backgroundColor = "rgb(255,206,199)"
}

export function clearPagination(){
    if ( pageContainer.hasChildNodes){
        while (pageContainer.lastElementChild){
            pageContainer.lastElementChild.removeEventListener("click",handlePageClick)
            pageContainer.removeChild(pageContainer.lastElementChild);
        }
    }
}

export function doNextPage(){
    const queryParams = pageUrl.getQueryParams()
    queryParams.page < (Math.trunc(pageHandler.total/queryParams.size)+1) && pageUrl.setQueryParams({page:Number(queryParams.page)+1})
    pageUrl.useQueryParams()
}

export function doPrevPage(){
    const queryParams = pageUrl.getQueryParams()
    queryParams.page > 1 && pageUrl.setQueryParams({page:Number(queryParams.page)-1})
    pageUrl.useQueryParams()
}

export function handlePageClick(event){
    const page = event.target.id.split("_")
    pageUrl.setQueryParams({page:page[1]})
    pageUrl.useQueryParams()
}