const shopcartMain = document.querySelector(".shopcart-main");
const header = document.querySelector("header");
const secLoader = document.querySelector(".loader");
const footer = document.querySelector("footer");
const shopcartEmpty = document.querySelector(".shopcart-empty");
const shopcartTotal = document.querySelector(".shopcart-total-price");

let shopcartLS = JSON.parse(localStorage.getItem("carrito"));
loader();

const loadLS = (data) => {
    const result = data.reduce((acc, item) => {
        for (i in shopcartLS) {
            if (item.id == shopcartLS[i]) {
                if (acc.includes(item)) {
                    item.cantidad = 2;
                } else {
                    item.cantidad = 1;
                    acc.push(item);
                }
            }
        }
        return acc;
    }, []);
    showShopcart(result);
};

if (shopcartLS) {
    shopcartEmpty.style.display = "none";
    axios
        .get("https://fakestoreapi.com/products/category/jewelery")
        .then((response) => {
            loadLS(response.data);
            loader();
        })
        .catch((err) => console.error(err));
} else {
    shopcartEmpty.style.display = "block";
}

function loader() {
    secLoader.style.display = "none";
    shopcartMain.style.display = "block";
    header.style.display = "block";
    footer.style.display = "block";
}

function showShopcart(shopcart) {
    for (i in shopcart) {
        const shopcartContainer = document.querySelector(".shopcart-content");

        const shopcartProduct = document.createElement("div");
        shopcartProduct.classList.add("flex-justify", "shopcart-product");

        const shopcartContImg = document.createElement("div");
        shopcartContImg.classList.add("shopcart-cont-img");
        const shopcartImg = document.createElement("img");
        shopcartImg.classList.add("shopcart-img");
        shopcartImg.src = shopcart[i].image;
        shopcartContImg.appendChild(shopcartImg);

        const shopcartContTxt = document.createElement("div");
        shopcartContTxt.classList.add("shopcart-cont-text");

        const shopcartTitle = document.createElement("h5");
        shopcartTitle.classList.add("shopcart-title");
        shopcartTitle.textContent = shopcart[i].title;
        shopcartContTxt.appendChild(shopcartTitle);

        const shopcartDesc = document.createElement("p");
        shopcartDesc.classList.add("shopcart-desc");
        shopcartDesc.textContent = shopcart[i].description;
        shopcartContTxt.appendChild(shopcartDesc);

        const shopcartPrice = document.createElement("p");
        shopcartPrice.classList.add("shopcart-price");
        //shopcartPrice.textContent = `&#36;`;
        shopcartPrice.textContent = `$ ${shopcart[i].price}`;
        shopcartContTxt.appendChild(shopcartPrice);

        const shopcartCantidad = document.createElement("p");
        shopcartCantidad.textContent = `Cantidad: ${shopcart[i].cantidad}`;
        shopcartContTxt.appendChild(shopcartCantidad);
        shopcartCantidad.classList.add("shopcart-price");

        shopcartProduct.appendChild(shopcartContImg);
        shopcartProduct.appendChild(shopcartContTxt);
        shopcartContainer.appendChild(shopcartProduct);
    }
    const sumaTotal = shopcart.reduce((acc, item) => {
        return acc + item.price;
    }, 0);
    shopcartTotal.innerHTML = `$ ${sumaTotal}`;
}
