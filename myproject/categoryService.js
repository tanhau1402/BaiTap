const apiCategoryList = "http://localhost:8080/api/v1/categorys"
let username = "Username1";
let password = "123456";
export const categoryService = {
    getCategoryList() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: apiCategoryList,
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
    }
}