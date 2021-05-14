const btnBuy = document.querySelector("#btn-buy");
const header = document.querySelector("header");
const secSplash = document.querySelector(".splash");
const secLoader = document.querySelector(".loader");
const secMain = document.querySelector(".container-main");
const footer = document.querySelector("footer");

const splashText = document.querySelector(".splash-content-left");
const splashImgContainer = document.querySelector(".splash-content-right");

const categoryName = document.querySelector(".category-name");
const categoryPrice = document.querySelector(".category-price");

btnBuy.addEventListener("click", () => {
    products.map((item) => {
        if (item.id == 5) {
            localStorage.setItem("carrito", JSON.stringify(item));
            location.href = "carrito.html";
            return item;
        }
    });
});

const loadSplash = () => {
    const productTitle = document.createElement("h3");
    productTitle.classList.add("splash-title");
    productTitle.textContent = products[0].title;

    const productDesc = document.createElement("p");
    productDesc.classList.add("splash-desc");
    productDesc.textContent = products[0].description;

    const productPrice = document.createElement("p");
    productPrice.classList.add("splash-price");
    productPrice.textContent = `$ ${products[0].price}`;

    splashText.insertAdjacentElement("afterbegin", productPrice);
    splashText.insertAdjacentElement("afterbegin", productDesc);
    splashText.insertAdjacentElement("afterbegin", productTitle);

    const splashImg = document.createElement("img");
    splashImg.src = products[0].image;
    splashImg.classList.add("splash-img");
    splashImgContainer.appendChild(splashImg);
    categoryName.innerHTML = products[0].category;

    secLoader.style.display = "none";
    header.style.display = "block";
    secSplash.style.display = "block";
    secMain.style.display = "block";
    footer.style.display = "block";
};

document.addEventListener("DOMContentLoaded", () => {
    axios
        .get("https://fakestoreapi.com/products/category/jewelery")
        .then((response) => {
            products = response.data;
            loadSplash();
        })
        .catch((err) => console.log(err));
});
