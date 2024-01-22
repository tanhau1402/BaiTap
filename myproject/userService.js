const apiListProduct = "http://localhost:8080/api/v1/products";
//const apiCreateProduct = 'http://localhost:8080/api/v1/products';
let username = "Username1";
let password = "123456";

export const userService = {
  getProducts() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: apiListProduct,
        headers: {
          Authorization: "Basic " + btoa(username + ":" + password),
        },
        type: "GET",
        dataType: "json",
        success: (data) => {
          resolve(data);
        },
        error: (xhr, status, error) => {
          reject(error);
        },
      });
    });
  },
  getProductById(productId) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: apiListProduct + "/" + productId,
        headers: {
          Authorization: "Basic " + btoa(username + ":" + password),
        },
        type: "GET",
        dataType: "json",
        success: (data) => {
          resolve(data);
        },
        error: (xhr, status, error) => {
          reject(error);
        },
      });
    });
  },

  deleteProduct(productId) { 
    return new Promise((resolve, reject) => {
      $.ajax({
        url: apiListProduct + "/" + productId,
        headers: {
          Authorization: "Basic " + btoa(username + ":" + password),
        },
        type: "DELETE",
        dataType: "json",
        success: (data) => {
          resolve(data);
        },
        error: (xhr, status, error) => {
          reject(error);
        },
      });
    });
  },
  updateProduct(productId, body) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: apiListProduct + "/" + productId,
        headers: {
          Authorization: "Basic " + btoa(username + ":" + password),
        },
        type: "PUT",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(body),
        success: (data) => {
          resolve(data);
        },
        error: (xhr, status, error) => {
          reject(error);
        },
      });
    });
  }

  

};
