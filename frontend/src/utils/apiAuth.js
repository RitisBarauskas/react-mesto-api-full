
class Auth {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }

    signUp(data) {
        return fetch(this._url+`signup`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then(this._checkResponse);
    }

    signIn(data) {
        return fetch(this._url+`signin`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then(this._checkResponse);
    }

    getUser(jwt) {
        return fetch(this._url+`users/me`, {
            method: 'GET',
            headers: {
                "content-type": "application/json",
                "Authorization" : `Bearer ${jwt}`
            }
        })
            .then(this._checkResponse);
    }
}

const apiAuth = new Auth ({
    url: 'https://api.mesto.website/',
    headers: {
        "content-type": "application/json"
    }
})

export default apiAuth;