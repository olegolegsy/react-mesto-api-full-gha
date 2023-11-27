class Api {
  constructor(options) {
    this._url = options.baseUrl;
  }

  _isOk(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  removeCard(idCard, token) {
    return fetch(`${this._url}/cards/${idCard}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then(this._isOk);
  }

  // =========== getters ===========
  getUserInfo(token) {
    return fetch(`${this._url}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then(this._isOk);
  }

  getCards(token) {
    return fetch(`${this._url}/cards`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(this._isOk);
  }

  // =========== setters ===========
  setUserInfo(data, token) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._isOk);
  }

  setAvatar(data, token) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._isOk);
  }

  setCard(data, token) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.title,
        link: data.link,
      }),
    }).then(this._isOk);
  }
  // =========== handleLike ===========
  addLike(idCard, token) {
    return fetch(`${this._url}/cards/${idCard}/likes`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(this._isOk);
  }

  removeLike(idCard, token) {
    return fetch(`${this._url}/cards/${idCard}/likes`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(this._isOk);
  }
}

// =============================================================================== api ===============================================================================
const api = new Api({
  baseUrl: 'http://localhost:3000',
});

export default api;
