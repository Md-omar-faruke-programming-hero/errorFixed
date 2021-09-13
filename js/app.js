// load api
const loadProducts = () => {


   
  // const url=`../js/data.json`; //if api server down use this manually

  const url = `https://fakestoreapi.com/products`; 
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
    <div class="single-product">
            <div>
              <img class="product-image" src=${image}></img><br>
              <h4 class="text-danger">Rating: ${product.rating.rate}</h4>
              <p class="text-dark">${product.rating.count} people recommended</p>
            </div>
            <h3>${product.title}</h3>
            <p>Category: ${product.category}</p>
            <h2>Price: $ ${product.price}</h2>
            <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-primary">add to cart</button>
            <button onclick="detail(${product.id})"  id="details-btn" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal" >Details</button>

           
          
    </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

// single product deails
let detail=(id)=>{
  let title=document.getElementById("exampleModalLabel");
 title.innerText="";
 let detailsInfo=document.getElementById("exampleModalLabell");
 detailsInfo.innerText="";
   fetch(`https://fakestoreapi.com/products/${id}`)
   .then(res=>res.json())
   .then(data=>show(data));

   
}
const show=(info)=>{
  console.log(info);
 let title=document.getElementById("exampleModalLabel");
 title.innerText=info.title;
 let detailsInfo=document.getElementById("exampleModalLabell");
 detailsInfo.innerText=info.description;

}


// count item total product
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  
  const converted = parseFloat(element);
  
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  
  document.getElementById(id).innerText =total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
    
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

