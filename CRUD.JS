let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("Total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let show = document.querySelector(".show");
let deleteAll = document.getElementById("deleteAll");
let mode = "create";
let tmp;
//Get total
function getTotal() {
  if (price.value !== "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "#040";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "#631f1f";
  }
}
// Create product
let products;
if (localStorage.products != null) {
  products = JSON.parse(localStorage.products);
} else {
  products = [];
}

submit.onclick = function () {
  let newproduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  if (
    title.value != "" &&
    category.value != "" &&
    price.value != "" &&
    newproduct.count < 100
  ) {
    if (mode === "create") {
      if (newproduct.count > 1) {
        for (let i = 0; i < newproduct.count; i++) {
          products.push(newproduct);
        }
      } else {
        products.push(newproduct);
      }
    } else {
      products[tmp] = newproduct;
      mode = "create";
      count.style.display = "block";
      submit.innerHTML = "create";
    }
    clearInputs();
  }
  localStorage.setItem("products", JSON.stringify(products));
  showData();

  getTotal();
};

//save to local storage
//clear inputs
function clearInputs() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  count.value = "";
  category.value = "";
  total.innerHTML = "";
}
//read
function showData() {
  let table = "";
  for (let i = 0; i < products.length; i++) {
    table += `<tr>
    <td>${i + 1}</td>
    <td>${products[i].title}</td>
    <td>${products[i].price}</td>
    <td>${products[i].taxes}</td>
    <td>${products[i].ads}</td>
    <td>${products[i].discount}</td>
    <td>${products[i].total}</td>
    <td>${products[i].count}</td>
    <td>${products[i].category}</td>
    <td><button onclick="Update(${i})" id="update">Update</button></td>
    <td><button onclick="DeleteProduct(${i})" id="delete">Delete</button></td>
    </tr>`;
  }

  show.innerHTML = table;
  if (products.length > 0) {
    deleteAll.innerHTML = `<button onclick="DeleteAll()" id="deletAllProduct">Delete All (${products.length})</button>`;
  } else {
    deleteAll.innerHTML = "";
  }
}
showData();
//delete
function DeleteProduct(i) {
  products.splice(i, 1);
  localStorage.products = JSON.stringify(products);
  showData();
}
function DeleteAll() {
  localStorage.clear();
  products.splice(0);
  showData();
}
//count
//update
function Update(i) {
  title.value = products[i].title;
  price.value = products[i].price;
  taxes.value = products[i].taxes;
  ads.value = products[i].ads;
  discount.value = products[i].discount;
  category.value = products[i].category;
  getTotal();
  count.style.display = "none";
  submit.innerHTML = "Update";
  mode = "Update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
  getTotal();
}
//search
let searchmood = "title";

function getsearchmood(id) {
  let search = document.getElementById("search");
  if (id === "searchTitle") {
    searchmood = "title";
  } else {
    searchmood = "category";
  }
  search.placeholder = "search by " + searchmood;
  search.focus();
  search.value = "";
  showData();
}
function search(value) {
  let table = "";
  for (let i = 0; i < products.length; i++) {
    if (searchmood === "title") {
      if (products[i].title.includes(value.toLowerCase())) {
        table += `<tr>
        <td>${i + 1}</td>
        <td>${products[i].title}</td>
        <td>${products[i].price}</td>
        <td>${products[i].taxes}</td>
        <td>${products[i].ads}</td>
        <td>${products[i].discount}</td>
        <td>${products[i].total}</td>
        <td>${products[i].count}</td>
        <td>${products[i].category}</td>
        <td><button onclick="Update(${i})" id="update">Update</button></td>
        <td><button onclick="DeleteProduct(${i})" id="delete">Delete</button></td>
        </tr>`;
      }
    } else {
      if (products[i].category.includes(value.toLowerCase())) {
        table += `<tr>
        <td>${i + 1}</td>
        <td>${products[i].title}</td>
        <td>${products[i].price}</td>
        <td>${products[i].taxes}</td>
        <td>${products[i].ads}</td>
        <td>${products[i].discount}</td>
        <td>${products[i].total}</td>
        <td>${products[i].count}</td>
        <td>${products[i].category}</td>
        <td><button onclick="Update(${i})" id="update">Update</button></td>
        <td><button onclick="DeleteProduct(${i})" id="delete">Delete</button></td>
        </tr>`;
      }
    }
  }
  show.innerHTML = table;
}

//cleanData
