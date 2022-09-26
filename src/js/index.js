async function fetchProducts() {
  try {
    let response = await fetch("mocks/list.json");
    let data = await response.json();
    return createProductCard(data);
  } catch (error) {
    console.error(error);
  }
}

fetchProducts();

function createProductCard(products) {
  const PRODUCTS = document.getElementById("products");

  products.forEach(({ name, price, priceFormatted, imagePath }) => {
    const card = document.createElement("div");
    card.classList.add("product");
    const markup = `
        <img src="${imagePath}" alt="${name}" />
        <div class="product__infos">
            <div class="product__infos__description">
                <p class="product__infos__description__title">${name}</p>
                <p class="product__infos__description__price">${priceFormatted}</p>
            </div>
            <button id="add-to-cart" class="product__infos__button" onclick="addToCart(${price})">
                add to cart
            </button>
        </div>
   `;
    card.innerHTML = markup;
    PRODUCTS.appendChild(card);
  });
}

function findProduct() {
  let products = document.getElementsByClassName("product");
  let input = document.getElementById("search-box");
  let filter = input.value.toUpperCase();

  for (i = 0; i < products.length; i++) {
    let p = products[i].getElementsByTagName("p")[0];
    let txtValue = p.textContent || p.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      products[i].style.display = "";
    } else {
      products[i].style.display = "none";
    }
  }
}
