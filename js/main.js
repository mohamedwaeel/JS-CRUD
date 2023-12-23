let productName = document.getElementById("pName");
let productCategory = document.getElementById("pCat");
let productPrice = document.getElementById("pPrice");
let productDescription = document.getElementById("pDescription");

let productList = [];

let updateIndex;
let currentIndex;
if (localStorage.getItem("allProducts")) {
    productList = JSON.parse(localStorage.getItem("allProducts"));
    checkitems(productList);
    displayProducts(productList);
}

function addProduct() {
    if (allValidation()) {
        let product = {
            name: productName.value,
            category: productCategory.value,
            price: productPrice.value,
            description: productDescription.value,

        };
        productList.push(product);
        localStorage.setItem("allProducts", JSON.stringify(productList));
        displayProducts(productList);
        clearForm();
    }
}

function displayProducts(list) {
    let blackBox = " ";
    for (var i = 0; i < list.length; i++) {
        blackBox += ` <tr>
    <th scope="row">${i + 1}</th>
    <td class="text-capitalize">${list[i].newName ? list[i].newName : list[i].name}</td>
    <td class="text-capitalize">${list[i].category}</td>
    <td>${list[i].price}</td>
    <td>${list[i].description}</td>
    <td><button class="btn btn-success"  onclick="editProduct(${currentIndex? currentIndex : i})" id="edit">Edit</button></td>
    <td><button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button></td>
</tr>`
currentIndex=null;
    }

    document.getElementById("prodRow").innerHTML = blackBox;
    checkitems(productList);


}

function clearForm() {
    productName.value = "";
    productCategory.value = "";
    productPrice.value = "";
    productDescription.value = "";
    document.getElementById("pSearch").value = "";
}

function deleteProduct(index) {
    productList.splice(index, 1);
    localStorage.setItem("allProducts", JSON.stringify(productList));

    displayProducts(productList);
}


function editProduct(index) {
    updateIndex = index;

    productName.value = productList[index].name;
    productCategory.value = productList[index].category;
    productPrice.value = productList[index].price;
    productDescription.value = productList[index].description;

    document.getElementById("updateBtn").classList.remove("d-none");
    document.getElementById("addBtn").classList.add("d-none");
}

function updateProduct() {

    if (allValidation()) {
        let product = {
            name: productName.value,
            category: productCategory.value,
            price: productPrice.value,
            description: productDescription.value,

        };
        productList.splice(updateIndex, 1, product);
        localStorage.setItem("allProducts", JSON.stringify(productList));
        displayProducts(productList);

        clearForm();
    }
    else {
        updateProduct();
    }
    document.getElementById("updateBtn").classList.add("d-none");
    document.getElementById("addBtn").classList.remove("d-none");

}


function searchProduct() {
    let keyword = document.getElementById("pSearch").value;
    let matchedList=[];
    for (let i = 0; i < productList.length; i++) {

        if (productList[i].name.toLowerCase().includes(keyword.toLowerCase())) {
            productList[i].newName = productList[i].name.toLowerCase().replace(keyword, `<span class='text-danger fw-bolder'>${keyword}</span>`);
            matchedList.push(productList[i]);
            currentIndex=i;
            displayProducts(matchedList)
        }

        document.getElementById("prodRow").innerHTML = searchBox;
        

    }
    checkitems(matchedList);
}
function checkitems(list) {
    if (list.length === 0) {
        document.getElementById("searchError").classList.remove("d-none");
    } else {
        document.getElementById("searchError").classList.add("d-none");
    }


}

function validProductName() {
    let regex = /^[A-Z][a-zA-Z]{2,6}$/;
    let isValid = regex.test(productName.value);
    if (isValid) {
        document.getElementById("nameError").classList.add("d-none");

    }
    else {
        document.getElementById("nameError").classList.remove("d-none");
    }
    return isValid;
}
function validProductPrice() {
    let regex = /((^[1-9][0-9]{3}$)|10000)/;
    let isValid = regex.test(productPrice.value);
    if (isValid) {
        document.getElementById("priceError").classList.add("d-none");

    }
    else {
        document.getElementById("priceError").classList.remove("d-none");
    }
    return isValid;
}
function validProductDesc() {
    let regex = /^[a-zA-Z\s\.\,]{1,255}$/gm;
    let isValid = regex.test(productDescription.value);
    if (isValid) {
        document.getElementById("descError").classList.add("d-none");

    }
    else {
        document.getElementById("descError").classList.remove("d-none");
    }
    return isValid;
}
function validProductCat() {
    let regex = /^(mobile|Mobile|WATCH|Watch|watch|SCREEN|Screen|screen)$/gm;
    let isValid = regex.test(productCategory.value);
    if (isValid) {
        document.getElementById("catError").classList.add("d-none");

    }
    else {
        document.getElementById("catError").classList.remove("d-none");
    }
    return isValid;
}
function allValidation() {

    if (validProductName() && validProductPrice() && validProductCat() && validProductDesc()) {
        return true;
    }
}


