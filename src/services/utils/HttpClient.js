class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(path) {
    const response = await fetch(this.baseUrl + path);

    const contentType = response.headers.get('Content-Type');
    let body = null;
    if (contentType.includes('json')) {
      body = await response.json();
    }

    if (response.ok) {
      return body;
    }

    const errorMessage = body?.error || `${response.status} - ${response.statusText}`;

    throw new Error(errorMessage);
  }
}

export default HttpClient;
