class RestBase {
  static async _fetchData(route, method, body) {
    return fetch(route, {
      method: method,
      body: body ? JSON.stringify(body) : undefined,
      headers: { "Content-Type": "application/json" },
      mode: "same-origin",
    })
      .then((res) => res.json())
      .catch(console.error);
  }
}

export class Rest extends RestBase {
  static getAll() {
    return super._fetchData("/api/getAll", "GET");
  }
  static get(id) {
    return super._fetchData(`/api/${id}`, "GET");
  }
  static add(payload) {
    return super._fetchData(`/api/add`, "POST", payload);
  }
  static update(id, payload) {
    return super._fetchData(`/api/update/${id}`, "PATCH", payload);
  }
  static delete(id) {
    return super._fetchData(`/api/delete/${id}`, "DELETE");
  }
  static login(payload) {
    return super._fetchData(`/api/login`, "POST", payload);
  }
}
