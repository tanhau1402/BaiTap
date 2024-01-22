const apiManufactoryList = "http://localhost:8080/api/v1/manufacturers;"
let username = "Username1";
let password = "123456";
export const manufactoryService = {
    getManufactoryList() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: apiManufactoryList,
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