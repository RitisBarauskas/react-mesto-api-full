class Api {
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

    getInitialData(jwt) {
        return Promise.all([this.getDataCard(jwt), this.getUserInfo(jwt)])
    }

    getDataCard(jwt) {
        return fetch(this._url+`cards`, {
            headers: {
                "content-type": "application/json",
                "Authorization" : `Bearer ${jwt}`
            }
        })
        .then(this._checkResponse);
    }

    addCard(data, jwt) {
        return fetch(this._url+`cards`, {
            method: 'POST',
            headers: {
                "content-type": "application/json",
                "Authorization" : `Bearer ${jwt}`
            },
            body: JSON.stringify(data)
        })
        .then(this._checkResponse);
    }

    changeLikeCardStatus(id, status, jwt) {
        if (status) {
            this._methodCard = 'PUT'
        }
        else {
            this._methodCard = 'DELETE'
        }
        return fetch(this._url+`cards/${id}/likes`, {
            method: this._methodCard,
            headers: {
                "content-type": "application/json",
                "Authorization" : `Bearer ${jwt}`
            }
        })
            .then(this._checkResponse);
    }

    getUserInfo(jwt) {
        return fetch(this._url+`users/me`, {
            method: 'GET',
            headers: {
                "content-type": "application/json",
                "Authorization" : `Bearer ${jwt}`
            }
        })
        .then(this._checkResponse);
    }

    editProfile(data, jwt) {
        return fetch(this._url+`users/me`, {
            method: 'PATCH',
            headers: {
                "content-type": "application/json",
                "Authorization" : `Bearer ${jwt}`
            },
            body: JSON.stringify(data)
        })
        .then(this._checkResponse);
    }

    udateAvatar(data, jwt) {
        return fetch(this._url+`users/me/avatar`, {
            method: 'PATCH',
            headers: {
                "content-type": "application/json",
                "Authorization" : `Bearer ${jwt}`
            },
            body: JSON.stringify(data)
        })
        .then(this._checkResponse);
    }

    deleteCard(id, jwt) {
        return fetch(this._url+`cards/${id}`, {
            method: 'DELETE',
            headers: {
                "content-type": "application/json",
                "Authorization" : `Bearer ${jwt}`
            }
        })
        .then(this._checkResponse);
    }
}

const api = new Api({
    url: 'https://api.mesto.website/',
    headers: {
        "content-type": "application/json"
    }
})

export default api;