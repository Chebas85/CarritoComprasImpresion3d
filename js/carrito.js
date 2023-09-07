console.table(productos);
let cart = [];

// OBTENGO EL OBJETO listaProductos PARA LUEGO AGREGAR LOS PRODUCTOS 
const listaProductos = document.getElementById('listaProductos');

// FUNCION  ENCARGADA DE GENERAR LOS FILTROS
function getFilters() {

    const materialesUnicos = [...new Set(productos.map(producto => producto.material))];

    for (const material of materialesUnicos) {
        listaFiltros.innerHTML += `
            <label>
                <input type="radio" name="rdMeterial" id="${material}"> ${material}
            </label>
        `;
    }

    // AGREGO EVENTO A LOS INPUT RADIO, PARA LLAMAR A LA FUNCION QUE FILTRA LOS PRODUCTOS
    let rdMats = document.getElementsByName('rdMeterial');

    for (const rdm of rdMats) {
        rdm.addEventListener('click', () => {
            // LLAMO A LA FUNCION PARA AGREGAR EL PRODUCTO
            console.log('recargo la lista de productos para el material ' + rdm.id);
            getProducts(productos, rdm.id);
        });
    }
}

// FUNCION  ENCARGADA DE GENERAR LA CAJA DE CADA PRODUCTO
function getProducts(productList, id) {

    let newProductList = [];

    if(id != null){
        newProductList = productList.filter((producto) => producto.material == id);
        console.table(newProductList);
    }
    else {
        newProductList = productList;
    }

    listaProductos.innerHTML = '';

    for (const prod of newProductList) {
        listaProductos.innerHTML += `
            <div class="card" style="width: 15rem;">
                <img class="img-rounded" src=${prod.imagen} alt=${prod.descripcion}/>
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

        boton.onmouseover = () => boton.classList.replace('btn-primary', 'btn-success');
        boton.onmouseout = () => boton.classList.replace('btn-success', 'btn-primary');
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

    let secInfoCart = document.getElementById('InfoCarrito');

    secInfoCart.innerHTML = `
        <h5>Items: ${tatalCartItems} - $ ${totalCartImport}</h5>
    `;

}

// FUNCION PARA AGREGAR ELEMENTOS AL CARRITO
function addCart(producto) {

    cart.push(producto);
    console.table(cart);
    alert(`Agregaste ${producto.descripcion} al carro 🛒`);

    // CALCULO LA CANTIDAD DE ITEMS Y EL TOTAL A PAGAR
    calcProductsCart(cart);
}

// AGREGO EVENTO AL BOTON DE LIMPIAR FILTROS PARA RECARGAR LOS PRODUCTOS
function addEventClearFilter() {

    let btnClear = document.getElementsByName('btnClearFilter')[0];

    btnClear.addEventListener('click', () => {
        // LLAMO A LA FUNCION PARA CARGAR LOS PRODUCTOS
        getProducts(productos, null);
    });

}

// INVOCO LA FUNCION PARA LISTAR LOS PRODUCTOS
getProducts(productos, null);
// INVOCO LA FUNCION PARA LISTAR LOS FILTROS
getFilters();
// INVOCO FUNCION PARA AGREGAR EVENTO AL BOTON DE LIMPIAR FILTROS
addEventClearFilter();