console.table(productos);
let cart = [];

// OBTENGO EL OBJETO listaProductos PARA LUEGO AGREGAR LOS PRODUCTOS 
const listaProductos = document.getElementById('listaProductos');

// FUNCION  ENCARGADA DE GENERAR LA CAJA DE CADA PRODUCTO
function getProducts(productList) {
    for (const prod of productList) {
        listaProductos.innerHTML += `
            <div class="card" style="width: 15rem;">
                <img class="card-img-top" src=${prod.imagen} alt=${prod.descripcion}/>
                <div class="card-body">
                    <h5 class="card-title">${prod.descripcion}</h5>
                    <p class="card-text">$ ${prod.precio}</p>
                    <button id=${prod.id} name="btnAddCart" class="btn btn-primary">Agregar</button>
                </div>
            </div>
        `;
    }

    // AGREGO EVENTO A LOS BOTONES PARA LLAMAR A LA FUNCION QUE AGREGA AL CARRITO
    let botones = document.getElementsByName('btnAddCart');

    for (const boton of botones) {

        boton.addEventListener('click', () => {

            console.log('Agregaste el producto ' + boton.id);
            const prodACarro = productList.find((producto) => producto.id == boton.id);
            console.log(prodACarro);

            // LLAMO A LA FUNCION PARA AGREGAR EL PRODUCTO
            addCart(prodACarro);
        });

        boton.onmouseover = () => boton.classList.replace('btn-primary', 'btn-warning');
        boton.onmouseout = () => boton.classList.replace('btn-warning', 'btn-primary');
    }
}

// FUNCION PARA CALCULAR EL TOTAL DE PRODUCTOS E IMPORTE DEL CARRITO
function calcProductsCart(cartList) {

    let totalCartImport = 0;
    let tatalCartItems = cartList.length;

    for (const prod of cartList) {
        totalCartImport += prod.precio;
    }

    alert(`Cantidad de productos: ${tatalCartItems}, por un total de $ ${totalCartImport} `);
}

// FUNCION PARA AGREGAR ELEMENTOS AL CARRITO
function addCart(producto) {

    cart.push(producto);
    console.table(cart);
    alert(`Agregaste ${producto.descripcion} al carro 🛒`);

    // CALCULO LA CANTIDAD DE ITEMS Y EL TOTAL A PAGAR
    calcProductsCart(cart);
}

// INVOCO LA FUNCION PARA LISTAR LOS PRODUCTOS
getProducts(productos);
