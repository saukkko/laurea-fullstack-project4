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
  static async getAll() {
    return await super._fetchData("/api/getAll", "GET");
  }
  static async get(id) {
    return await super._fetchData(`/api/get/${id}`, "GET");
  }
  static add(payload) {
    return super._fetchData(`/api/add`, "POST", payload);
  }
  static async update(id, payload) {
    return await super._fetchData(`/api/update/${id}`, "PATCH", payload);
  }
  static async delete(id) {
    return await super._fetchData(`/api/get/${id}`, "DELETE");
  }
}
