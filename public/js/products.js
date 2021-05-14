const categoryMain = document.querySelector(".category-main");
const cards = document.querySelector(".main-cards");
const header = document.querySelector("header");
const secLoader = document.querySelector(".loader");
const footer = document.querySelector("footer");
const shopcartBtn = document.querySelector(".fa-shopping-cart");

let btnCardBuy;
let shopcartArray = [];
let shopcartLS = JSON.parse(localStorage.getItem("carrito"));

// ADDEVENTS

cards.addEventListener("click", addShopcart);

// CARDS

const loadCategory = () => {
    let i = 0;
    while (i < 4) {
        const cardContainer = document.createElement("div");
        cardContainer.classList.add("flex-justify", "cards");
        cardContainer.setAttribute("data-id", products[i].id);
        const cardImg = document.createElement("img");
        cardImg.src = products[i].image;
        cardImg.classList.add("cards-img");
        cardContainer.appendChild(cardImg);
        const cardTitle = document.createElement("h5");
        cardTitle.classList.add("cards-title");
        cardTitle.textContent = products[i].title;
        cardContainer.appendChild(cardTitle);
        const cardPrice = document.createElement("p");
        cardPrice.classList.add("cards-price");
        cardPrice.textContent = `$ ${products[i].price}`;
        cardContainer.appendChild(cardPrice);
        btnCardBuy = document.createElement("button");
        btnCardBuy.setAttribute("data-id", i);
        btnCardBuy.innerHTML = "Agregar al carrito";
        btnCardBuy.style.background = "#fa26a0";
        btnCardBuy.classList.add("cards-btn-add");
        cardContainer.appendChild(btnCardBuy);
        cards.appendChild(cardContainer);
        i++;
    }
    loader();
};

axios
    .get("https://fakestoreapi.com/products/category/jewelery")
    .then((response) => {
        products = response.data;
        loadCategory();
        addCartNumber();
    })
    .catch((err) => console.log(err));

function loader() {
    secLoader.style.display = "none";
    categoryMain.style.display = "block";
    header.style.display = "block";
    footer.style.display = "block";
}

function addShopcart(e) {
    if (e.target.classList.contains("cards-btn-add")) {
        addCartNumber();

        const dataBtn = e.target.getAttribute("data-id");
        if (dataBtn == e.target.getAttribute("data-id")) {
            e.target.style.background = "#4c5270";
            e.target.textContent = "Agregado";
        }

        const idProduct = e.target.parentElement.getAttribute("data-id");
        shopcartArray.push(idProduct);
        localStorage.setItem("carrito", JSON.stringify(shopcartArray));
    }
    if (
        e.target.classList.contains("cards-img") ||
        e.target.classList.contains("cards-title")
    ) {
        const idProduct = e.target.parentElement.getAttribute("data-id");
        let productModal;

        products.map((item) => {
            if (item.id == idProduct) {
                productModal = item;
                showModal(item);
            }
        });
    }
}

function showModal(product) {
    Swal.fire({
        title: product.title,
        text: product.description,
        imageUrl: product.image,
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: "Imagen del producto",
        confirmButtonText: "Salir",
        confirmButtonColor: "#4c5270",
    });
}

function addCartNumber() {
    const cartNumber = document.querySelector(".shopcart-number");

    if (shopcartLS.length != undefined && shopcartArray.length > 0) {
        cartNumber.style.display = "block";
        cartNumber.innerHTML = shopcartLS.length + shopcartArray.length;
        return;
    }

    if (shopcartLS.length != undefined) {
        cartNumber.style.display = "block";
        cartNumber.innerHTML = shopcartLS.length;
        return;
    }
    if (shopcartArray.length > 0) {
        cartNumber.style.display = "block";
        cartNumber.innerHTML = shopcartArray.length;
        return;
    }
}
