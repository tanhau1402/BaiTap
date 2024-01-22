import { categoryService } from "./categoryService.js";
import { userService } from "./userService.js";
import { manufactoryService } from "./manufactoryService.js";
const btnAdd = $("#btn-add");
const form = $("#form");
const listInfo = $("#list-users");
const name = $("#name");
const price = $("#price");
const info = $("#info");
const detail = $("#detail");
const ratingStar = $("#ratingStar");
const imageName = $("#imageName");
const manufacturerName = $("#manufacturerName");
const categoryName = $("#categoryName");
const closeBtn = $("#close-btn");
const formSelect = $("#form-select");
const formSelect2 = $("#form-select-2");
loadData();
let products;
let productSelected;
function loadData() {
  userService
    .getProducts()
    .then((data) => {
      products = data.content;
      renderListInfo(products);
    })
    .then((err) => {
      console.error(err);
    });
}
form.submit((event) => {
  event.preventDefault();
  const newProduct = {
    name: name.val(),
    price: price.val(),
    info: info.val(),
    detail: detail.val(),
    ratingStar: ratingStar.val(),
    imageName: imageName.val(),
    manufacturerId: manufacturerId,
    categoryId: categoryId,

  };
  console.log(productSelected);
  if (!productSelected?.id) {
    createProduct(newProduct);
  } else {
    console.log(newProduct);
    updateProduct(productSelected.id, newProduct);
  }
});
//Delete
listInfo.on("click", "#btn-delete", (event) => {
  const productId = $(event.target).data("product-id");
  userService
    .deleteProduct(productId)
    .then((data) => {
      console.log(data);
      loadData();
    })
    .then((err) => {
      console.error(err);
    });
});
//Edit
listInfo.on("click", "#btn-edit", (event) => {
  btnAdd.click();
  const productId = $(event.target).data("product-id");
  userService
    .getProductById(productId)
    .then((product) => {
      productSelected = product;
      categoryService
        .getCategoryList()
        .then((data) => {
          console.log(data);
          renderOption(data, product.categoryName);
        })
        manufactoryService
        .getManufactoryList()
        .then((data) => {
            console.log(data);
            renderOption2(data, product.manufacturerName);
        })
        .catch((err) => console.log(err));
      name.val(product.name);
      price.val(product.price);
      info.val(product.info);
      detail.val(product.detail);
      ratingStar.val(product.ratingStar);
      imageName.val(product.imageName);
      manufacturerName.val(product.manufacturerName);
      categoryName.val(product.categoryName);
    })
    .then((err) => {
      console.log(err);
    });
});

function updateProduct(productId, body) {
  userService
    .updateProduct(productId, body)
    .then((data) => {
      console.log(data);
      loadData();
    })
    .then((err) => {
      console.error(err);
    });
}
let categoryId;
formSelect.change((e) => {
  const value = e.target.value;
  categoryId = +value;
});
let manufacturerId;
formSelect2.change((e) => {
  const value = e.target.value;
  manufacturerId = +value;
});
function renderOption(data, name) {
  const htmlContent = `
        ${data
          .map((d) => {
            return `
                    <option 
                    ${name === d.name ? "selected" : ""}
                     value="${d.id}">${d.name}</option>
                `;
          })
          .join("")}
    `;
  formSelect.html(htmlContent);
}
function renderOption2(data, name) {
    const htmlContent = `
          ${data
            .map((d) => {
              return `
                      <option 
                      ${name === d.name ? "selected" : ""}
                       value="${d.id}">${d.name}</option>
                  `;
            })
            .join("")}
      `;
    formSelect2.html(htmlContent);
  }

function renderListInfo(products) {
  const htmlContent = `
     ${products.map((product) => {
       return `
        <tr>
            <th scope="row">${product.id}</th>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.info}</td>
            <td>${product.detail}</td>
            <td>${product.ratingStar}</td>
            <td><img style="width: 100px; height: 100px" src="${product.imageName}"}</td>
            <td>${product.manufacturerName}</td>
            <td>${product.categoryName}</td>
            <td class="text-end">
                <button id="btn-edit" class="btn btn-info" data-product-id="${product.id}">Edit</button>
                <button id="btn-delete" class="btn btn-danger" data-product-id="${product.id}">Delete</button>
            </td>
        </tr>
        `;
     })}
     `;
  listInfo.html(htmlContent);
}
