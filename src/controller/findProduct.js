import {serverURL} from "../data/server.js";

export async function findProducts(page,size,category,subcategory,search) { //Controlador usado para encontrar todos los items de un usuario
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch( serverURL + `api/products?page=${page}&size=${size}&category=${category}&subcategory=${subcategory}&search=${search}`, //Pasa la id del usuario por query
      requestOptions
    );
    const data = await response.json();
    return data; //Retorna un objeto que contiene el estado de la transacción, el mensage generado y los datos
}