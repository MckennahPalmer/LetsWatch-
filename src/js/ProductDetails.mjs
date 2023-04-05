import { setLocalStorage, getLocalStorage, alertMessage } from './utils.mjs';

function productDetailsTemplate(product) {
    return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
      <h2 class="divider">${product.NameWithoutBrand}</h2>
      <img
        class="divider"
        src="${product.Images.PrimaryLarge}"
        alt="${product.NameWithoutBrand}"
      />
      <p class="product-card__price">$${product.FinalPrice}</p>
      <p class="product__color">${product.Colors[0].ColorName}</p>
      <p class="product__description">
      ${product.DescriptionHtmlSimple}
      </p>
      <div class="product-detail__add">
        <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
      </div></section>`;
  }

export default class ProductDetails{
    constructor(productId, dataSource){
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.product["qty"] = 1;
        this.renderProductDetails("main");
        document
            .getElementById("addToCart")
            .addEventListener("click", this.addToCart.bind(this));
        document
            .getElementById("addToCart")
            .addEventListener("click", ani.bind(this));
    }
    addToCart(){
        let isCopy = false;
        let cartArray = getLocalStorage("so-cart");
        if(!cartArray) {{
            cartArray = [];
        }}
        // look for duplicates and adjust quantity and final price accordingly
        for(var i = 0; i < cartArray.length; i++) {
            if(cartArray[i].Id == this.product.Id) {
                cartArray[i].qty += 1;
                cartArray[i].FinalPrice = cartArray[i].qty * cartArray[i].ListPrice;
                isCopy = true;
            }
        }
        if(!isCopy) {
            cartArray.push(this.product);
        }
        setLocalStorage("so-cart", cartArray);
        alertMessage(`${this.product.NameWithoutBrand} added to cart!`);
    }
    renderProductDetails(selector){
        const element = document.querySelector(selector);
        element.insertAdjacentHTML(
            "afterbegin",
            productDetailsTemplate(this.product)
        );
    }
}

function ani() {
    // find the element to animate
    let icon = document.getElementById("backpack-icon");
    // add the spinning property, should activate
    icon.setAttribute("class", "cartspin");
    // clone, delete, replace element to restart animation
    var newone = icon;
    icon.parentNode.replaceChild(newone, icon);
}