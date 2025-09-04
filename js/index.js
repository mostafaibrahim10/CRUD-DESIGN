var ProdactName = document.getElementById("productName");
var ProdactPrice = document.getElementById("productPrice");
var ProdactCat = document.getElementById("productCategory");
var ProdactDec = document.getElementById("productDescription");
var ProdactImg = document.getElementById("productImage");
var btnAdd = document.getElementById("btnAdd");
var btnUpdate = document.getElementById("btnUpdate");
var currentIndex;
var ProdactList = [];

if (localStorage.getItem("ProdactList") != null) {
  ProdactList = JSON.parse(localStorage.getItem("ProdactList"));
  DisplayProdact(ProdactList);
}

function AddProdact() {
  var prodact = {
    Name: ProdactName.value,
    Price: ProdactPrice.value,
    Cat: ProdactCat.value,
    Dec: ProdactDec.value,
    Img: ProdactImg.files[0] ? `images/${ProdactImg.files[0].name}` : "",
  };
  ProdactList.push(prodact);
  UbdateLocalStorage();
  console.log(ProdactList);
  UbdateInputValue();
  DisplayProdact(ProdactList);
  console.log(prodact.Img);

  Toastify({
    text: "✅ Product Added Successfully",
    duration: 3000,
    gravity: "bottom",
    position: "left",
    backgroundColor: "#ffb700ff",
  }).showToast();
}

function DisplayProdact(list) {
  var Prodact = "";
  for (var i = 0; i < list.length; i++) {
    Prodact += `<tr>
      <td data-label="#ID">${i + 1}</td>
      <td data-label="Name">${list[i].Name}</td>
      <td data-label="Price">${list[i].Price}</td>
      <td data-label="Category">${list[i].Cat}</td>
      <td data-label="Description">${list[i].Dec}</td>
      <td data-label="Image">${list[i].Img ? `<img src="${list[i].Img}" alt="product">` : ""}</td>
      <td data-label="Action">
        <button onclick="GetUpdateProdact(${i})" class="btn btn-outline-warning btn-sm">Update</button>
        <button onclick="DeleteProdact(${i})" class="btn btn-outline-danger btn-sm">Delete</button>
      </td>
    </tr>`;
  }
  document.getElementById("tbody").innerHTML = Prodact;
}

function DeleteProdact(index) {
  ProdactList.splice(index, 1);
  UbdateLocalStorage();
  DisplayProdact(ProdactList);
  console.log(ProdactList);
  Toastify({
    text: "✅ Product Deleted Successfully",
    duration: 3000,
    gravity: "bottom",
    position: "left",
    backgroundColor: "#ffb700ff",
  }).showToast();
}

function UbdateInputValue(confing) {
  ProdactName.value = confing ? confing.Name : null;
  ProdactPrice.value = confing ? confing.Price : null;
  ProdactCat.value = confing ? confing.Cat : null;
  ProdactDec.value = confing ? confing.Dec : null;
  ProdactImg.value = "";
}

function GetUpdateProdact(index) {
  UbdateInputValue(ProdactList[index]);
  currentIndex = index;
  btnAdd.classList.add("d-none"),
  btnUpdate.classList.remove("d-none");
}

function UbdateProdact() {
  ProdactList[currentIndex].Name = ProdactName.value;
  ProdactList[currentIndex].Price = ProdactPrice.value;
  ProdactList[currentIndex].Cat = ProdactCat.value;
  ProdactList[currentIndex].Dec = ProdactDec.value;
  DisplayProdact(ProdactList);
  UbdateLocalStorage();
  btnAdd.classList.remove("d-none"),
  btnUpdate.classList.add("d-none"),
  UbdateInputValue();
  Toastify({
    text: "✅ Product Ubdated Successfully",
    duration: 3000,
    gravity: "bottom",
    position: "left",
    backgroundColor: "#ffb700ff",
  }).showToast();
}
function UbdateLocalStorage() {
  localStorage.setItem("ProdactList", JSON.stringify(ProdactList));
}
