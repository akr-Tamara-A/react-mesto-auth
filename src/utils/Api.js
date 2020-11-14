export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  /** получить список всех карточек в виде массива (GET) */
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this.headers })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`${res.status} ${res.statusText}`);
      })
  }

  /** получить данные пользователя (GET) */
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, { headers: this.headers })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`${res.status} ${res.statusText}`);
      })
  }

  /** заменить данные пользователя (PATCH) */
  patchUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  /** заменить аватар (PATCH) */
  patchUserAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  /** добавить карточку (POST) */
  postNewCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  /** */
  changeLikeCardStatus(cardId, isLiked) {
    const method = isLiked ? "PUT" : "DELETE";
    
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: method,
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  /** "залайкать" карточку (PUT) */
  likeCard(cardID) {
    return fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
      method: "PUT",
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  /** удалить лайк карточки (DELETE) */
  unlikeCard(cardID) {
    return fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
      method: "DELETE",
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  /** удалить карточку (DELETE) */
  deleteCard(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}`, {
      method: "DELETE",
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}

/** Связь с сервером */
export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-14",
  headers: {
    authorization: "f7fbd0be-598d-4bc2-8963-24bc80b8013a",
    "Content-Type": "application/json",
  },
});
