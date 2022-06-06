import { pageUrl } from "../index.js"
import { loadItembyId, loadItems } from "./itemHandler.js"

export function updatePage(){
    const queryParams = pageUrl.getQueryParams()
    loadItems(queryParams)
}

export function initialLoad(){
    window.location.href.includes("#?") ? updatePage() : loadItembyId()
}

export function navigateBack(){
    pageUrl.useHashParams("")
    window.location.reload()
}