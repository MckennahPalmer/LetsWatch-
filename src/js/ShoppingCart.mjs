
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function cardItemTemplate(product) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${product.Images.PrimarySmall}"
      alt="${product.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${product.Name}</h2>
  </a>
  <p class="cart-card__color">${product.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: ${product.qty}</p>
  <p class="cart-card__price">$${product.FinalPrice.toFixed(2)}</p>
  <button class="cart-card__remove" id="${product.Id}" >X</button>
  </li>`;
  return newItem;
}     

export default class ShoppingCart {
  constructor(key, parentSelector){
      this.key = key;
      this.parentSelector = parentSelector;
      this.total = 0;
      this.list = getLocalStorage(this.key);
  }
  async init() {
    // display nothing if the cart is empty
    if (this.list && this.list.length > 0) {
      this.calculateListTotal(this.list);
      this.renderCartContents(this.list);
      
    } else {
      document.querySelector(this.parentSelector).innerHTML = "<p>Cart is empty!</p>"
    }
    
  }
  calculateListTotal(list) {
    const amounts = list.map((item) => item.FinalPrice);
    this.total = amounts.reduce((sum, item) => sum + item);
  }
  renderCartContents(){
    const htmlItems = this.list.map((item) => cardItemTemplate(item));
    document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
    document.querySelector(".list-total").innerText += ` $${this.total.toFixed(2)}`;
    
    // Rendering the buttons for each cart-card
    var deleteButtons = document.getElementsByClassName("cart-card__remove");
    for (var i = 0; i < deleteButtons.length; i++) {
      // this is not perfect, but add the deleting function to the buttons.
      deleteButtons[i].addEventListener("click", removeItem.bind(i));
    }
  }
}

function removeItem() {
  // Select the item that will be removed
  let cartArray = getLocalStorage("so-cart");

  // remove the item from local storage
  cartArray.splice(this, 1);
  setLocalStorage("so-cart", cartArray);

  // re-render the cart contents, done by reloading the page
  location.reload();
}