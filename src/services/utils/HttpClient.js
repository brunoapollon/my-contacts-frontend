import APIError from '../../errors/ApiError';
import delay from '../../utils/delay';

class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(path) {
    await delay(1500);
    const response = await fetch(this.baseUrl + path);

    const contentType = response.headers.get('Content-Type');
    let body = null;

    if (contentType.includes('json')) {
      body = await response.json();
    }

    if (response.ok) {
      return body;
    }

    throw new APIError(response, body);
  }

  async post(path, body) {
    const headers = new Headers({
      'Content-Type': 'application/json',
    });

    const response = await fetch(this.baseUrl + path, {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
    });

    const contentType = response.headers.get('Content-Type');
    let responseBody = null;

    if (contentType.includes('json')) {
      responseBody = await response.json();
    }

    if (response.ok) {
      return responseBody;
    }

    throw new APIError(response, responseBody);
  }
}

export default HttpClient;
