import { itemContainer, itemsContainer, itemDetail, pageUrl } from "../index.js"
import { findProducts } from "../controller/findProduct.js"
import { pageHandler } from "../index.js"
import { crearPagination } from "./paginationHandler.js"
import { findProductById } from "../controller/findProductById.js"
import { navigateBack } from "./navigationHandler.js"

let mainImage = "";
let miniImage1 = "";
let miniImage2 = "";
let miniImage3 = "";
let item = "";

export async function loadItems(params){
    const response = await findProducts(params["page"],params["size"],params["category"],params["subcategory"],params["search"])
    pageHandler.setTotal(response.total)
    clearCartas()
    crearCartas(response)
    crearPagination(params["page"],params["size"])
}

export async function loadItembyId(){
    const hash = location.hash.replace("#","")
    const response = await findProductById(hash)
    itemsContainer.style.height = "0px"
    itemsContainer.style.opacity = 0
    clearItemDetail()
    itemDetail.style.height = "auto"
    itemDetail.style.opacity = 1
    crearItemDetail(response)
}

export async function clearCartas(){
    while (itemContainer.lastElementChild){
        itemContainer.lastElementChild.removeEventListener("click",cardClick)
        itemContainer.removeChild(itemContainer.lastElementChild);
    }
}

export function cardClick(event){
    pageUrl.useHashParams(event.currentTarget.id)
    loadItembyId()
}

export async function crearCartas(products){
    if (products.items.length > 0){
        products.items.forEach((product)=>{
            let card = document.createElement("DIV")
            card.setAttribute("id", product.data.id)
            card.setAttribute("class", "carta hvr-grow")
            card.innerHTML = `
                            <div id="${product.data.id}">
                                <img class="carta__image" src="${product.data.images[0]}">
                                <span>${product.data.name}</span>
                                <b>S/${product.data.price}</b>
                            </div>
            `
        card.addEventListener("click",cardClick)
        itemContainer.appendChild(card)
        })
    }
}

export async function clearItemDetail(){

    if(itemDetail.childElementCount > 0){
        const backButton = document.getElementById("buttons_volver")
        const buyButton = document.getElementById("buttons_comprar")
    
        backButton.removeEventListener("click",handleClick)
        buyButton.removeEventListener("click",handleClick)
    }

    while (itemDetail.lastElementChild){
        itemDetail.removeChild(itemDetail.lastElementChild);
    }
}

export async function crearItemDetail(response){
    item = response
    let detail = document.createElement("div")
    detail.setAttribute("class","detail_container")
    detail.innerHTML = `
        <div class="main_image_container"><img class="detail_main_image" id="main_image" src="${response.data.images[0]}"></div>
        <div class="mini_image_container">
            <ul class="detail_mini_container">
                <li class="detail_image_item"><button class="detail_mini_button"><img class="detail_mini_image_active" id="mini_image1" src="${response.data.images[0]}"></button></li>
                <li class="detail_image_item"><button class="detail_mini_button"><img class="detail_mini_image_inactive" id="mini_image2" src="${response.data.images[1]}"></button></li>
                <li class="detail_image_item"><button class="detail_mini_button"><img class="detail_mini_image_inactive" id="mini_image3" src="${response.data.images[2]}"></button></li>
            </ul>
        </div>
        <div class="information_container">
            <span class="detail_name">${response.data.name}</span>
            <span class="detail_description_1">${response.data.description1}</span>
            <span class="detail_description_2">${response.data.description2}</span>
            <span class="detail_price">Precio: S/${response.data.price}</span>
            <span class="detail_category">${response.data.category}</span>
        </div>
        <div class="buttons_container">
            <span class="buttons_detail" id="${response.data.name}_${response.data.price}">Comprar</span>
            <span class="buttons_detail" id="buttons_volver">Volver</span>
        </div>
    `
    itemDetail.appendChild(detail)
    const buttons = document.querySelectorAll(".buttons_detail")
    mainImage = document.getElementById("main_image")
    miniImage1 = document.getElementById("mini_image1")
    miniImage2 = document.getElementById("mini_image2")
    miniImage3 = document.getElementById("mini_image3")

    buttons.forEach((button)=>{
        button.addEventListener("click",handleClick)
    })

    miniImage1.addEventListener("click",handleChangeImage)
    miniImage2.addEventListener("click",handleChangeImage)
    miniImage3.addEventListener("click",handleChangeImage)
    window.scrollTo(0,0);
}

export function handleClick(event){
    const data = event.currentTarget.id.split("_")
    event.currentTarget.id === "buttons_volver" ? navigateBack() : buyItem(data)
}

export function buyItem(data){
    const hash = pageUrl.hashURL.replace("#","%23")
    window.open(`https://wa.me/+51912871010?text=Hola Naomi, quisiera comprarte un producto: ${data[0]} a S/${data[1]}
    link al producto: http%3A%2F%2F127.0.0.1%3A5501%2FSections%2Ftienda.html${hash}`)
}

export function handleChangeImage(event){
    mainImage.setAttribute("src",event.currentTarget.src)
    miniImage1.setAttribute("class", "detail_mini_image_inactive")
    miniImage2.setAttribute("class", "detail_mini_image_inactive")
    miniImage3.setAttribute("class", "detail_mini_image_inactive")
    event.currentTarget.setAttribute("class","detail_mini_image_active")
}