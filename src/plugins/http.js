
const rootUrl = "http://localhost:2000"

const http = {
    post: (url, data) => {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };
        return new Promise((resolve) => {
            fetch(rootUrl + url, options)
                .then((res) => res.json())
                .then((res) => {
                    resolve(res);
                });
        });
    },
    postAuth: (url, data, token) => {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify(data),
        };
        return new Promise((resolve) => {
            fetch(rootUrl + url, options)
                .then((res) => res.json())
                .then((res) => {
                    resolve(res);
                });
        });
    },
    get: (url) => {
        return new Promise((resolve) => {
            fetch(rootUrl + url)
                .then((res) => res.json())
                .then((res) => {
                    resolve(res);
                });
        });
    },
    getAuth: (url, token) => {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        };
        return new Promise((resolve) => {
            fetch(rootUrl + url, options)
                .then((res) => res.json())
                .then((res) => {
                    resolve(res);
                });
        });
    },
};

export default http;