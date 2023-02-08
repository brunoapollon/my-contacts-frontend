class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(path) {
    const response = await fetch(this.baseUrl + path);
    return response.json();
  }
}

export default HttpClient;
