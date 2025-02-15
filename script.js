const product = [
    {id: 1,name:"radio",Image:"https://m.media-amazon.com/images/I/710dct68n1L._SX425_.jpg",price: 3699.00},
    {id: 2,name:"webcam",Image:"https://m.media-amazon.com/images/I/41o65QrvvCL._SX300_SY300_QL70_FMwebp_.jpg",price:  2999},
    {id: 3,name:"laptop",Image:"https://m.media-amazon.com/images/I/510uTHyDqGL._SX679_.jpg",price: 159.990},
    {id: 4,name:"laptop",Image:"https://m.media-amazon.com/images/I/41l62Htp4XL._SX300_SY300_QL70_FMwebp_.jpg",price: 79990},
    {id: 5,name:"smart watch",Image:"https://m.media-amazon.com/images/I/61icsCcbdKL._SX425_.jpg",price: 469},
    {id: 6,name:"cycle",Image:"https://m.media-amazon.com/images/I/513+sf6xkVL._SY300_SX300_.jpg",price: 2699},
    {id: 7,name:"mobile",Image:"https://m.media-amazon.com/images/I/713SsA7gftL._SX679_.jpg",price: 73900},
    {id: 8,name:"doll",Image:"https://m.media-amazon.com/images/I/71E9pVjlbLS._SX425_.jpg",price: 629},
        
]
//Render Products
function renderProducts(products,productList){
    const container = document.getElementById(productList);
    container.innerHTML="";
    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product-item");
        productDiv.innerHTML=`
        <img src= "${product.Image}"/>
        <h3>${product.name}</h3>
        <h2>${product.price}</h2>
        <button onclick="addToCart(${products.id})"> Add to cart</button>
        `
        container.appendChild(productDiv);
        })
}

if(document.getElementById("productList"))renderProducts(product,"productList");
//search functionality
function searchProducts(query){
    const filterProducts = product.filter(product =>
        product.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    )
    renderProducts(filterProducts,"productList");
}
//Add EventListener to button
document.getElementById("searchButton")?.addEventListener("click",() => {
const query = document.getElementById("productSearch").value;
searchProducts(query);
})
//Sorting 
function sortProducts(criteria){
    if(criteria === "price"){
        return product.sort((a,b) => a.price-b.price);
    }
    return product;
}
//Adding Event listeners
document.getElementById("sortOptions")?.addEventListener("change",(event)=>{
    const sortedProducts = sortProducts(event.target.value);
    renderProducts(sortedProducts,"productList");
})


//Add to cart
function addToCart(productId){
    const products = product.find(p => p.id === productId);
    let cart = JSON.parse(localStorage.getItem("cart"))||[];
    cart.push(products);
    localStorage.setItem("cart",JSON.stringify(cart));
    alert(`${products.name} is added to cart`)
    renderCart();
}
//Render items in cart
function renderCart(){
    const cart = JSON.parse(localStorage.getItem("cart"))||[];
    const container = document.getElementById("cartItems");
    container.innerHTML="";
    if(cart.length == 0){
        container.innerHTML="<h1>Your Cart is Empty</h1>"
    }
    cart.forEach(item => {
        const cartDiv = document.createElement("div");
        cartDiv.classList.add("cart-item");
        cartDiv.innerHTML=`
        <img src= "${item.Image}"/>
        <h3>${item.name}</h3>
        <h2>${item.price}</h2>
        <button onclick="removeFromCart(${item.id})">Remove</button>
        `
      container.appendChild(cartDiv);
    })

}
//remove from cart
function removeFromCart(productId){
    let cart = JSON.parse(localStorage.getItem("cart"))||[];
    cart =cart.filter(item=>item.id !== productId);
    localStorage.setItem("cart",JSON.stringify(cart));
    alert("Product is removed successfully");
    renderCart();
}
//Calculate subtotal
function renderSubtotal(cart){
    const subtotal = cart.reduce((total,item) => total+item.price,0);
    const subtotalContainer = document.getElementById("subtotal");
    if(cart.length > 0){
        subtotalContainer.innerHTML =`subtotal : Rs. ${subtotal}`

    }
    else{
        subtotalContainer.innerHTML =`No items in the cart`
    }
}
if(document.getElementById("productList"))renderProducts(product,"productList");
if(document.getElementById("cartItems"))renderCart();
